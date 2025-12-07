import { DollarSign } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTotalSavings } from "@/app/modules/userHabit/actions";

const TotalSavingsStatCard = async () => {
  const { success, totalSavings } = await getTotalSavings();

  if (!success || !totalSavings) {
    return null;
  }
  return (
    <Card className="bg-gradient-to-br from-accent/10 to-transparent border-accent/20">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Total Savings
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <p className="text-3xl font-bold text-accent">${totalSavings}</p>
        <DollarSign className="w-12 h-12 text-primary" />
      </CardContent>
    </Card>
  );
};

export { TotalSavingsStatCard };
