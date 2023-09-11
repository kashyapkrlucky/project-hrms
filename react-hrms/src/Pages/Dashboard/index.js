import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Contexts/UserContext';
import Moment from 'react-moment';
import HttpClient from '../../HttpClient';
import Announcements from './Announcements';
import Birthdays from './Birthdays';
import Attendance from './Attendance';
import AttendanceView from './AttendanceView';

function Dashboard() {
    const [user] = useContext(UserContext);
    const [chartData, setChartData] = useState([]);
    const getAttendance = async () => {
        const { data: { data }, status } = await HttpClient.get(`company/attendance-all`);
        if (status === 200) {
            const { docs, empLength } = data;
            const absent = empLength - docs.length;
            const inOffice = docs.filter(x => x.location === 'Office');
            const remote = docs.filter(x => x.location === 'Remote');
            setChartData([
                { value: inOffice.length || 0, name: 'In Office' },
                { value: remote.length || 0, name: 'Remote' },
                { value: absent, name: 'Absent' },
            ])
        }
    }

    useEffect(() => {
        getAttendance();
    }, []);

    return (
        <>
            <div className='flex flex-row justify-between p-4 text-lg'>
                <div>
                    Good Morning, {user?.firstName} {user?.lastName}
                </div>
                <div>
                    <Moment format="dddd, D MMMM, YYYY">{new Date()}</Moment>
                </div>
            </div>
            <main className='mx-auto px-4 overflow-y-auto h-4/5'>
                <div className='flex flex-row gap-4'>
                    <div className='w-1/3 flex flex-col gap-4'>
                        <Announcements />
                    </div>
                    <div className='w-1/3 flex flex-col gap-4'>
                        <Birthdays />
                    </div>
                    <div className='w-1/3 flex flex-col gap-4'>
                        <Attendance />
                        <AttendanceView data={chartData} />
                    </div>
                </div>
            </main>
        </>
    )
}

export default Dashboard
