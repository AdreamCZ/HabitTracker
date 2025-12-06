"use server";
import { Suspense } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { HabitList } from "./habit-list";
import { HabitListSkeleton } from "./skeletons";

const CheckinPage = async () => {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Daily Check-in</h2>
          <p className="text-muted-foreground mt-2">
            Did you crush your goals today?
          </p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">Add Habit</span>
        </Button>
      </div>

      <Suspense fallback={<HabitListSkeleton />}>
        <HabitList />
      </Suspense>
    </div>
  );
};

export default CheckinPage;
