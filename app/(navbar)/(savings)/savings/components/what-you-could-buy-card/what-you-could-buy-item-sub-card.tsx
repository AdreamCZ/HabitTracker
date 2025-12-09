import humanizeDuration from "humanize-duration";

import { type WhatYouCouldBuyItemWithDetails } from "@/app/modules/whatYouCouldBuyItem/actions";
import { Card } from "@/components/ui/card";
import { formatPrice } from "@/lib/formatting-utils";

type WhatYouCouldBuyItemSubCardProps = {
  item: WhatYouCouldBuyItemWithDetails;
};

export const WhatYouCouldBuyItemSubCard = ({
  item,
}: WhatYouCouldBuyItemSubCardProps) => {
  const humanizedLength = humanizeDuration(
    item.daysOfSaving * 24 * 60 * 60 * 1000,
    {
      largest: 2,
      round: true,
      delimiter: " and ",
      units: ["y", "mo", "d"],
    },
  );

  const lengthText = `${humanizedLength} of saving`;

  return (
    <Card className="p-4 border-border hover:border-[oklch(var(--primary)/0.5)] transition-all cursor-pointer">
      <p className="font-medium text-foreground">{item.name}</p>
      <p className="text-sm text-muted-foreground mt-1">
        {formatPrice(item.cost)}
      </p>
      <div className="mt-3 text-xs text-primary font-medium">{lengthText}</div>
    </Card>
  );
};
