import React, { useEffect, useState } from 'react';
import { container } from "../../Utils/Classes";
import SubNavBar from '../../Layouts/SubNavBar';
import HttpClient from '../../HttpClient';
import EmpCard from './EmpCard';

function Employees() {
    const [employees, setEmployees] = useState([]);
    const getEmployees = async () => {
        const { data: { data }, status } = await HttpClient.get('employee/list');
        if (status === 200) {
            setEmployees(data);
        }
    }
    useEffect(() => {
        getEmployees();
    }, []);
    return (
        <>
            <SubNavBar title="Employees" />
            <main className={container + ' overflow-y-auto h-4/5'}>
                <div className='flex flex-row grid grid-cols-4 gap-4'>
                    {
                        employees.map((emp, i) => (
                            <EmpCard employee={emp} key={i} />
                        ))
                    }
                </div>
            </main>
        </>
    )
}

export default Employees
