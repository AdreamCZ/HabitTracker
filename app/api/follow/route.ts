import { type NextRequest, NextResponse } from "next/server";

import { getSession } from "@/lib/auth/session";
import {
  followUser,
  getUserFollowings,
  unfollowUser,
} from "@/app/modules/follow/actions";
import { getUserById } from "@/app/modules/user/actions";

export const GET = async (request: NextRequest) => {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const followingIds = await getUserFollowings(session.user.id);

    return NextResponse.json({ followingIds });
  } catch (error) {
    console.error("Failed to fetch followings:", error);
    return NextResponse.json(
      { error: "Failed to fetch followings" },
      { status: 500 },
    );
  }
};

export const POST = async (request: NextRequest) => {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { followingId } = body;

    if (!followingId || typeof followingId !== "string") {
      return NextResponse.json(
        { error: "followingId is required" },
        { status: 400 },
      );
    }

    await followUser(session.user.id, followingId);

    const followedUser = await getUserById(followingId);

    if (!followedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: `Successfully followed ${followedUser.name}`,
      user: followedUser,
    });
  } catch (error) {
    console.error("Failed to follow user:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to follow user" },
      { status: 500 },
    );
  }
};

export const DELETE = async (request: NextRequest) => {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { followingId } = body;

    if (!followingId || typeof followingId !== "string") {
      return NextResponse.json(
        { error: "followingId is required" },
        { status: 400 },
      );
    }

    const unfollowedUser = await getUserById(followingId);
    if (!unfollowedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await unfollowUser(session.user.id, followingId);

    return NextResponse.json({
      message: `Successfully unfollowed ${unfollowedUser.name}`,
      user: unfollowedUser,
    });
  } catch (error) {
    console.error("Failed to unfollow user:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to unfollow user" },
      { status: 500 },
    );
  }
};
