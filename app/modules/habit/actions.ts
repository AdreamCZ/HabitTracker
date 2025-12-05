import { db } from "@/lib/db";
import { habit, type Habit } from "@/lib/db/schema/schema";

export const getAllHabits = async (): Promise<{
  success: boolean;
  data?: Habit[];
  error?: string;
}> => {
  try {
    const habits = await db.select().from(habit);

    const mapped = habits.map((habit): Habit => habit as Habit);
    return { success: true, data: mapped };
  } catch (error) {
    console.error("Failed to fetch habits:", error);
    return { success: false, error: "Failed to fetch habits" };
  }
};
