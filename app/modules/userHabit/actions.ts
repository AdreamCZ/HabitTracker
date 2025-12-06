"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { userHabit, habit } from "@/lib/db/schema/schema";
import { getSession } from "@/lib/auth/session";

import { getBadges } from "../badge/actions";

export type UserHabitWithDetails = {
  id: string;
  habitId: string;
  name: string;
  daysCompleted: number;
  streak: number;
  lastCompleted: string | null;
  badgeName: string | null;
  badgeIcon: string | null;
};

export const getUserHabits = async (): Promise<{
  success: boolean;
  data?: UserHabitWithDetails[];
  error?: string;
}> => {
  const session = await getSession();

  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const [userHabitsResult, badgesResult] = await Promise.all([
      db
        .select({
          id: userHabit.id,
          habitId: habit.id,
          name: habit.name,
          daysCompleted: userHabit.daysCompleted,
          streak: userHabit.streak,
          lastCompleted: userHabit.lastCompleted,
        })
        .from(userHabit)
        .innerJoin(habit, eq(userHabit.habitId, habit.id))
        .where(eq(userHabit.userId, session.user.id)),
      getBadges(),
    ]);

    const badges = badgesResult.data ?? [];

    const userHabitsWithBadges = userHabitsResult.map((habit) => {
      const currentBadge = badges.findLast(
        (badge) => badge.streak <= habit.streak,
      );

      return {
        ...habit,
        badgeName: currentBadge?.name ?? null,
        badgeIcon: currentBadge?.icon ?? null,
      };
    });

    return { success: true, data: userHabitsWithBadges };
  } catch (error) {
    console.error("Failed to fetch user habits:", error);
    return { success: false, error: "Failed to fetch user habits" };
  }
};

export const checkInHabit = async (userHabitId: string) => {
  const session = await getSession();

  console.log("Checking in habit:", userHabitId);

  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const [existingUserHabit] = await db
      .select()
      .from(userHabit)
      .where(eq(userHabit.id, userHabitId))
      .limit(1);

    if (!existingUserHabit) {
      return { success: false, error: "Habit not found" };
    }

    console.log(existingUserHabit);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastCompleted = existingUserHabit.lastCompleted
      ? new Date(existingUserHabit.lastCompleted)
      : null;

    if (lastCompleted) {
      lastCompleted.setHours(0, 0, 0, 0);
      console.log(lastCompleted);
      console.log(today);
      if (lastCompleted.getTime() === today.getTime()) {
        return { success: false, error: "Already checked in today" };
      }
    }

    let newStreak = existingUserHabit.streak;
    if (lastCompleted) {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      if (lastCompleted.getTime() === yesterday.getTime()) {
        newStreak += 1;
      } else {
        newStreak = 1;
      }
    } else {
      newStreak = 1;
    }

    await db
      .update(userHabit)
      .set({
        streak: newStreak,
        daysCompleted: existingUserHabit.daysCompleted + 1,
        lastCompleted: new Date().toISOString(),
        previousLastCompleted: existingUserHabit.lastCompleted,
      })
      .where(eq(userHabit.id, userHabitId));

    revalidatePath("/checkin");
    return { success: true, newStreak };
  } catch (error) {
    console.error("Failed to check in:", error);
    return { success: false, error: "Failed to check in" };
  }
};
