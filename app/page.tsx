import Link from "next/link";

import { Button } from "@/components/ui/button";

const Home = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="text-center space-y-6">
      <h1 className="text-4xl font-bold mb-4">Habit Tracker</h1>
      <p className="text-muted-foreground text-lg">
        Build better habits, one day at a time
      </p>
      <div className="flex gap-4 justify-center">
        <Button asChild>
          <Link href="/register">Get Started</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/login">Sign In</Link>
        </Button>
      </div>
    </div>
  </div>
);

export default Home;
