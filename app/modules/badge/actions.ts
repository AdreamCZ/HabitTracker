"use server";

import { unstable_cache } from "next/cache";
import { desc, lte, asc } from "drizzle-orm";

import { db } from "@/lib/db";
import { badge, type Badge } from "@/lib/db/schema/schema";

export const getBadges = async (): Promise<{
  success: boolean;
  data?: Badge[];
  error?: string;
}> => {
  try {
    const badges = await db.select().from(badge).orderBy(badge.streak);
    return { success: true, data: badges };
  } catch (error) {
    console.error("Failed to fetch badges:", error);
    return { success: false, error: "Failed to fetch badges" };
  }
};

/**
 * Returns all badges sorted by streak ASC
 */
export const getAllBadgesCached = unstable_cache(
  async () => {
    return await db.select().from(badge).orderBy(asc(badge.streak));
  },
  ["all-badges-list"],
  { revalidate: 3600 },
);

export const getBadgeForStreak = async (
  streak: number,
): Promise<Badge | null> => {
  try {
    const result = await db
      .select()
      .from(badge)
      .where(lte(badge.streak, streak))
      .orderBy(desc(badge.streak))
      .limit(1)
      .get();
    return result ?? null;
  } catch (error) {
    console.error("Failed to fetch badge for streak:", error);
    return null;
  }
};

export const getBadgeProgress = async (
  streak: number,
): Promise<{
  current: Badge | null;
  next: Badge | null;
}> => {
  try {
    const badges = await getAllBadgesCached();

    let current = null;
    let next = null;

    for (const b of badges) {
      if (b.streak <= streak) {
        current = b;
      } else {
        next = b;
        break;
      }
    }

    return { current, next };
  } catch (error) {
    console.error("Failed to calculate badge progress:", error);
    return { current: null, next: null };
  }
};
