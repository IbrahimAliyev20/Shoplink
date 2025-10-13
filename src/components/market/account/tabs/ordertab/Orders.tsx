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
  console.log(orders);

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
      <h1 className="text-2xl font-medium text-gray-900 max-sm:text-xl max-sm:font-semibold">
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
          {orders.map((order) => (
            <div className="rounded-lg border border-[#F3F2F8]" key={order.id}>
              <div className="flex items-center justify-between gap-4 p-2 border-b border-[#F3F2F8]">
                <div className="flex items-start gap-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
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
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">
                      {order.detail && order.detail[0] ? order.detail[0].product || "Məhsul adı" : "Məhsul adı"}
                    </h2>
                    {order.detail && order.detail.length > 1 && (
                      <p className="text-sm text-gray-500 mt-1">
                        +{order.detail.length - 1} əlavə məhsul
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-green-600">
                    <StatusIcons status={order.status} />
                  </div>
                  <Button
                    onClick={() => setSelectedOrderId(order.id.toString())}
                    className="bg-gray-800 text-white px-4 h-9 rounded-lg text-sm hover:bg-gray-700"
                  >
                    Sifariş detalları
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-10 text-sm text-gray-600 px-6 py-2">
                <p>
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
