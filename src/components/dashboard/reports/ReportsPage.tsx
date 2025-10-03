"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  Eye,
  Trash2,
  Pencil,
  Search,
  ListFilter,
  X,
} from "lucide-react";
import { Reports } from "@/types";
import { useQuery } from "@tanstack/react-query";
import getReportsQuery from "@/services/Seller-services/reports/queries";
import ReusablePagination from "../ReusablePagination";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";

const ReportsPage: React.FC = () => {
  type SortKey = keyof Reports;

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: "asc" | "desc";
  }>({ key: "product", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  // Fetch data from API
  const { data: reportsData, isLoading, error } = useQuery(getReportsQuery());

  const sortedAndFilteredData = useMemo(() => {
    if (!reportsData) return [];

    const filtered = reportsData.filter(
      (item) =>
        item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.product_price.toString().includes(searchTerm) ||
        item.total_price.toString().includes(searchTerm) ||
        item.quantity.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      const key = sortConfig.key;
      const direction = sortConfig.direction === "asc" ? 1 : -1;

      const aValue: string | number = a[key] as string | number;
      const bValue: string | number = b[key] as string | number;

      if (typeof aValue === "string" && typeof bValue === "string") {
        return direction === 1
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (aValue < bValue) return -1 * direction;
      if (aValue > bValue) return 1 * direction;
      return 0;
    });
  }, [reportsData, searchTerm, sortConfig]);

  const requestSort = (key: SortKey) => {
    const direction: "asc" | "desc" =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  const handleViewProject = (project: Reports) => {
    // TODO: Implement view project functionality
    console.log('View project:', project);
  };

  const handleEditProject = (project: Reports) => {
    // TODO: Implement edit project functionality
    console.log('Edit project:', project);
  };

  const SortableHeader: React.FC<{
    sortKey: SortKey;
    children: React.ReactNode;
    className?: string;
  }> = ({ sortKey, children, className }) => (
    <TableHead
      onClick={() => requestSort(sortKey)}
      className={`cursor-pointer hover:bg-gray-50 ${className} max-md:px-2 max-md:py-2`}
    >
      <div className="flex items-center gap-1 text-gray-500 font-medium max-md:text-xs max-md:gap-0.5">
        {children}
        <ArrowUpDown className="h-4 w-4 max-md:h-3 max-md:w-3" />
      </div>
    </TableHead>
  );

  const totalPages = Math.ceil(sortedAndFilteredData.length / itemsPerPage);
  const paginatedData = sortedAndFilteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState />;
  }

  return (
    <div className="p-0">
      {/* Search + Filter */}
      <div className="flex justify-between items-center gap-4 mb-6 max-md:flex-col max-md:items-stretch max-md:gap-3 max-md:mb-4">
        <div className="relative flex-1 max-w-md max-md:max-w-none">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Məhsul axtarın"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-md:h-10 max-md:text-sm"
          />
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-2 border-gray-300 max-md:w-full max-md:justify-center max-md:h-10"
        >
          <ListFilter className="h-4 w-4" />
          <span className="max-md:text-sm">Filter</span>
        </Button>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-x-auto bg-white">
        <Table>
          <TableHeader>
            <TableRow className="border-b-gray-200">
              <TableHead className="text-gray-500 font-medium max-md:px-2 max-md:py-2 max-md:text-xs max-md:min-w-[40px]">
                №
              </TableHead>
              <SortableHeader
                sortKey="product"
                className="max-md:min-w-[120px]"
              >
                Məhsul
              </SortableHeader>
              <SortableHeader sortKey="category" className="max-md:hidden">
                Kateqoriya
              </SortableHeader>
              <SortableHeader
                sortKey="product_price"
                className="max-md:min-w-[80px]"
              >
                Satış qiyməti
              </SortableHeader>
              <SortableHeader sortKey="quantity" className="max-md:hidden">
                Satılan (ədəd)
              </SortableHeader>
              <SortableHeader
                sortKey="total_price"
                className="max-md:min-w-[90px]"
              >
                Ümumi gəlir
              </SortableHeader>
              <SortableHeader sortKey="stock" className="max-md:min-w-[80px]">
                Stok
              </SortableHeader>
              <TableHead className="text-gray-500 font-medium max-md:px-2 max-md:py-2 max-md:text-xs max-md:min-w-[100px]">
                Əməliyyatlar
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-800 max-md:px-2 max-md:py-2 max-md:text-sm">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </TableCell>
                <TableCell className="max-md:px-2 max-md:py-2">
                  <div className="flex items-center gap-3 max-md:gap-2">
                    <Image
                      src={item.image || "/images/team1.png"}
                      alt={item.product}
                      width={32}
                      height={32}
                      className="rounded-md max-md:w-6 max-md:h-6"
                    />
                    <span className="font-medium text-gray-800 max-md:text-sm">
                      {item.product}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-600 max-md:hidden">
                  {item.category}
                </TableCell>
                <TableCell className="text-gray-600 max-md:px-2 max-md:py-2 max-md:text-sm">
                  {item.product_price} AZN
                </TableCell>
                <TableCell className="text-gray-600 max-md:hidden">
                  {item.quantity}
                </TableCell>
                <TableCell className="text-gray-600 max-md:px-2 max-md:py-2 max-md:text-sm">
                  {item.total_price} AZN
                </TableCell>
                <TableCell className="max-md:px-2 max-md:py-2">
                  {item.stock === null || item.stock === 0 ? (
                    <div className="flex items-center gap-2 max-md:gap-1">
                      <span className="text-red-500">
                        <X className="max-md:h-3 max-md:w-3" />
                      </span>
                      <span className="text-red-600 text-sm max-md:text-xs max-md:hidden">
                        Stokda yoxdur
                      </span>
                      <span className="text-red-600 text-xs hidden max-md:inline">
                        Yox
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-600 max-md:text-sm">
                      {item.stock}
                    </span>
                  )}
                </TableCell>
                <TableCell className="max-md:px-2 max-md:py-2">
                  <div className="flex items-center gap-2 max-md:gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-blue-600 hover:bg-blue-50 rounded-full max-md:h-6 max-md:w-6"
                      onClick={() => handleViewProject(item)}
                      title="Ətraflı bax"
                    >
                      <Eye className="h-4 w-4 max-md:h-3 max-md:w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-green-600 hover:bg-green-50 rounded-full max-md:h-6 max-md:w-6"
                      onClick={() => handleEditProject(item)}
                      title="Redaktə et"
                    >
                      <Pencil className="h-4 w-4 max-md:h-3 max-md:w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-600 hover:bg-red-50 rounded-full max-md:h-6 max-md:w-6"
                      onClick={() => {}}
                      title="Sil"
                    >
                      <Trash2 className="h-4 w-4 max-md:h-3 max-md:w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex justify-end max-md:justify-center max-md:mt-4">
          <ReusablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
