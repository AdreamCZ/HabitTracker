import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
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

export const AddHabitSubCardSkeleton = () => {
  return (
    <Card className="bg-gray-100">
      <CardContent className="p-3">
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-24" />
        </div>
      </CardContent>
    </Card>
  );
};
