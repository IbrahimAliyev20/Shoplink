import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  CategoryStore,
  ProductStoreCategory,
} from "@/types/storeforusers/types";
import {
  getAllProductsStoreOptions,
  getProductStoreCategoryOptions,
  getFilteredProductsStoreOptions,
} from "@/services/User-services/StoreForUsers/queries";

interface ProductFilters {
  category_id?: number;
  min_price?: number;
  max_price?: number;
  stock?: 0 | 1;
}

interface UseProductsDataProps {
  storeSlug: string;
  activeTab: string;
  debouncedSearchTerm: string;
  filters: ProductFilters;
  categories: CategoryStore[];
}

/**
 * Optimized hook for managing product data with single query
 * This hook uses a single useQuery instance with dynamic query options
 * to prevent cache bloat and unnecessary re-renders
 */
export function useProductsData({
  storeSlug,
  activeTab,
  debouncedSearchTerm,
  filters,
  categories,
}: UseProductsDataProps) {
  
  // Determine which query strategy to use
  const queryStrategy = useMemo(() => {
    const hasActiveFilters = Object.values(filters).some(value => 
      value !== undefined && value !== null && value !== ""
    );
    
    const hasSearchTerm = debouncedSearchTerm.length > 0;
    const isAllProductsTab = activeTab === "all";
    
    // Priority order: Filters > Search > Category > All Products
    if (hasActiveFilters) {
      return "filtered";
    }
    
    if (hasSearchTerm) {
      return "search";
    }
    
    if (!isAllProductsTab) {
      return "category";
    }
    
    return "all";
  }, [activeTab, debouncedSearchTerm, filters]);

  // Get category name for category queries
  const categoryName = useMemo(() => {
    if (queryStrategy !== "category") return "";
    
    const category = categories.find(cat => cat.slug === activeTab);
    return category?.name || "";
  }, [queryStrategy, activeTab, categories]);

  // Dynamically select query options based on strategy (single query approach)
  const queryOptions = useMemo(() => {
    switch (queryStrategy) {
      case "filtered":
        return getFilteredProductsStoreOptions(filters);
      case "search":
        return getAllProductsStoreOptions(storeSlug, debouncedSearchTerm);
      case "category":
        return getProductStoreCategoryOptions(storeSlug, categoryName);
      case "all":
      default:
        return getAllProductsStoreOptions(storeSlug);
    }
  }, [queryStrategy, filters, storeSlug, debouncedSearchTerm, categoryName]);

  // Single useQuery hook with dynamic options
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery<ProductStoreCategory[]>({
    ...queryOptions,
    // Enable query only when we have valid data
    enabled: queryStrategy !== "category" || !!categoryName,
  });

  return {
    products,
    isLoading,
    isError,
    queryStrategy,
  };
}
