import React, { useEffect, useState } from 'react'
import BtnOutline from '../../Common/BtnOutline';

import Moment from 'react-moment';
import HttpClient from '../../HttpClient';
import NoItems from '../../Common/NoItems';

function Holidays() {
    const [holidays, setHolidays] = useState([]);
    const [file, setFile] = useState();
    const handleChange = (event) => {
        setFile(event.target.files[0])
    }
    const getList = async () => {
        const { data: { data }, status } = await HttpClient.get('company/holidays');
        if (status === 200) {
            setHolidays(data);
        }
    }
    const onUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        const { status } = await HttpClient.post('company/holidays/upload', formData);
        if (status === 200) {
            getList();
            setFile();
        }
    }
    const isHolidayPast = (date) => {
        const todayD = new Date().getDate();
        const todayM = new Date().getMonth();
        const currD = new Date(date).getDate();
        const currM = new Date(date).getMonth();
        return ((todayM <= currM) ) ? 'bg-green-200' : 'bg-slate-200';
    }
    
    useEffect(() => {
        getList();
    }, []);

    return (
        <div className='w-1/5 flex flex-col'>
            <div className='flex flex-row justify-between items-center bg-emerald-300 px-4 py-1'>
                <div className='text-sm'>Public Holidays</div>

                <div className='flex flex-row items-center gap-4'>
                    <label
                        htmlFor="file-upload"
                        className="relative flex flex-col cursor-pointer"
                    >
                        <span className='rounded-md font-medium text-sm'>Select CSV file </span>
                        {file?.name && <span className='text-xs'>{file?.name}</span>}
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleChange} />
                    </label>
                    <BtnOutline label='Upload' onClick={onUpload} />
                </div>
            </div>
            <div className='bg-white flex flex-col p-4 gap-4 h-96 overflow-x-auto'>
                {
                    holidays.length > 0 ?
                        holidays.map((h, i) => (
                            <div className='flex flex-row gap-4' key={i}>
                                <div className={'w-10 h-10 flex flex-col justify-center items-center text-sm ' + isHolidayPast(h.date)}>
                                    <Moment format="D">{h.date}</Moment>
                                    <Moment format="MMM">{h.date}</Moment>
                                </div>
                                <div className=' flex flex-col justify-center'>
                                    <div className='text-sm'>{h.holiday}</div>
                                    <div className='text-xs text-slate-600'>{h.weekday}</div>
                                </div>
                            </div>
                        )) :
                        <NoItems />
                }
            </div>
        </div>
    )
}

export default Holidays
