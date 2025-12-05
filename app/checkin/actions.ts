"use server";

import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { userHabit, habit } from "@/lib/db/schema/schema";
import { getSession } from "@/lib/auth/session";

export type UserHabitWithDetails = {
	id: string;
	name: string;
	daysCompleted: number;
	streak: number;
	lastCompleted: string | null;
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
		const userHabits = await db
			.select({
				id: habit.id,
				name: habit.name,
				daysCompleted: userHabit.daysCompleted,
				streak: userHabit.streak,
				lastCompleted: userHabit.lastCompleted,
			})
			.from(userHabit)
			.innerJoin(habit, eq(userHabit.habitId, habit.id))
			.where(eq(userHabit.userId, session.user.id));

		return { success: true, data: userHabits };
	} catch (error) {
		console.error("Failed to fetch user habits:", error);
		return { success: false, error: "Failed to fetch user habits" };
	}
};

export const checkInHabit = async (habitId: string) => {
	const session = await getSession();

	if (!session?.user) {
		return { success: false, error: "Unauthorized" };
	}

	try {
		const [existingUserHabit] = await db
			.select()
			.from(userHabit)
			.where(
				eq(userHabit.habitId, habitId) && eq(userHabit.userId, session.user.id),
			)
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
			.where(
				eq(userHabit.habitId, habitId) && eq(userHabit.userId, session.user.id),
			);

		return { success: true, newStreak };
	} catch (error) {
		console.error("Failed to check in:", error);
		return { success: false, error: "Failed to check in" };
	}
};
