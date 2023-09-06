import React from 'react'
import BtnSolid from '../../Common/BtnSolid'
import BtnOutline from '../../Common/BtnOutline'

function DayInfo({ selectedDate, setIsFormOpen }) {
    return (
        <div className="flex flex-col bg-white rounded-lg w-4/6 h-5/6">
            <div className='flex flex-row justify-between items-center rounded-t-lg bg-slate-100 p-4'>
                <div>
                    Title : {selectedDate.toLocaleString()}
                </div>
                <div className='flex flex-row gap-4'>
                    <BtnSolid label="Add Task" />
                    <BtnOutline label="Close" onClick={() => setIsFormOpen(false)} />
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}

export default DayInfo
