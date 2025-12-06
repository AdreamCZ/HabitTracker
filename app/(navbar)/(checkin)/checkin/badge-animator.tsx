"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

type BadgeAnimatorProps = {
  children: React.ReactNode;
  badgeName: string | undefined;
  streak: number;
  enableConfetti?: boolean;
};

export const BadgeAnimator = ({
  children,
  badgeName,
  streak,
  enableConfetti = true,
}: BadgeAnimatorProps) => {
  const prevBadgeName = useRef<string | undefined>(badgeName);
  const prevStreak = useRef<number>(streak);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevBadgeName.current = badgeName;
      prevStreak.current = streak;
      return;
    }

    if (badgeName && badgeName !== prevBadgeName.current) {
      if (streak > prevStreak.current && enableConfetti) {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = {
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          zIndex: 0,
        };

        const randomInRange = (min: number, max: number) => {
          return Math.random() * (max - min) + min;
        };

        const interval: ReturnType<typeof setInterval> = setInterval(() => {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          });
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          });
        }, 250);
      }

      prevBadgeName.current = badgeName;
    }
    prevStreak.current = streak;
  }, [badgeName, streak, enableConfetti]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={badgeName}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="flex flex-col items-center gap-1"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
