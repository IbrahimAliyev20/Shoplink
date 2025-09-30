import { queryOptions } from "@tanstack/react-query";
import { getContact } from "./api";

const getContactQuery = () => { 
    return queryOptions({
        queryKey: ["contact"],
        queryFn: () => getContact(),
    });
};

export { getContactQuery };
