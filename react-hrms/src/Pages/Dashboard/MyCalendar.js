import React, { useEffect, useState } from 'react';
import { cards, bgTheme } from '../../Utils/Classes';
import { months, days, getYears } from '../../Utils/DataService';

function MyCalendar({ onDateSelection = () => { console.log('selected')} }) {
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [dates, setDates] = useState([]);
  const [data, setData] = useState({
    month: 0 || new Date().getMonth(),
    year: 0 || new Date().getFullYear()
  });
  const isTodayDate = (date) => {
    const isCheck = (new Date().getMonth() === month) &&
      (new Date().getFullYear() === year) && (date === new Date().getDate())
    return isCheck ? `${bgTheme} text-white rounded-md` : ''
  };
  const years = getYears(1970);
  const onChange = async (e) => {
    const { name, value } = e.currentTarget;
    data[name] = parseFloat(value);
    updateDates();
  }
  const updateDates = () => {
    const leapYear = data.year % 4 === 0 ? 29 : 28;
    const days30m = [3, 5, 8, 10];
    const dayCount = data.month === 1 ? (leapYear) : (days30m.includes(data.month) ? 30 : 31);
    setMonth(data.month);
    setYear(data.year);
    const startDay = new Date(data.year, data.month, 1).getDay();
    const dateList = [...[...Array(startDay)].map((u, i) => ' '), ...[...Array(dayCount)].map((u, i) => i + 1)]
    setDates(dateList);
  }

  useEffect(() => {
    updateDates();
  }, []);
  return (
    <>
      <div className={cards}>
        <div className='w-full h-70 flex flex-col gap-2'>
          <p className='text-lg my-2'>My Calendar</p>
          
          <div className='flex flex-row gap-2 items-center mb-4'>
            <select className='w-4/6 h-8 rounded-md border-2 border-slate-400 text-xs' name="month" value={month} onChange={onChange}>
              <option value="">Select</option>
              {
                months.map((m, index) => (
                  <option key={index} value={index}>{m.name}</option>
                ))
              }
            </select>
            <select className='w-2/6 h-8 text-xs rounded-md border-2 border-slate-400' name="year" value={year} onChange={onChange}>
              <option value="">Select</option>
              {
                years.map((y, index) => (
                  <option key={index} value={y.name}>{y.name}</option>
                ))
              }
            </select>
          </div>
          
          <div className='grid grid-cols-7 gap-2 select-none text-slate-500 text-xs'>
            {days.map((d) => <div className='flex flex-row justify-center' key={d._id}>{d.name}</div>)}
          </div>
          
          <div className='grid grid-cols-7 gap-2 text-sm select-none'>
            {
              dates.map((d, i) => (
                <div className={'flex flex-row justify-center cursor-pointer ' + isTodayDate(d)} key={i} onClick={() => onDateSelection(new Date(year, month, d))}>
                  {d}
                </div>
              ))
            }
          </div>

          <p className='text-lg border-t border-slate-200 my-2 pt-2'>My Events</p>
          
          <div className='flex flex-col gap-1 bg-slate-200 p-2 rounded-md'>
            <p className='text-xs lowercase'>9.30 PM - 30 Min</p>
            <p className='font-medium'>Scrum Meeting</p>
            <p className='text-xs capitalize'>Microsoft Team Meeting</p>
          </div>
          
          <div className='flex flex-col gap-1 bg-amber-200 p-2 rounded-md'>
            <p className='text-xs lowercase'>1.30 PM - 45 Min</p>
            <p className='font-medium'>iOS Development Discussion</p>
            <p className='text-xs capitalize'>Google Meet</p>
          </div>
        </div>
      </div>
    </>

  )
}

export default MyCalendar
