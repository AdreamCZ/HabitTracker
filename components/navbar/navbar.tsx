"use server";

import Link from "next/link";

import { MobileNavLinks, DesktopNavLinks } from "./navbar-client";

export const Navbar = async () => {
  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-card border-t border-border z-50">
        <MobileNavLinks />
      </nav>

      <nav className="hidden md:block bg-card border-b border-border sticky top-0 z-40 mb-8">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary">
              Legend
            </Link>
            <DesktopNavLinks />
          </div>
        </div>
      </nav>
    </>
  );
};
