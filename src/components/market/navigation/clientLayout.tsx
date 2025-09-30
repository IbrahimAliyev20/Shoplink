"use client";

import { useParams, usePathname } from "next/navigation";
import Footer from "./footer";
import Header from "./header";

export default function ClientLayoutMarket({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const marketSlug = useParams().market;

  const isHomePage = 
  pathname === `/${marketSlug}/login` || pathname === `/${marketSlug}/register`

  return (
    <>
      {!isHomePage && <Header marketSlug={marketSlug as string} />}

      <main>{children}</main>

      {!isHomePage && <Footer marketSlug={marketSlug as string} />}
    </>
  );
}
