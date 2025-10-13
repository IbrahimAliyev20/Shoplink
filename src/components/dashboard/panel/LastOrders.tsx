"use client"; 
import React, { useState, useMemo } from "react";
import { Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import StatusIcons from "../allproducts/purchase/StatusIcons";
import ReusablePagination from "@/components/dashboard/ReusablePagination";
import { useQuery } from "@tanstack/react-query";
import { getStoreOrdersOptions } from "@/services/Seller-services/orderforseller/queries";

const LastOrders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  console.log(setSearchTerm)

  const { data: storeOrders } = useQuery(getStoreOrdersOptions());

  const filteredOrders = useMemo(() => {
    if (!storeOrders) return [];
    if (!searchTerm) return storeOrders;

    return storeOrders.filter(
      (order) =>
        order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toString().includes(searchTerm)
    );
  }, [storeOrders, searchTerm]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);



  return (
    <div className="bg-gray-50 ">
      <div className="bg-white rounded-xl  border border-[#F3F2F8]">
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className=" text-xl md:text-2xl font-medium text-gray-900">
              Ən son sifarişlər
            </h2>
            <Link href="/dashboard/products/purchase-orders" className="text-gray-700 hover:text-gray-900 text-sm font-medium flex items-center gap-1 whitespace-nowrap ">
              Hamısına bax →
            </Link>
          </div>

          <div className=" bg-white rounded-lg border border-[#F3F2F8] ">
            <Card className="border-none shadow-none">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <div className="max-sm:min-w-[600px]">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#F3F2F8]">
                          <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                            Sifariş №
                          </th>
                          <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                            Təchizatçı
                          </th>
                          <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                            Cəmi
                          </th>
                          <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                            Status
                          </th>
                          <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                            Əməliyyatlar
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedOrders.map((product) => (
                          <tr
                            key={product.id}
                            className="border-b border-[#F3F2F8] hover:bg-gray-50"
                          >
                            <td className="py-4 px-6 text-sm text-gray-900 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                              {product.id}
                            </td>
                            <td className="py-4 px-6 max-sm:py-3 max-sm:px-4">
                              <div className="flex items-center space-x-3 max-sm:space-x-2">
                                <span className="text-sm font-medium text-gray-900 max-sm:text-xs">
                                  {product.name}
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-900 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                              {product.total_price} AZN
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-900 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                              <StatusIcons status={product.status} />
                            </td>
                            <td className="py-4 px-6 max-sm:py-3 max-sm:px-4">
                              <div className="flex items-center justify-start space-x-2 max-sm:space-x-1">
                                <Link
                                  href={`/dashboard/products/purchase-orders/preview/${product.id}`}
                                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors max-sm:p-1.5"
                                >
                                  <Eye className="h-4 w-4 max-sm:h-3 max-sm:w-3" />
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>

            <ReusablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              className="mt-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastOrders;
