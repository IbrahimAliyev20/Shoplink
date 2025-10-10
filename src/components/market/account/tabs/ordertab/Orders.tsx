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
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
