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
 * Optimized hook for managing product data with deduplication
 * This hook intelligently determines which query to use based on current state
 * and prevents multiple simultaneous API calls
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

  const {
    data: filteredProducts = [],
    isLoading: isFilteredLoading,
    isError: isFilteredError,
  } = useQuery({
    ...getFilteredProductsStoreOptions(filters),
    enabled: queryStrategy === "filtered",
  });

  const {
    data: searchProducts = [],
    isLoading: isSearchLoading,
    isError: isSearchError,
  } = useQuery({
    ...getAllProductsStoreOptions(storeSlug, debouncedSearchTerm),
    enabled: queryStrategy === "search",
  });

  const {
    data: categoryProducts = [],
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = useQuery({
    ...getProductStoreCategoryOptions(storeSlug, categoryName),
    enabled: queryStrategy === "category" && !!categoryName,
  });

  const {
    data: allProducts = [],
    isLoading: isAllLoading,
    isError: isAllError,
  } = useQuery({
    ...getAllProductsStoreOptions(storeSlug),
    enabled: queryStrategy === "all",
  });

  // Return the appropriate data based on strategy
  const products: ProductStoreCategory[] = useMemo(() => {
    switch (queryStrategy) {
      case "filtered":
        return filteredProducts;
      case "search":
        return searchProducts;
      case "category":
        return categoryProducts;
      case "all":
      default:
        return allProducts;
    }
  }, [queryStrategy, filteredProducts, searchProducts, categoryProducts, allProducts]);

  const isLoading = useMemo(() => {
    switch (queryStrategy) {
      case "filtered":
        return isFilteredLoading;
      case "search":
        return isSearchLoading;
      case "category":
        return isCategoryLoading;
      case "all":
      default:
        return isAllLoading;
    }
  }, [queryStrategy, isFilteredLoading, isSearchLoading, isCategoryLoading, isAllLoading]);

  const isError = useMemo(() => {
    switch (queryStrategy) {
      case "filtered":
        return isFilteredError;
      case "search":
        return isSearchError;
      case "category":
        return isCategoryError;
      case "all":
      default:
        return isAllError;
    }
  }, [queryStrategy, isFilteredError, isSearchError, isCategoryError, isAllError]);

  return {
    products,
    isLoading,
    isError,
    queryStrategy,
  };
}
