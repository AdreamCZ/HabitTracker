import { resetStreaks } from "@/app/modules/userHabit/actions";

export const register = async () => {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    console.log("[Instrumentation] Registering cron job...");

    const scheduleNextRun = () => {
      const now = new Date();
      const nextRun = new Date(now);

      nextRun.setDate(now.getDate() + 1);
      nextRun.setHours(0, 5, 0, 0);

      const todayRun = new Date(now);
      todayRun.setHours(0, 5, 0, 0);

      let targetTime = nextRun;
      if (now < todayRun) {
        targetTime = todayRun;
      }

      const delay = targetTime.getTime() - now.getTime();
      console.log(
        `[Instrumentation] Next streak reset scheduled for: ${targetTime.toLocaleString()} (${targetTime.toISOString()}) (in ${Math.round(delay / 1000 / 60)} minutes)`,
      );

      setTimeout(() => {
        resetStreaks();
        scheduleNextRun();
      }, delay);
    };

    scheduleNextRun();
  }
};
