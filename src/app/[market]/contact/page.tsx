import ContactMarketPage from "@/components/market/contact/ContactMarket";
import { getMetaTags } from "@/services/MetaTags/api";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const metaTags = await getMetaTags();
  return {
    title: metaTags?.data[2]?.title || "Shoplink",
    description: metaTags?.data[2]?.meta_description || "Shoplink",
    keywords: metaTags?.data[2]?.meta_keywords || "Shoplink",
  };
}

export default async function ContactMarket() {
  return (
    <div>
      <ContactMarketPage />
    </div>
  );
}
