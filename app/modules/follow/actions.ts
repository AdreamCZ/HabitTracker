import { eq, and } from "drizzle-orm";

import { db } from "../../../lib/db";
import { userFollower } from "../../../lib/db/schema/schema";

export const followUser = async (
  followerId: string,
  followingId: string,
): Promise<void> => {
  if (followerId === followingId) {
    throw new Error("Cannot follow yourself");
  }

  const existing = await db
    .select()
    .from(userFollower)
    .where(
      and(
        eq(userFollower.followerId, followerId),
        eq(userFollower.followingId, followingId),
      ),
    )
    .get();

  if (existing) {
    throw new Error("Already following this user");
  }

  await db.insert(userFollower).values({
    followerId,
    followingId,
  });
};

export const unfollowUser = async (
  followerId: string,
  followingId: string,
): Promise<void> => {
  const result = await db
    .delete(userFollower)
    .where(
      and(
        eq(userFollower.followerId, followerId),
        eq(userFollower.followingId, followingId),
      ),
    )
    .returning();

  if (result.length === 0) {
    throw new Error("Not following this user");
  }
};

export const getUserFollowings = async (userId: string): Promise<string[]> => {
  const followings = await db
    .select({ followingId: userFollower.followingId })
    .from(userFollower)
    .where(eq(userFollower.followerId, userId))
    .all();

  return followings.map((f) => f.followingId);
};
