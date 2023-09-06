import React from 'react'
import CustomCard from '../../Common/CustomCard';
import { BriefcaseIcon, UserIcon, MapPinIcon } from '@heroicons/react/24/outline';
import BtnOutline from '../../Common/BtnOutline';
import { useNavigate } from 'react-router-dom';
import EmployeeName from '../../Components/EmployeeName';


function JobCard({ item }) {
  const JobTypes = ['Full Time', 'Part Time'];
  const navigate = useNavigate();
  const redirectTo = (id) => {
    navigate(`/app/job-listings/${id}`);
  }
  return (
    <CustomCard classes={"flex flex-col gap-6"}>
      <div className="flex flex-row gap-4 items-center">
        <p className='text-md font-medium'>{item?.profile?.name}</p>
      </div>
      <div className='flex flex-row text-xs gap-4'>
        <div className='flex flex-row gap-2'>
          <UserIcon className='w-4 h-4' />
          <span>{item.positions} Positions</span>
        </div>
        <div className='flex flex-row gap-2'>
          <MapPinIcon className='w-4 h-4' />
          <span>{item.location}</span>
        </div>
        <div className='flex flex-row gap-2'>
          <BriefcaseIcon className='w-4 h-4' />
          <span>{JobTypes[item.jobType - 1]}</span>
        </div>
      </div>
      <div className="flex flex-row justify-between text-xs">
        <EmployeeName employee={item.recruiter}/>
        <BtnOutline label="View Job" onClick={() => redirectTo(item._id)} />
      </div>
    </CustomCard>
  )
}

export default JobCard
