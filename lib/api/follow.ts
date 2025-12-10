import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchFollowings = async (): Promise<string[]> => {
  const response = await fetch("/api/follow");

  if (!response.ok) {
    throw new Error("Failed to fetch followings");
  }

  const data = await response.json();
  return data.followingIds;
};

export const useFollowings = () => {
  return useQuery({
    queryKey: ["followings"],
    queryFn: fetchFollowings,
  });
};

type FollowResponse = {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };
};

const followUser = async (followingId: string): Promise<FollowResponse> => {
  const response = await fetch("/api/follow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ followingId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error ?? "Failed to follow user");
  }

  return response.json();
};

const unfollowUser = async (followingId: string): Promise<FollowResponse> => {
  const response = await fetch("/api/follow", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ followingId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error ?? "Failed to unfollow user");
  }

  return response.json();
};

export const useFollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: followUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["followings"] });
      queryClient.invalidateQueries({ queryKey: ["user-rank"] });
    },
  });
};

export const useUnfollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unfollowUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["followings"] });
      queryClient.invalidateQueries({ queryKey: ["user-rank"] });
    },
  });
};
