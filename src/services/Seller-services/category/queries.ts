import { getCategoryProducts, getShowCategory } from "./api";
import { queryKeys, createQueryOptions } from "@/lib/query-config";

export const categoryQueries = {
    all: () => 
        createQueryOptions(
            queryKeys.categories.all(),
            getCategoryProducts,
            {
                staleTime: 15 * 60 * 1000, // 15 minutes for categories
            }
        ),
    show: (id: number) => 
        createQueryOptions(
            queryKeys.categories.byId(id),
            () => getShowCategory(id),
            {
                staleTime: 10 * 60 * 1000, // 10 minutes for individual categories
            }
        ),
};


