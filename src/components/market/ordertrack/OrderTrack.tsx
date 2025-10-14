"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ArrowRight, Check, Mail, Phone, Instagram, Send } from "lucide-react";
import getTrackNumberOptions from "@/services/TruckNumber/queries"; 
import { TrackNumber } from "@/types/home/hometypes"; 

const OrderSummaryView = ({ order, onShowDetails }: { order: TrackNumber, onShowDetails: () => void }) => {
    const mainProduct = order.detail[0];

    return (
        <div className="mx-auto max-w-4xl space-y-6">
            <div className=" mb-8">
                <h1 className="text-3xl font-medium text-gray-900 mb-2">Sifarişiniz üçün təşəkkürlər!</h1>
                <p className="text-gray-600">Hazırda sifarişiniz üzərində çalışırıq</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between gap-6 flex-wrap">
                    <div className="flex items-center gap-6 flex-1 min-w-[300px]">
                        <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Image 
                                src="/marketimg/sport.png" 
                                alt={mainProduct.product} 
                                width={96} 
                                height={96} 
                                className="object-contain" 
                            />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-600 mb-1">
                                Sifariş nömrəsi : <span className="font-semibold text-gray-900">#{order.id}</span>
                            </p>
                            <h2 className="text-lg font-medium text-gray-900 mb-2">
                                {mainProduct.product}
                            </h2>
                            <p className="text-xl font-semibold text-gray-900">{mainProduct.product_price} AZN</p>
                        </div>
                    </div>
                    <button
                        onClick={onShowDetails}
                        className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer"
                    >
                        Sifariş statusuna baxın
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
            <p className="text-sm text-gray-600 mb-6">
                Sifariş nömrəsi : <span className="font-semibold text-gray-900">BS{order.id}</span>
            </p>
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">
                    Hər hansı bir sualınız varsa bizimlə əlaqə saxlayın
                </h3>
                <div className="flex items-center flex-wrap gap-x-8 gap-y-4">
                    <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-gray-600" /><span className="text-gray-700">stridex@gmail.com</span></div>
                    <div className="flex items-center gap-3"><Phone className="w-5 h-5 text-gray-600" /><span className="text-gray-700">+994 700 70 77</span></div>
                    <div className="flex items-center gap-3"><span className="text-gray-700">Nizami rayonu ,M.Abbasov küçəsi</span></div>
                </div>
                <div className="flex gap-4 mt-6">
                    <button className="w-10 h-10 rounded-lg bg-pink-50 hover:bg-pink-100 flex items-center justify-center transition-colors cursor-pointer"><svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24"><path d="M9.198 21.5h4.158c3.218 0 5.424-2.206 5.424-5.424V7.924C18.78 4.706 16.574 2.5 13.356 2.5H9.198C5.98 2.5 3.774 4.706 3.774 7.924v8.152C3.774 19.294 5.98 21.5 9.198 21.5zM12 7.043c-2.73 0-4.957 2.227-4.957 4.957S9.27 16.957 12 16.957s4.957-2.227 4.957-4.957S14.73 7.043 12 7.043zm0 7.914c-1.633 0-2.957-1.324-2.957-2.957s1.324-2.957 2.957-2.957 2.957 1.324 2.957 2.957-1.324 2.957-2.957 2.957zm4.363-7.514c-.665 0-1.204-.54-1.204-1.204s.54-1.204 1.204-1.204 1.204.54 1.204 1.204-.539 1.204-1.204 1.204z"/></svg></button>
                    <button className="w-10 h-10 rounded-lg bg-pink-50 hover:bg-pink-100 flex items-center justify-center transition-colors cursor-pointer"><Instagram className="w-5 h-5 text-pink-500" /></button>
                    <button className="w-10 h-10 rounded-lg bg-pink-50 hover:bg-pink-100 flex items-center justify-center transition-colors cursor-pointer"><Send className="w-5 h-5 text-pink-500" /></button>
                </div>
            </div>
        </div>
    );
};


const OrderDetailView = ({ order }: { order: TrackNumber }) => {
    const STATUSES = [
        { id: 1, title: "Addım 1", subtitle: "Sifarişin təsdiqi" },
        { id: 2, title: "Addım 2", subtitle: "Sifarişin hazırlanılır" },
        { id: 3, title: "Addım 3", subtitle: "Sifarişiniz yoldadır" },
        { id: 4, title: "Addım 4", subtitle: "Sifarişiniz çatdırıldı" },
    ];
    const currentStatusId = order.status + 1;
    const currentDate = new Date().toLocaleDateString('az-AZ', { day: '2-digit', month: '2-digit', year: 'numeric' });

    return (
        <>
            <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                    <h1 className="text-xl font-medium text-gray-900">Sifariş nömrəsi : <span className="font-semibold">#{order.id}</span></h1>
                    <p className="text-gray-600">Sifariş tarixi : <span className="text-gray-900">{currentDate}</span></p>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                    <p><span className="font-medium">Sifarişi verən :</span> {order.name}</p>
                    <p><span className="font-medium">Çatdırılma ünvanı :</span> {order.address}</p>
                    <p><span className="font-medium">Sifariş xülasəsi :</span> {order.detail.length} məhsul</p>
                </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="text-xl font-medium text-gray-900 mb-8">Sifarişin izlənilməsi</h2>
                <p className="text-sm text-gray-600 mb-6">Çatdırılma nömrəsi : <span className="font-semibold text-gray-900">#{order.id}</span></p>
                <div className="flex items-start justify-between relative">
                    {STATUSES.map((status, index) => (
                        <React.Fragment key={status.id}>
                            <div className="flex flex-col items-center text-center" style={{ width: 'calc(25% - 12px)' }}>
                                <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full ${currentStatusId >= status.id ? "bg-green-500" : currentStatusId === status.id - 1 ? "border-4 border-green-500 bg-white" : "bg-gray-200"}`}>
                                    {currentStatusId > status.id ? (
                                        <Check className="h-6 w-6 text-white" />
                                    ) : (
                                        <span className={`text-lg font-semibold ${currentStatusId >= status.id ? "text-white" : "text-gray-500"}`}>{status.id}</span>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 mb-1">{status.title}</p>
                                <p className={`text-sm font-medium ${currentStatusId >= status.id ? "text-gray-900" : "text-gray-500"}`}>{status.subtitle}</p>
                            </div>
                            {index < STATUSES.length - 1 && (
                                <div className="flex-1 h-0.5 mt-6 mx-2" style={{backgroundColor: currentStatusId > status.id ? "#22c55e" : "#d1d5db"}} />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-medium text-gray-900">Ödəniş detalları</h2>
                <div className="space-y-3">
                    <div className="border-t pt-3 mt-3">
                        <div className="flex justify-between text-lg">
                            <span className="font-semibold text-gray-900">Toplam</span>
                            <span className="font-bold text-gray-900">{order.total_price} AZN</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default function OrderTrack() {
    const params = useParams();
    const trackNumber = params.track as string;
    const [showDetails, setShowDetails] = useState(false);

    const { data: order, isLoading, isError } = useQuery({
        ...getTrackNumberOptions(trackNumber),
        enabled: !!trackNumber,
    });

    if (isLoading) return <div className="text-center py-20">Sifariş məlumatları yüklənir...</div>;
    if (isError || !order) return <div className="text-center py-20 text-red-500">Bu nömrə ilə sifariş tapılmadı.</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="mx-auto max-w-4xl space-y-6">
                {!showDetails ? (
                    <OrderSummaryView order={order} onShowDetails={() => setShowDetails(true)} />
                ) : (
                    <OrderDetailView order={order} />
                )}
            </div>
        </div>
    );
}