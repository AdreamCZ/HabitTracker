"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Target, Wallet, Trophy, Settings } from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/checkin", label: "Check-In", icon: Target },
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/savings", label: "Savings", icon: Wallet },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/settings", label: "Settings", icon: Settings },
];

export const MobileNavLinks = () => {
  const pathname = usePathname();

  return (
    <div className="flex justify-around items-center">
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-col items-center justify-center py-3 px-4 text-xs font-medium transition-colors",
              isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon className="w-6 h-6 mb-1" />
            <span>{label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export const DesktopNavLinks = () => {
  const pathname = usePathname();

  return (
    <div className="flex gap-8">
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-secondary",
            )}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </Link>
        );
      })}
    </div>
  );
};
