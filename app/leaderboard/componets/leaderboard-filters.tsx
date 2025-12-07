"use client";

import { PillSelector } from "@/components/ui/pill-selector";
import { SortBy } from "@/types";

type LeaderboardFiltersProps = {
  habits: { id: string; name: string }[];
  selectedHabit: string;
  sortBy: SortBy;
  isPending: boolean;
  onHabitChange: (habitId: string) => void;
  onSortChange: (sortBy: SortBy) => void;
};

export const LeaderboardFilters = ({
  habits,
  selectedHabit,
  sortBy,
  isPending,
  onHabitChange,
  onSortChange,
}: LeaderboardFiltersProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 space-y-6">
      {/* Habit Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select Habit
        </label>
        <PillSelector
          options={habits.map((h) => ({ value: h.id, label: h.name }))}
          value={selectedHabit}
          onChange={onHabitChange}
          disabled={isPending}
        />
      </div>

      {/* Sort Toggle */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Sort By
        </label>
        <PillSelector
          options={[
            { value: SortBy.Streak as const, label: "🔥 Current Streak" },
            { value: SortBy.DaysCompleted as const, label: "📅 Total Days" },
          ]}
          value={sortBy}
          onChange={onSortChange}
          disabled={isPending}
        />
      </div>
    </div>
  );
};
