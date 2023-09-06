import React from 'react'

function Skills() {
  return (
    <div className="px-3">
      <div className="flex flex-row font-medium">
        <div className='w-1/3 pt-4'>
          Name
        </div>
        <div className='w-1/3 pt-4'>
          Rating
        </div>
        <div className='w-1/3 pt-4'>
          Assessment Done
        </div>
      </div>
      <div className="border-t border-gray-100 flex flex-row text-sm text-slate-600">
      <div className='w-1/3 pt-4'>
          JavaScript
        </div>
        <div className='w-1/3 pt-4'>
          9
        </div>
        <div className='w-1/3 pt-4'>
          Yes
        </div>
      </div>
    </div>
  )
}

export default Skills
