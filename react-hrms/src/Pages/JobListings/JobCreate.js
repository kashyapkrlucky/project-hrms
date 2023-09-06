import React, { useContext, useEffect, useState } from 'react'
import LabelInput from '../../Common/LabelInput'
import BtnOutline from '../../Common/BtnOutline'
import BtnSolid from '../../Common/BtnSolid'
import LabelTextarea from '../../Common/LabelTextarea';
import { UserContext } from '../../Contexts/UserContext';
import EmployeeName from '../../Components/EmployeeName';
import LabelDropDown from '../../Common/LabelDropDown';
import HttpClient from '../../HttpClient';

function JobCreate({ getJobs, setIsFormOpen }) {
    const [user] = useContext(UserContext);
    const [designations, setDesignations] = useState([]);
    const [job, setJob] = useState({
        recruiter: user._id,
        profile: '',
        description: '',
        requiredSkills: '',
        location: '',
        jobType: '',
        positions: ''
    });
    const getDesignations = async () => {
        const { data: { data } } = await HttpClient.get('company/designations');
        setDesignations(data);
    }
    const onChange = (e) => {
        const { name, value } = e.target;
        setJob(() => {
            return { ...job, [name]: value }
        })
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        const { status } = await HttpClient.post('job/add', job);
        if (status === 200) {
            getJobs();
            setJob({
                recruiter: user._id,
                profile: '',
                description: '',
                requiredSkills: '',
                location: '',
                jobType: '',
                positions: ''
            });
            setIsFormOpen(false);
        }
    }
    useEffect(() => {
        getDesignations();
    }, []);
    return (
        <div className="bg-white rounded-lg w-3/6 p-4 h-5/6">
            <form onSubmit={onSubmit} className="flex flex-col h-full">
                <div className="border-b border-gray-900/10 pb-4">
                    <h2 className="text-base font-semibold leading-7 text-gray-900 mt-4">Add required information for job</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600"></p>
                </div>

                <div className="mt-2 py-4 grid grid-cols-12 gap-2 h-4/5 overflow-y-auto">
                    <div className='col-span-4'>
                        <div className='flex flex-col w-full'>
                            <span className='block text-sm font-medium leading-6 text-gray-900 capitalize mb-2'>Recruiter</span>
                            <EmployeeName employee={user} />
                        </div>
                    </div>
                    <div className="col-span-4">
                        <LabelDropDown name="profile" value={job.profile} label="Profile" list={designations} onChange={onChange} />
                    </div>

                    <div className="col-span-4">
                        <LabelInput name="location" value={job.location} type="text" label="location" onChange={onChange} />
                    </div>
                    <div className="col-span-6">
                        <LabelDropDown name="jobType" value={job.jobType} label="Profile" list={[{ _id: 1, name: 'Full Time' }, { _id: 2, name: 'Part Time' }]} onChange={onChange} />
                    </div>
                    <div className="col-span-6">
                        <LabelInput name="positions" value={job.positions} type="text" label="Open Positions" onChange={onChange} />
                    </div>
                    <div className="col-span-12">
                        <LabelTextarea name="requiredSkills" value={job.requiredSkills} type="text" label="Required Skills" onChange={onChange} />
                    </div>

                    <div className="col-span-12">
                        <LabelTextarea name="description" value={job.description} type="text" label="Description" onChange={onChange} />
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-4">
                    <BtnOutline label="Cancel" onClick={() => setIsFormOpen(false)} />
                    <BtnSolid label="Save" />
                </div>
            </form>
        </div>
    )
}

export default JobCreate
