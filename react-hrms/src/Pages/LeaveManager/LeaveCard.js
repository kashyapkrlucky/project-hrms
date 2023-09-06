import React, { useState } from 'react'
import Moment from 'react-moment';
import { leaveTypes } from '../../Utils/DataService';
import BtnOutline from '../../Common/BtnOutline';
import LeaveStatus from './LeaveStatus';
import HttpClient from '../../HttpClient';
import BtnSolid from '../../Common/BtnSolid';
import EmployeeName from '../../Components/EmployeeName';

function LeaveCard({ item, loadData, type }) {
    const labelStyle = 'text-xs text-slate-500 uppercase';
    const valueStyle = 'text-md font-medium capitalize';
    const updateStatus = async (id, leaveType, leaveStatus) => {
        const payload = {
            id,
            balanceId: item.balance,
            leaveType,
            status: leaveStatus
        }
        const { status } = await HttpClient.post(`/leave/update/status`, payload);
        if (status === 200) {
            loadData();
        }
    }

    return (
        <div className='flex flex-col pt-4'>
            <div className='flex flex-row gap-1 text-xs text-slate-500 uppercase'>
                <div className='w-40'>Employee</div>
                <div className='w-28'>Leave Type</div>
                <div className='w-36'>Reason</div>
                <div className='w-16'>Half Day</div>
                <div className='w-28'>From</div>
                <div className='w-28'>To</div>
                <div className='w-12'>Days</div>
                <div className='w-24'>Status</div>
                <div className='w-28'>Actions</div>
            </div>
            <div className='flex flex-row gap-1 text-sm capitalize'>
                <div className='w-40'>{item?.employee.firstName} {item?.employee.lastName}</div>
                <div className='w-28'>{leaveTypes[item?.leaveType - 1].name}</div>
                <div className='w-36'>{item?.reason}</div>
                <div className='w-16'>{item?.isHalfDay ? 'Yes' : 'No'}</div>
                <div className='w-28'><Moment format="Do MMM, YYYY">{item?.startDate}</Moment></div>
                <div className='w-28'><Moment format="Do MMM, YYYY">{item?.endDate}</Moment></div>
                <div className='w-12'><Moment diff={item?.startDate} unit="days">{item?.endDate}</Moment></div>
                <LeaveStatus classes='w-24' status={item?.status} />
                {
                    item?.status === 1 && <div className='w-28 flex flex-col gap-1'>
                        {type === '1' && <div>
                            <BtnOutline label="Cancel" onClick={() => updateStatus(item?._id, leaveTypes[item?.leaveType - 1].key, 4)} />
                        </div>}
                        {type === '2' && <div className='flex flex-col gap-2'>
                            <BtnSolid label="Approve" onClick={() => updateStatus(item?._id, leaveTypes[item?.leaveType - 1].key, 2)} />
                            <BtnSolid classes='bg-red-500' label="Reject" onClick={() => updateStatus(item?._id, leaveTypes[item?.leaveType - 1].key, 3)} />
                        </div>}
                    </div>
                }
            </div>
        </div>
    )
}

export default LeaveCard