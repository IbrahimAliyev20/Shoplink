'use client';
import React from 'react'
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getStoreOrderOptions } from '@/services/Seller-services/orderforseller/queries';

function PurchasePreviewPage() {
    const params = useParams();
    const { id } = params;
    const { data: storeOrder } = useQuery(getStoreOrderOptions(id as string));
  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg font-sans w-full">
    <div className='max-w-3xl mx-start'>
    

        <div className="space-y-10">
            <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Sifariş məlumatları
                </h2>
                <div className="space-y-3">
                    <div className="flex items-center justify-between py-1">
                        <p className="text-sm text-gray-500">Təchizatçı</p>
                        <p className="text-sm font-medium text-gray-900">{storeOrder?.name}</p>
                    </div>
                    <div className="flex items-center justify-between py-1">
                        <p className="text-sm text-gray-500">Sifarişin cəmi</p>
                        <p className="text-sm font-medium text-gray-900">{storeOrder?.total_price || 48}</p>
                    </div>
                    <div className="flex items-center justify-between py-1">
                        <p className="text-sm text-gray-500">Status</p>
                        <p className="text-sm font-medium text-gray-900">{storeOrder?.status || '1 oktyabr 2025'}</p>
                    </div>
                </div>
            </section>

        </div>
    </div>
</div>
  )
}

export default PurchasePreviewPage