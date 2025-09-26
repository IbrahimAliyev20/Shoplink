"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check } from "lucide-react";
import Image from "next/image";

interface OrderDetailsProps {
  orderId?: string;
  onBack?: () => void;
}

function OrderDetails({ orderId = "11ABZ27392", onBack }: OrderDetailsProps) {
  return (
    <div className="space-y-6 max-sm:space-y-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 max-sm:mb-6 max-sm:gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg max-sm:p-1.5"
        >
          <ArrowLeft className="w-5 h-5 max-sm:w-4 max-sm:h-4" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-900 max-sm:text-xl max-sm:font-semibold">
          Sifariş detalları
        </h1>
      </div>

      {/* Order Card */}
      <div className="bg-white rounded-lg border p-6 max-sm:p-4">
        <div className="flex items-start gap-4 max-sm:flex-col max-sm:gap-3">
          {/* Product Image */}
          <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 max-sm:w-20 max-sm:h-20 max-sm:mx-auto">
            <Image
              src="/marketimg/sport.png"
              alt="Tommy Hilfiger Men's Kelby Sneaker"
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 max-sm:text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-1 max-sm:text-lg max-sm:mb-2">
              Tommy Hilfiger Men Kelby Sneaker
            </h2>
            <p className="text-gray-500 mb-4 max-sm:text-sm max-sm:mb-3">
              Yves Saint Laurent
            </p>

            {/* Order Summary */}
            <div className="grid grid-cols-3 gap-8 text-sm max-sm:grid-cols-1 max-sm:gap-2 max-sm:space-y-1">
              <div className="max-sm:flex max-sm:justify-between">
                <span className="text-gray-600">1 məhsul :</span>
                <span className="ml-2 font-medium max-sm:ml-0">1200 AZN</span>
              </div>
              <div className="max-sm:flex max-sm:justify-between">
                <span className="text-gray-600">Sifariş tarixi :</span>
                <span className="ml-2 font-medium max-sm:ml-0">25.08.2025</span>
              </div>
              <div className="max-sm:flex max-sm:justify-between">
                <span className="text-gray-600">Sifariş ID :</span>
                <span className="ml-2 font-medium max-sm:ml-0">{orderId}</span>
              </div>
            </div>
          </div>

          {/* Status and Button */}
          <div className="flex flex-col items-end gap-4 max-sm:flex-row max-sm:justify-between max-sm:items-center max-sm:w-full max-sm:gap-3">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600 max-sm:w-4 max-sm:h-4" />
              <span className="text-sm font-medium text-gray-900 max-sm:text-xs">
                Çatdırıldı
              </span>
            </div>
            <Button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm max-sm:px-3 max-sm:py-1.5 max-sm:text-xs max-sm:flex-1">
              Sifariş detalları
            </Button>
          </div>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="bg-white rounded-lg border p-6 max-sm:p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 max-sm:text-base max-sm:mb-3">
          Çatdırılma Ünvanı
        </h3>
        <div className="space-y-2 text-gray-700 max-sm:space-y-1">
          <p className="font-medium max-sm:text-sm">Bakı</p>
          <p className="max-sm:text-sm">Nəsimi rayonu, Tbilisi pros.</p>
        </div>
      </div>

      {/* Payment Details */}
      <div className="bg-white rounded-lg border p-6 max-sm:p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 max-sm:text-base max-sm:mb-4">
          Ödəniş Detalları
        </h3>
        
        <div className="space-y-4 max-sm:space-y-3">
          <div className="flex justify-between items-center max-sm:text-sm">
            <span className="text-gray-600">Ödəmə üsulu</span>
            <span className="font-medium">Kartla ödəmə</span>
          </div>
          
          <div className="flex justify-between items-center max-sm:text-sm">
            <span className="text-gray-600">Ümumi Qiymət</span>
            <span className="font-medium">310.60 AZN</span>
          </div>
          
          <div className="flex justify-between items-center max-sm:text-sm">
            <span className="text-gray-600">Endirim</span>
            <span className="font-medium">10.60 AZN</span>
          </div>
          
          <div className="flex justify-between items-center max-sm:text-sm">
            <span className="text-gray-600">Çatdırılma</span>
            <span className="font-medium">5 AZN</span>
          </div>
          
          <hr className="my-4 max-sm:my-3" />
          
          <div className="flex justify-between items-center text-lg font-semibold max-sm:text-base">
            <span>Yekun qiymət</span>
            <span>310.60 AZN</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
