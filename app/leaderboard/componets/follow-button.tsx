"use client";

import { UserMinus, UserPlus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useFollowUser, useUnfollowUser } from "@/lib/api/follow";
import { useSession } from "@/lib/auth/client";

export const FollowButton = ({
  userId,
  userName,
  userEmail,
  isFollowing,
  isLoadingFollowings,
}: {
  userId: string;
  userName: string | null;
  userEmail: string;
  isFollowing: boolean;
  isLoadingFollowings: boolean;
}) => {
  const { data: session } = useSession();
  const followMutation = useFollowUser();
  const unfollowMutation = useUnfollowUser();

  const isOwnProfile = session?.user?.id === userId;

  const handleFollowToggle = () => {
    if (isFollowing) {
      unfollowMutation.mutate(userId, {
        onSuccess: (data) => {
          toast.success(
            data?.message || `Successfully unfollowed ${userName ?? userEmail}`,
          );
        },
        onError: () => {
          toast.error("Failed to unfollow user");
        },
      });
    } else {
      followMutation.mutate(userId, {
        onSuccess: (data) => {
          toast.success(
            data?.message || `Successfully followed ${userName ?? userEmail}`,
          );
        },
        onError: () => {
          toast.error("Failed to follow user");
        },
      });
    }
  };

  if (!session?.user || isOwnProfile) {
    return <div className="h-8" />;
  }

  return (
    <Button
      size="sm"
      variant={isFollowing ? "outline" : "default"}
      onClick={handleFollowToggle}
      disabled={
        isLoadingFollowings ||
        followMutation.isPending ||
        unfollowMutation.isPending
      }
    >
      {isFollowing ? (
        <>
          <UserMinus className="w-4 h-4 mr-1" />
          Unfollow
        </>
      ) : (
        <>
          <UserPlus className="w-4 h-4 mr-1" />
          Follow
        </>
      )}
    </Button>
  );
};
