import React, { useEffect, useState } from 'react'
import SubNavBar from '../../Layouts/SubNavBar'
import { container } from '../../Utils/Classes'
import { useParams } from 'react-router-dom';
import HttpClient from '../../HttpClient';
import Avatar from '../../Components/Avatar';
import LabelInput from '../../Common/LabelInput';
import LabelDropDown from '../../Common/LabelDropDown';
import { roles } from '../../Utils/DataService';
import FindEmployee from '../../Components/FindEmployee';
import { XCircleIcon } from '@heroicons/react/24/outline';

function EditEmployee() {
    let { id } = useParams();
    const [employee, setEmployee] = useState({});
    const [defaults, setDefaults] = useState({
        departments: [],
        designations: [],
        teams: []
    });

    const getEmployeeInfo = async () => {
        const { data: { data }, status } = await HttpClient.get(`employee/profile/${id}`);
        if (status === 200) {
            setEmployee(data);
        }
    }
    const onChange = (e) => {
        const { name, value } = e.target;
        setEmployee(() => {
            return { ...employee, [name]: value }
        })
    }

    const getDefaults = async () => {
        const { data: { data } } = await HttpClient.get('company/data');
        setDefaults(data);
    }

    useEffect(() => {
        getDefaults();
        getEmployeeInfo();
    }, [id]);

    const btnOne = {
        label: 'Save Changes',
        action: async () => {
            const emp = {
                id: employee._id,
                personalEmail: employee.personalEmail,
                mobile: employee.mobile,
                dob: employee.dob,
                department: employee.department,
                team: employee.team,
                designation: employee.designation,
                role: employee.role,
                reportingTo: employee?.reportingTo?._id
            }
            console.log(emp);
            const { status } = await HttpClient.put(`employee/update`, emp);
            if (status === 200) {
                console.log('Profile Updated');
                getEmployeeInfo();
            }
        }
    }

    const btnTwo = {
        label: 'Cancel',
        action: () => { }
    }

    const title = employee.firstName + ' ' + employee.lastName + ' (' + employee.empCode + ')';
    const onClear = () => {
        setEmployee(() => {
            return { ...employee, reportingTo: null }
        })
    }
    return (
        <>
            <SubNavBar title={title} btnOne={btnOne} />
            <main className={container + ' overflow-y-auto h-4/5'}>
                <div className='flex flex-row grid grid-cols-3 gap-4'>
                    <div className='bg-white p-4 flex flex-col items-center justify-start gap-4'>
                        <LabelInput disabled value={employee.firstName} type="text" label="First name" />
                        <LabelInput disabled value={employee.lastName} type="text" label="Last name" />
                        <LabelInput disabled value={employee.email} type="email" label="Email Address" />
                        <LabelInput name="personalEmail" value={employee.personalEmail} type="email" label="Personal Email Address" onChange={onChange} />
                        <LabelInput name="mobile" value={employee.mobile} type="text" label="Mobile Number" onChange={onChange} />
                        <LabelInput name="dob" value={employee.dob} type="text" label="Date Of Birth" onChange={onChange} />
                    </div>
                    <div className='bg-white p-4 flex flex-col justify-start gap-4'>
                        <LabelDropDown label="Designation" name="designation" value={employee.designation} list={defaults.designations} onChange={onChange} />
                        <LabelDropDown label="Department" name="department" value={employee.department} list={defaults.departments} onChange={onChange} />
                        <LabelDropDown label="Team" name="team" value={employee.team} list={defaults.teams} onChange={onChange} />
                        {
                            employee?.reportingTo ?
                                <div className='flex flex-col w-full'>
                                    <label className="block text-sm font-medium leading-6 text-gray-900 capitalize mb-2">Reporting To</label>
                                    <div className='flex flex-row gap-2 justify-between block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300'>
                                        <div className='flex flex-row gap-2'>
                                            <Avatar classes='w-6 h-6' url={employee.reportingTo?.avatar} />
                                            <p className='select-none'>{employee?.reportingTo?.firstName} {employee?.reportingTo?.lastName}</p>
                                        </div>
                                        <div className='flex flex-row gap-2'>
                                            <button onClick={() => onClear()}>
                                                <XCircleIcon className='w-6 h-6' />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                :
                                <FindEmployee name="reportingTo" label='Reporting To' onChange={onChange} />
                        }
                        <LabelInput disabled value={employee.joiningDate} type="text" label="Joining Date" />
                        <LabelDropDown label="Role" name="role" value={employee.role} list={roles} onChange={onChange} />
                    </div>
                    <div className='bg-white p-4 flex flex-row justify-between gap-2'>

                    </div>
                </div>
            </main>
        </>
    )
}

export default EditEmployee
