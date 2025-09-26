
import AccountPage from "@/components/market/account/AccountPage";
import { getUserAction } from "@/services/auth/server-actions"; 
import { redirect } from "next/navigation"; 

export default async function Account() {
  
  const user = await getUserAction();

  if (!user) {
    redirect('/login');
  }

  return <AccountPage user={user} />;
}