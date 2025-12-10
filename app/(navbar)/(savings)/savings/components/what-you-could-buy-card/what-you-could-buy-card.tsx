import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
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
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;
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

export const WhatYouCouldBuyCardSkeleton = () => {
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
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="p-4">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-16 mt-1" />
              <Skeleton className="h-3 w-28 mt-3" />
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
