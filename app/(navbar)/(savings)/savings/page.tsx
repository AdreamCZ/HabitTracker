import { TotalSavedCard } from "@/app/(navbar)/(savings)/savings/components/total-saved-card/total-saved-card";
import { SavingsByHabitCard } from "@/app/(navbar)/(savings)/savings/components/savings-by-habit-card/savings-by-habit-card";
import { WhatYouCouldBuyCard } from "@/app/(navbar)/(savings)/savings/components/what-you-could-buy-card/what-you-could-buy-card";

const SavingsPage = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Savings</h1>
      <TotalSavedCard />
      <SavingsByHabitCard />
      <WhatYouCouldBuyCard />
    </>
  );
};

export default SavingsPage;
