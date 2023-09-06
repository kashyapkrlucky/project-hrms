import React from 'react'

function LabelDropDown({ label = "", value, list = [], ...others }) {
    return (
        <div className='flex flex-col w-full'>
            {
                label &&
                <label className="block text-sm font-medium leading-6 text-gray-900 capitalize mb-2">{label}</label>
            }
            <select value={value} {...others} className='block w-full capitalize rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-50 sm:text-sm sm:leading-6'>
                <option value="">Select</option>
                {
                    list.map((l, index) => (
                        <option key={index} value={l._id || l.id}>{l.name}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default LabelDropDown
