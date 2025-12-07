import {
  getAllHabits,
  getLeaderboard,
} from "@/app/modules/leaderboard/actions";
import { SortBy } from "@/types";

import { LeaderboardClient } from "./leaderboard-client";

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

  const leaderboardData = await getLeaderboard({
    habitId,
    sortBy,
    limit: 10,
  });

  return (
    <div className="container mx-auto py-8">
      <LeaderboardClient
        initialData={leaderboardData}
        initialHabitId={habitId}
        initialSortBy={sortBy}
        habits={habits}
      />
    </div>
  );
};

export default LeaderboardPage;
