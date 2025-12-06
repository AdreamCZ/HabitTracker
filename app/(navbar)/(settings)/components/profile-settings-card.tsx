import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserUpdateForm } from "@/app/(navbar)/(settings)/components/user-update-form";
import { getSession } from "@/lib/auth/session";

export const ProfileSettingsCard = async () => {
  const session = await getSession();

  if (!session?.user) {
    return null;
  }

  return (
    <Card>
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
