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
        <div className="flex items-center justify-between gap-4 p-6 border-b border-[#F3F2F8]">
          <div className="flex items-start gap-4">
            <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={order.detail[0].image}
                alt={order.detail[0].product || "Məhsul"}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                {order.detail[0].product || "Məhsul adı "}
              </h2>
            </div>
          </div>

          <div className="flex flex-col items-end gap-4">
            <div className="flex items-center gap-2 text-sm font-medium text-green-600">
              <StatusIcons status={order.status} />
            </div>
            <Button className="bg-gray-800 text-white px-4 h-9 rounded-lg text-sm hover:bg-gray-700">
              Sifariş detalları
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-end gap-10 text-sm text-gray-600 px-6 py-4">
          <p>
            {order.detail[0].quantity} məhsul :
            <span className="font-medium text-gray-900">
              {order.total_price} AZN
            </span>
          </p>
      
          <p>
            Sifariş ID :
            <span className="font-medium text-gray-900">{order.id}</span>
          </p>
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
