import { getSavingsByHabit } from "@/app/modules/userHabit/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HabitSavingsSubCard } from "@/app/(navbar)/(savings)/savings/components/savings-by-habit-card/habit-savings-sub-card";

export const SavingsByHabitCard = async () => {
  const userHabitsBySavingsResponse = await getSavingsByHabit();

  if (!userHabitsBySavingsResponse.success) {
    throw new Error(userHabitsBySavingsResponse.error);
  }

  const userHabitsBySavings = userHabitsBySavingsResponse.data!;

  return (
    <Card>
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
