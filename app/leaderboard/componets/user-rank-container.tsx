"use client";

import { useEffect, useState } from "react";

import { type SortBy, type LeaderBoardPosition } from "@/types";
import { useSession } from "@/lib/auth/client";

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
  const { data: session, isPending: sessionLoading } = useSession();
  const [currentUserRank, setCurrentUserRank] =
    useState<LeaderBoardPosition | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.id) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/leaderboard/position?habit=${selectedHabit}&sortBy=${sortBy}&followingOnly=${followingOnly}`,
        );

        if (!response.ok) throw new Error("Failed to fetch");

        const rank = await response.json();
        setCurrentUserRank(rank);
      } catch (error) {
        console.error("Failed to fetch user rank:", error);
        setCurrentUserRank(null);
      } finally {
        setLoading(false);
      }
    };

    if (!sessionLoading) {
      fetchData();
    }
  }, [session, sessionLoading, selectedHabit, sortBy, followingOnly]);

  if (sessionLoading || loading || !session) return null;

  return currentUserRank ? (
    <UserRankCard
      currentUserRank={currentUserRank}
      amongFriends={followingOnly}
    />
  ) : null;
};
