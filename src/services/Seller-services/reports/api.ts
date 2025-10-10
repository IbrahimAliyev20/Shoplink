import { get } from "@/lib/api";
import { Report } from "@/types";

export type ReportFilterParams = {
  created_at?: string;
  category_id?: string;
  stock?: string;
  brand_id?: string;
};

export const getReports = async (filters: ReportFilterParams) => {
  const queryParams = new URLSearchParams();

  if (filters.created_at) queryParams.append("created_at", filters.created_at);
  if (filters.category_id) queryParams.append("category_id", filters.category_id);
  if (filters.stock) queryParams.append("stock", filters.stock);
  if (filters.brand_id) queryParams.append("brand_id", filters.brand_id);
  
  const queryString = queryParams.toString();
  
  const response = await get<{ data: Report[] }>(`user/reports?${queryString}`);
  
  return response.data;
};
