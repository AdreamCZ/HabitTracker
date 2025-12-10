import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CardSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          <Skeleton className="h-6 w-3/4" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <Skeleton className="h-3 w-20 mt-1 mx-auto" />
      </CardContent>
    </Card>
  );
};

const HabitGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
};

export { CardSkeleton, HabitGridSkeleton };
