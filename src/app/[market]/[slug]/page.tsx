
import SingleProductPage from '@/components/market/components/SingleMarketPage';
import React from 'react';
import { Metadata } from "next";
import { MARKET_PRODUCT_META } from "@/utils/MetaTagsData";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: MARKET_PRODUCT_META.title,
    description: MARKET_PRODUCT_META.meta_description,
    keywords: MARKET_PRODUCT_META.meta_keywords,
  };
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