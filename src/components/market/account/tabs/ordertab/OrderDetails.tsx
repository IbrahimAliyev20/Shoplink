"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check } from "lucide-react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getSingleUserOrderQuery } from "@/services/User-services/orderforusers/queries"; // Bu yolu öz proyektinizə uyğun dəyişin

interface OrderDetailsProps {
  orderId?: string;
  onBack?: () => void;
}

function OrderDetails({ orderId, onBack }: OrderDetailsProps) {
  const { data: order, isLoading, isError } = useQuery(
    getSingleUserOrderQuery(orderId || "")
  );

  // Status nömrəsini mətnə çevirən funksiya
  const getStatusText = (status: number) => {
    const statusMap: { [key: number]: string } = {
      0: "Gözləyir", 1: "İşlənir", 2: "Göndərilib", 3: "Çatdırıldı", 4: "Ləğv edilib"
    };
    return statusMap[status] || "Naməlum";
  };
  
  if (isLoading) {
    return <div>Sifariş detalları yüklənir...</div>;
  }

  if (isError || !order) {
    return <div>Sifariş tapılmadı və ya xəta baş verdi.</div>;
  }

  return (
    <div className="space-y-6 max-sm:space-y-4">
      <div className="flex items-center gap-4 mb-8 max-sm:mb-6 max-sm:gap-3">
        <Button
          variant="ghost" size="sm" onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg max-sm:p-1.5"
        >
          <ArrowLeft className="w-5 h-5 max-sm:w-4 max-sm:h-4" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-900 max-sm:text-xl max-sm:font-semibold">
          Sifariş detalları
        </h1>
      </div>

      <div className="bg-white rounded-lg border p-6 max-sm:p-4">
        <div className="flex items-start gap-4 max-sm:flex-col max-sm:gap-3">
          <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 max-sm:w-20 max-sm:h-20 max-sm:mx-auto">
            <Image
              src="/marketimg/sport.png" // Statik şəkil
              alt={order.detail[0]?.product || "Məhsul"}
              width={96} height={96}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 max-sm:text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-1 max-sm:text-lg max-sm:mb-2">
              {order.detail[0]?.product || "Məhsul adı"}
            </h2>
            <div className="grid grid-cols-3 gap-8 text-sm max-sm:grid-cols-1 max-sm:gap-2 max-sm:space-y-1">
              <div className="max-sm:flex max-sm:justify-between">
                <span className="text-gray-600">{order.detail.length} məhsul :</span>
                <span className="ml-2 font-medium max-sm:ml-0">{order.total_price} AZN</span>
              </div>
              {/* Tarix yoxdur */}
              <div className="max-sm:flex max-sm:justify-between">
                <span className="text-gray-600">Sifariş ID :</span>
                <span className="ml-2 font-medium max-sm:ml-0">#{order.id}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-4 max-sm:flex-row max-sm:justify-between max-sm:items-center max-sm:w-full max-sm:gap-3">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600 max-sm:w-4 max-sm:h-4" />
              <span className="text-sm font-medium text-gray-900 max-sm:text-xs">
                {getStatusText(order.status)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-6 max-sm:p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 max-sm:text-base max-sm:mb-3">
          Çatdırılma Ünvanı
        </h3>
        <div className="space-y-2 text-gray-700 max-sm:space-y-1">
          <p className="font-medium max-sm:text-sm">{order.city}</p>
          <p className="max-sm:text-sm">{order.address}</p>
          <p className="max-sm:text-sm">{order.name}, {order.phone}</p>
        </div>
      </div>
      
      {/* Qeyd: API-də ödəniş detalları olmadığı üçün statik saxlanılıb */}
      <div className="bg-white rounded-lg border p-6 max-sm:p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 max-sm:text-base max-sm:mb-4">
            Ödəniş Detalları
          </h3>
          <div className="flex justify-between items-center text-lg font-semibold max-sm:text-base">
            <span>Yekun qiymət</span>
            <span>{order.total_price} AZN</span>
          </div>
      </div>
    </div>
  );
}

export default OrderDetails;