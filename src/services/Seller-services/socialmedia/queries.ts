import { createQueryOptions, queryKeys } from "@/lib/query-config";
import { getSocialMediaDashboard } from "./api";

export const SocialMediaDashboardQuery = () => {
  return createQueryOptions(
    queryKeys.socialMedia.dashboard(),
    getSocialMediaDashboard,
    {
      staleTime: 2 * 60 * 1000,
    }
  );
};
