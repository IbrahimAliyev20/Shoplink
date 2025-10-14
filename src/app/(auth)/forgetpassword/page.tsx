import React from "react";
import ForgetPassword from "@/components/auth/ForgetPassword";
import { Metadata } from "next";
import { FORGOT_PASSWORD_META } from "@/utils/MetaTagsData";

export const metadata: Metadata = {
  title: FORGOT_PASSWORD_META.title,
  description: FORGOT_PASSWORD_META.meta_description,
  keywords: FORGOT_PASSWORD_META.meta_keywords,
};

const ForgetPasswordPage = () => {
  return (
    <div>
      <ForgetPassword />
    </div>
  );
};

export default ForgetPasswordPage;
