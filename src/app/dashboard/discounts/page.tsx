
import React from 'react'
import { Metadata } from "next";
import { DISCOUNTS_META } from "@/utils/MetaTagsData";

export const metadata: Metadata = {
  title: DISCOUNTS_META.title,
  description: DISCOUNTS_META.meta_description,
  keywords: DISCOUNTS_META.meta_keywords,
};;
import DiscountPage from '@/components/dashboard/discount/DiscountPage';

export default function Discounts() {
  return (
    <div className="space-y-6">
        <h1 className="text-3xl font-medium text-gray-900">Endirimler</h1>
       
        <DiscountPage />

    </div>
  );
}