import React from 'react'
import RegisterUser from '@/components/auth/RegistrUser'
import { Metadata } from "next";
import { MARKET_REGISTER_META } from "@/utils/MetaTagsData";

export const metadata: Metadata = {
  title: MARKET_REGISTER_META.title,
  description: MARKET_REGISTER_META.meta_description,
  keywords: MARKET_REGISTER_META.meta_keywords,
};

function RegisterUserPage() {
  return (
    <div>
      <RegisterUser />
    </div>
  )
}

export default RegisterUserPage