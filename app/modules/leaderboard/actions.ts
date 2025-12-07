import { eq, desc, sql, inArray, and } from "drizzle-orm";
import { cache } from "react";

import {
  type LeaderboardEntry,
  SortBy,
  type LeaderBoardPosition,
} from "@/types";

import { db } from "../../../lib/db";
import { user } from "../../../lib/db/schema/auth-schema";
import { habit, userHabit } from "../../../lib/db/schema/schema";

type LeaderboardFilters = {
  habitId?: string;
  userId?: string; // When specified take only user + his friends
  minStreak?: number;
  sortBy?: SortBy;
  limit?: number;
};

export const getLeaderboard = cache(
  async (filters: LeaderboardFilters): Promise<LeaderboardEntry[]> => {
    const {
      habitId,
      userId,
      minStreak,
      sortBy = SortBy.Streak,
      limit = 10,
    } = filters;

    let query = db
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

    const conditions = [];

    if (habitId) {
      conditions.push(eq(habit.id, habitId));
    }

    if (minStreak && minStreak > 0) {
      conditions.push(sql`${userHabit.streak} >= ${minStreak}`);
    }

    if (userId) {
      const friendships = await db
        .select({ friendId: sql<string>`friend_id` })
        .from(sql`friendships`)
        .where(sql`user_id = ${userId}`)
        .all();

      const friendIds = friendships.map((f) => f.friendId);

      if (friendIds.length > 0) {
        conditions.push(inArray(user.id, [...friendIds, userId]));
      } else {
        conditions.push(eq(user.id, userId));
      }
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }

    const orderBy =
      sortBy === SortBy.Streak
        ? [desc(userHabit.streak), desc(userHabit.daysCompleted)]
        : [desc(userHabit.daysCompleted), desc(userHabit.streak)];

    const results = await query
      .orderBy(...orderBy)
      .limit(limit)
      .all();

    return results;
  },
);

export const getAllHabits = cache(async () => {
  return await db
    .select({
      id: habit.id,
      name: habit.name,
    })
    .from(habit)
    .orderBy(habit.name)
    .all();
});

export const getUserLeaderboardPosition = cache(
  async (
    userId: string,
    habitId: string,
    sortBy: SortBy = SortBy.Streak,
  ): Promise<LeaderBoardPosition | null> => {
    const allUsers = await db
      .select({
        userId: user.id,
        value:
          sortBy === SortBy.Streak ? userHabit.streak : userHabit.daysCompleted,
      })
      .from(userHabit)
      .innerJoin(user, eq(userHabit.userId, user.id))
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
