"use server";

import { sql } from "drizzle-orm";

import { db } from "@/lib/db";
import { whatYouCouldBuyItem } from "@/lib/db/schema/schema";
import { getTotalSaved, getUserHabits } from "@/app/modules/userHabit/actions";

export type WhatYouCouldBuyItemWithDetails = {
  id: string;
  name: string;
  cost: number;
  daysOfSaving: number;
};

export const getRandomWhatYouCouldBuyItemsWithDetails = async (): Promise<{
  success: boolean;
  data?: WhatYouCouldBuyItemWithDetails[];
  error?: string;
}> => {
  const totalSavedResponse = await getTotalSaved();

  if (!totalSavedResponse.success) {
    return {
      success: false,
      error: totalSavedResponse.error,
    };
  }

  // Get user habits to calculate monthly savings rate
  const userHabitsResponse = await getUserHabits();

  if (!userHabitsResponse.success) {
    return {
      success: false,
      error: userHabitsResponse.error,
    };
  }

  const dailySavingRate = (userHabitsResponse.data ?? [])
    .map((habit) => habit.dailyCost ?? 0)
    .reduce((a, b) => a + b, 0);

  // If no savings rate, return empty array
  if (dailySavingRate === 0) {
    return {
      success: true,
      data: [],
    };
  }

  try {
    // Get random items from the database
    const randomItems = await db
      .select()
      .from(whatYouCouldBuyItem)
      .orderBy(sql`RANDOM()`)
      .limit(6);

    // Map to the return type with calculated monthsOfSaving
    const itemsWithDetails: WhatYouCouldBuyItemWithDetails[] = randomItems.map(
      (item) => ({
        id: item.id,
        name: item.name,
        cost: item.price,
        daysOfSaving: Math.ceil(item.price / dailySavingRate),
      }),
    );

    return {
      success: true,
      data: itemsWithDetails,
    };
  } catch (error) {
    console.error("Failed to fetch random items:", error);
    return {
      success: false,
      error: "Failed to fetch random items",
    };
  }
};
