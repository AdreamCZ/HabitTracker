"use server";

import { revalidatePath } from "next/cache";
import { and, count, desc, eq, sql } from "drizzle-orm";
import dayjs from "dayjs";

import { db } from "@/lib/db";
import { habit, type Habit, userHabit } from "@/lib/db/schema/schema";
import { getSession } from "@/lib/auth/session";
import { getAllHabits } from "@/app/modules/habit/actions";

import { getBadges } from "../badge/actions";

export type UserHabitWithDetails = {
  id: string;
  habitId: string;
  dailyCost: number | null;
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
          dailyCost: userHabit.dailyCost,
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

export const getHabitsUserDoesNotHave = async (): Promise<{
  success: boolean;
  data?: Habit[];
  error?: string;
}> => {
  const currentUserHabits = await getUserHabits();
  if (!currentUserHabits.success) {
    return { success: false, error: currentUserHabits.error };
  }

  const allHabits = await getAllHabits();
  if (!allHabits.success) {
    return { success: false, error: allHabits.error };
  }

  const habitsUserDoesNotHave = allHabits.data!.filter(
    (habit) =>
      !currentUserHabits.data!.some(
        (userHabit) => userHabit.habitId === habit.id,
      ),
  );

  return { success: true, data: habitsUserDoesNotHave };
};

export const checkInHabit = async (userHabitId: string) => {
  const session = await getSession();

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

export const removeCheckInHabit = async (userHabitId: string) => {
  const session = await getSession();

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

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastCompleted = existingUserHabit.lastCompleted
      ? new Date(existingUserHabit.lastCompleted)
      : null;

    if (lastCompleted) {
      lastCompleted.setHours(0, 0, 0, 0);
      console.log(lastCompleted);
      console.log(today);
      if (lastCompleted.getTime() !== today.getTime()) {
        return { success: false, error: "Didn't check in today" };
      }
    }

    await db
      .update(userHabit)
      .set({
        streak:
          existingUserHabit.streak - 1 < 0 ? 0 : existingUserHabit.streak - 1,
        daysCompleted: existingUserHabit.daysCompleted - 1,
        lastCompleted: existingUserHabit.previousLastCompleted,
      })
      .where(eq(userHabit.id, userHabitId));

    revalidatePath("/checkin");
    return {
      success: true,
      newStreak:
        existingUserHabit.streak - 1 < 0 ? 0 : existingUserHabit.streak - 1,
      lastCompleted: existingUserHabit.previousLastCompleted,
    };
  } catch (error) {
    console.error("Failed to check in:", error);
    return { success: false, error: "Failed to check in" };
  }
};

export const addNewUserHabit = async (
  habitId: string,
  dailyCost: number | null,
) => {
  const session = await getSession();

  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await db
      .insert(userHabit)
      .values({
        userId: session.user.id,
        habitId,
        dailyCost,
        streak: 0,
        daysCompleted: 0,
        lastCompleted: null,
      })
      .returning();

    revalidatePath("/checkin");
    return { success: true };
  } catch (error) {
    console.error("Failed to add new habit:", error);
    return { success: false, error: "Failed to add new habit" };
  }
};

export const updateUserHabit = async (
  userHabitId: string,
  dailyCost: number | null,
) => {
  const session = await getSession();

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

    if (existingUserHabit.userId !== session.user.id) {
      return { success: false, error: "Unauthorized" };
    }

    await db
      .update(userHabit)
      .set({
        dailyCost,
      })
      .where(eq(userHabit.id, userHabitId));

    revalidatePath("/checkin");
    revalidatePath("/settings");
    return { success: true };
  } catch (error) {
    console.error("Failed to update habit:", error);
    return { success: false, error: "Failed to update habit" };
  }
};

export const removeUserHabit = async (userHabitId: string) => {
  const session = await getSession();

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

    if (existingUserHabit.userId !== session.user.id) {
      return { success: false, error: "Unauthorized" };
    }

    await db.delete(userHabit).where(eq(userHabit.id, userHabitId));

    revalidatePath("/checkin");
    revalidatePath("/settings");

    return { success: true };
  } catch (error) {
    console.error("Failed to remove habit:", error);
    return { success: false, error: "Failed to remove habit" };
  }
};

export const resetStreaks = async () => {
  try {
    const yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");

    await db
      .update(userHabit)
      .set({ streak: 0 })
      .where(
        and(
          sql`${userHabit.streak} > 0`,
          sql`date(${userHabit.lastCompleted}) < ${yesterday}`,
        ),
      );
  } catch (error) {
    console.error("[Cron] Error resetting streaks:", error);
  }
};

export const getNumberOfActiveHabits = async () => {
  const session = await getSession();

  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const userHabitsResult = await db
      .select({ count: count() })
      .from(userHabit)
      .where(eq(userHabit.userId, session.user.id));

    return { success: true, habitCount: userHabitsResult[0].count };
  } catch (error) {
    console.error("Failed to fetch user habits:", error);
    return { success: false, error: "Failed to fetch user habits" };
  }
};

export const getLongestStreak = async () => {
  const session = await getSession();

  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const longestStreakResult = await db
      .select({
        streak: userHabit.streak,
      })
      .from(userHabit)
      .where(eq(userHabit.userId, session.user.id))
      .orderBy(desc(userHabit.streak))
      .limit(1);

    const longestStreak =
      longestStreakResult.length > 0 ? longestStreakResult[0].streak : 0;

    return { success: true, longestStreak };
  } catch (error) {
    console.error("Failed to fetch longest streak:", error);
    return { success: false, error: "Failed to fetch longest streak" };
  }
};

export const getTotalSavings = async () => {
  const session = await getSession();

  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const savings = await db
      .select({
        daysCompleted: userHabit.daysCompleted,
        dailyCost: userHabit.dailyCost,
      })
      .from(userHabit)
      .where(eq(userHabit.userId, session.user.id));

    const totalSavings = savings
      .map((s) => s.daysCompleted * (s.dailyCost ?? 0))
      .reduce((a, b) => a + b, 0);

    return { success: true, totalSavings };
  } catch (error) {
    console.error("Failed to fetch longest streak:", error);
    return { success: false, error: "Failed to fetch longest streak" };
  }
};
