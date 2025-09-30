"use client"
import { getShowClientQuery } from '@/services/Seller-services/clients/queries'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import React, { useState } from 'react' 
import FeedBack from '@/components/dashboard/customers/FeedBack'


function PreviewClient() {
    const { id } = useParams()
    const { data } = useQuery(getShowClientQuery(id as string))

    return (
        <div className="bg-white p-6 sm:p-8 rounded-lg font-sans w-full">
            <div className='max-w-3xl mx-start'>
                <div className=" pb-6 mb-6 border-b border-gray-200">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        {data?.name}
                    </h1>
                </div>

                <div className="space-y-10">
                    <section>
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Şəxsi məlumatlar
                        </h2>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between py-1">
                                <p className="text-sm text-gray-500">Ad,soyad</p>
                                <p className="text-sm font-medium text-gray-900">{data?.name || 'Aysun Feyzullayeva'}</p>
                            </div>
                            <div className="flex items-center justify-between py-1">
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="text-sm font-medium text-gray-900">{data?.email || 'aysunfeyzullayeva@gmail.com'}</p>
                            </div>
                            <div className="flex items-center justify-between py-1">
                                <p className="text-sm text-gray-500">Telefon nömrəsi</p>
                                <p className="text-sm font-medium text-gray-900">{data?.phone || '+994 70 777 70 77'}</p>
                            </div>
                            <div className="flex items-center justify-between py-1">
                                <p className="text-sm text-gray-500">Ümumi sifariş sayı</p>
                                <p className="text-sm font-medium text-gray-900">{data?.order_count || 48}</p>
                            </div>
                            <div className="flex items-center justify-between py-1">
                                <p className="text-sm text-gray-500">Tarix</p>
                                <p className="text-sm font-medium text-gray-900">1 oktyabr 2025</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Ünvan məlumatları
                        </h2>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between py-1">
                                <p className="text-sm text-gray-500">Ölkə</p>
                                <p className="text-sm font-medium text-gray-900">Azərbaycan</p>
                            </div>
                            <div className="flex items-center justify-between py-1">
                                <p className="text-sm text-gray-500">Bölgə</p>
                                <p className="text-sm font-medium text-gray-900">Bakı</p>
                            </div>
                            <div className="flex items-center justify-between py-1">
                                <p className="text-sm text-gray-500">Ünvan başlığı</p>
                                <p className="text-sm font-medium text-gray-900">Ev Ünvanı</p>
                            </div>
                            <div className="flex items-center justify-between py-1">
                                <p className="text-sm text-gray-500">Poçt kodu</p>
                                <p className="text-sm font-medium text-gray-900">AZ1011</p>
                            </div>
                        </div>
                    </section>
                 <FeedBack user_id={id as string} />
                </div>
            </div>
        </div>
    )
}

export default PreviewClient;