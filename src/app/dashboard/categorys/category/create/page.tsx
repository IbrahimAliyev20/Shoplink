import { CREATE_CATEGORY_META } from '@/utils/MetaTagsData';
import { Metadata } from 'next';
import React from 'react'
import CategoryCreate from '@/components/dashboard/contract/category/CategoryCreat'

export const metadata: Metadata = {
  title: CREATE_CATEGORY_META.title,
  description: CREATE_CATEGORY_META.meta_description,
  keywords: CREATE_CATEGORY_META.meta_keywords,
};

function CategoryCreatePage() {
  return (
    <div>
       <CategoryCreate />
    </div>
  )
}

export default CategoryCreatePage