import { getAllProducts, getShowProduct } from "./api";
import { queryKeys, createQueryOptions } from "@/lib/query-config";

export const productQueries = {
    all: () => 
        createQueryOptions(
            queryKeys.products.all(),
            getAllProducts,
            {
                staleTime: 3 * 60 * 1000, // 3 minutes for all products
            }
        ),
    show: (id: number) => 
        createQueryOptions(
            queryKeys.products.byId(id),
            () => getShowProduct(id),
            {
                staleTime: 10 * 60 * 1000, // 10 minutes for single product
            }
        ),
};


