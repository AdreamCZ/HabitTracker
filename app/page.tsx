import { Zap, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  MotivationBanner,
  MotivationBannerSkeleton,
} from "@/components/motivation/motivation-banner";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-5xl md:text-6xl font-bold text-primary">
            Legend
          </h1>
          <p className="text-lg text-muted-foreground">
            Build better habits, reclaim your life
          </p>
        </div>

        <Suspense fallback={<MotivationBannerSkeleton />}>
          <MotivationBanner />
        </Suspense>

        <Button
          asChild
          className="w-full h-14 text-lg font-semibold rounded-lg transition-all hover:shadow-lg"
        >
          <Link href="/login">Get Started</Link>
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          <Card className="p-6 bg-card/50">
            <div className="flex items-center justify-center mb-3">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Track Daily</h3>
            <p className="text-sm text-muted-foreground">
              Log your progress with simple daily check-ins
            </p>
          </Card>

          <Card className="p-6 bg-card/50">
            <div className="flex items-center justify-center mb-3">
              <TrendingUp className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-semibold mb-2">Watch Your Savings</h3>
            <p className="text-sm text-muted-foreground">
              See real money saved as you build your streak
            </p>
          </Card>

          <Card className="p-6 bg-card/50">
            <div className="flex items-center justify-center mb-3">
              <Users className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="font-semibold mb-2">Compete with Friends</h3>
            <p className="text-sm text-muted-foreground">
              Join leaderboards and motivate each other
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
