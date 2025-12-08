"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { signOut } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";

const SignOutButton = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
      toast.success("Signed out successfully");
    } catch {
      toast.error("Failed to sign out. Please try again.");
    }
  };
  return (
    <Button variant="outline" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
};

export { SignOutButton };
