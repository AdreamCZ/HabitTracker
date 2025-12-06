import { Skeleton } from "@/components/ui/skeleton";
import { BadgeIcon } from "@/components/ui/badgeIcon";

import { getBadgeProgress } from "../modules/badge/actions";

import { BadgeAnimator } from "./badge-animator";
import { AnimatedProgressBar } from "./animated-progress-bar";

export const BadgeProgress = async ({ streak }: { streak: number }) => {
  const { current, next } = await getBadgeProgress(streak);

  //const currentThreshold = current?.streak ?? 0;
  const nextThreshold = next?.streak ?? 99999;
  const progress = Math.min(
    100,
    Math.max(
      5,
      //((streak - currentThreshold) / (nextThreshold - currentThreshold)) * 100,
      (streak / nextThreshold) * 100,
    ),
  );

  return (
    <div className="mt-2 pt-2">
      <div className="flex items-center justify-between mb-3">
        <BadgeAnimator badgeName={current?.name} streak={streak}>
          {current && (
            <BadgeIcon name={current.icon} className="text-3xl mb-1" />
          )}
          <p className="text-xs font-medium text-muted-foreground">
            {current?.name ?? ""}
          </p>
        </BadgeAnimator>
        <div className="flex-1 mx-4 h-1 bg-secondary rounded-full overflow-hidden">
          <AnimatedProgressBar progress={progress} streak={streak} />
        </div>
        <BadgeAnimator
          badgeName={next?.name}
          streak={streak}
          enableConfetti={false}
        >
          <div className="flex flex-col items-center gap-1">
            {next && (
              <BadgeIcon
                name={next.icon}
                className="text-2xl opacity-40 mb-1"
              />
            )}
            <p className="text-xs font-medium text-muted-foreground">
              {nextThreshold - streak}d away
            </p>
          </div>
        </BadgeAnimator>
      </div>
    </div>
  );
};

export const BadgeProgressSkeleton = () => {
  return (
    <div className="mt-2 pt-2">
      <div className="flex items-center justify-between mb-3">
        <div className="flex flex-col items-center gap-1">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-3 w-16" />
        </div>
        <div className="flex-1 mx-4">
          <Skeleton className="h-1 w-full rounded-full" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <Skeleton className="h-8 w-8 rounded-full opacity-40" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  );
};
