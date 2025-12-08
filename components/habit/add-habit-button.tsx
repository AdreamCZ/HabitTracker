import { getHabitsUserDoesNotHave } from "@/app/modules/userHabit/actions";

import { AddHabitDialog } from "./add-habit-dialog";

export const AddHabitButton = async () => {
  const habitsUserDoesNotHave = await getHabitsUserDoesNotHave();

  if (!habitsUserDoesNotHave.success) {
    console.error(habitsUserDoesNotHave.error);
    return null;
  }

  return <AddHabitDialog habitsUserDoesNotHave={habitsUserDoesNotHave.data!} />;
};
