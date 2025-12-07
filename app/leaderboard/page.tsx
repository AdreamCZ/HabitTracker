import {
  getAllHabits,
  getLeaderboardWithBadges,
} from "@/app/modules/leaderboard/actions";
import { SortBy } from "@/types";

import { LeaderboardClient } from "./leaderboard-client";
import { BadgeMeaningsCard } from "./componets/badge-meanings";
import { LeaderboardHeader } from "./componets/leaderboard-header";

type PageProps = {
  searchParams: Promise<{
    habitId?: string;
    sortBy?: SortBy;
  }>;
};

const LeaderboardPage = async (props: PageProps) => {
  const searchParams = await props.searchParams;

  const habits = await getAllHabits();

  const habitId = searchParams.habitId ?? habits[0]?.id;
  const sortBy = searchParams.sortBy ?? SortBy.Streak;

  const leaderboardData = await getLeaderboardWithBadges({
    habitId,
    sortBy,
    limit: 10,
  });

  return (
    <div className="container mx-auto py-8">
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
