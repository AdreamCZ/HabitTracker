// TODO: Get habits from server
import { HabitItem } from "@/app/(navbar)/(settings)/components/manage-habits/habits-list/habit-item";

const HABITS = [
  { id: "smoking", name: "Smoking", dailyCosts: 121 },
  { id: "drinking", name: "Drinking", dailyCosts: 45 },
];

export const HabitsList = () => {
  return (
    <div className="space-y-4 mt-6">
      {HABITS.map((habit) => (
        <HabitItem key={habit.id} />
      ))}
    </div>
  );
};
