import { Skeleton } from "@/components/ui/skeleton";
import { type LeaderboardEntryWithBadge, type SortBy } from "@/types";
import { useFollowings } from "@/lib/api/follow";

import { LeaderboardEntryCard } from "./habit-leaderboard-card";

type LeaderboardListProps = {
  data: LeaderboardEntryWithBadge[];
  selectedHabitName: string;
  sortBy: SortBy;
  isPending: boolean;
};

export const LeaderboardList = ({
  data,
  selectedHabitName,
  sortBy,
  isPending,
}: LeaderboardListProps) => {
  const { data: followingIds = [], isLoading: isLoadingFollowings } =
    useFollowings();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        🏆 {selectedHabitName} - Top 10
      </h2>
      {isPending ? (
        <div className="space-y-3">
          {[...Array(10)].map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((entry, index) => (
            <LeaderboardEntryCard
              key={entry.userId}
              entry={entry}
              rank={index + 1}
              sortBy={sortBy}
              followingIds={followingIds}
              isLoadingFollowings={isLoadingFollowings}
            />
          ))}
        </div>
      )}
    </div>
  );
};
