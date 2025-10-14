import ReportsPage from '@/components/dashboard/reports/ReportsPage'
import React from 'react'
import { Metadata } from "next";
import { REPORTS_META } from "@/utils/MetaTagsData";

export const metadata: Metadata = {
  title: REPORTS_META.title,
  description: REPORTS_META.meta_description,
  keywords: REPORTS_META.meta_keywords,
};

const Reports = () => {
  return (
        <div className='space-y-7 max-md:space-y-6'>

          <div>
            <h1 className="text-xl font-medium text-gray-900 max-md:text-lg">Hesabatlar</h1>
          </div>  

          <ReportsPage />
        </div>
  )
}

export default Reports