import React from "react";
import MarketHero from "@/components/market/components/MarketHero";
import TabsMarket from "@/components/market/components/TabsMarket";
import { getAllProductsStore, getCategoryStore, getStore } from "@/services/User-services/StoreForUsers/api";

interface MarketHomePageProps {
  params: Promise<{
    market: string;
  }>;
}

async function MarketHome({ params }: MarketHomePageProps) {
  const { market: marketSlug } = await params;

  try {
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
  } catch (error) {
    console.error('Error loading market data:', error);
    
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            Mağaza yüklənə bilmədi
          </h1>
          <p className="text-gray-600 mb-6">
            Bu mağaza mövcud deyil və ya serverə bağlantı problemi var.
          </p>
          <a 
            href="/" 
            className="bg-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors"
          >
            Ana səhifəyə qayıt
          </a>
        </div>
      </div>
    );
  }
}

export default MarketHome;