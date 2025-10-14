import { Metadata } from "next";
import { DASHBOARD_META } from "@/utils/MetaTagsData";
import DashboardPage from "@/components/dashboard/panel/PanelPage";

export const metadata: Metadata = {
  title: DASHBOARD_META.title,
  description: DASHBOARD_META.meta_description,
  keywords: DASHBOARD_META.meta_keywords,
};

export default function Dashboard() {
  return <DashboardPage />;
}
