import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { type LeaderBoardPosition } from "@/types";

type UserRankCardProps = {
  currentUserRank: LeaderBoardPosition;
  amongFriends?: boolean;
};

export const UserRankCard = ({
  currentUserRank,
  amongFriends,
}: UserRankCardProps) => {
  if (!currentUserRank) return null;

  return (
    <Card className="bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30 mb-4">
      <CardHeader className="pb-2">
        <p className="text-sm text-muted-foreground">
          Your Current Rank{amongFriends && " among friends"}
        </p>
        <CardTitle className="text-3xl text-primary">
          #{currentUserRank.position}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0 text-right">
        <p className="text-2xl font-bold text-accent">
          {currentUserRank.value} days
        </p>
      </CardContent>
    </Card>
  );
};
