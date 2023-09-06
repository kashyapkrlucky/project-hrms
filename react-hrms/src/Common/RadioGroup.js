import React from 'react'

function RadioGroup({ list = [], name, ...others }) {
  return (
    <div className='flex flex-row gap-4'>
      {list.map((l, i) => (
        <div className='flex flex-row items-center gap-4' key={i}>
          <input
            id={l}
            name={name}
            type="radio"
            value={l}
            className={`h-4 w-4 rounded border-gray-300 text-rose-500 focus:ring-rose-500`}
            {...others}
          />
          <label htmlFor={l} className="block text-sm font-medium leading-6 text-gray-900 capitalize">
            {l}
          </label>
        </div>
      ))}
    </div>
  )
}

export default RadioGroup
