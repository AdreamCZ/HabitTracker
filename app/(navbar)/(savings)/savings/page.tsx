import { TotalSavedCard } from "@/app/(navbar)/(savings)/savings/components/total-saved-card/total-saved-card";
import { SavingsByHabitCard } from "@/app/(navbar)/(savings)/savings/components/savings-by-habit-card/savings-by-habit-card";

const SavingsPage = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Savings</h1>
      <TotalSavedCard />
      <SavingsByHabitCard />
    </>
  );
};

export default SavingsPage;
