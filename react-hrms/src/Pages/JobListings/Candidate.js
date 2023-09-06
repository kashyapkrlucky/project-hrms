import React, { useEffect, useState } from 'react';
import HttpClient from '../../HttpClient';
import { EllipsisHorizontalCircleIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { interviewStatus } from '../../Utils/DataService';

function Candidate({ item, getJobInfo }) {
    const onStatusUpdate = async (e) => {
        const { status } = await HttpClient.put('recruitment/update/status', { _id: item._id, status: e });
        if (status === 200) {
            getJobInfo();
        }
    }
    const [curStatus, setCurStatus] = useState({});
    
    useEffect(() => {
        const status = interviewStatus.find(x => x._id === item.status);
        setCurStatus(status);
    }, [item]);
    return (
        <div className={'flex flex-row gap-4 py-2 justify-between'}>
            <div className='flex flex-col gap-2 w-1/4'>
                <h3 className='uppercase text-sm text-slate-600'>Name</h3>
                <h3 className='text-xl font-light'>{item.firstName} {item.lastName}</h3>
            </div>
            <div className='flex flex-col gap-2 w-1/4 text-sm'>
                <h3 className='uppercase text-slate-600'>Contact</h3>
                <div className='flex flex-row gap-2 items-center'>
                    <EnvelopeIcon className='w-5 h-5' /> <span>{item.email}</span>
                </div>
                <div className='flex flex-row gap-2 items-center'>
                    <PhoneIcon className='w-5 h-5' /> <span>{item.mobile}</span>
                </div>
            </div>
            <div className='flex flex-col gap-2 w-1/4 text-sm'>
                <h3 className='uppercase text-slate-600'>Interview Status</h3>
                <div className={'flex flex-row gap-2 ' + curStatus.color}>
                    <EllipsisHorizontalCircleIcon className='w-5 h-5' />
                    <span>{curStatus.name}</span>
                </div>
            </div>
        </div>
    )
}

export default Candidate
