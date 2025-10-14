
import SettingsPage from '@/components/dashboard/settings/SettingsPage'
import React from 'react'
import { Metadata } from "next";
import { SETTINGS_META } from "@/utils/MetaTagsData";

export const metadata: Metadata = {
  title: SETTINGS_META.title,
  description: SETTINGS_META.meta_description,
  keywords: SETTINGS_META.meta_keywords,
};

const Settings = async () => {

  return (
    <div>
      <SettingsPage />
      </div>
  )
}

export default Settings