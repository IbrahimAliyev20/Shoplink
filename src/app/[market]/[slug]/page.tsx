
import SingleProductPage from '@/components/market/components/SingleMarketPage';
import React from 'react';
import { Metadata } from "next";
import { MARKET_PRODUCT_META } from "@/utils/MetaTagsData";
import { getProductSingle } from "@/services/User-services/StoreForUsers/api";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const product = await getProductSingle(slug);
    
    return {
      title: `Shoplink - ${product.name}`,
      description: `${product.name} məhsulu haqqında ətraflı məlumat əldə edin. Təsvir, qiymət və xüsusiyyətlər.`,
      keywords: `shoplink, ${product.name}, məhsul, product, təsvir, qiymət, xüsusiyyətlər, ətraflı`,
    };
  } catch (error) {
    console.error('Error loading product data for metadata:', error);
    
    return {
      title: MARKET_PRODUCT_META.title,
      description: MARKET_PRODUCT_META.meta_description,
      keywords: MARKET_PRODUCT_META.meta_keywords,
    };
  }
}

const SingleProduct = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return (
    <div className='container mx-auto px-4 max-md:px-3'>
      <SingleProductPage slug={slug} />
    </div>
  );
};

export default SingleProduct;