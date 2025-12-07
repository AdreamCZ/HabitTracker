"use client";

import { useEffect, useState } from "react";

import { type SortBy, type LeaderBoardPosition } from "@/types";
import { useSession } from "@/lib/auth/client";

import { UserRankCard } from "./user-rank";

export const UserRankContainer = ({
  selectedHabit,
  sortBy,
}: {
  selectedHabit: string;
  sortBy: SortBy;
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
        // Volání API endpointu místo přímého volání DB
        const response = await fetch(
          `/api/leaderboard/position?habit=${selectedHabit}&sortBy=${sortBy}`,
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
  }, [session, sessionLoading, selectedHabit, sortBy]);

  if (sessionLoading || loading || !session) return null;

  return currentUserRank ? (
    <UserRankCard currentUserRank={currentUserRank} />
  ) : null;
};
