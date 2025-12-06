"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

type AnimatedProgressBarProps = {
  progress: number;
  streak: number;
};

export const AnimatedProgressBar = ({
  progress,
  streak,
}: AnimatedProgressBarProps) => {
  const controls = useAnimation();
  const prevProgress = useRef(progress);
  const prevStreak = useRef(streak);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const animate = async () => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        controls.set({ width: `${progress}%` });
        prevProgress.current = progress;
        prevStreak.current = streak;
        return;
      }

      if (streak > prevStreak.current && progress < prevProgress.current) {
        // If streak increased and progress wrapped around (went from high to low)
        await controls.start({
          width: "100%",
          transition: { duration: 0.5, ease: "easeOut" },
        });

        controls.set({ width: "0%" });

        await controls.start({
          width: `${progress}%`,
          transition: { duration: 0.5, ease: "easeOut" },
        });
      } else if (
        streak < prevStreak.current &&
        progress > prevProgress.current
      ) {
        // If streak decreased and progress wrapped around (went from low to high)
        await controls.start({
          width: "0%",
          transition: { duration: 0.5, ease: "easeOut" },
        });

        controls.set({ width: "100%" });

        await controls.start({
          width: `${progress}%`,
          transition: { duration: 0.5, ease: "easeOut" },
        });
      } else {
        // If streak and progress both increased or both decreased
        controls.start({
          width: `${progress}%`,
          transition: { duration: 0.5, ease: "easeOut" },
        });
      }

      prevProgress.current = progress;
      prevStreak.current = streak;
    };

    animate();
  }, [progress, streak, controls]);

  return (
    <motion.div
      className="bg-primary h-full rounded-full"
      animate={controls}
      initial={{ width: `${progress}%` }}
    />
  );
};
