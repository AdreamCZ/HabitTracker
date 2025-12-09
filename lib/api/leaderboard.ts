import { useQuery } from "@tanstack/react-query";

import { type SortBy, type LeaderBoardPosition } from "@/types";

import { useSession } from "../auth/client";

export const useUserRank = ({
  selectedHabit,
  sortBy,
  followingOnly,
}: {
  selectedHabit: string;
  sortBy: SortBy;
  followingOnly: boolean;
}) => {
  const { data: session, isPending: sessionLoading } = useSession();
  const userId = session?.user?.id;

  return useQuery<LeaderBoardPosition>({
    queryKey: ["user-rank", userId, selectedHabit, sortBy, followingOnly],
    queryFn: async () => {
      const response = await fetch(
        `/api/leaderboard/position?habit=${selectedHabit}&sortBy=${sortBy}&followingOnly=${followingOnly}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user rank");
      }

      return response.json();
    },
    enabled: !!userId && !sessionLoading,
  });
};
