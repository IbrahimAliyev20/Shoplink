import { getPromocode } from "./api";
import { queryKeys, createQueryOptions } from "@/lib/query-config";

const getPromocodeOptions = () => {
    return createQueryOptions(
        queryKeys.promocodes(),
        () => getPromocode(),
        {
            staleTime: 5 * 60 * 1000, // 5 minutes for promocodes
        }
    );
};

export default getPromocodeOptions;