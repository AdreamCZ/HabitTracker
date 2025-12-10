import { getTotalSaved } from "@/app/modules/userHabit/actions";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice } from "@/lib/formatting-utils";

export const TotalSavedCard = async () => {
  const totalSavedResult = await getTotalSaved();

  if (!totalSavedResult.success) {
    throw new Error(totalSavedResult.error);
  }

  const totalSaved = totalSavedResult.data!;

  return (
    <Card className="mb-10 bg-primary text-primary-foreground">
      <CardContent className="text-center !pt-6">
        <div className="mb-2">Total Saved</div>
        <div className="text-5xl font-bold my-4">{formatPrice(totalSaved)}</div>
        <div className="text-sm opacity-80">
          {totalSaved === 0
            ? "Start completing habits to save money!"
            : "You're making a real financial impact with your recovery"}
        </div>
      </CardContent>
    </Card>
  );
};

export const TotalSavedCardSkeleton = () => {
  return (
    <Card className="mb-10 bg-primary text-primary-foreground">
      <CardContent className="text-center !pt-6">
        <div className="mb-2">Total Saved</div>
        <Skeleton className="h-12 w-32 mx-auto my-4 bg-primary-foreground/20" />
        <Skeleton className="h-4 w-64 mx-auto bg-primary-foreground/20" />
      </CardContent>
    </Card>
  );
};
