import React from 'react';

function BankDetails() {
  return (
    <div className="px-3">
      <div className="flex flex-row font-medium">
        <div className='w-1/4 pt-4'>
          Bank Name
        </div>
        <div className='w-1/4 pt-4'>
          Holder Name
        </div>
        <div className='w-1/4 pt-4'>
          Account Number
        </div>
        <div className='w-1/4 pt-4'>
          IFSC
        </div>
      </div>
      <div className="mt-6 border-t border-gray-100 flex flex-row text-sm text-slate-600">
        <div className='w-1/4 pt-4'>
          IFSC
        </div>
        <div className='w-1/4 pt-4'>
          Peter Cullen
        </div>
        <div className='w-1/4 pt-4'>
          3456823874904
        </div>
        <div className='w-1/4 pt-4'>
          IFSC003456
        </div>
      </div>
    </div>
  )
}

export default BankDetails
