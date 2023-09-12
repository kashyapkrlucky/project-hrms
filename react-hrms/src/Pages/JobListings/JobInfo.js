import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SubNavBar from '../../Layouts/SubNavBar';
import { container } from '../../Utils/Classes';
import { BriefcaseIcon, MapPinIcon } from '@heroicons/react/24/outline';
import TabMenu from '../../Common/TabMenu';
import Candidate from './Candidate';
import HttpClient from '../../HttpClient';
import EmployeeName from '../../Components/EmployeeName';

const Dropdown = ({ name, status, items, onChange }) => (
  <select name={name} value={status} onChange={onChange}>
    <option value=''>Select</option>
    {
      items.map((cs, k) => (
        <option key={name + k} value={k}>{cs}</option>
      ))
    }
  </select>
)

function JobInfo() {
  let { id } = useParams();
  const [item, setItem] = useState({});
  const [currentTab, setCurrentTab] = useState(0);
  const JobTypes = ['Full Time', 'Part Time'];
  const jobStatuses = ['Active', 'Inactive', 'On Hold'];

  const onSelectTab = (e) => {
    setCurrentTab(e);
  }

  const getJobInfo = async () => {
    const { data: { data }, status } = await HttpClient.get(`job/info/${id}`);
    if (status === 200) {
      setItem(data);
    }
  }

  const onChangeStatus = (e) => {
    const { name, value } = e.target;
    setItem(prev => {
      return { ...prev, [name]: parseInt(value) };
    })
  }

  useEffect(() => {
    getJobInfo();
  }, [id]);

  return (
    <>
      <SubNavBar title={item?.profile?.name} />
      <main className={container + ' overflow-y-auto h-4/5'}>
        <div className='flex flex-col divide-y divide-slate-100'>
          <div className='bg-white p-4 flex flex-row justify-between gap-2'>
            <div className='flex flex-row items-center gap-4'>
              <div className='flex flex-row gap-2'>
                <BriefcaseIcon className='w-5 h-5' /> <span>{JobTypes[item.jobType - 1]}</span>
              </div>
              <div className='flex flex-row gap-2'>
                <MapPinIcon className='w-5 h-5' /> <span>{item.location}</span>
              </div>
            </div>
            <div className='flex flex-row gap-10'>
              <div className='flex flex-col gap-2'>
                <p className='uppercase text-xs text-slate-500'>Hiring Manager</p>
                <EmployeeName employee={item?.recruiter}/>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='uppercase text-xs text-slate-500'>Status</p>
                <p className='py-1'>Active</p>
              </div>
            </div>
          </div>

          <TabMenu names={['Job Details', 'Candidates', 'Settings']} onSelectTab={onSelectTab} />
          <div className='bg-white p-4'>
            {
              currentTab === 0 &&
              <div className='text-sm text-slate-700 leading-8'>
                {item.description}
              </div>
            }
            {
              currentTab === 1 &&
              <div className='divide-y divide-slate-100'>
                {item.candidates.map((item, i) => (
                  <Candidate item={item} key={i} getJobInfo={getJobInfo} />
                ))}
              </div>
            }
            {
              currentTab === 2 &&
              <div className='flex flex-col gap-2'>
                <div className='w-40 flex flex-col gap-2'>
                  <p className='uppercase text-xs text-slate-500'>Change Status</p>
                  <Dropdown name="status" status={item.status} items={jobStatuses} onChange={onChangeStatus} />
                </div>
              </div>
            }
          </div>
        </div>
      </main>
    </>
  )
}

export default JobInfo
