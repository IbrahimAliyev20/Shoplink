import { createQueryOptions } from "@/lib/query-config";
import { queryKeys } from "@/lib/query-config";
import { getMetaTags } from "./api";
import { MetaTagsTypes } from "@/types";

export const getMetaTagsOptions = () => {
  return createQueryOptions<{ data: MetaTagsTypes[] }>(
    queryKeys.home.metaTags(),
    getMetaTags,
    {
      staleTime: 10 * 60 * 1000,
    }
  );
};
