"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import { Card } from "@/components/ui/card";

import {
  checkInHabit,
  removeCheckInHabit,
  type UserHabitWithDetails,
} from "../../../modules/userHabit/actions";

import { CheckinButton } from "./checkin-button";

type HabitCardProps = {
  userHabit: UserHabitWithDetails;
  badgeProgress: React.ReactNode;
};

export const HabitCard = ({ userHabit, badgeProgress }: HabitCardProps) => {
  const [streak, setStreak] = useState(userHabit.streak);
  const [lastCompleted, setLastCompleted] = useState(userHabit.lastCompleted);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckedInToday, setIsCheckedInToday] = useState(false);

  useEffect(() => {
    if (!lastCompleted) {
      setIsCheckedInToday(false);
      return;
    }
    const today = new Date();
    const last = new Date(lastCompleted);
    setIsCheckedInToday(
      today.getDate() === last.getDate() &&
        today.getMonth() === last.getMonth() &&
        today.getFullYear() === last.getFullYear(),
    );
  }, [lastCompleted]);

  const handleCheckIn = async () => {
    if (isLoading) return;

    if (!isCheckedInToday) {
      setIsLoading(true);
      try {
        const result = await checkInHabit(userHabit.id);
        if (result.success && result.newStreak !== undefined) {
          setStreak(result.newStreak);
          setLastCompleted(new Date().toISOString());
          toast.success("Checked in!");
        } else {
          toast.error(result.error ?? "Failed to check in");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred");
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(true);
      try {
        const result = await removeCheckInHabit(userHabit.id);
        if (result.success && result.newStreak !== undefined) {
          console.log(
            "removed cehck in",
            result.newStreak,
            " ",
            result.lastCompleted,
          );
          setStreak(result.newStreak);
          setLastCompleted(result.lastCompleted);
          toast.success("Removed check-in! :(");
        } else {
          toast.error(result.error ?? "Failed to remove check-in");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Generate a color based on the habit name or ID (consistent hashing)
  const colors = [
    "bg-blue-500",
    "bg-red-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-yellow-500",
    "bg-indigo-500",
    "bg-pink-500",
    "bg-teal-500",
  ];
  const colorIndex =
    userHabit.name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  const color = colors[colorIndex];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-4 h-4 rounded-full ${color}`} />
            <h3 className="text-xl font-bold text-foreground">
              {userHabit.name}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Last logged:{" "}
            {lastCompleted
              ? new Date(lastCompleted).toLocaleDateString("cs-CZ")
              : "Never"}
          </p>
        </div>

        <div className="text-center mr-4">
          <p className="text-4xl font-bold text-primary">{streak}</p>
          <p className="text-xs text-muted-foreground font-medium">
            day streak
          </p>
        </div>

        <CheckinButton
          checked={isCheckedInToday}
          onCheck={handleCheckIn}
          disabled={isLoading}
        />
      </div>

      <div className="mt-4 pt-4 border-t border-border">{badgeProgress}</div>
    </Card>
  );
};
