import { TrendingUp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLongestStreak } from "@/app/modules/userHabit/actions";

const LongestStreakStatCard = async () => {
  const { success, longestStreak } = await getLongestStreak();

  if (!success || !longestStreak) {
    return null;
  }
  return (
    <Card className="bg-gradient-to-br from-accent/10 to-transparent border-accent/20">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Longest Streak
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <p className="text-3xl font-bold text-accent">{longestStreak} days</p>
        <TrendingUp className="w-12 h-12 text-accent" />
      </CardContent>
    </Card>
  );
};

export { LongestStreakStatCard };
