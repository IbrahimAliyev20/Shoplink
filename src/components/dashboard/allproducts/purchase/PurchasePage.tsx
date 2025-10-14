"use client";
import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Eye } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getStoreOrdersOptions } from "@/services/Seller-services/orderforseller/queries";
import ReusablePagination from "@/components/dashboard/ReusablePagination";
import Link from "next/link";
import StatusIcons from "./StatusIcons";

export default function PurchasePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: storeOrders } = useQuery(getStoreOrdersOptions());

  const filteredOrders = useMemo(() => {
    if (!storeOrders) return [];
    
    // Sort orders by ID in descending order (newest first)
    const sortedOrders = [...storeOrders].sort((a, b) => b.id - a.id);
    
    if (!searchTerm) return sortedOrders;

    return sortedOrders.filter(
      (order) =>
        order.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [storeOrders, searchTerm]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className=" bg-white rounded-lg border border-[#F3F2F8] p-4 ">
      <Card className="border-none shadow-none">
        <CardContent className=" max-sm:p-4">
          <div
            className="flex items-center 
            space-x-4 max-sm:flex-col max-sm:space-x-0 max-sm:space-y-3 max-sm:items-stretch"
          >
            <div className="md:min-w-sm relative max-sm:w-full">
              <Input
                type="text"
                placeholder="Sifariş axtarın"
                value={searchTerm}
                onChange={handleSearchChange}
                className="max-sm:pl-8 max-sm:h-10 max-sm:text-sm py-5.5 "
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 max-sm:h-3 max-sm:w-3" />
            </div>
        
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="max-sm:min-w-[600px]">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#F3F2F8]">
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                      No
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
                  {paginatedOrders.map((product, index) => (
                    <tr
                      key={product.id}
                      className="border-b border-[#F3F2F8] hover:bg-gray-50"
                    >
                      <td className="py-4 px-6 text-sm text-gray-900 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                        {startIndex + index + 1}
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
  );
}
