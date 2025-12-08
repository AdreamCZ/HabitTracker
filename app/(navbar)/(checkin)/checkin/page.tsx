"use server";

import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/session";
import { AddHabitButton } from "@/components/habit/add-habit-button";

import { HabitList } from "./habit-list";
import { HabitListSkeleton } from "./skeletons";

const CheckinPage = async () => {
  const session = await getSession();

  if (!session) {
    const cookieStore = await cookies();
    cookieStore.delete("better-auth.session_token");
    redirect("/login");
  }

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Daily Check-in</h2>
          <p className="text-muted-foreground mt-2">
            Did you crush your goals today?
          </p>
        </div>
        <AddHabitButton />
      </div>

      <Suspense fallback={<HabitListSkeleton />}>
        <HabitList />
      </Suspense>
    </div>
  );
};

export default CheckinPage;
