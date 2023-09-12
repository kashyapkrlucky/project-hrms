import React, { useState } from 'react';
import HttpClient from '../HttpClient';
import Avatar from './Avatar';

function FindEmployee({ label = "", name, onChange }) {
    const [text, setText] = useState('');
    const [employees, setEmployees] = useState([]);
    const onSearch = (e) => {
        const { value } = e.target;
        setText(value);
        if (value.length > 3) {
            getEmployees();
        } else {
            setEmployees([]);
        }
    }
    const getEmployees = async () => {
        const { data: { data }, status } = await HttpClient.get(`employee/search/${text}`);
        if (status === 200) {
            setEmployees(data);
        }
    }
    const onSelect = (e) => {
        const obj = { target: { name, value: e } }
        onChange(obj);
        setText(e.firstName + ' ' + e.lastName);
        setEmployees([]);
    }
    return (
        <div className='relative'>
            <div className='flex flex-col w-full'>
                {
                    label &&
                    <label className="block text-sm font-medium leading-6 text-gray-900 capitalize mb-2">{label}</label>
                }
                <input value={text} className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-50 sm:text-sm sm:leading-6" onChange={onSearch} />
            </div>
            {employees.length > 0 && <div className={'absolute bg-white rounded-md p-2 shadow-md w-52 ' + (label ? 'top-20' : 'top-10')}>
                {employees.map((e, i) => (
                    <div className='flex flex-row items-center gap-4' key={i} onClick={() => onSelect(e)}>
                        <Avatar employee={e}/>
                        <p className='text-sm'>{e.firstName} {e.lastName}</p>
                    </div>
                ))}
            </div>}
        </div>
    )
}

export default FindEmployee
