import { UserHabitItemSubCard } from "@/app/(navbar)/(settings)/components/manage-habits/habits-list/user-habit-item-sub-card";
import { getUserHabits } from "@/app/modules/userHabit/actions";

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
