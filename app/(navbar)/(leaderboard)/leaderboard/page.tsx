import {
  getAllHabits,
  getLeaderboardWithBadges,
} from "@/app/modules/leaderboard/actions";
import { type FollowingFilter, SortBy } from "@/types";
import { getSession } from "@/lib/auth/session";

import { LeaderboardClient } from "./leaderboard-client";
import { BadgeMeaningsCard } from "./componets/badge-meanings";
import { LeaderboardHeader } from "./componets/leaderboard-header";

type PageProps = {
  searchParams: Promise<{
    habitId?: string;
    sortBy?: SortBy;
    following?: FollowingFilter;
  }>;
};

const LeaderboardPage = async (props: PageProps) => {
  const session = await getSession();
  const searchParams = await props.searchParams;

  const habits = await getAllHabits();

  const habitId = searchParams.habitId ?? habits[0]?.id;
  const sortBy = searchParams.sortBy ?? SortBy.Streak;
  const followingFilter = searchParams.following ?? "all";

  const leaderboardData = await getLeaderboardWithBadges({
    habitId,
    sortBy,
    limit: 10,
    ...(followingFilter === "following" &&
      session?.user?.id && {
        userId: session.user.id,
      }),
  });

  return (
    <div className="container mx-auto">
      <div className="max-w-3xl mx-auto">
        <LeaderboardHeader />

        <LeaderboardClient
          initialData={leaderboardData}
          initialHabitId={habitId}
          initialSortBy={sortBy}
          habits={habits}
        />

        <BadgeMeaningsCard />
      </div>
    </div>
  );
};

export default LeaderboardPage;
