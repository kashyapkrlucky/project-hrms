import React, { useEffect, useState } from 'react'
import { bgTheme, cards } from '../Utils/Classes';
import { months, getYears } from '../Utils/DataService';

function DatePicker({ onDateSelection }) {
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
    const days = ["SUN", "MON", "TUE", "WED", "THR", "FRI", "SAT"];
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
        const dateList = [...[...Array(startDay)].map((u, i) => 'A'), ...[...Array(dayCount)].map((u, i) => i + 1)]
        setDates(dateList);
    }

    useEffect(() => {
        updateDates();
    }, []);
    return (
        <>
            <div className={cards}>
                <div className='w-full h-70 flex flex-col gap-2'>
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
                        {days.map((d, i) => <div className='flex flex-row justify-center' key={i}>{d}</div>)}
                    </div>
                    <div className='grid grid-cols-7 gap-2 text-sm select-none'>
                        {
                            dates.map((d, i) => (
                                d !== 'A' ?
                                    <div className={'flex flex-row justify-center cursor-pointer ' + isTodayDate(d)} key={i} onClick={() => onDateSelection(new Date(year, month, d))}>
                                        {d}
                                    </div> :
                                    <div className='flex flex-row justify-center' key={i}>
                                        &nbsp;
                                    </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>

    )
}

export default DatePicker
