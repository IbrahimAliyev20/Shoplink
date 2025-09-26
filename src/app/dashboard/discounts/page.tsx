
import React from 'react';
import DiscountPage from '@/components/dashboard/discount/DiscountPage';

export default function Discounts() {
  return (
    <div className="space-y-6">
        <h1 className="text-3xl font-medium text-gray-900">Endirimler</h1>
       
        <DiscountPage />

    </div>
  );
}