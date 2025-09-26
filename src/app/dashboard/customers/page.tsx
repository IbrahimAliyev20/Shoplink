import ClientsPage from '@/components/dashboard/customers/ClientsPage';
import React from 'react';

export default function CustomersPage() {
  return (
    <div className="space-y-6">
     
        <h1 className="text-3xl font-medium text-gray-900">Müştərilər</h1>
    
      <ClientsPage />

    
    </div>
  );
}