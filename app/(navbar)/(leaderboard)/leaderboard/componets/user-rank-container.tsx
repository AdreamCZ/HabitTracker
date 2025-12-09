"use client";

import { useUserRank } from "@/lib/api/leaderboard";
import { type SortBy } from "@/types";

import { UserRankCard } from "./user-rank";

export const UserRankContainer = ({
  selectedHabit,
  sortBy,
  followingOnly,
}: {
  selectedHabit: string;
  sortBy: SortBy;
  followingOnly: boolean;
}) => {
  const { data: currentUserRank, isLoading } = useUserRank({
    selectedHabit,
    sortBy,
    followingOnly,
  });

  if (isLoading || !currentUserRank) return null;

  return (
    <UserRankCard
      currentUserRank={currentUserRank}
      amongFriends={followingOnly}
    />
  );
};
