import React from "react";
import MarketHero from "@/components/market/components/MarketHero";
import TabsMarket from "@/components/market/components/TabsMarket";
import { getAllProductsStore, getCategoryStore, getStore } from "@/services/User-services/StoreForUsers/api";

interface MarketHomePageProps {
  params: {
    market: string;
  };
}

async function MarketHome({ params }: MarketHomePageProps) {
  const marketSlug = params.market;

  const [storeData, categories, allProducts] = await Promise.all([
    getStore(marketSlug),
    getCategoryStore(marketSlug),
    getAllProductsStore(marketSlug),
  ]);

  return (
    <div className="min-h-screen">
      <div className="pb-30 max-md:pb-20">
        <MarketHero store={storeData} />
      </div>
      <div className="container mx-auto px-4 max-md:px-3">
        <TabsMarket categories={categories} storeSlug={marketSlug} allProducts={allProducts} />
      </div>
    </div>
  );
}

export default MarketHome;