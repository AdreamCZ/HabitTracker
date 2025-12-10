import { Clock } from "lucide-react";

import { getNumberOfActiveHabits } from "@/app/modules/userHabit/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ActiveHabitsStatCard = async () => {
  const { success, habitCount } = await getNumberOfActiveHabits();

  if (!success || !habitCount) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Active Habits
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <p className="text-3xl font-bold text-blue-600">{habitCount}</p>
        <Clock className="w-12 h-12 text-blue-500/30" />
      </CardContent>
    </Card>
  );
};

export { ActiveHabitsStatCard };
