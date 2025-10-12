import { getContact } from "./api";
import { queryKeys, createQueryOptions } from "@/lib/query-config";

const getContactQuery = () => { 
    return createQueryOptions(
        queryKeys.home.contact(),
        () => getContact(),
        {
            staleTime: 30 * 60 * 1000, // 30 minutes for contact info (rarely changes)
        }
    );
};

export { getContactQuery };
