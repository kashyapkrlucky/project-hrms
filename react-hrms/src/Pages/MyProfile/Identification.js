import React from 'react';

function Identification() {
  return (
    <div className="px-3">
      
      <div className="flex flex-row font-medium">
        <div className='w-1/3 pt-4'>
          ID Number
        </div>
        <div className='w-1/3 pt-4'>
          ID Name
        </div>
        <div className='w-1/3 pt-4'>
          Valid Till
        </div>
      </div>
      <div className="border-t border-gray-100 flex flex-row text-sm text-slate-600">
      <div className='w-1/3 pt-4'>
          782787298398
        </div>
        <div className='w-1/3 pt-4'>
          Voter Id
        </div>
        <div className='w-1/3 pt-4'>
          2026
        </div>
      </div>
    </div>
  )
}

export default Identification
