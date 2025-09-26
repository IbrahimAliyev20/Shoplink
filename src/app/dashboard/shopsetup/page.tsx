import ShopSetup from '@/components/dashboard/shopsetup/ShopSetup'
import React from 'react'

function SetupPage() {
  return (
    <div className='p-6 space-y-12 max-md:p-4 max-md:space-y-8'>
      <h1 className='text-3xl font-medium text-gray-900 max-md:text-2xl'>Dashboard</h1>
      <ShopSetup />
    </div>
  )
}

export default SetupPage