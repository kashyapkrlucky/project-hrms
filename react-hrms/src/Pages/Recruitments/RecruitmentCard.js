import React, { useEffect, useState } from 'react'
import { cards } from '../../Utils/Classes'
import { BriefcaseIcon, ClockIcon, EllipsisHorizontalCircleIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';

import Moment from 'react-moment';
import OfferStatus from './OfferStatus';
import { interviewStatus } from '../../Utils/DataService';
import Avatar from '../../Components/Avatar';

function RecruitmentCard({ item, getRecruitments }) {
    const [curStatus, setCurStatus] = useState({});
    
    useEffect(() => {
        const status = interviewStatus.find(x => x._id === item.status);
        setCurStatus(status);
    }, [item]);
    return (
        <div className={cards + ' flex flex-row gap-4 justify-between'}>
            <div className='flex flex-col gap-2 w-1/5'>
                <h3 className='uppercase text-sm text-slate-600'>Name</h3>
                <h3 className='text-xl font-light'>{item.firstName} {item.lastName}</h3>
            </div>
            <div className='flex flex-col gap-2 w-1/5 text-sm'>
                <h3 className='uppercase text-slate-600'>Contact</h3>
                <div className='flex flex-row gap-2 items-center'>
                    <EnvelopeIcon className='w-5 h-5' /> <span>{item.email}</span>
                </div>
                <div className='flex flex-row gap-2 items-center'>
                    <PhoneIcon className='w-5 h-5' /> <span>{item.mobile}</span>
                </div>
            </div>
            <div className='flex flex-col gap-2 w-1/5 text-sm'>
                <h3 className='uppercase text-slate-600'>Job Information</h3>
                <div className='flex flex-row gap-2 items-center'>
                    <BriefcaseIcon className='w-5 h-5' /> <span>{item.jobId.profile.name}</span>
                </div>
                <div className='flex flex-row gap-2 items-center'>
                    <Avatar url={item?.recruiter.avatar} classes='w-5 h-5' /> <span>{item?.recruiter.firstName} {item?.recruiter.lastName}</span>
                </div>
            </div>
            <div className='flex flex-col gap-2 w-1/5 text-sm'>
                <h3 className='uppercase text-slate-600'>Current Status</h3>
                <div className='flex flex-row gap-2 items-center'>
                    <ClockIcon className='w-5 h-5' /> <span><Moment fromNow>{item.createdAt}</Moment></span>
                </div>
                <div className={'flex flex-row gap-2 ' + curStatus.color}>
                    <EllipsisHorizontalCircleIcon className='w-5 h-5' />
                    <span>{curStatus.name}</span>
                </div>
            </div>
            <div className='flex flex-col gap-2 w-1/5 text-sm'>
                <OfferStatus item={item} getRecruitments={getRecruitments} />
            </div>
        </div>
    )
}

export default RecruitmentCard
