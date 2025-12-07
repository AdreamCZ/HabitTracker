"use client";

import { Clock, DollarSign, TrendingUp } from "lucide-react";
import { redirect } from "next/navigation";

import { useSession } from "@/lib/auth/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const mockHabits = [
  { id: 1, name: "No Alcohol", streak: 127, goal: 10, total: 2540, icon: "🍷" },
  { id: 2, name: "No Smoking", streak: 45, goal: 10, total: 450, icon: "🚭" },
  {
    id: 3,
    name: "Exercise Daily",
    streak: 89,
    goal: 5,
    total: 445,
    icon: "💪",
  },
  {
    id: 4,
    name: "No Social Media",
    streak: 23,
    goal: 15,
    total: 115,
    icon: "📱",
  },
];

const DashboardPage = () => {
  const { data: session, isPending } = useSession();
  const totalSavings = mockHabits.reduce((sum, h) => sum + h.total, 0);
  const longestStreak = Math.max(...mockHabits.map((h) => h.streak));

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="px-4 md:px-6 py-8 space-y-8">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Welcome Back, {session.user.name}
        </h2>
        <p className="text-muted-foreground">
          You&apos;re building a stronger you, one day at a time
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

        <Card className="bg-gradient-to-br from-accent/10 to-transparent border-accent/20">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Longest Streak
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <p className="text-3xl font-bold text-accent">
              {longestStreak} days
            </p>
            <TrendingUp className="w-12 h-12 text-accent" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Habits
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <p className="text-3xl font-bold text-blue-600">
              {mockHabits.length}
            </p>
            <Clock className="w-12 h-12 text-blue-500/30" />
          </CardContent>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">
          Your Habits
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/*TODO - create a separate component for this*/}
          {mockHabits.map((habit) => (
            <Card key={habit.id} className="bg-secondary border border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span className="text-2xl">{habit.icon}</span>
                  <p className="font-semibold text-foreground">{habit.name}</p>
                </CardTitle>
                <CardDescription>Goal: {habit.goal}x per week</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between gap-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">
                    {habit.streak}
                  </p>
                  <p className="text-xs text-muted-foreground">day streak</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">
                    ${habit.total}
                  </p>
                  <p className="text-xs text-muted-foreground">saved</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Card>

      {/*TODO - create a separate component for this*/}
      <Card className="bg-green-50">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground italic text-center">
            &quot;Every day is a choice to be stronger than yesterday.
            You&apos;ve got this.&quot;
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default DashboardPage;
