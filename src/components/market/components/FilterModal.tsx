"use client";

import React, { useState } from "react";
import { Trash2, ChevronDown } from "lucide-react";
import { CategoryStore } from "@/types/storeforusers/types";

interface ProductFilters {
  category_id?: number;
  min_price?: number;
  max_price?: number;
  stock?: 0 | 1;
}

interface FilterPanelProps {
  isOpen: boolean;
  categories: CategoryStore[];
  onApplyFilters: (filters: ProductFilters) => void;
  currentFilters: ProductFilters;
  onClearFilters: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  isOpen,
  categories,
  onApplyFilters,
  currentFilters,
  onClearFilters,
}) => {
  const [filters, setFilters] = useState<ProductFilters>(currentFilters);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isStockOpen, setIsStockOpen] = useState(false);

  const handleApply = () => {
    onApplyFilters(filters);
  };

  const handleClear = () => {
    setFilters({});
    onClearFilters();
  };

  const getCategoryName = (id: number) => {
    return categories.find(cat => cat.id === id)?.name || "Kateqoriya seçin";
  };

  const getStockName = (stock: number | undefined) => {
    if (stock === 1) return "Stokda var";
    if (stock === 0) return "Stokda yoxdur";
    return "Stok seçin";
  };




  if (!isOpen) return null;

  return (
    <div className="bg-white rounded-lg border border-[#F3F2F8] p-3 md:p-4 mt-2 shadow-sm max-w-xs md:max-w-none">
      <div className="space-y-3 md:space-y-4">
        {/* Category Dropdown */}
        <div className="relative">
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
            Kateqoriya
          </label>
          <button
            type="button"
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="w-full border border-gray-300 rounded-md md:rounded-lg px-2 md:px-3 py-1.5 md:py-2 text-left flex items-center justify-between hover:border-gray-400 transition-colors text-xs md:text-sm"
          >
            <span className={filters.category_id ? "text-gray-900" : "text-gray-500"}>
              {filters.category_id ? getCategoryName(filters.category_id) : "Kateqoriya seçin"}
            </span>
            <ChevronDown className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
          </button>
          
          {isCategoryOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md md:rounded-lg shadow-lg max-h-48 md:max-h-60 overflow-y-auto">
              <button
                onClick={() => {
                  setFilters({ ...filters, category_id: undefined });
                  setIsCategoryOpen(false);
                }}
                className="w-full px-2 md:px-3 py-1.5 md:py-2 text-left hover:bg-gray-50 text-gray-500 text-xs md:text-sm"
              >
                Bütün kateqoriyalar
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setFilters({ ...filters, category_id: category.id });
                    setIsCategoryOpen(false);
                  }}
                  className="w-full px-2 md:px-3 py-1.5 md:py-2 text-left hover:bg-gray-50 text-gray-900 text-xs md:text-sm"
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Stock Select Dropdown */}
        <div className="relative">
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
            Stok
          </label>
          <button
            type="button"
            onClick={() => setIsStockOpen(!isStockOpen)}
            className="w-full border border-gray-300 rounded-md md:rounded-lg px-2 md:px-3 py-1.5 md:py-2 text-left flex items-center justify-between hover:border-gray-400 transition-colors text-xs md:text-sm"
          >
            <span className={filters.stock !== undefined ? "text-gray-900" : "text-gray-500"}>
              {getStockName(filters.stock)}
            </span>
            <ChevronDown className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
          </button>
          
          {isStockOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md md:rounded-lg shadow-lg">
              <button
                onClick={() => {
                  setFilters({ ...filters, stock: undefined });
                  setIsStockOpen(false);
                }}
                className="w-full px-2 md:px-3 py-1.5 md:py-2 text-left hover:bg-gray-50 text-gray-500 text-xs md:text-sm"
              >
                Stok seçin
              </button>
              <button
                onClick={() => {
                  setFilters({ ...filters, stock: 1 });
                  setIsStockOpen(false);
                }}
                className="w-full px-2 md:px-3 py-1.5 md:py-2 text-left hover:bg-gray-50 text-gray-900 text-xs md:text-sm"
              >
                Stokda var
              </button>
              <button
                onClick={() => {
                  setFilters({ ...filters, stock: 0 });
                  setIsStockOpen(false);
                }}
                className="w-full px-2 md:px-3 py-1.5 md:py-2 text-left hover:bg-gray-50 text-gray-900 text-xs md:text-sm"
              >
                Stokda yoxdur
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Price Range */}
      <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-[#F3F2F8]">
        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2 md:mb-3">
          Qiymət aralığı
        </label>
        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex-1">
            <input
              type="number"
              placeholder="Min"
              value={filters.min_price || ""}
              onChange={(e) => setFilters({ ...filters, min_price: e.target.value ? Number(e.target.value) : undefined })}
              className="w-full border border-gray-300 rounded-md md:rounded-lg px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm focus:outline-none focus:ring-1 md:focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
          <div className="text-gray-400 text-xs">-</div>
          <div className="flex-1">
            <input
              type="number"
              placeholder="Max"
              value={filters.max_price || ""}
              onChange={(e) => setFilters({ ...filters, max_price: e.target.value ? Number(e.target.value) : undefined })}
              className="w-full border border-gray-300 rounded-md md:rounded-lg px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm focus:outline-none focus:ring-1 md:focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons - After Price Range */}
      <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-[#F3F2F8] flex items-center justify-between">
        {/* Clear Button */}
        <button
          onClick={handleClear}
          className="flex items-center gap-1 md:gap-2 text-gray-500 hover:text-gray-700 transition-colors px-2 md:px-3 py-1 md:py-2 rounded-md md:rounded-lg hover:bg-gray-50"
          title="Filterləri təmizlə"
        >
          <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
          <span className="text-xs md:text-sm">Təmizlə</span>
        </button>

        {/* Apply Button */}
        <button
          onClick={handleApply}
          className="bg-[#E23359] hover:bg-[#E23359]/90 text-white px-4 md:px-6 py-1.5 md:py-2 rounded-md md:rounded-lg font-medium transition-colors text-xs md:text-sm"
        >
          Tətbiq et
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
