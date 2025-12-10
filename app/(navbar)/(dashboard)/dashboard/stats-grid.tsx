import { Suspense } from "react";

import { ActiveHabitsStatCard } from "@/app/(navbar)/(dashboard)/dashboard/components/active-habits-stat-card";
import { CardSkeleton } from "@/app/(navbar)/(dashboard)/dashboard/skeletons";
import { LongestStreakStatCard } from "@/app/(navbar)/(dashboard)/dashboard/components/longest-streak-stat-card";
import { TotalSavingsStatCard } from "@/app/(navbar)/(dashboard)/dashboard/components/total-savings-stat-card";

const StatsGrid = async () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Suspense fallback={<CardSkeleton />}>
        <TotalSavingsStatCard />
      </Suspense>

      <Suspense fallback={<CardSkeleton />}>
        <LongestStreakStatCard />
      </Suspense>

      <Suspense fallback={<CardSkeleton />}>
        <ActiveHabitsStatCard />
      </Suspense>
    </div>
  );
};

export { StatsGrid };
