'use client';

import ContractPage from '@/components/dashboard/contract/ContractPage';
import React from 'react';

export default function Contracts() {
  return (
    <div className="space-y-6">
        <h1 className="text-3xl font-medium text-gray-900">Anlayışlar</h1>

      <ContractPage />
  
    </div>
  );
}