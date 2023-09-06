import React, { useEffect, useState } from 'react';
import SubNavBar from '../../Layouts/SubNavBar';
import { container } from '../../Utils/Classes';
import HttpClient from '../../HttpClient';
import Designation from './Designation';
import Department from './Department';
import Team from './Team';

function Company() {
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [teams, setTeams] = useState([]);

  const getDepartments = async () => {
    const { data: { data } } = await HttpClient.get('company/departments');
    setDepartments(data);
  }
  const getDesignations = async () => {
    const { data: { data } } = await HttpClient.get('company/designations');
    setDesignations(data);
  }
  const getTeams = async () => {
    const { data: { data } } = await HttpClient.get('company/teams');
    setTeams(data);
  }

  useEffect(() => {
    getDepartments();
    getDesignations();
    getTeams();
  }, []);

  return (
    <>
      <SubNavBar title="Company" />
      <main className={container + ' overflow-y-auto h-4/5'}>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-row gap-4'>
            <div className='w-1/2 flex flex-col gap-4'>
              <Designation designations={designations} getDesignations={getDesignations} />
            </div>
            <div className='w-1/2 flex flex-col gap-4'>
              <Department departments={departments} getDepartments={getDepartments}/>
            </div>
          </div>
          <div className='w-full flex flex-col gap-4'>
            <Team teams={teams} departments={departments} getTeams={getTeams} />
          </div>
        </div>
      </main>
    </>
  )
}

export default Company
