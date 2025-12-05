import { Suspense } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ProfileSettingsCard } from "../components/profile-settings-card";

const SettingsPage = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <Suspense
        fallback={
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Change profile details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="animate-pulse space-y-4">
                <div className="h-10 bg-gray-200 rounded" />
                <div className="h-10 bg-gray-200 rounded" />
              </div>
            </CardContent>
          </Card>
        }
      >
        <ProfileSettingsCard />
      </Suspense>
    </>
  );
};

export default SettingsPage;
