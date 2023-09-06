import React, { useEffect, useState } from 'react'
import LabelDropDown from '../Common/LabelDropDown'
import { EllipsisHorizontalCircleIcon, PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { interviewStatus } from '../Utils/DataService';

function UpdateStatus({ status, onUpdate }) {
    const [isEdit, setIsEdit] = useState(false);

    const [curStatus, setCurStatus] = useState({});
    const onChange = (e) => {
        const { value } = e.target;
        const item = interviewStatus.find(x => x._id === value);
        setCurStatus(item);
        onUpdate(item._id);
        setIsEdit(false);
    }
    useEffect(() => {
        const item = interviewStatus.find(x => x._id === status);
        setCurStatus(item);
    }, []);
    return (
        <div className='flex flex-row gap-2 items-center'>
            {
                isEdit ?
                    (
                        <>
                            <LabelDropDown name="curStatus" value={curStatus._id} list={interviewStatus} onChange={onChange} />
                            <button onClick={() => setIsEdit(false)}>
                                <XMarkIcon className='w-5 h-5' />
                            </button>
                        </>
                    ) :
                    (
                        <>
                            <div className={'flex flex-row gap-2 ' + curStatus.color}>
                                <EllipsisHorizontalCircleIcon className='w-5 h-5' />
                                <span>{curStatus.name}</span>
                            </div>
                            <button onClick={() => setIsEdit(true)}>
                                <PencilSquareIcon className='w-5 h-5' />
                            </button>
                        </>
                    )
            }
        </div>
    )
}

export default UpdateStatus
