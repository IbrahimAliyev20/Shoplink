'use client';

import PurchasePage from '@/components/dashboard/allproducts/purchase/PurchasePage';
import React from 'react';

export default function PurchaseOrdersPage() {
  return (
    <div className="space-y-6">
        <h1 className="text-3xl font-medium text-gray-900">Satınalma sifarişləri</h1>
      <PurchasePage />
    </div>
  );
}