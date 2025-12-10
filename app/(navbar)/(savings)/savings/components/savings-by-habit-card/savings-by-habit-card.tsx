import { getSavingsByHabit } from "@/app/modules/userHabit/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { HabitSavingsSubCard } from "@/app/(navbar)/(savings)/savings/components/savings-by-habit-card/habit-savings-sub-card";

export const SavingsByHabitCard = async () => {
  const userHabitsBySavingsResponse = await getSavingsByHabit();

  if (!userHabitsBySavingsResponse.success) {
    throw new Error(userHabitsBySavingsResponse.error);
  }

  const userHabitsBySavings = userHabitsBySavingsResponse.data!;

  if (userHabitsBySavings.length === 0) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;
  }

  return (
    <Card className="mb-10">
      <CardHeader>
        <CardTitle>Savings by Habit</CardTitle>
        <CardDescription>
          See which habits saved you most money.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {userHabitsBySavings.map((habitSavings) => (
            <HabitSavingsSubCard
              habitSavings={habitSavings}
              key={habitSavings.id}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const SavingsByHabitCardSkeleton = () => {
  return (
    <Card className="mb-10">
      <CardHeader>
        <CardTitle>Savings by Habit</CardTitle>
        <CardDescription>
          See which habits saved you most money.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-6 w-16" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
              </CardHeader>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
