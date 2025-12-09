import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRandomWhatYouCouldBuyItemsWithDetails } from "@/app/modules/whatYouCouldBuyItem/actions";
import { WhatYouCouldBuyItemSubCard } from "@/app/(navbar)/(savings)/savings/components/what-you-could-buy-card/what-you-could-buy-item-sub-card";

export const WhatYouCouldBuyCard = async () => {
  const whatYouCouldBuyItemsResponse =
    await getRandomWhatYouCouldBuyItemsWithDetails();

  if (!whatYouCouldBuyItemsResponse.success) {
    throw new Error(whatYouCouldBuyItemsResponse.error);
  }

  const whatYouCouldBuyItems = whatYouCouldBuyItemsResponse.data!;

  if (whatYouCouldBuyItems.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>What You Could Buy</CardTitle>
        <CardDescription>
          If you check in every day with your current habits, here&apos;s what
          you could afford
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {whatYouCouldBuyItems.map((item) => (
            <WhatYouCouldBuyItemSubCard item={item} key={item.id} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
