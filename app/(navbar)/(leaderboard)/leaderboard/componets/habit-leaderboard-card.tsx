"use client";

import { Trophy, Medal, Award, TrendingUp, Calendar } from "lucide-react";
import { Suspense } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Avatar from "@/components/ui/avatar";
import { type LeaderboardEntryWithBadge, SortBy } from "@/types";
import { BadgeIcon } from "@/components/ui/badgeIcon";

import { FollowButton } from "./follow-button";

type LeaderboardEntryCardProps = {
  entry: LeaderboardEntryWithBadge;
  rank: number;
  sortBy: SortBy;
  followingIds: string[];
  isLoadingFollowings: boolean;
};

export const LeaderboardEntryCard = ({
  entry,
  rank,
  sortBy,
  followingIds,
  isLoadingFollowings,
}: LeaderboardEntryCardProps) => {
  const isFollowing = followingIds.includes(entry.userId);

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

  const isStreakActive = sortBy === SortBy.Streak;

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
            <Suspense
              fallback={<Skeleton className="w-10 h-10 rounded-full" />}
            >
              <Avatar src={entry.userImage} name={entry.userName} />
            </Suspense>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">
              {entry.userName ?? entry.userEmail}
            </h3>
            <BadgeIcon name={entry.badge.icon} className="text-3xl mb-1" />
            <div className="flex items-center gap-3 text-sm">
              <span
                className={
                  !isStreakActive
                    ? "text-gray-400"
                    : "font-semibold text-orange-600"
                }
              >
                {entry.streak} day streak
              </span>{" "}
              <span
                className={
                  isStreakActive
                    ? "text-gray-400"
                    : "font-semibold text-blue-600"
                }
              >
                {entry.daysCompleted} days total
              </span>
            </div>
          </div>
          <div className="flex-shrink-0 text-right flex flex-col items-end gap-2">
            <div className="flex items-center gap-1.5 text-2xl font-bold text-gray-900">
              {isStreakActive ? (
                <TrendingUp className="w-5 h-5 text-orange-500" />
              ) : (
                <Calendar className="w-5 h-5 text-blue-500" />
              )}
              {isStreakActive ? entry.streak : entry.daysCompleted}
            </div>
            <p className="text-xs text-gray-500">
              {isStreakActive ? "day streak" : "days total"}
            </p>
            <FollowButton
              userId={entry.userId}
              userName={entry.userName}
              userEmail={entry.userEmail}
              isFollowing={isFollowing}
              isLoadingFollowings={isLoadingFollowings}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
