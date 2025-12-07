import { Trophy, Medal, Award, TrendingUp, Calendar } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import Avatar from "@/components/ui/avatar";
import { type LeaderboardEntryWithBadge, SortBy } from "@/types";
import { BadgeIcon } from "@/components/ui/badgeIcon";

type LeaderboardEntryCardProps = {
  entry: LeaderboardEntryWithBadge;
  rank: number;
  sortBy: SortBy;
};

export const LeaderboardEntryCard = ({
  entry,
  rank,
  sortBy,
}: LeaderboardEntryCardProps) => {
  const getRankIcon = () => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Award className="w-6 h-6 text-amber-700" />;

    return (
      <span className="w-6 h-6 flex items-center justify-center font-bold text-gray-500">
        {rank}
      </span>
    );
  };

  const mainValue =
    sortBy === SortBy.Streak ? entry.streak : entry.daysCompleted;
  const secondaryValue =
    sortBy === SortBy.Streak ? entry.daysCompleted : entry.streak;

  return (
    <Card
      className={`transition-all ${
        rank <= 3
          ? "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200"
          : ""
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">{getRankIcon()}</div>

          <div className="flex-shrink-0">
            <Avatar src={entry.userImage} name={entry.userName} />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">
              {entry.userName ?? entry.userEmail}
            </h3>
            <BadgeIcon name={entry.badge.icon} className="text-3xl mb-1" />
            <p className="text-sm text-gray-500">
              {sortBy === SortBy.Streak ? (
                <span className="text-gray-400">
                  {secondaryValue} days total
                </span>
              ) : (
                <span className="text-gray-400">
                  {secondaryValue} day streak
                </span>
              )}
            </p>
          </div>

          <div className="flex-shrink-0 text-right">
            <div className="flex items-center gap-1.5 text-2xl font-bold text-gray-900">
              {sortBy === SortBy.Streak ? (
                <TrendingUp className="w-5 h-5 text-orange-500" />
              ) : (
                <Calendar className="w-5 h-5 text-blue-500" />
              )}
              {mainValue}
            </div>

            <p className="text-xs text-gray-500 mt-0.5">
              {sortBy === SortBy.Streak ? "day streak" : "days total"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
