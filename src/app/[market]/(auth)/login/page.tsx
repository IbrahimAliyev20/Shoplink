import React from "react";
import LoginMarketUser from "@/components/auth/LoginUser";
import { Metadata } from "next";
import { MARKET_LOGIN_META } from "@/utils/MetaTagsData";

export const metadata: Metadata = {
  title: MARKET_LOGIN_META.title,
  description: MARKET_LOGIN_META.meta_description,
  keywords: MARKET_LOGIN_META.meta_keywords,
};

function LoginMarketUserPage() {
  return (
    <div>
      <LoginMarketUser />
    </div>
  );
}

export default LoginMarketUserPage;
