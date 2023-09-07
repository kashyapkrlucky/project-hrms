import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'

function MoreMenu({ list }) {
    const [showMenu, setShowMenu] = useState(false);
    const onShowMenu = (val) => {
        setShowMenu(val);
    }
    return (
        <div className='relative'>
            <button className='mr-1' onClick={() => onShowMenu(true)}>
                <EllipsisVerticalIcon className='w-6 h-6' />
            </button>
            {showMenu && <div className='absolute right-0 z-50 w-32 origin-top-right rounded-md bg-white px-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none flex flex-col divide-y divide-slate-200'>
                {
                    list.map((l, i) => (
                        <p key={i} className='cursor-pointer py-2' onClick={l.action}>{l.label}</p>
                    ))
                }
                <p className='cursor-pointer py-2' onClick={() => onShowMenu(false)}>Close</p>
            </div>}

        </div>
    )
}

export default MoreMenu