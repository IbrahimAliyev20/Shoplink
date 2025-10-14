import ClientsPage from '@/components/dashboard/customers/ClientsPage';
import React from 'react';
import { Metadata } from "next";
import { CUSTOMERS_META } from "@/utils/MetaTagsData";

export const metadata: Metadata = {
  title: CUSTOMERS_META.title,
  description: CUSTOMERS_META.meta_description,
  keywords: CUSTOMERS_META.meta_keywords,
};

export default function CustomersPage() {
  return (
    <div className="space-y-6">
     
        <h1 className="text-3xl font-medium text-gray-900">Müştərilər</h1>
    
      <ClientsPage />

    
    </div>
  );
}