import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export const HabitCardSkeleton = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="h-7 w-32" />
          </div>
          <div className="flex gap-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        <div className="text-center mr-4">
          <Skeleton className="h-10 w-8 mx-auto mb-1" />
          <Skeleton className="h-3 w-16" />
        </div>

        <Skeleton className="w-16 h-16 rounded-full" />
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-3 w-16" />
          </div>
          <div className="flex-1 mx-4">
            <Skeleton className="h-1 w-full rounded-full" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full opacity-40" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export const HabitListSkeleton = () => {
  return (
    <div className="space-y-4">
      <HabitCardSkeleton />
      <HabitCardSkeleton />
      <HabitCardSkeleton />
    </div>
  );
};
