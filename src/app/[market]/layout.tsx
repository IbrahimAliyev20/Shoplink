import ClientLayoutMarket from "@/components/market/navigation/clientLayout";
import { CartProvider } from "@/contexts/CartContext";
import React from "react";




export default async function MarketLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
        <div className="">
          <CartProvider>
            <ClientLayoutMarket>
              {children}
            </ClientLayoutMarket>
          </CartProvider>
        </div>
  );
}
