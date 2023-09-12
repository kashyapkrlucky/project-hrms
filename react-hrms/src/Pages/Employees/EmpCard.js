import React from 'react'
import { cards } from '../../Utils/Classes';
import { EnvelopeIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';
import Avatar from '../../Components/Avatar';
import { useNavigate } from 'react-router-dom';
import BtnOutline from '../../Common/BtnOutline';

function EmpCard({ employee }) {
  const navigate = useNavigate();
  const redirectTo = (id) => {
    navigate(`/app/employees/edit/${id}`);
  }

  return (
    <div className={cards + ' flex flex-col gap-4'}>
      <div className='flex flex-col items-center gap-2'>
        <Avatar classes='h-20 w-20' employee={employee} />
        <p className="text-lg text-gray-900">{employee.firstName + ' ' + employee.lastName}</p>
        <p className="text-xs text-gray-500">{employee?.designation?.name} | {employee.empCode}</p>
      </div>
      <div className='bg-slate-50 flex flex-col p-4 rounded-md gap-2 text-sm'>
        <div className='flex flex-row gap-4 items-center'>
          <EnvelopeIcon className='w-4 h-4' />
          <p>{employee.email}</p>
        </div>
        <div className='flex flex-row gap-4 items-center'>
          <DevicePhoneMobileIcon className='w-4 h-4' />
          <p>{employee.mobile}</p>
        </div>
      </div>
      <div className="flex flex-row justify-end text-xs">
        <BtnOutline label="Edit" onClick={() => redirectTo(employee._id)} />
      </div>
    </div>
  )
}

export default EmpCard
