import React, { useEffect, useState } from 'react'
import CustomPage from '../../Common/CustomPage'
import { cards } from '../../Utils/Classes'
import { PhoneIcon, PlusIcon } from '@heroicons/react/24/outline'
import Avatar from '../../Components/Avatar'
import HttpClient from '../../HttpClient';
import EmployeeName from '../../Components/EmployeeName'
import LabelTextarea from '../../Common/LabelTextarea'
import BtnOutline from '../../Common/BtnOutline'

function Messages() {

    const [employee, setEmployee] = useState({});
    const [employees, setEmployees] = useState([]);
    const getEmployees = async () => {
        const { data: { data }, status } = await HttpClient.get('employee/list');
        if (status === 200) {
            setEmployees(data.slice(8, 12));
            setEmployee(data[8]);
        }
    }
    useEffect(() => {
        getEmployees();
    }, []);

    return (
        <CustomPage title="Messages">
            <div className={cards + ' h-full flex flex-row gap-4 divide-x divide-slate-200'}>
                <div className='w-1/5 flex flex-col divide-y divide-slate-200'>
                    <div className='flex flex-row justify-between items-center mb-2 h-10'>
                        <p>Chats</p>
                        <button>
                            <PlusIcon className='w-6 h-6' />
                        </button>
                    </div>
                    <div className='flex flex-col divide-y divide-slate-200'>
                        {
                            employees.map((e, i) => (
                                <div className='flex flex-row gap-2 py-2' key={i}>
                                    <Avatar classes='w-10 h-10' url={e.avatar} />
                                    <div className='flex flex-col w-full'>
                                        <p className='text-sm text-lg text-gray-900'>{e.firstName + ' ' + e.lastName}</p>
                                        <p className='text-xs text-gray-500'>{'Last Message'}</p>
                                    </div>
                                    <div className='flex flex-row items-center'>
                                        <p className='w-4 h-4 flex flex-row justify-center items-center bg-red-500 text-white rounded-full text-xs'>3</p>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>
                <div className='w-4/5 px-4 flex flex-col divide-y divide-slate-200'>
                    <div className='flex flex-row justify-between mb-2 h-10'>
                        <div className='flex flex-row gap-2 items-center'>
                            <Avatar classes='w-8 h-8' url={employee.avatar} />
                            <div className='flex flex-col w-full justify-center'>
                                <span className='text-sm text-gray-900'>{employee.firstName + ' ' + employee.lastName}</span>
                                <span className='text-xs text-gray-500'>Online</span>
                            </div>
                        </div>
                        <button>
                            <PhoneIcon className='w-6 h-6' />
                        </button>
                    </div>
                    <div className='pt-4 h-full'>
                        <div className='h-5/6 '>

                        </div>
                        <div className='h-1/6 flex flex-row gap-4'>
                            <LabelTextarea/>
                            <BtnOutline label="Send"/>
                        </div>
                    </div>
                </div>
            </div>
        </CustomPage>
    )
}

export default Messages