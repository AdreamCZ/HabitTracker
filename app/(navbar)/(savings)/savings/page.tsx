import { Suspense } from "react";

import {
  TotalSavedCard,
  TotalSavedCardSkeleton,
} from "@/app/(navbar)/(savings)/savings/components/total-saved-card/total-saved-card";
import {
  SavingsByHabitCard,
  SavingsByHabitCardSkeleton,
} from "@/app/(navbar)/(savings)/savings/components/savings-by-habit-card/savings-by-habit-card";
import {
  WhatYouCouldBuyCard,
  WhatYouCouldBuyCardSkeleton,
} from "@/app/(navbar)/(savings)/savings/components/what-you-could-buy-card/what-you-could-buy-card";

const SavingsPage = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Savings</h1>
      <Suspense fallback={<TotalSavedCardSkeleton />}>
        <TotalSavedCard />
      </Suspense>
      <Suspense fallback={<SavingsByHabitCardSkeleton />}>
        <SavingsByHabitCard />
      </Suspense>
      <Suspense fallback={<WhatYouCouldBuyCardSkeleton />}>
        <WhatYouCouldBuyCard />
      </Suspense>
    </>
  );
};

export default SavingsPage;
