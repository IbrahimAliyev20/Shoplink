"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Eye, ListFilter } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getClientsQuery } from "@/services/Seller-services/clients/queries";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import ReusablePagination from "../ReusablePagination";

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data: clients, isLoading, isError, error } = useQuery(getClientsQuery());
  const itemsPerPage = 10;

  const filteredClients =
    clients?.filter(
      (client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClients = filteredClients.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6 bg-white max-sm:space-y-4">
        <Card className="border-none shadow-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-center py-12">
              <div className="text-center space-y-3">
                <div className="animate-spin w-8 h-8 border-4 border-gray-200 border-t-pink-500 rounded-full mx-auto" />
                <p className="text-gray-500">Müştərilər yüklənir...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="space-y-6 bg-white max-sm:space-y-4">
        <Card className="border-none shadow-none">
          <CardContent className="p-6">
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <p className="text-red-600 font-medium">Xəta baş verdi</p>
                <p className="text-gray-600 text-sm mt-1">{error?.message || 'Müştəriləri yükləyərkən xəta baş verdi'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-white max-sm:space-y-4">
      <Card className="border-none shadow-none">
        <CardContent className="p-6 max-sm:p-4">
          <div className="flex items-center justify-between space-x-4 max-sm:flex-col max-sm:space-x-0 max-sm:space-y-3 max-sm:items-stretch">
            <div className=" relative max-sm:w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 max-sm:h-3 max-sm:w-3" />
              <Input
                type="text"
                placeholder="Müştəri axtarın"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 max-sm:pl-8 max-sm:h-10 max-sm:text-sm"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-2 max-sm:w-full max-sm:h-10 max-sm:text-sm max-sm:space-x-1.5"
            >
              <ListFilter className="h-4 w-4 max-sm:h-3 max-sm:w-3" />
              <span>Filter</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Clients Table */}
      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="max-sm:min-w-[800px]">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                      №
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                      Müştəri
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                      Email
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                      Telefon nömrəsi
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                      Ümumi sifariş
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                      Yaranma tarixi
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                      Əməliyyatlar
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedClients.map((client) => (
                    <tr
                      key={client.id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="py-4 px-6 text-sm text-gray-900 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                        {client.id}
                      </td>
                      <td className="py-4 px-6 max-sm:py-3 max-sm:px-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-gray-900 max-sm:text-xs">
                            {client.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-900 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                        {client.email || "Yoxdur"}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-900 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                        {client.phone}
                      </td>
                      <td className="py-4 px-6 max-sm:py-3 max-sm:px-4">
                        {typeof client.order_count === "string" ? (
                          <span className="inline-flex items-center space-x-1 text-sm max-sm:text-xs">
                            <span>{client.order_count}</span>
                          </span>
                        ) : (
                          <span className="text-sm text-gray-900 max-sm:text-xs">
                            {client.order_count}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-900 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                        {client.created_at}
                      </td>
                      <td className="py-4 px-6 max-sm:py-3 max-sm:px-4">
                        <div className="flex items-center justify-start space-x-2 max-sm:space-x-1">
                          <Link
                            href={`/dashboard/customers/preview/${client.id}`}
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

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2">
        {totalPages > 1 && (
          <ReusablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}
