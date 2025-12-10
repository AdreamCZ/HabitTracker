import { UserHabitItemSubCard } from "@/app/(navbar)/(settings)/components/manage-habits/habits-list/user-habit-item-sub-card";
import { getUserHabits } from "@/app/modules/userHabit/actions";
import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const UserHabitsList = async () => {
  const userHabitsResponse = await getUserHabits();

  if (!userHabitsResponse.success) {
    throw new Error(userHabitsResponse.error);
  }

  const userHabits = userHabitsResponse.data!;

  return (
    <div className="space-y-4 mt-6">
      {userHabits.map((habit) => (
        <UserHabitItemSubCard item={habit} key={habit.id} />
      ))}
    </div>
  );
};

export const UserHabitsListSkeleton = () => {
  return (
    <div className="space-y-4 mt-6">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-9 w-9" />
                <Skeleton className="h-9 w-9" />
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};
