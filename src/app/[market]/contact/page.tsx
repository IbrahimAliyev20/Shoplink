import ContactMarketPage from "@/components/market/contact/ContactMarket";
import { Metadata } from "next";
import React from "react";
import { MARKET_CONTACT_META } from "@/utils/MetaTagsData";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: MARKET_CONTACT_META.title,
    description: MARKET_CONTACT_META.meta_description,
    keywords: MARKET_CONTACT_META.meta_keywords,
  };
}

export default async function ContactMarket() {
  return (
    <div>
      <ContactMarketPage />
    </div>
  );
}
