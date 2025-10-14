"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import OrderDetails from "./OrderDetails";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getUserOrderQuery } from "@/services/User-services/orderforusers/queries";
import StatusIcons from "@/components/dashboard/allproducts/purchase/StatusIcons";

function Orders() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const { data: orders, isLoading, isError } = useQuery(getUserOrderQuery());

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
    <div className="space-y-6 md:space-y-6">
      <h1 className="text-2xl md:text-2xl font-medium md:font-medium text-gray-900">
        Sifarişlərim
      </h1>

      {!orders || orders.length === 0 ? (
        <div className="text-center py-12 md:py-12">
          <h3 className="text-xl md:text-xl font-medium md:font-medium text-gray-900 mb-2 md:mb-2">
            Hələ sifarişiniz yoxdur
          </h3>
        </div>
      ) : (
        <div className="space-y-4 md:space-y-4">
          {orders.map((order) => (
            <div className="rounded-lg border border-[#F3F2F8]" key={order.id}>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4 p-3 md:p-2 border-b border-[#F3F2F8]">
                <div className="flex items-start gap-3 md:gap-4 w-full md:w-auto">
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {order.detail && order.detail[0] && order.detail[0].image ? (
                      <Image
                        src={order.detail[0].image}
                        alt={order.detail[0].product || "Məhsul"}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 md:flex-none">
                    <h2 className="text-base md:text-lg font-medium text-gray-900">
                      {order.detail && order.detail[0] ? order.detail[0].product || "Məhsul adı" : "Məhsul adı"}
                    </h2>
                    {order.detail && order.detail.length > 1 && (
                      <p className="text-xs md:text-sm text-gray-500 mt-1">
                        +{order.detail.length - 1} əlavə məhsul
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-col items-start md:items-end gap-3 md:gap-4 w-full md:w-auto">
                  <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-green-600">
                    <StatusIcons status={order.status} />
                  </div>
                  <Button
                    onClick={() => setSelectedOrderId(order.id.toString())}
                    className="bg-gray-800 text-white px-3 md:px-4 h-8 md:h-9 rounded-lg text-xs md:text-sm hover:bg-gray-700 w-full md:w-auto"
                  >
                    Sifariş detalları
                  </Button>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between md:justify-end gap-2 md:gap-10 text-xs md:text-sm text-gray-600 px-3 md:px-6 py-3 md:py-2">
                <p className="md:hidden">
                  <span className="font-medium text-gray-900">{order.total_price} AZN</span>
                </p>
                <p className="hidden md:block">
                  {order.detail && order.detail.length > 0 ? 
                    order.detail.reduce((total, item) => total + parseInt(item.quantity || "0"), 0) : 0
                  } məhsul :
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
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
