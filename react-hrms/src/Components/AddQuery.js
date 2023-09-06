import React, { useState } from 'react';
import BtnSolid from '../Common/BtnSolid'
import { queryCategory } from "../Utils/DataService";
import LabelInput from '../Common/LabelInput';
import LabelTextarea from '../Common/LabelTextarea';
import LabelDropDown from '../Common/LabelDropDown';

function AddQuery() {
    const [query, setQuery] = useState({
        title: '',
        category: '',
        message: ''
    });
    const onChange = (e) => {
        const { name, value } = e.target;
        setQuery(() => {
            return { ...query, [name]: value }
        })
    }
    const onSubmit = async (e) => {
        e.preventDefault();
    }
    return (
        <div className='flex flex-col gap-4 p-4 bg-white rounded-lg'>
            <h2 className='text-xl font-medium text-rose-500'>Raise a Query</h2>
            <form onSubmit={onSubmit} className="space-y-3">
                <LabelInput label="Title" name="title" type="text" onChange={onChange} />
                <LabelDropDown label='Category' name='category' list={queryCategory} onChange={onChange}/>
                <LabelTextarea label="Message" name="password" onChange={onChange} />
                <BtnSolid label="Save" />
            </form>
        </div>
    )
}

export default AddQuery
