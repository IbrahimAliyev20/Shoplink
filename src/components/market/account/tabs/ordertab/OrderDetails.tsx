"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getSingleUserOrderQuery } from "@/services/User-services/orderforusers/queries";
import StatusIcons from "@/components/dashboard/allproducts/purchase/StatusIcons";

interface OrderDetailsProps {
  orderId?: string;
  onBack?: () => void;
}

function OrderDetails({ orderId, onBack }: OrderDetailsProps) {
  const {
    data: order,
    isLoading,
    isError,
  } = useQuery(getSingleUserOrderQuery(orderId || ""));

  if (isLoading) {
    return <div>Sifariş detalları yüklənir...</div>;
  }

  if (isError || !order) {
    return <div>Sifariş tapılmadı və ya xəta baş verdi.</div>;
  }

  return (
    <div className="min-h-screen p-4 bg-white">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="p-2 hover:bg-gray-200 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-medium text-gray-900">
          Sifariş detalları
        </h1>
      </div>

      <div className="rounded-lg border border-[#F3F2F8]">
        <div className="p-6 border-b border-[#F3F2F8]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Məhsullar</h2>
            <div className="flex items-center gap-2 text-sm font-medium text-green-600">
              <StatusIcons status={order.status} />
            </div>
          </div>
          
          <div className="space-y-4">
            {order.detail && order.detail.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.product || "Məhsul"}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.product}</h3>
                  <p className="text-sm text-gray-600">{item.category || "Kateqoriya yoxdur"}</p>
                </div>
                
                <div className="text-right">
                  <p className="text-sm text-gray-600">Miqdar: {item.quantity}</p>
                  <p className="font-medium text-gray-900">{item.total_price} AZN</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 px-6 py-4">
          <p>
            Ümumi miqdar: {order.detail ? order.detail.reduce((total, item) => total + parseInt(item.quantity || "0"), 0) : 0} məhsul
          </p>
          <div className="flex items-center gap-6">
            <p>
              Ümumi qiymət: <span className="font-medium text-gray-900">{order.total_price} AZN</span>
            </p>
            <p>
              Sifariş ID: <span className="font-medium text-gray-900">{order.id}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className=" rounded-lg p-6 border border-[#F3F2F8]">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Çatdırılma Ünvanı
          </h3>
          <div className="space-y-1 text-gray-700">
            <p className="font-medium">{order.city}</p>
            <p>{order.address}</p>
          </div>
        </div>

        <div className=" rounded-lg p-6 border border-[#F3F2F8]">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Ödəniş Detalları
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Ödəmə üsulu</span>
              <span className="font-medium">Nəğd</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Ümumi Qiymət</span>
              <span className="font-medium">{order.total_price} AZN</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Çatdırılma</span>
              <span className="font-medium">5 AZN</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between text-sm font-semibold">
              <span>Yekun qiymət</span>
              <span>{order.total_price + 5 } AZN</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
