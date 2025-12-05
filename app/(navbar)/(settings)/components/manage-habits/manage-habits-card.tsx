import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HabitsList } from "@/app/(navbar)/(settings)/components/manage-habits/habits-list/habits-list";
import { AddHabitSubCard } from "@/app/(navbar)/(settings)/components/manage-habits/add-habit-sub-card/add-habit-sub-card";

export const ManageHabitsCard = async () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Habits</CardTitle>
        <CardDescription>Update and delete your habits</CardDescription>
      </CardHeader>
      <CardContent>
        <AddHabitSubCard />
        <HabitsList />
      </CardContent>
    </Card>
  );
};
