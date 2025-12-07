// Shared TypeScript types

import { type Badge } from "@/lib/db/schema/schema";

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
};

export type LeaderBoardPosition = {
  position: number;
  total: number;
  value: number;
};

export enum SortBy {
  Streak = "streak",
  DaysCompleted = "daysCompleted",
}

export type FollowingFilter = "all" | "following";

export type LeaderboardEntry = {
  userId: string;
  userName: string | null;
  userEmail: string;
  userImage?: string | null;
  habitName: string;
  habitId: string;
  daysCompleted: number;
  streak: number;
  lastCompleted: string | null;
};

export type LeaderboardEntryWithBadge = LeaderboardEntry & {
  badge: Badge;
};

// Add more shared types as needed
