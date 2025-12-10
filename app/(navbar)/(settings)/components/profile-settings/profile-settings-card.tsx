import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getSession } from "@/lib/auth/session";
import { UserUpdateForm } from "@/app/(navbar)/(settings)/components/profile-settings/user-update-form/user-update-form";

export const ProfileSettingsCard = async () => {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("User is not authenticated");
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

export const ProfileSettingsCardSkeleton = () => {
  return (
    <Card className="mb-10">
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>
          Manage your account information and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-28" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
