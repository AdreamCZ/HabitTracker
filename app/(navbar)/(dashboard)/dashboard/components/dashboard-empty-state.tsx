import Link from "next/link";
import { PlusCircle, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const DashboardEmptyState = () => {
  return (
    <Card className="border-dashed border-2">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center space-y-4">
        <div className="p-4 mb-2">
          <Sparkles className="w-8 h-8 text-primary animate-pulse" />
        </div>

        <div className="space-y-2 max-w-sm">
          <h3 className="text-xl font-semibold">Start your journey today</h3>
          <p className="text-muted-foreground text-sm">
            You haven&apos;t tracked any habits yet. Add your first habit to
            start building a stronger you.
          </p>
        </div>

        <div className="pt-4">
          <Button asChild size="lg">
            <Link href="/checkin">
              <PlusCircle className="w-4 h-4" />
              Add First Habit
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export { DashboardEmptyState };
