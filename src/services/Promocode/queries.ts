import { queryOptions } from "@tanstack/react-query";
import { getPromocode } from "./api";


const getPromocodeOptions = () => {
    return queryOptions({
        queryKey: ['promocode-options'],
        queryFn: () => getPromocode()
    })
}

export default getPromocodeOptions;