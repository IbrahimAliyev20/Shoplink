import AccountPage from "@/components/market/account/AccountPage";
import { getUser } from "@/services/auth/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Account() {
  const token = (await cookies()).get("access_token")?.value;
  const user = await getUser(token || "");

if (!user?.data) {
  redirect("/");
}
  return <AccountPage user={user?.data} />;
}