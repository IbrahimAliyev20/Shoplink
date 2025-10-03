import getTrackNumber from "./api";
import { queryOptions } from "@tanstack/react-query";

const getTrackNumberOptions = (slug: string) => {
    return queryOptions({
        queryKey: ['track-number', slug],
        queryFn: () => getTrackNumber(slug)
    });
};

export default getTrackNumberOptions;