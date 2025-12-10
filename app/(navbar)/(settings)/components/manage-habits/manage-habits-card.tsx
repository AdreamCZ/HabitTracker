import { Suspense } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  UserHabitsList,
  UserHabitsListSkeleton,
} from "@/app/(navbar)/(settings)/components/manage-habits/habits-list/user-habits-list";
import {
  AddHabitSubCard,
  AddHabitSubCardSkeleton,
} from "@/app/(navbar)/(settings)/components/manage-habits/add-habit-sub-card/add-habit-sub-card";

export const ManageHabitsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Habits</CardTitle>
        <CardDescription>Update and delete your habits</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<AddHabitSubCardSkeleton />}>
          <AddHabitSubCard />
        </Suspense>
        <Suspense fallback={<UserHabitsListSkeleton />}>
          <UserHabitsList />
        </Suspense>
      </CardContent>
    </Card>
  );
};
