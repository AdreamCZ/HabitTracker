import { type HabitSavings } from "@/app/modules/userHabit/actions";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/formatting-utils";

type HabitSavingsSubCardProps = {
  habitSavings: HabitSavings;
};

export const HabitSavingsSubCard = ({
  habitSavings,
}: HabitSavingsSubCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{habitSavings.name}</CardTitle>
            <CardDescription>
              {formatPrice(habitSavings.dailySavings)}/day
            </CardDescription>
          </div>
          <div className="flex gap-2 text-lg font-bold text-primary">
            {formatPrice(habitSavings.totalSavings)}
          </div>
        </div>
        <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
          <div
            className="bg-primary h-full rounded-full"
            style={{ width: `${habitSavings.percentageOfTotalOfAll}%` }}
          />
        </div>
      </CardHeader>
    </Card>
  );
};
