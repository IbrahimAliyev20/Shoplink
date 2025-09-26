"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import OrderDetails from "./OrderDetails";
import Image from "next/image";

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: {
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
}

function Orders() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [orders] = useState<Order[]>([
    {
      id: "1",
      orderNumber: "ORD-2024-001",
      date: "2024-01-15",
      status: "delivered",
      total: 2500,
      items: [
        {
          name: "Tommy Hilfiger Men's Kelby Sneaker",
          quantity: 2,
          price: 1250,
          image: "/marketimg/sport.png",
        },
      ],
    },
    {
      id: "2",
      orderNumber: "ORD-2024-002",
      date: "2024-01-10",
      status: "shipped",
      total: 1800,
      items: [
        {
          name: "Nike Air Zoom Pegasus",
          quantity: 1,
          price: 1800,
          image: "/marketimg/sport.png",
        },
      ],
    },
    {
      id: "3",
      orderNumber: "ORD-2024-003",
      date: "2024-01-05",
      status: "processing",
      total: 3200,
      items: [
        {
          name: "Adidas Ultraboost 22",
          quantity: 2,
          price: 1600,
          image: "/marketimg/sport.png",
        },
      ],
    },
  ]);

  const getStatusText = (status: Order["status"]) => {
    const statusMap = {
      pending: "Gözləyir",
      processing: "İşlənir",
      shipped: "Göndərilib",
      delivered: "Çatdırıldı",
      cancelled: "Ləğv edilib",
    };
    return statusMap[status];
  };

  // If order details is selected, show order details
  if (selectedOrderId) {
    return (
      <OrderDetails 
        orderId={selectedOrderId}
        onBack={() => setSelectedOrderId(null)}
      />
    );
  }

  return (
    <div className="space-y-6 max-sm:space-y-4">
      <h1 className="text-2xl font-bold text-gray-900 max-sm:text-xl max-sm:font-semibold">
        Sifarişlərim
      </h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-12 max-sm:py-8">
          <div className="w-24 h-24 mx-auto mb-4 text-gray-300 max-sm:w-16 max-sm:h-16 max-sm:mb-3">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2 max-sm:text-lg max-sm:mb-1">
            Hələ sifarişiniz yoxdur
          </h3>
          <p className="text-gray-500 mb-6 max-sm:text-sm max-sm:mb-4">
            İlk sifarişinizi vermək üçün mağazaya keçin
          </p>
          <Button className="bg-[#FF13F0] hover:bg-pink-500 text-white max-sm:text-sm max-sm:px-4 max-sm:py-2">
            Mağazaya keç
          </Button>
        </div>
      ) : (
        <div className="space-y-4 max-sm:space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 max-sm:p-4"
            >
              <div className="flex items-start gap-4 max-sm:flex-col max-sm:gap-3">
                {/* Product Image */}
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 max-sm:w-16 max-sm:h-16 max-sm:mx-auto">
                  <Image
                    width={80}
                    height={80}
                    src={order.items[0].image}
                    alt={order.items[0].name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info and Status */}
                <div className="flex-1 flex justify-between items-start max-sm:flex-col max-sm:gap-3 max-sm:w-full">
                  <div className="flex-1 max-sm:text-center max-sm:w-full">
                    {/* Product Name */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 max-sm:text-base max-sm:mb-2">
                      {order.items[0].name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3 max-sm:text-xs max-sm:mb-2">
                      Yves Saint Laurent
                    </p>

                    {/* Order Details */}
                    <div className="space-y-1 text-sm text-gray-600 max-sm:text-xs max-sm:space-y-1">
                      <p className="max-sm:flex max-sm:justify-between">
                        <span>{order.items[0].quantity} məhsul :</span>
                        <span className="max-sm:font-medium">{order.total} AZN</span>
                      </p>
                      <p className="max-sm:flex max-sm:justify-between">
                        <span>Sifariş tarixi :</span>
                        <span className="max-sm:font-medium">{order.date}</span>
                      </p>
                      <p className="max-sm:flex max-sm:justify-between">
                        <span>Sifariş ID :</span>
                        <span className="max-sm:font-medium">#{order.orderNumber}</span>
                      </p>
                    </div>
                  </div>

                  {/* Status and Button */}
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
                      onClick={() => setSelectedOrderId(order.orderNumber)}
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
