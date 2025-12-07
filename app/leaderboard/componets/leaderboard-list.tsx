import { type LeaderboardEntryWithBadge, type SortBy } from "@/types";

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
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        🏆 {selectedHabitName} - Top 10
      </h2>
      {isPending ? (
        <div className="space-y-3">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="h-20 bg-gray-100 rounded-lg animate-pulse"
            />
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
            />
          ))}
        </div>
      )}
    </div>
  );
};
