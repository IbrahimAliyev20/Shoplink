"use client";

import React, { useState, useEffect } from "react";
import ProductList from "./shared/ProductList";
import { useQuery } from "@tanstack/react-query";
import { CategoryStore } from "@/types/storeforusers/types";
import {
  getAllProductsStoreOptions,
  getProductStoreCategoryOptions,
} from "@/services/User-services/StoreForUsers/queries";

interface TabsMarketProps {
  categories: CategoryStore[];
  storeSlug: string;
}

const TabsMarket: React.FC<TabsMarketProps> = ({ categories, storeSlug }) => {
  const allTabs = [
    { id: -1, name: "Bütün məhsullar", slug: "all" },
    ...categories,
  ];

  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery(
    debouncedSearchTerm
      ? getAllProductsStoreOptions(storeSlug, debouncedSearchTerm)
      : activeTab === "all"
      ? getAllProductsStoreOptions(storeSlug)
      : getProductStoreCategoryOptions(storeSlug, activeTab)
  );

  return (
    <div>
      <div className="border-b border-gray-200 mb-6 max-md:mb-4">
        <div className="flex overflow-x-auto scrollbar-hide max-md:pb-1">
          <div className="flex min-w-max space-x-4 sm:space-x-8 max-md:space-x-6">
            {allTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.slug)}
                className={`px-0 py-3 text-xs sm:text-sm font-medium transition-colors duration-200 relative whitespace-nowrap cursor-pointer max-md:py-2 max-md:text-xs ${
                  activeTab === tab.slug
                    ? "text-black border-b-2 border-black"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="my-6 max-md:my-4">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 items-start sm:items-center max-md:gap-3">
          <div className="relative w-full sm:max-w-xs">
            <input
              type="text"
              placeholder="Məhsul axtarın"
              className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none text-sm max-md:py-2.5 max-md:px-3 max-md:text-sm max-md:h-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 max-md:w-4 max-md:h-4 max-md:right-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button className="flex items-center gap-2 border border-gray-300 rounded-md py-2 px-3 sm:px-4 hover:bg-gray-50 transition w-full sm:w-auto justify-center max-md:h-10 max-md:px-3">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 max-md:w-4 max-md:h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4h18M3 10h12M3 16h6"
              />
            </svg>
            <span className="font-medium text-xs sm:text-sm max-md:text-xs">
              Filter
            </span>
          </button>
        </div>

        <div className="mt-4 sm:mt-6 max-md:mt-3">
          {!isLoading && !isError && (
            <p className="text-xs sm:text-sm text-gray-600 max-md:text-xs">
              {products.length} məhsul
            </p>
          )}
        </div>
      </div>

      {isLoading && <p>Məhsullar yüklənir...</p>}
      {isError && <p>Məhsulları yükləyərkən xəta baş verdi.</p>}
      {!isLoading && !isError && products.length === 0 && (
        <p>
          {debouncedSearchTerm
            ? "Axtarışa uyğun məhsul tapılmadı."
            : "Bu kateqoriyada məhsul yoxdur."}
        </p>
      )}
      {!isLoading && !isError && products.length > 0 && (
        <ProductList products={products} storeSlug={storeSlug} />
      )}
    </div>
  );
};

export default TabsMarket;
