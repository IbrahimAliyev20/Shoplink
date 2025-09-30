"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import OrderDetails from "./OrderDetails";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getUserOrderQuery } from "@/services/User-services/orderforusers/queries"; 
import { StoreOrder } from "@/types"; 

function Orders() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const { data: orders, isLoading, isError } = useQuery(getUserOrderQuery());

  const getStatusText = (status: number) => {
    const statusMap: { [key: number]: string } = {
      0: "Gözləyir",
      1: "İşlənir",
      2: "Göndərilib",
      3: "Çatdırıldı",
      4: "Ləğv edilib",
    };
    return statusMap[status] || "Naməlum Status";
  };

  if (selectedOrderId) {
    return (
      <OrderDetails
        orderId={selectedOrderId}
        onBack={() => setSelectedOrderId(null)}
      />
    );
  }
  
  if (isLoading) {
    return <div>Sifarişlər yüklənir...</div>;
  }

  if (isError) {
    return <div>Sifarişləri yükləyərkən xəta baş verdi.</div>;
  }

  return (
    <div className="space-y-6 max-sm:space-y-4">
      <h1 className="text-2xl font-bold text-gray-900 max-sm:text-xl max-sm:font-semibold">
        Sifarişlərim
      </h1>
      
      {!orders || orders.length === 0 ? (
        <div className="text-center py-12 max-sm:py-8">
            <h3 className="text-xl font-medium text-gray-900 mb-2 max-sm:text-lg max-sm:mb-1">
              Hələ sifarişiniz yoxdur
            </h3>
        </div>
      ) : (
        <div className="space-y-4 max-sm:space-y-3">
          {orders.map((order: StoreOrder) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 max-sm:p-4"
            >
              <div className="flex items-start gap-4 max-sm:flex-col max-sm:gap-3">
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 max-sm:w-16 max-sm:h-16 max-sm:mx-auto">
                  <Image
                    width={80}
                    height={80}
                    src={"/marketimg/sport.png"} 
                    alt={order.detail[0]?.product || "Məhsul"}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex justify-between items-start max-sm:flex-col max-sm:gap-3 max-sm:w-full">
                  <div className="flex-1 max-sm:text-center max-sm:w-full">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 max-sm:text-base max-sm:mb-2">
                      {order.detail[0]?.product || "Məhsul adı"}
                    </h3>
                    <div className="space-y-1 text-sm text-gray-600 max-sm:text-xs max-sm:space-y-1">
                      <p className="max-sm:flex max-sm:justify-between">
                        <span>{order.detail.length} məhsul :</span>
                        <span className="max-sm:font-medium">{order.total_price} AZN</span>
                      </p>
                      <p className="max-sm:flex max-sm:justify-between">
                        <span>Sifariş ID :</span>
                        <span className="max-sm:font-medium">#{order.id}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3 max-sm:flex-row max-sm:justify-between max-sm:items-center max-sm:w-full">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600 max-sm:w-4 max-sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm font-medium text-gray-900 max-sm:text-xs">
                        {getStatusText(order.status)}
                      </span>
                    </div>
                    <Button 
                      onClick={() => setSelectedOrderId(order.id.toString())} 
                      className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm max-sm:px-3 max-sm:py-1.5 max-sm:text-xs max-sm:flex-1"
                    >
                      Sifariş detalları
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;