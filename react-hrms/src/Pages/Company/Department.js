import React, { useState } from 'react'
import { cards, textTheme } from '../../Utils/Classes'
import LabelInput from '../../Common/LabelInput'
import BtnSolid from '../../Common/BtnSolid'
import HttpClient from '../../HttpClient';
import FindEmployee from '../../Components/FindEmployee';


function Department({ departments, getDepartments }) {
    const [item, setItem] = useState({
        name: '',
        headName: ''
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setItem(() => {
            return { ...item, [name]: value }
        })
    }

    const onSubmit = async () => {
        const { status } = await HttpClient.post('company/department/add', item);
        if (status === 200) {
            getDepartments();
            setItem({ name: '', headName: '' })
        }
    }

    return (
        <div className={cards + ' flex flex-col gap-4'}>
            <h3 className='font-medium text-lg'>Add Department</h3>
            <div className='flex flex-row gap-4'>
                <div className='w-2/5'>
                    <LabelInput name="name" value={item?.name} type="text" label="Name" onChange={onChange} />
                </div>
                <div className='w-2/5'>
                    <FindEmployee name="headName" curValue={item?.headName}  label='Head Name' onChange={onChange}/>
                </div>
                <div className='w-1/5 flex flex-col justify-end'>
                    <BtnSolid label='Add' onClick={onSubmit} />
                </div>
            </div>
            <div className="border-t border-slate-400/20 py-3">
                <div className="mb-1.5 text-xs font-medium text-slate-500">Departments</div>
                <div className='flex flex-col gap-2'>
                    <div className={`flex justify-between font-medium text-sm ${textTheme}`}>
                        <div className='flex'>
                            Name
                        </div>
                        <div className='flex items-end'>
                            Head Name
                        </div>
                    </div>
                    {
                        departments?.map((dsgn, index) => (
                            <div key={index} className="flex justify-between text-sm">
                                <div className='flex'>
                                    {dsgn?.name}
                                </div>
                                <div className='flex items-end'>
                                    {dsgn?.headName?.firstName + ' ' + dsgn?.headName?.lastName}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Department
