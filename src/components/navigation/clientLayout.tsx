"use client";

import { Header } from "./header";
import { Footer } from "./footer";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  console.log("Current Pathname:", pathname);

  const isHomePage = pathname === "/";

  return (
    <>
      {isHomePage && <Header />}

      <main>{children}</main>

      {isHomePage && <Footer />}
    </>
  );
}
