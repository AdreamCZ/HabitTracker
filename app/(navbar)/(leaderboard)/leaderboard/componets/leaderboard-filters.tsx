"use client";
import { useSession } from "@/lib/auth/client";
import { PillSelector } from "@/components/ui/pill-selector";
import { type FollowingFilter, SortBy } from "@/types";

type LeaderboardFiltersProps = {
  habits: { id: string; name: string }[];
  selectedHabit: string;
  sortBy: SortBy;
  followingOnly: boolean;
  isPending: boolean;
  onHabitChange: (habitId: string) => void;
  onSortChange: (sortBy: SortBy) => void;
  onFollowingOnlyChange: (followingOnly: boolean) => void;
};

export const LeaderboardFilters = ({
  habits,
  selectedHabit,
  sortBy,
  followingOnly,
  isPending,
  onHabitChange,
  onSortChange,
  onFollowingOnlyChange,
}: LeaderboardFiltersProps) => {
  const { data: session } = useSession();
  const followingFilterValue: FollowingFilter = followingOnly
    ? "following"
    : "all";

  const handleFollowingChange = (value: string) => {
    onFollowingOnlyChange(value === "following");
  };

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
            { value: SortBy.Streak, label: "🔥 Current Streak" },
            { value: SortBy.DaysCompleted, label: "📅 Total Days" },
          ]}
          value={sortBy}
          onChange={onSortChange}
          disabled={isPending}
        />
      </div>

      {/* Followings only */}
      {session && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Followings
          </label>
          <PillSelector
            options={[
              { value: "all" satisfies FollowingFilter, label: "All users" },
              {
                value: "following" satisfies FollowingFilter,
                label: "Following",
              },
            ]}
            value={followingFilterValue}
            onChange={handleFollowingChange}
            disabled={isPending}
          />
        </div>
      )}
    </div>
  );
};
