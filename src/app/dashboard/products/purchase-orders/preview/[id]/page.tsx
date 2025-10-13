"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getStoreOrderOptions,
  getStoreOrdersOptions,
} from "@/services/Seller-services/orderforseller/queries";
import { useChangeStoreOrderStatusMutation } from "@/services/Seller-services/orderforseller/mutations";
import StatusSelect from "@/components/dashboard/allproducts/purchase/StatusSelect";
import { toast } from "sonner";

function PurchasePreviewPage() {
  const params = useParams();
  const { id } = params;
  const queryClient = useQueryClient();

  const { data: storeOrder, isLoading } = useQuery(
    getStoreOrderOptions(id as string)
  );

  const changeStatusMutation = useMutation(useChangeStoreOrderStatusMutation());

  const [selectedStatus, setSelectedStatus] = React.useState<number | null>(
    null
  );

  React.useEffect(() => {
    if (storeOrder) {
      setSelectedStatus(storeOrder.status);
    }
  }, [storeOrder]);

  const handleUpdateStatus = () => {
    if (selectedStatus !== null && id) {
      changeStatusMutation.mutate(
        { id: id as string, status: selectedStatus },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: getStoreOrderOptions(id as string).queryKey,
            });
            queryClient.invalidateQueries({
              queryKey: getStoreOrdersOptions().queryKey,
            });
            toast.success("Status uğurla yeniləndi.");
          },
          onError: () => {
            toast.error("Xəta baş verdi, status yenilənmədi.");
          },
        }
      );
    }
  };

  if (isLoading) {
    return <div className="p-8">Məlumatlar Yüklənir...</div>;
  }

  const hasStatusChanged = storeOrder?.status !== selectedStatus;

  return (
   
    <div className="bg-white p-6 sm:p-8 rounded-lg font-sans w-full">
      <div className="max-w-3xl mx-start">
        <div className="space-y-10">
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Sifariş məlumatları
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-1">
                <p className="text-sm text-gray-500">Ad</p>
                <p className="text-sm font-medium text-gray-900">
                  {storeOrder?.name}
                </p>
              </div>
                <div className="flex items-center justify-between py-1">
                  <p className="text-sm text-gray-500">Telefon nömrəsi</p>
                    <p className="text-sm font-medium text-gray-900">
                      {storeOrder?.phone}
                    </p>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-sm font-medium text-gray-900">
                      {storeOrder?.email}
                    </p>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <p className="text-sm text-gray-500">Ünvan</p>
                    <p className="text-sm font-medium text-gray-900">
                      {storeOrder?.address}
                    </p>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <p className="text-sm text-gray-500">Sifariş detayları</p>
                    {/* <p className="text-sm font-medium text-gray-900">
                      {storeOrder?.detail.map((item) => (
                        <div key={item.id}>
                          <p>{item.product.name}</p>
                          <p>{item.product.price}</p>
                          <p>{item.product.currency}</p>
                        </div>
                      ))}
                    </p> */}
                  </div>
              <div className="flex items-center justify-between py-1">
                <p className="text-sm text-gray-500">Sifarişin cəmi</p>
                <p className="text-sm font-medium text-gray-900">
                  {storeOrder?.total_price}
                </p>
              </div>
              <div className="flex items-center justify-between py-1">
                <p className="text-sm text-gray-500">Status</p>
                <div className="text-sm font-medium text-gray-900 w-48">
                  {selectedStatus !== null ? (
                    <StatusSelect
                      value={selectedStatus}
                      onChange={setSelectedStatus}
                      disabled={changeStatusMutation.isPending}
                    />
                  ) : (
                    <span>Status yoxdur</span>
                  )}
                </div>
              </div>
            </div>
          </section>
          <div className="pt-4 border-t">
            <button
              onClick={handleUpdateStatus}
              disabled={!hasStatusChanged || changeStatusMutation.isPending}
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {changeStatusMutation.isPending ? "Yenilənir..." : "Yadda Saxla"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchasePreviewPage;
