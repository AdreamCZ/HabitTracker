import { Suspense } from "react";
import { redirect } from "next/navigation";

import { Card } from "@/components/ui/card";
import {
  MotivationBanner,
  MotivationBannerSkeleton,
} from "@/components/motivation/motivation-banner";
import { getSession } from "@/lib/auth/session";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { HabitGrid } from "@/app/(navbar)/(dashboard)/dashboard/habit-grid";
import { StatsGrid } from "@/app/(navbar)/(dashboard)/dashboard/stats-grid";
import { HabitGridSkeleton } from "@/app/(navbar)/(dashboard)/dashboard/skeletons";

const DashboardPage = async () => {
  const session = await getSession();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="px-4 md:px-6 py-8 space-y-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Welcome Back, {session.user.name}
          </h2>
          <p className="text-muted-foreground">
            You&apos;re building a stronger you, one day at a time
          </p>
        </div>
        <SignOutButton />
      </div>

      <StatsGrid />

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">
          Your Habits
        </h3>
        <Suspense fallback={<HabitGridSkeleton />}>
          <HabitGrid />
        </Suspense>
      </Card>

      <Suspense fallback={<MotivationBannerSkeleton />}>
        <MotivationBanner />
      </Suspense>
    </div>
  );
};

export default DashboardPage;
