"use client";

import React, { useState } from "react";
import { X, ChevronDown } from "lucide-react";
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


  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('az-AZ').format(price);
  };

  if (!isOpen) return null;

  return (
    <div className="bg-white rounded-lg border border-[#F3F2F8] p-4 mt-2 shadow-sm">
      <div className="flex flex-wrap gap-4 items-end">
        {/* Category Dropdown */}
        <div className="relative min-w-[140px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kateqoriya
          </label>
          <button
            type="button"
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-left flex items-center justify-between hover:border-gray-400 transition-colors text-sm"
          >
            <span className={filters.category_id ? "text-gray-900" : "text-gray-500"}>
              {filters.category_id ? getCategoryName(filters.category_id) : "Kateqoriya seçin"}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
          
          {isCategoryOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              <button
                onClick={() => {
                  setFilters({ ...filters, category_id: undefined });
                  setIsCategoryOpen(false);
                }}
                className="w-full px-3 py-2 text-left hover:bg-gray-50 text-gray-500 text-sm"
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
                  className="w-full px-3 py-2 text-left hover:bg-gray-50 text-gray-900 text-sm"
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Stock Toggle */}
        <div className="min-w-[120px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stok
          </label>
          <button
            type="button"
            onClick={() => setFilters({ ...filters, stock: filters.stock === 1 ? 0 : 1 })}
            className={`w-full border rounded-lg px-3 py-2 text-sm transition-colors ${
              filters.stock === 1 
                ? "border-green-500 bg-green-50 text-green-700" 
                : filters.stock === 0
                ? "border-red-500 bg-red-50 text-red-700"
                : "border-gray-300 hover:border-gray-400 text-gray-700"
            }`}
          >
            {filters.stock === 1 ? "Stokda var" : filters.stock === 0 ? "Stokda yoxdur" : "Stok seçin"}
          </button>
        </div>

        {/* Clear Button */}
        <button
          onClick={handleClear}
          className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors p-2"
          title="Filterləri təmizlə"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Apply Button */}
        <button
          onClick={handleApply}
          className="bg-[#E23359] hover:bg-[#E23359]/90 text-white px-6 py-2 rounded-lg font-medium transition-colors text-sm"
        >
          Tətbiq et
        </button>
      </div>

      {/* Price Range */}
      <div className="mt-4 pt-4 border-t border-[#F3F2F8]">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Qiymət aralığı
        </label>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <input
              type="number"
              placeholder="Min qiymət"
              value={filters.min_price || ""}
              onChange={(e) => setFilters({ ...filters, min_price: e.target.value ? Number(e.target.value) : undefined })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              {filters.min_price ? `${formatPrice(filters.min_price)} AZN` : "0 AZN"}
            </p>
          </div>
          <div className="text-gray-400">-</div>
          <div className="flex-1">
            <input
              type="number"
              placeholder="Max qiymət"
              value={filters.max_price || ""}
              onChange={(e) => setFilters({ ...filters, max_price: e.target.value ? Number(e.target.value) : undefined })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              {filters.max_price ? `${formatPrice(filters.max_price)} AZN` : "Max qiymət"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
