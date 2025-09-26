import { queryOptions } from "@tanstack/react-query";
import { getAllProducts, getShowProduct } from "./api";

export const productQueries = {
    all: () => 
        queryOptions({
            queryKey: ['products'],
            queryFn: getAllProducts,
        }),
    show: (id: number) => 
        queryOptions({
            queryKey: ['product', id],
            queryFn: () => getShowProduct(id),
        }),
  
};


