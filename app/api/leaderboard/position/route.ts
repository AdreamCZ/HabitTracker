import { type NextRequest, NextResponse } from "next/server";

import { getSession } from "@/lib/auth/session";
import { getUserLeaderboardPosition } from "@/app/modules/leaderboard/actions";
import { getAllHabits } from "@/app/modules/userHabit/actions";
import { SortBy } from "@/types";

export const GET = async (request: NextRequest) => {
  const session = await getSession();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const habitIdParam = searchParams.get("habit");
  const sortByParam = searchParams.get("sortBy") ?? SortBy.Streak;
  const followingOnlyParam = searchParams.get("followingOnly") ?? "false";

  const sortBy: SortBy = Object.values(SortBy).includes(sortByParam as SortBy)
    ? (sortByParam as SortBy)
    : SortBy.Streak;

  const followingOnly = followingOnlyParam === "true";

  try {
    const allHabits = await getAllHabits();
    const habitIds = allHabits.map((h) => h.id);

    const habitId = habitIdParam;

    if (!habitId || !habitIds.includes(habitId)) {
      return NextResponse.json({ error: "Habit not found" }, { status: 404 });
    }

    const rank = await getUserLeaderboardPosition(
      session.user.id,
      habitId,
      sortBy,
      followingOnly,
    );

    return NextResponse.json(rank);
  } catch (error) {
    console.error("Failed to fetch user rank:", error);
    return NextResponse.json(
      { error: "Failed to fetch rank" },
      { status: 500 },
    );
  }
};
