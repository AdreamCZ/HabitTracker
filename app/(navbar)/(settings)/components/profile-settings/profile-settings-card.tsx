import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSession } from "@/lib/auth/session";
import { UserUpdateForm } from "@/app/(navbar)/(settings)/components/profile-settings/user-update-form/user-update-form";

export const ProfileSettingsCard = async () => {
  const session = await getSession();

  if (!session?.user) {
    return null;
  }

  return (
    <Card className="mb-10">
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>
          Manage your account information and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UserUpdateForm
          userId={session.user.id}
          defaultName={session.user.name}
          defaultEmail={session.user.email}
        />
      </CardContent>
    </Card>
  );
};
