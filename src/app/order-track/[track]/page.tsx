"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import getTrackNumberOptions from "@/services/TruckNumber/queries";
import { TrackNumber } from "@/types/home/hometypes";

const OrderSummaryView = ({ order, onShowDetails }: { order: TrackNumber, onShowDetails: () => void }) => {
    const mainProduct = order.detail[0];

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between gap-6 flex-wrap">
                <div className="flex items-center gap-6 flex-1 min-w-[300px]">
                    <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-1">
                            Sifariş nömrəsi: <span className="font-semibold text-gray-900">#{order.id}</span>
                        </p>
                        <h2 className="text-lg font-medium text-gray-900 mb-2">
                            {mainProduct.product}
                            {order.detail.length > 1 && ` (+${order.detail.length - 1} digər)`}
                        </h2>
                        <p className="text-xl font-medium text-gray-900">{order.total_price} AZN</p>
                    </div>
                </div>
                <button
                    onClick={onShowDetails}
                    className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-3 rounded-lg flex items-center gap-2 whitespace-nowrap"
                >
                    Sifariş statusuna baxın
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

const OrderDetailView = ({ order }: { order: TrackNumber }) => {
    const STATUSES = [
        { id: 0, title: "Sifariş təsdiqləndi" },
        { id: 1, title: "Sifariş hazırlanır" },
        { id: 2, title: "Sifariş yoldadır" },
        { id: 3, title: "Sifariş çatdırıldı" },
    ];
    const currentStatusId = order.status;

    return (
        <>
            <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                    <h1 className="text-xl font-medium text-gray-900">Sifariş nömrəsi: <span className="font-semibold">#{order.id}</span></h1>
                    <p className="text-gray-600">Sifariş tarixi: <span className="text-gray-900">--.--.----</span></p>
                </div>
                <div className="space-y-2 text-gray-700">
                    <p><span className="font-medium">Sifarişi verən:</span> {order.name}</p>
                    <p><span className="font-medium">Çatdırılma ünvanı:</span> {order.address}, {order.city}</p>
                    <p><span className="font-medium">Sifariş xülasəsi:</span> {order.detail.length} məhsul</p>
                </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="text-xl font-medium text-gray-900 mb-8">Sifarişin izlənilməsi</h2>
                <div className="flex items-center justify-between">
                    {STATUSES.map((status, index) => (
                        <React.Fragment key={status.id}>
                            <div className="flex flex-col items-center text-center w-1/4">
                                <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-full ${currentStatusId >= status.id ? "bg-green-500" : "border-2 border-gray-300 bg-white"}`}>
                                    {currentStatusId >= status.id ? <Check className="h-5 w-5 text-white" /> : <span className="font-medium text-gray-400">{index + 1}</span>}
                                </div>
                                <p className={`text-sm font-medium ${currentStatusId >= status.id ? "text-gray-900" : "text-gray-500"}`}>{status.title}</p>
                            </div>
                            {index < STATUSES.length - 1 && <div className={`h-px flex-1 ${currentStatusId > index ? "bg-green-500" : "bg-gray-300"}`} />}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-medium text-gray-900">Ödəniş detalları</h2>
                <div className="space-y-4">
                    <div className="flex justify-between text-gray-700">
                        <span>Ümumi Məbləğ</span>
                        <span className="font-medium">{order.total_price} AZN</span>
                    </div>
                    {order.promocode && (
                         <div className="flex justify-between text-green-600">
                            <span>Endirim ({order.promocode})</span>
                            <span className="font-medium">- 0 AZN</span>
                        </div>
                    )}
                    <div className="flex justify-between text-gray-700">
                        <span>Çatdırılma</span>
                        <span className="font-medium">0 AZN</span>
                    </div>
                    <div className="border-t pt-4">
                        <div className="flex justify-between text-lg">
                            <span className="font-medium text-gray-900">Toplam</span>
                            <span className="font-semibold text-gray-900">{order.total_price} AZN</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default function OrderTrackPage() {
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