import AccountPage from "@/components/market/account/AccountPage";
import { getUser } from "@/services/auth/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { MARKET_ACCOUNT_META } from "@/utils/MetaTagsData";

export const metadata: Metadata = {
  title: MARKET_ACCOUNT_META.title,
  description: MARKET_ACCOUNT_META.meta_description,
  keywords: MARKET_ACCOUNT_META.meta_keywords,
};

export default async function Account() {
  const token = (await cookies()).get("access_token")?.value;
  const user = await getUser(token || "");

if (!user?.data) {
  redirect("/");
}
  return <AccountPage user={user?.data} />;
}