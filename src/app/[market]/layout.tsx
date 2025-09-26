import ClientLayoutMarket from "@/components/market/navigation/clientLayout";
import React from "react";




export default async function MarketLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
        <div className="">
          <ClientLayoutMarket>
            {children}
            </ClientLayoutMarket>
          </div>
  );
}
