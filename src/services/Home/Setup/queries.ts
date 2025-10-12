import { getSetup } from "./api";
import { queryKeys, createQueryOptions } from "@/lib/query-config";

export const getSetupOptions = function(){
    return createQueryOptions(
        queryKeys.home.setup(),
        () => getSetup(),
        {
            staleTime: 30 * 60 * 1000, // 30 minutes for setup info (rarely changes)
        }
    );
};

