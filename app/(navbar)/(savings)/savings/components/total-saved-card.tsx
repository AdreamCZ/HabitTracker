import { getTotalSaved } from "@/app/modules/userHabit/actions";
import { Card, CardContent } from "@/components/ui/card";
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
            : "You're making a real financial impact on your recovery"}
        </div>
      </CardContent>
    </Card>
  );
};
