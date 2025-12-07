"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { type LeaderboardEntryWithBadge, type SortBy } from "@/types";

import { LeaderboardFilters } from "./componets/leaderboard-filters";
import { LeaderboardList } from "./componets/leaderboard-list";
import { UserRankContainer } from "./componets/user-rank-container";

type LeaderboardClientProps = {
  initialData: LeaderboardEntryWithBadge[];
  initialHabitId: string;
  initialSortBy: SortBy;
  habits: { id: string; name: string }[];
};

export const LeaderboardClient = ({
  initialData,
  initialHabitId,
  initialSortBy,
  habits,
}: LeaderboardClientProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const selectedHabit = searchParams.get("habitId") ?? initialHabitId;
  const sortBy = (searchParams.get("sortBy") as SortBy) || initialSortBy;

  const handleHabitChange = (habitId: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set("habitId", habitId);
      router.push(`/leaderboard?${params.toString()}`);
    });
  };

  const handleSortChange = (newSortBy: SortBy) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set("sortBy", newSortBy);
      router.push(`/leaderboard?${params.toString()}`);
    });
  };

  const selectedHabitName =
    habits.find((h) => h.id === selectedHabit)?.name ?? "";

  return (
    <>
      <LeaderboardFilters
        habits={habits}
        selectedHabit={selectedHabit}
        sortBy={sortBy}
        isPending={isPending}
        onHabitChange={handleHabitChange}
        onSortChange={handleSortChange}
      />

      <UserRankContainer selectedHabit={selectedHabit} sortBy={sortBy} />

      <LeaderboardList
        data={initialData}
        selectedHabitName={selectedHabitName}
        sortBy={sortBy}
        isPending={isPending}
      />
    </>
  );
};
