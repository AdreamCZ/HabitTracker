import { ManageHabitsCard } from "@/app/(navbar)/(settings)/components/manage-habits/manage-habits-card";

import { ProfileSettingsCard } from "../components/profile-settings/profile-settings-card";

const SettingsPage = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <ProfileSettingsCard />
      <ManageHabitsCard />
    </>
  );
};

export default SettingsPage;
