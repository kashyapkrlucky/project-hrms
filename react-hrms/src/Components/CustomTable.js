import React from 'react'
import BtnOutline from '../Common/BtnOutline'
import { textTheme } from '../Utils/Classes'

function CustomTable({ items, headers, editAction }) {
    return (
        <div className='flex flex-col gap-2'>
            <div className={`flex justify-between font-medium text-sm ${textTheme}`}>
                {
                    headers.map((h, i) => (
                        <div key={i} className={`w-1/${headers.length} ` + 'flex capitalize'}>{h}</div>
                    ))
                }
                <div className={`w-1/${headers.length} ` + 'flex'}>Actions</div>
            </div>
            {
                items?.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                        {
                            headers.map((h, i) => (
                                <div key={i} className={`w-1/${headers.length} ` + 'flex items-center'}>{item[h]}</div>
                            ))
                        }
                        <div className={`w-1/${headers.length} ` + 'flex'}>
                            <BtnOutline type="button" label="Edit" onClick={() => editAction(item['_id'])} />
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default CustomTable
