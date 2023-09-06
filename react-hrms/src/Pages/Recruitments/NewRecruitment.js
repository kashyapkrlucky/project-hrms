import React, { useContext, useEffect, useState } from 'react'
import LabelInput from '../../Common/LabelInput'
import BtnOutline from '../../Common/BtnOutline'
import BtnSolid from '../../Common/BtnSolid'
import HttpClient from '../../HttpClient';
import { UserContext } from '../../Contexts/UserContext';
import EmployeeName from '../../Components/EmployeeName';
import LabelDropDown from '../../Common/LabelDropDown';

function NewRecruitment({ setIsFormOpen, getRecruitments }) {
    const [user] = useContext(UserContext);
    const [jobs, setJobs] = useState([]);
    const [recruitment, setRecruitment] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        jobId: '',
        recruiter: user._id
    });
    const onChange = (e) => {
        const { name, value } = e.target;
        setRecruitment((prev) => {
            return { ...prev, [name]: value }
        })
    }

    const getJobs = async () => {
        const { data: { data }, status } = await HttpClient.get('job/list');
        if (status === 200) {
            const list = data.map(x => {
                return {
                    _id: x._id,
                    name: x.profile.name
                }
            })
            setJobs(list);
        }
    }


    const onSubmit = async (e) => {
        e.preventDefault();
        const { status } = await HttpClient.post('recruitment/add', recruitment);
        if (status === 200) {
            setIsFormOpen(false);
            setRecruitment({
                firstName: '',
                lastName: '',
                email: '',
                mobile: '',
                jobId: '',
                recruiter: user._id
            });
            getRecruitments();
        }
    }

    useEffect(() => {
        getJobs();
    }, []);
    return (
        <div className="bg-white rounded-lg w-3/6 p-4">
            <form onSubmit={onSubmit} className="flex flex-col h-full">
                <div className="border-b border-gray-900/10 pb-4">
                    <h2 className="text-base font-semibold leading-7 text-gray-900 mt-4">Candidate Information</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600"></p>
                </div>
                <div className="mt-2 py-2 grid gap-4 grid-cols-6 overflow-y-auto">
                    <div className="col-span-3">
                        <LabelInput name="firstName" value={recruitment.firstName} type="text" label="First name" onChange={onChange} />
                    </div>
                    <div className="col-span-3">
                        <LabelInput name="lastName" value={recruitment.lastName} type="text" label="Last name" onChange={onChange} />
                    </div>

                    <div className="col-span-3">
                        <LabelInput name="email" value={recruitment.email} type="email" label="Email Address" onChange={onChange} />
                    </div>

                    <div className="col-span-3">
                        <LabelInput name="mobile" value={recruitment.mobile} type="text" label="Mobile Number" onChange={onChange} />
                    </div>

                    <div className="col-span-3">
                        <LabelDropDown name="jobId" value={recruitment.jobId} label="Selected Job" list={jobs} onChange={onChange} />
                    </div>
                    
                    <div className="col-span-3">
                        <div className='flex flex-col w-full'>
                            <span className='block text-sm font-medium leading-6 text-gray-900 capitalize mb-2'>Recruiter</span>
                            <EmployeeName employee={user} />
                        </div>
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

export default NewRecruitment
