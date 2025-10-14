import RegisterSeller from "@/components/auth/RegistrSeller";
import React from "react";
import { Metadata } from "next";
import { REGISTER_META } from "@/utils/MetaTagsData";

export const metadata: Metadata = {
  title: REGISTER_META.title,
  description: REGISTER_META.meta_description,
  keywords: REGISTER_META.meta_keywords,
};

function RegisterSellerPage() {
  return (
    <div>
      <RegisterSeller />
    </div>
  );
}

export default RegisterSellerPage;
