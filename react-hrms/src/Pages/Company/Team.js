import React, { useEffect, useState } from 'react';
import { cards } from '../../Utils/Classes';
import LabelInput from '../../Common/LabelInput';
import LabelDropDown from '../../Common/LabelDropDown';
import BtnSolid from '../../Common/BtnSolid';
import CustomTable from '../../Components/CustomTable';
import BtnOutline from '../../Common/BtnOutline';
import HttpClient from '../../HttpClient';
import FindEmployee from '../../Components/FindEmployee';

function Team({ teams, getTeams, departments }) {
    const [item, setItem] = useState({
        _id: '',
        name: '',
        department: '',
        manager: ''
    });
    const [teamList, setTeamList] = useState([]);

    const onChange = (e) => {
        const { name, value } = e.target;
        setItem(() => {
            return { ...item, [name]: value }
        })
    }

    const onSubmit = async () => {
        const payload = { ...item, manager: item.manager._id };
        const { status } = await HttpClient.post('company/team/add', item);
        if (status === 200) {
            getTeams();
            clearItem();
        }
    }
    const onUpdate = async (id) => {
        const { status } = await HttpClient.put(`company/team/update/${id}`, item);
        if (status === 200) {
            getTeams();
            clearItem();
        }
    }
    const clearItem = () => {
        setItem({
            name: '',
            department: '',
            manager: ''
        });
    }

    const editAction = (e) => {
        const item = teams.find(t => t._id === e);
        setItem(item);
    }
    useEffect(() => {
        const t = teams.map(d => {
            return {
                ...d,
                department: d?.department?.name,
                manager: d.manager && (d.manager.firstName + ' ' + d.manager.lastName)
            }
        });
        setTeamList(t);
    }, [teams]);

    return (
        <div className={cards + ' flex flex-col gap-4'}>
            <h3 className='font-medium text-lg'>Add Team</h3>
            <div className='flex flex-row justify-between gap-4'>
                <div className='w-1/4'>
                    <LabelInput name="name" value={item?.name} type="text" label="Name" onChange={onChange} />
                </div>
                <div className='w-1/4'>
                    <LabelDropDown name="department" value={item?.department?._id} label="Department" list={departments} onChange={onChange} />
                </div>
                <div className='w-1/4'>
                    <FindEmployee name="manager" curValue={item?.manager?._id} label='manager' onChange={onChange} />
                </div>
                <div className='w-1/4 flex flex-col justify-end'>
                    <div className='flex flex-row gap-4'>
                        {
                            item._id ?
                                (
                                    <>
                                        <BtnSolid label='Update' classes='bg-orange-600 hover:bg-orange-500' onClick={() => onUpdate(item._id)} />
                                        <BtnOutline label='Clear' onClick={clearItem} />
                                    </>
                                ) :
                                <BtnSolid label='Add' onClick={onSubmit} />
                        }
                    </div>
                </div>
            </div>
            <div className="border-t border-slate-400/20 py-3">
                <div className="mb-1.5 text-xs font-medium text-slate-500">Teams</div>
                <CustomTable headers={['name', 'department', 'manager']} items={teamList} editAction={editAction}></CustomTable>
            </div>
        </div>
    )
}

export default Team
