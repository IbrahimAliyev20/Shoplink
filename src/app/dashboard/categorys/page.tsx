
import ContractPage from '@/components/dashboard/contract/ContractPage';
import React from 'react';
import { Metadata } from "next";
import { CATEGORIES_META } from "@/utils/MetaTagsData";

export const metadata: Metadata = {
  title: CATEGORIES_META.title,
  description: CATEGORIES_META.meta_description,
  keywords: CATEGORIES_META.meta_keywords,
};

export default function Contracts() {
  return (
    <div className="space-y-6">
        <h1 className="text-3xl font-medium text-gray-900"> Kateqoriyalar</h1>

      <ContractPage />
  
    </div>
  );
}