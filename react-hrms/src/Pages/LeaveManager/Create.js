import React, { useContext, useState } from 'react'
import CustomCard from '../../Common/CustomCard';
import BtnSolid from '../../Common/BtnSolid';
import { leaveTypes } from '../../Utils/DataService';
import LabelDropDown from '../../Common/LabelDropDown';
import LabelInput from '../../Common/LabelInput';
import RadioGroup from '../../Common/RadioGroup';
import LabelTextarea from '../../Common/LabelTextarea';
import BtnOutline from '../../Common/BtnOutline';
import HttpClient from '../../HttpClient';
import { UserContext } from '../../Contexts/UserContext';

function LeaveCreate({ setIsFormOpen, loadData }) {

    const [user] = useContext(UserContext);
    const [leave, setLeave] = useState({
        employee: user._id,
        leaveType: '',
        startDate: new Date(),
        endDate: new Date(),
        isHalfDay: '',
        reason: ''
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setLeave(() => {
            return { ...leave, [name]: value }
        })
    }

    const addLeave = async () => {
        const newLeave = { ...leave, isHalfDay: leave.isHalfDay === 'yes' ? true : false }
        const { data: { data }, status } = await HttpClient.post(`leave/my-leaves/add`, newLeave);
        if (status === 200) {
            loadData();
            setIsFormOpen();
        }
    }
    return (
        <CustomCard classes="flex flex-col gap-4 w-1/3">
            <header className='flex flex-row justify-between items-center'>
                <p className='font-medium'>Leave Request</p>
                <BtnOutline label="Close" onClick={() => setIsFormOpen(false)} />
            </header>
            <section className='flex flex-col gap-4'>
                <div className='flex flex-row'>
                    <LabelDropDown label="Leave Type" name="leaveType" value={leave.leaveType} list={leaveTypes} onChange={onChange}></LabelDropDown>
                </div>
                <div className='flex flex-row justify-between gap-4'>
                    <LabelInput label='Start Date' name="startDate" value={leave.startDate} onChange={onChange} />
                    <LabelInput label='End Date' name="endDate" value={leave.endDate} onChange={onChange} />
                </div>
                <div className='flex flex-row gap-4'>
                    <div> Is it a half day? </div>
                    <RadioGroup name="isHalfDay" list={['yes', 'no']} onChange={onChange} />
                </div>

                <div className='flex flex-col justify-between gap-4'>
                    <LabelTextarea label='Reason' name="reason" value={leave.reason} onChange={onChange} />
                </div>

                <div className='flex flex-col justify-between gap-4'>
                    <BtnSolid label='Submit' onClick={addLeave} />
                </div>
            </section>
        </CustomCard>
    )
}

export default LeaveCreate
