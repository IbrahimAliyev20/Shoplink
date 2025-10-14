import ProductsPage from '@/components/dashboard/allproducts/product/ProductsPage'
import React from 'react'
import { Metadata } from "next";
import { PRODUCTS_META } from "@/utils/MetaTagsData";

export const metadata: Metadata = {
  title: PRODUCTS_META.title,
  description: PRODUCTS_META.meta_description,
  keywords: PRODUCTS_META.meta_keywords,
};

const Products= () => {
  return (
    <div>
      <ProductsPage />
    </div>
  )
}

export default Products