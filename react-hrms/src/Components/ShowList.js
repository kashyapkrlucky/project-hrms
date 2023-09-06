import React from 'react'

function ShowList({ list }) {
    return (
        <div className="divide-y divide-gray-100 bg-white rounded-lg">
            {
                list.map((item, index) => (
                    <p key={index} className='text-xs font-light text-slate-400 py-1'>
                        {item}
                    </p>
                ))
            }
        </div>
    )
}

export default ShowList
