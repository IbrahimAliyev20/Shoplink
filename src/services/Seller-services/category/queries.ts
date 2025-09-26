import { queryOptions } from "@tanstack/react-query";
import { getCategoryProducts, getShowCategory } from "./api";

export const categoryQueries = {
    all: () => 
        queryOptions({
            queryKey: ['category'],
            queryFn: getCategoryProducts,
        }),
    show: (id: number) => 
        queryOptions({
            queryKey: ['category', id],
            queryFn: () => getShowCategory(id),
        }),
  
};


