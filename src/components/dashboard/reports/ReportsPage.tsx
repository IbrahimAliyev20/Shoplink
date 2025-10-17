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
  Search,
  ListFilter,
  X,
  Trash,
  Edit,
} from "lucide-react";
import { Report } from "@/types";
import { useQuery } from "@tanstack/react-query";
import getReportsQuery from "@/services/Seller-services/reports/queries";
import ReusablePagination from "../ReusablePagination";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReportFilterParams } from "@/services/Seller-services/reports/api";

const ReportsPage: React.FC = () => {
  type SortKey = keyof Report;

  const [dateFilter, setDateFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [stockFilter, setStockFilter] = useState("");

  const [activeApiFilters, setActiveApiFilters] = useState<ReportFilterParams>(
    {}
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: "asc" | "desc";
  }>({ key: "product", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);

  const itemsPerPage = 5;

  const {
    data: reportsData,
    isLoading,
    error,
  } = useQuery(getReportsQuery(activeApiFilters));

  const handleApplyFilter = () => {
    const newFilters: ReportFilterParams = {};
    if (dateFilter) newFilters.created_at = dateFilter;
    if (categoryFilter) newFilters.category_id = categoryFilter;
    if (stockFilter) newFilters.stock = stockFilter;

    setActiveApiFilters(newFilters);
    setCurrentPage(1); 
    setShowFilter(false);
  };

  const handleResetFilters = () => {
    setDateFilter("");
    setCategoryFilter("");
    setStockFilter("");
    setActiveApiFilters({});
    setCurrentPage(1);
  };

  const handleRemoveFilter = (keyToRemove: keyof ReportFilterParams) => {
    const newFilters = { ...activeApiFilters };
    delete newFilters[keyToRemove];
    setActiveApiFilters(newFilters);

    if (keyToRemove === "created_at") setDateFilter("");
    if (keyToRemove === "category_id") setCategoryFilter("");
    if (keyToRemove === "stock") setStockFilter("");
  };

  const activeFiltersForDisplay = useMemo(() => {
    const filters = [];
    if (activeApiFilters.created_at)
      filters.push({ key: "created_at", value: activeApiFilters.created_at });
    if (activeApiFilters.category_id)
      filters.push({ key: "category_id", value: activeApiFilters.category_id });
    if (activeApiFilters.stock)
      filters.push({ key: "stock", value: activeApiFilters.stock });
    return filters;
  }, [activeApiFilters]);

  const sortedAndSearchedData = useMemo(() => {
    if (!reportsData) return [];

    const searched = reportsData.filter(
      (item) =>
        item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return [...searched].sort((a, b) => {
      const key = sortConfig.key;
      const direction = sortConfig.direction === "asc" ? 1 : -1;
      const aValue = a[key] as string | number | null;
      const bValue = b[key] as string | number | null;

      if (aValue === null) return 1 * direction;
      if (bValue === null) return -1 * direction;

      if (typeof aValue === "string" && typeof bValue === "string") {
        return aValue.localeCompare(bValue) * direction;
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

  const handleViewProject = (project: Report) =>
    console.log("View project:", project);
  const handleEditProject = (project: Report) =>
    console.log("Edit project:", project);

  const SortableHeader: React.FC<{
    sortKey: SortKey;
    children: React.ReactNode;
    className?: string;
  }> = ({ sortKey, children, className }) => (
    <TableHead
      onClick={() => requestSort(sortKey)}
      className={`cursor-pointer hover:bg-gray-50 ${
        className || ""
      } max-md:px-4 max-md:py-3 max-md:text-xs`}
    >
      <div className="flex items-center gap-1 text-gray-500 font-medium justify-center max-md:text-xs max-md:gap-0.5">
        {children}
        <ArrowUpDown className="h-4 w-4 max-md:h-3 max-md:w-3" />
      </div>
    </TableHead>
  );

  const totalPages = Math.ceil(sortedAndSearchedData.length / itemsPerPage);
  const paginatedData = sortedAndSearchedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState />;

  return (
    <div className="bg-gray-50">
      <div className="bg-white rounded-lg border border-gray-100">
        <div className="p-6 max-md:p-4">
          <div className="flex items-center gap-4 mb-6 max-md:flex-col max-md:items-stretch max-md:gap-3 max-md:mb-4">
            <div className="relative flex-1 max-w-md max-md:max-w-none">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 max-md:h-3 max-md:w-3" />
              <input
                type="text"
                placeholder="Məhsul axtarın"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-md:h-10 max-md:text-sm"
              />
            </div>
            <div className="relative max-md:w-full">
              <Button
                variant="outline"
                className="flex items-center gap-2 border-gray-300 bg-white text-black hover:bg-gray-50 max-md:w-full max-md:justify-center max-md:h-10"
                onClick={() => setShowFilter(!showFilter)}
              >
                <ListFilter className="h-4 w-4 max-md:h-3 max-md:w-3" />
                <span className="max-md:text-sm">
                  Filter
                  {activeFiltersForDisplay.length > 0 &&
                    `(${activeFiltersForDisplay.length})`}
                </span>
              </Button>
              {showFilter && (
                <div className="absolute top-full -left-116 mt-2 w-[680px] bg-white rounded-lg shadow-lg border border-[#F3F2F8] z-10 max-md:left-0 max-md:w-full max-md:mt-1">
                  <div className="p-4 max-md:p-3">
                    <div className="flex items-center gap-3 mb-4 justify-center max-md:flex-col max-md:gap-2 max-md:mb-3">
                      <div className="flex-1 max-md:w-full relative">
                        <Input
                          type="date"
                          placeholder="Tarix"
                          value={dateFilter}
                          onChange={(e) => setDateFilter(e.target.value)}
                          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg max-md:h-9 max-md:text-sm [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:top-1/2 [&::-webkit-calendar-picker-indicator]:transform [&::-webkit-calendar-picker-indicator]:-translate-y-1/2 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                        />
                      </div>
                      <div className="flex-1 max-md:w-full">
                        <Input
                          type="text"
                          placeholder="Kateqoriya ID"
                          value={categoryFilter}
                          onChange={(e) => setCategoryFilter(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg max-md:h-9 max-md:text-sm"
                        />
                      </div>
                      <div className="flex-1 max-md:w-full">
                        <Select value={stockFilter} onValueChange={setStockFilter}>
                          <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-lg max-md:h-9 max-md:text-sm">
                            <SelectValue placeholder="Stok" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Stokda yoxdur</SelectItem>
                            <SelectItem value="1">Stokda var</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleResetFilters}
                        className="h-8 w-8 text-gray-500 hover:text-gray-700 max-md:h-7 max-md:w-7"
                      >
                        <Trash className="h-4 w-4 max-md:h-3 max-md:w-3" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-end max-md:justify-center">
                      <Button
                        onClick={handleApplyFilter}
                        className="w-fit bg-[#E23359] hover:bg-[#E23359]/90 text-white font-medium py-2 px-6 rounded-lg max-md:w-full max-md:h-10"
                      >
                        Tətbiq et
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {activeFiltersForDisplay.length > 0 && (
            <div className="flex items-center gap-3 mb-6 max-md:gap-2 max-md:mb-4 max-md:flex-wrap">
              {activeFiltersForDisplay.map((filter) => (
                <div
                  key={filter.key}
                  className="flex items-center gap-2 bg-[#FBFDFF] text-gray-700 px-4 py-2 rounded-md text-sm border border-[#D1D1D6] max-md:px-3 max-md:py-1.5 max-md:text-xs"
                >
                  <span className="font-medium max-md:text-xs">
                    {filter.value}
                  </span>
                  <button
                    onClick={() =>
                      handleRemoveFilter(filter.key as keyof ReportFilterParams)
                    }
                    className="text-gray-500 hover:text-gray-700 ml-1 max-md:ml-0.5"
                  >
                    <X className="h-4 w-4 max-md:h-3 max-md:w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="overflow-x-auto max-md:overflow-x-scroll">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[#F3F2F8] text-center">
                  <TableHead className="text-gray-500 font-medium text-center max-md:px-4 max-md:py-3 max-md:text-xs max-md:min-w-[40px]">
                    №
                  </TableHead>
                  <SortableHeader
                    sortKey="product"
                    className="text-center max-md:min-w-[120px]"
                  >
                    Məhsul
                  </SortableHeader>
                  <SortableHeader
                    sortKey="category"
                    className="text-center max-md:hidden"
                  >
                    Kateqoriya
                  </SortableHeader>
                  <SortableHeader
                    sortKey="product_price"
                    className="text-center max-md:min-w-[80px]"
                  >
                    Satış qiyməti
                  </SortableHeader>
                  <SortableHeader
                    sortKey="quantity"
                    className="text-center max-md:hidden"
                  >
                    Satılan (ədəd)
                  </SortableHeader>
                  <SortableHeader
                    sortKey="total_price"
                    className="text-center max-md:min-w-[90px]"
                  >
                    Ümumi gəlir
                  </SortableHeader>
                  <SortableHeader
                    sortKey="stock"
                    className="text-center max-md:min-w-[80px]"
                  >
                    Stok məlumatı
                  </SortableHeader>
                  <TableHead className="text-gray-500 font-medium text-center max-md:px-4 max-md:py-3 max-md:text-xs max-md:min-w-[100px]">
                    Əməliyyatlar
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((item, index) => (
                  <TableRow
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 text-center"
                  >
                    <TableCell className="font-medium text-gray-900 py-4 max-md:px-4 max-md:py-3 max-md:text-sm">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </TableCell>
                    <TableCell className="py-4 max-md:px-4 max-md:py-3">
                      <div className="flex items-center gap-3 max-md:gap-2">
                        <Image
                          src={item.image || "/images/team1.webp"}
                          alt={item.product}
                          width={40}
                          height={40}
                          className="rounded-md object-cover max-md:w-6 max-md:h-6"
                        />
                        <span className="font-medium text-gray-900 max-md:text-sm">
                          {item.product}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-700 text-center max-md:hidden">
                      {item.category}
                    </TableCell>
                    <TableCell className="text-gray-700 font-medium text-center max-md:px-4 max-md:py-3 max-md:text-sm">
                      {item.product_price} AZN
                    </TableCell>
                    <TableCell className="text-gray-700 text-center max-md:hidden">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-gray-700 font-medium text-center max-md:px-4 max-md:py-3 max-md:text-sm">
                      {item.total_price} AZN
                    </TableCell>
                    <TableCell className="py-4 text-center max-md:px-4 max-md:py-3">
                      {item.stock === null || item.stock === 0 ? (
                        <div className="flex items-center justify-center gap-2 max-md:gap-1">
                          <X className="w-4 h-4 text-red-500 max-md:h-3 max-md:w-3" />
                          <span className="text-red-600 text-sm font-medium max-md:text-xs max-md:hidden">
                            Stokda yoxdur
                          </span>
                          <span className="text-red-600 text-xs hidden max-md:inline">
                            Yox
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-700 font-medium max-md:text-sm">
                          {item.stock}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="py-4 max-md:px-4 max-md:py-3">
                      <div className="flex items-center justify-center gap-2 max-md:gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-blue-600 hover:bg-blue-50 hover:text-blue-700 max-md:h-6 max-md:w-6"
                          onClick={() => handleViewProject(item)}
                          title="Ətraflı bax"
                        >
                          <Eye className="h-4 w-4 max-md:h-3 max-md:w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-blue-600 hover:bg-blue-50 hover:text-blue-700 max-md:h-6 max-md:w-6"
                          onClick={() => handleEditProject(item)}
                          title="Redaktə et"
                        >
                          <Edit className="h-4 w-4 text-gray-600 max-md:h-3 max-md:w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700 max-md:h-6 max-md:w-6"
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
      </div>
    </div>
  );
};

export default ReportsPage;
