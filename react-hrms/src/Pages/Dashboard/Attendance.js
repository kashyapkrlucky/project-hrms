import React, { useContext, useEffect, useState } from 'react'
import { cards } from '../../Utils/Classes'
import BtnSolid from '../../Common/BtnSolid'
import HttpClient from '../../HttpClient';
import { UserContext } from '../../Contexts/UserContext';
import Moment from 'react-moment';

function Attendance() {
  const labelStyle = 'text-xs text-slate-500 uppercase';
  const valueStyle = 'text-xl font-medium capitalize';
  const [todayInfo, setTodayInfo] = useState({});
  const [location, setLocation] = useState('Office');
  const [user] = useContext(UserContext);

  const getAttendance = async () => {
    const { data: { data }, status } = await HttpClient.get(`company/attendance/${user._id}`);
    if (status === 200) {
      setTodayInfo(data);
    }
  }

  const addAttendance = async () => {
    const payload = { employee: user._id, inTime: new Date(), location}
    const { status } = await HttpClient.post(`company/attendance/add`, payload);
    if (status === 200) {
      getAttendance();
    }
  }

  const updateAttendance = async () => {
    const payload = { id: todayInfo._id, outTime: new Date() }
    const { status } = await HttpClient.put(`company/attendance/update`, payload);
    if (status === 200) {
      getAttendance();
    }
  }

  const onChange = (e) => {
    const { value } = e.target;
    setLocation(value);
  }

  useEffect(() => {
    getAttendance();
  }, []);

  return (
    <div className={cards + ' flex flex-col gap-4'}>
      <h3 className='font-medium text-lg'>Your Attendance</h3>
      <div className='flex flex-row justify-between'>
        <div className='w-1/3 flex flex-col gap-1'>
          <p className={labelStyle}>In time</p>
          <p className={valueStyle}>
            {todayInfo?.inTime ? <Moment format="hh:mm">{todayInfo?.inTime}</Moment> : '--'}
          </p>
        </div>


        <div className='w-1/3 flex flex-row justify-center items-center'>
          {todayInfo?.outTime && <Moment duration={todayInfo?.inTime} unit="hours">{todayInfo?.outTime}</Moment>}
        </div>

        <div className='w-1/3 flex flex-col gap-1 items-end'>
          <p className={labelStyle}>Out Time</p>
          <p className={valueStyle}>
            {todayInfo?.outTime ? <Moment format="hh:mm">{todayInfo?.outTime}</Moment> : '--'}
          </p>
        </div>
      </div>



      <div className='flex flex-row justify-between'>
        <div className='w-2/3'>
          {!todayInfo?.isCheckedIn &&
            (
              <div className='flex flex-row gap-2'>
                <BtnSolid label="Check In" onClick={() => addAttendance()} />
                <select name="location" className=" rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 text-sm leading-6" onChange={onChange}>
                  <option value="Office">Office</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
            )
          }
        </div>
        <div className='w-1/3 flex flex-row justify-end'>
          {todayInfo?.isCheckedIn && <BtnSolid classes='bg-red-500' label="Check Out" onClick={() => updateAttendance()} />}
        </div>
      </div>

      <div className='bg-slate-100 flex flex-row justify-between p-4 rounded-md text-xs'>
        <div className='flex flex-col text-slate-500 gap-1'>
          <p>Break Time: </p>
          <p>Target Hours: </p>
        </div>
        <div className='flex flex-col items-end font-medium gap-1'>
          <p>01:00 - 02:00 PM </p>
          <p>8Hrs </p>
        </div>
      </div>
    </div>
  )
}

export default Attendance
