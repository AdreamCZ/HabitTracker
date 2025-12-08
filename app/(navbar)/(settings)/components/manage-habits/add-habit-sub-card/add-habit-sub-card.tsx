import { Card, CardContent } from "@/components/ui/card";
import { AddHabitForm } from "@/app/(navbar)/(settings)/components/manage-habits/add-habit-sub-card/add-habit-form";
import { getHabitsUserDoesNotHave } from "@/app/modules/userHabit/actions";

export const AddHabitSubCard = async () => {
  const habitsUserDoesNotHave = await getHabitsUserDoesNotHave();

  if (!habitsUserDoesNotHave.success) {
    throw new Error(habitsUserDoesNotHave.error);
  }

  return (
    <Card className="bg-gray-100">
      <CardContent className="p-3">
        <AddHabitForm habitsUserDoesNotHave={habitsUserDoesNotHave.data!} />
      </CardContent>
    </Card>
  );
};
