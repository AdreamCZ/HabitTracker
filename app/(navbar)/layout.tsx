import type { ReactNode } from "react";

import { Navbar } from "@/components/navbar/navbar";

const NavbarLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">{children}</div>
      </div>
    </>
  );
};

export default NavbarLayout;
