"use server";
import { getAllBadgesCached } from "@/app/modules/badge/actions";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { type Badge } from "@/lib/db/schema/schema";
import { BadgeIcon } from "@/components/ui/badgeIcon";

export const BadgeMeaningsCard = async () => {
  const badges: Badge[] = await getAllBadgesCached();

  if (!badges || badges.length === 0) return null;

  return (
    <Card className="bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30 mb-4 mt-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl text-primary">Badge Meanings</CardTitle>
      </CardHeader>

      <CardContent className="pt-0 grid grid-cols-2 gap-4">
        {badges.map((badge) => (
          <div key={badge.id} className="flex items-center space-x-2">
            <BadgeIcon name={badge.icon} className="text-3xl mb-1" />
            <div>
              <p className="font-bold text-accent">{badge.name}</p>
              <p className="text-sm text-muted-foreground">
                {badge.streak}+ streak
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
