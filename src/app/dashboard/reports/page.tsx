import ReportsPage from '@/components/dashboard/reports/ReportsPage'
import React from 'react'

const Reports = () => {
  return (
        <div className='space-y-12 max-md:space-y-6'>

          <div>
            <h1 className="text-xl font-medium text-gray-900 max-md:text-lg">Hesabatlar</h1>
          </div>  
          <div>

          <ReportsPage />
          </div>
        </div>
  )
}

export default Reports