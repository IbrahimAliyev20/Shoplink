import { getAdvantages } from "./api";
import { queryKeys, createQueryOptions } from "@/lib/query-config";

export const getAdvantagesOptions = function(){
    return createQueryOptions(
        queryKeys.home.advantages(),
        () => getAdvantages(),
        {
            staleTime: 30 * 60 * 1000, // 30 minutes for advantages (rarely changes)
        }
    );
};

