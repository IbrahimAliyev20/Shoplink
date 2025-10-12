import getTrackNumber from "./api";
import { queryKeys, createQueryOptions } from "@/lib/query-config";

const getTrackNumberOptions = (slug: string) => {
    return createQueryOptions(
        queryKeys.trackNumber(slug),
        () => getTrackNumber(slug),
        {
            staleTime: 1 * 60 * 1000, // 1 minute for tracking info
        }
    );
};

export default getTrackNumberOptions;