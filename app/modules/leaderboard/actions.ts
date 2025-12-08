import { eq, desc, inArray, and, gte, or } from "drizzle-orm";
import { cache } from "react";

import {
  type LeaderboardEntry,
  SortBy,
  type LeaderBoardPosition,
  type LeaderboardEntryWithBadge,
} from "@/types";

import { db } from "../../../lib/db";
import { user } from "../../../lib/db/schema/auth-schema";
import {
  type Badge,
  habit,
  userFollower,
  userHabit,
} from "../../../lib/db/schema/schema";
import { getAllBadgesCached } from "../badge/actions";

type LeaderboardFilters = {
  habitId?: string;
  userId?: string; // When specified take only user + his friends
  minStreak?: number;
  sortBy?: SortBy;
  limit?: number;
};

const getLeaderboard = cache(
  async (filters: LeaderboardFilters): Promise<LeaderboardEntry[]> => {
    const {
      habitId,
      userId,
      minStreak,
      sortBy = SortBy.Streak,
      limit = 10,
    } = filters;

    const conditions = [];

    if (habitId) {
      conditions.push(eq(habit.id, habitId));
    }

    if (minStreak && minStreak > 0) {
      conditions.push(gte(userHabit.streak, minStreak));
    }

    if (userId) {
      const following = await db
        .select({ followingId: userFollower.followingId })
        .from(userFollower)
        .where(eq(userFollower.followerId, userId))
        .all();

      const followingIds = following.map((f) => f.followingId);

      if (followingIds.length > 0) {
        conditions.push(inArray(user.id, [...followingIds, userId]));
      } else {
        conditions.push(eq(user.id, userId));
      }
    }

    const baseQuery = db
      .select({
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        userImage: user.image,
        habitName: habit.name,
        habitId: habit.id,
        daysCompleted: userHabit.daysCompleted,
        streak: userHabit.streak,
        lastCompleted: userHabit.lastCompleted,
      })
      .from(userHabit)
      .innerJoin(habit, eq(userHabit.habitId, habit.id))
      .innerJoin(user, eq(userHabit.userId, user.id));

    const queryWithConditions =
      conditions.length > 0 ? baseQuery.where(and(...conditions)) : baseQuery;

    const orderBy =
      sortBy === SortBy.Streak
        ? [desc(userHabit.streak), desc(userHabit.daysCompleted)]
        : [desc(userHabit.daysCompleted), desc(userHabit.streak)];

    const results = await queryWithConditions
      .orderBy(...orderBy)
      .limit(limit)
      .all();

    return results;
  },
);

export const getLeaderboardWithBadges = cache(
  async (filters: LeaderboardFilters): Promise<LeaderboardEntryWithBadge[]> => {
    const leaderboard = await getLeaderboard(filters);

    // Sorted ASC
    const badges = await getAllBadgesCached();
    console.assert(badges.length > 0, "⚠️ No badges loaded!");

    return leaderboard.map((entry): LeaderboardEntryWithBadge => {
      // matches highest badge or fallback to the lowest badge
      const matchingBadge =
        badges
          .slice()
          .reverse()
          .find((b: Badge) => entry.streak >= b.streak) ?? badges[0];

      return {
        ...entry,
        badge: matchingBadge,
      };
    });
  },
);

export const getUserLeaderboardPosition = cache(
  async (
    userId: string,
    habitId: string,
    sortBy: SortBy = SortBy.Streak,
    followingOnly: boolean = false,
  ): Promise<LeaderBoardPosition | null> => {
    const query = db
      .select({
        userId: user.id,
        value:
          sortBy === SortBy.Streak ? userHabit.streak : userHabit.daysCompleted,
      })
      .from(userHabit)
      .innerJoin(user, eq(userHabit.userId, user.id));

    if (followingOnly) {
      const allUsers = await query
        .leftJoin(userFollower, eq(userFollower.followingId, userHabit.userId))
        .where(
          and(
            eq(userHabit.habitId, habitId),
            or(
              eq(userFollower.followerId, userId),
              eq(userHabit.userId, userId),
            ),
          ),
        )
        .orderBy(
          desc(
            sortBy === SortBy.Streak
              ? userHabit.streak
              : userHabit.daysCompleted,
          ),
        )
        .all();

      const position = allUsers.findIndex((u) => u.userId === userId);
      if (position === -1) {
        return null;
      }

      return {
        position: position + 1,
        total: allUsers.length,
        value: allUsers[position].value,
      };
    }

    const allUsers = await query
      .where(eq(userHabit.habitId, habitId))
      .orderBy(
        desc(
          sortBy === SortBy.Streak ? userHabit.streak : userHabit.daysCompleted,
        ),
      )
      .all();

    const position = allUsers.findIndex((u) => u.userId === userId);

    if (position === -1) {
      return null;
    }

    return {
      position: position + 1, // 1-based index
      total: allUsers.length,
      value: allUsers[position].value,
    };
  },
);
