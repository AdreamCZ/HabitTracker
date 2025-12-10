import { Suspense } from "react";

import { ManageHabitsCard } from "@/app/(navbar)/(settings)/components/manage-habits/manage-habits-card";

import {
  ProfileSettingsCard,
  ProfileSettingsCardSkeleton,
} from "../components/profile-settings/profile-settings-card";

const SettingsPage = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <Suspense fallback={<ProfileSettingsCardSkeleton />}>
        <ProfileSettingsCard />
      </Suspense>
      <ManageHabitsCard />
    </>
  );
};

export default SettingsPage;
