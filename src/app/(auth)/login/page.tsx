import LoginSeller from "@/components/auth/LoginSeller";
import React from "react";
import { Metadata } from "next";
import { LOGIN_META } from "@/utils/MetaTagsData";

export const metadata: Metadata = {
  title: LOGIN_META.title,
  description: LOGIN_META.meta_description,
  keywords: LOGIN_META.meta_keywords,
};


function LoginSellerPage() {
  return (
    <div>
      <LoginSeller />
    </div>
  );
}

export default LoginSellerPage;
