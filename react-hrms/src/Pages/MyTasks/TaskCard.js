import React from 'react';
import { CheckCircleIcon, EllipsisHorizontalCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import BtnOutline from '../../Common/BtnOutline';
import BtnSolid from '../../Common/BtnSolid';
import Moment from 'react-moment';

function TaskCard({ item, defaults, onUpdate, onDelete }) {
    return (
        <div className='flex flex-row items-center justify-between pt-2'>
            <div className='w-6'>
                {
                    item.status === "3" ?
                        <CheckCircleIcon className='w-6 h-6 text-green-500' /> :
                        (item.status === "2" ?
                            <EllipsisHorizontalCircleIcon className='w-6 h-6 text-amber-500' /> :
                            <ExclamationCircleIcon className='w-6 h-6' />
                        )
                }

            </div>
            <div className='w-9/12'>
                <p>{item?.title}</p>
                <p className='text-slate-500 text-xs capitalize'>{defaults.tagList[item.tag - 1]?.name} . <span className='text-blue-500'><Moment format="dddd, MMM D">{item.createdAt}</Moment></span></p>
            </div>
            <div className='w-2/12 flex flex-row justify-end gap-4'>
                <BtnOutline label="Edit" onClick={() => onUpdate(item)} />
                <BtnSolid label="Delete" onClick={() => onDelete(item._id)} />
            </div>
        </div>
    )
}

export default TaskCard
