import { queryOptions } from "@tanstack/react-query";
import { getSubscribes } from "./api";

export const getSubscribesQuery = () => {
    return queryOptions({
        queryKey: ["subscribes"],
        queryFn: getSubscribes,
    });
};