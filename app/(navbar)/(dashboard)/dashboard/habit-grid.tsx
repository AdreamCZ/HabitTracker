import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserHabits } from "@/app/modules/userHabit/actions";
import { DashboardEmptyState } from "@/app/(navbar)/(dashboard)/dashboard/components/dashboard-empty-state";

const HabitGrid = async () => {
  const { success, data: habits } = await getUserHabits();

  if (!success || !habits) {
    return null;
  }

  if (habits.length === 0) {
    return <DashboardEmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {habits.map((habit) => (
        <Card key={habit.id} className="bg-secondary border border-border">
          <CardHeader className="p-4">
            <CardTitle className="flex items-center gap-3">
              <p className="font-semibold text-foreground">{habit.name}</p>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between gap-3 border-t p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{habit.streak}</p>
              <p className="text-xs text-muted-foreground">day streak</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">
                ${habit.dailyCost === null ? 0 : habit.dailyCost * habit.streak}
              </p>
              <p className="text-xs text-muted-foreground">saved</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export { HabitGrid };
