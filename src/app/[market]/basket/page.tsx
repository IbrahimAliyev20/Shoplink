import React from 'react'
import BasketPage from '@/components/market/basket/BasketPage'
import { MARKET_BASKET_META } from '@/utils/MetaTagsData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: MARKET_BASKET_META.title,
  description: MARKET_BASKET_META.meta_description,
  keywords: MARKET_BASKET_META.meta_keywords,
};

function Basket() {
  return (
    <div>
      <BasketPage />
    </div>
  )
}

export default Basket