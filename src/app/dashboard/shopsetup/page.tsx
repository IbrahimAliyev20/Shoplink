import ShopSetup from '@/components/dashboard/shopsetup/ShopSetup'
import React from 'react'

function SetupPage() {
  return (
    <div className='space-y-12 max-md:space-y-8'>
      <h1 className='text-3xl font-medium text-gray-900 max-md:text-2xl'>İdarə paneli</h1>
      <ShopSetup />
    </div>
  )
}

export default SetupPage