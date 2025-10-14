import React from "react";
import MarketHero from "@/components/market/components/MarketHero";
import TabsMarket from "@/components/market/components/TabsMarket";
import { getAllProductsStore, getCategoryStore, getStore } from "@/services/User-services/StoreForUsers/api";
import Link from "next/link";
import { Metadata } from "next";
import { MARKET_META } from "@/utils/MetaTagsData";

export async function generateMetadata({ params }: MarketHomePageProps): Promise<Metadata> {
  const { market: marketSlug } = await params;
  
  try {
    const storeData = await getStore(marketSlug);
    
    return {
      title: `Shoplink - ${storeData.name}`,
      description: `${storeData.name} mağazasında keyfiyyətli məhsulları kəşf edin. Geniş çeşid və rahat alış-veriş təcrübəsi.`,
      keywords: `shoplink, ${storeData.name}, mağaza, məhsullar, alış-veriş, keyfiyyətli, çeşid`,
    };
  } catch (error) {
    console.error('Error loading store data for metadata:', error);
    
    return {
      title: MARKET_META.title,
      description: MARKET_META.meta_description,
      keywords: MARKET_META.meta_keywords,
    };
  }
}

interface MarketHomePageProps {
  params: Promise<{
    market: string;
  }>;
}

async function MarketHome({ params }: MarketHomePageProps) {
  const { market: marketSlug } = await params;
  

  try {
    const [storeData, categories] = await Promise.all([
      getStore(marketSlug),
      getCategoryStore(marketSlug),
      getAllProductsStore(marketSlug),
    ]);

    return (
      <div className="min-h-screen">
        <div className="pb-30 max-md:pb-20">
          <MarketHero store={storeData} />
        </div>
        <h2 className=' container mx-auto px-4 max-md:px-3 text-2xl md:text-3xl font-medium text-black max-md:text-xl mb-6'>{storeData.name}</h2>

        <div className="container mx-auto px-4 max-md:px-3">
          <TabsMarket categories={categories} storeSlug={marketSlug} />
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
          <Link 
            href="/" 
            className="bg-[#E23359] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#E23359]/90 transition-colors"
          >
            Ana səhifəyə qayıt
          </Link>
        </div>
      </div>
    );
  }
}

export default MarketHome;