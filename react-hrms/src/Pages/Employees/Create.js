import React, { useEffect, useState } from 'react'
import LabelInput from '../../Common/LabelInput';
import { toast } from 'react-toastify';
import LabelDropDown from '../../Common/LabelDropDown';
import BtnSolid from '../../Common/BtnSolid';
import BtnOutline from '../../Common/BtnOutline';
import HttpClient from '../../HttpClient';

function EmployeeCreate({ employees, setIsFormOpen }) {

  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    dob: new Date(),
    department: '',
    team: '',
    designation: '',
    empCode: '',
    joiningDate: new Date(),
  });
  const [defaults, setDefaults] = useState({
    departments: [],
    designations: [],
    teams: []
  });

  const newEmpCode = () => {
    const last = employees[0];
    const lastEmpCode = parseFloat(last.empCode.split('-')[1]);
    employee.empCode = 'COM-00' + (lastEmpCode + 1);
  }
  const onChange = (e) => {
    const { name, value } = e.target;
    setEmployee(() => {
      return { ...employee, [name]: value }
    })
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    
  }

  const getDefaults = async () => {
    const { data: { data } } = await HttpClient.get('defaults');
    setDefaults(data);
  }

  useEffect(() => {
    newEmpCode();
    getDefaults();
  }, []);

  return (
    <div className="bg-white rounded-lg w-4/6 p-4 h-5/6">
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900 mt-4">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-3">
              <LabelInput name="firstName" value={employee.firstName} type="text" label="First name" onChange={onChange} />
            </div>
            <div className="col-span-3">
              <LabelInput name="lastName" value={employee.lastName} type="text" label="Last name" onChange={onChange} />
            </div>

            <div className="col-span-2">
              <LabelInput name="email" value={employee.email} type="email" label="Email Address" onChange={onChange} />
            </div>

            <div className="col-span-2">
              <LabelInput name="mobile" value={employee.mobile} type="text" label="Mobile Number" onChange={onChange} />
            </div>

            <div className="col-span-2">
              <LabelInput name="dob" value={employee.dob} type="text" label="Date Of Birth" onChange={onChange} />
            </div>

            <div className="col-span-2">
              <LabelInput name="empCode" value={employee.empCode} type="text" label="Employee Code" onChange={onChange} disabled />
            </div>

            <div className="col-span-2">
              <LabelDropDown label='Reporting To' name="reportingTo" value={employee.reportingTo} list={employees} onChange={onChange} />
            </div>

            <div className="col-span-2">
              <LabelInput name="joiningDate" value={employee.joiningDate} type="text" label="Joining Date" onChange={onChange} />
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

export default EmployeeCreate
