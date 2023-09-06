import React from 'react'

function LabelInput({ label = "", ...others }) {
    return (
        <div className='flex flex-col w-full'>
            {
                label &&
                <label className="block text-sm font-medium leading-6 text-gray-900 capitalize mb-2">{label}</label>
            }
            <input {...others} className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-50 sm:text-sm sm:leading-6" />
        </div>
    )
}

export default LabelInput
