import { queryOptions } from "@tanstack/react-query";
import { getCategoryProducts, getShowCategory } from "./api";

export const categoryQueries = {
    all: () => 
        queryOptions({
            queryKey: ['categories'],
            queryFn: getCategoryProducts,
        }),
    show: (id: number) => 
        queryOptions({
            queryKey: ['categories', id],
            queryFn: () => getShowCategory(id),
        }),
  
};


