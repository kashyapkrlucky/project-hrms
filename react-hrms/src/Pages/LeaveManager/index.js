import React, { useContext, useEffect, useState } from 'react'
import SubNavBar from '../../Layouts/SubNavBar'
import { container } from '../../Utils/Classes'
import { ModalPage } from '../../Components/ModelPage';
import LeaveCreate from './Create';
import Holidays from './Holidays';
import HttpClient from '../../HttpClient';
import { UserContext } from '../../Contexts/UserContext';
import NoItems from '../../Common/NoItems';
import LeaveCard from './LeaveCard';

function LeaveManager() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [balance, setBalance] = useState({});
    const [myLeaves, setMyLeaves] = useState([]);
    const [approveLeaves, setApproveLeaves] = useState([]);
    const [user] = useContext(UserContext);
    const valueStyle = 'text-md font-medium capitalize';
    const openForm = () => {
        setIsFormOpen(true);
    }
    const btnOne = {
        label: 'Apply Leave',
        action: () => openForm(true)
    }

    const getBalance = async () => {
        const { data: { data }, status } = await HttpClient.get(`leave/balance/${user._id}`);
        if (status === 200) {
            setBalance(data);
        }
    }
    const getMyLeaves = async () => {
        const { data: { data }, status } = await HttpClient.get(`/leave/my-leaves/${user._id}`);
        if (status === 200) {
            setMyLeaves(data);
        }
    }
    const getApprovalLeaves = async () => {
        const { data: { data }, status } = await HttpClient.get(`/leave/approval/${user._id}`);
        if (status === 200) {
            setApproveLeaves(data);
        }
    }
    const loadData = () => {
        getBalance();
        getMyLeaves();
        getApprovalLeaves();
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <SubNavBar title="Leave Manager" btnOne={btnOne} />
            <main className={container + ' overflow-y-auto h-4/5'}>
                <div className='flex flex-row gap-4'>
                    <div className='w-4/5 flex flex-col'>
                        <div className='bg-emerald-300 px-4 py-1'>Leave Balance</div>
                        <div className='flex flex-row bg-white p-4 gap-6 mb-4'>
                            <div className='flex flex-row gap-2'>
                                <p>PL</p> <p className={valueStyle}>- {balance?.paidLeave}</p>
                            </div>
                            <div className='flex flex-row gap-2'>
                                <p>SL</p> <p className={valueStyle}>- {balance?.sickLeave}</p>
                            </div>
                            <div className='flex flex-row gap-2'>
                                <p>CL</p> <p className={valueStyle}>- {balance?.casualLeave}</p>
                            </div>

                        </div>
                        <div className='bg-emerald-300 px-4 py-1'>My Leaves</div>
                        <div className='flex flex-col gap-4 bg-white p-4 divide-y divide-slate-100 h-40 overflow-x-auto mb-4'>
                            {myLeaves.length > 0 ?
                                myLeaves.map((item, i) => (
                                    <LeaveCard key={i} item={item} loadData={loadData} type="1" />
                                ))
                                : <NoItems />}
                        </div>


                        {approveLeaves.length > 0 && (
                            <>
                                <div className='bg-emerald-300 px-4 py-1'>Approve Leaves</div>
                                <div className='flex flex-col gap-4 bg-white p-4 divide-y divide-slate-100 h-40 overflow-x-auto mb-4'>
                                    {approveLeaves.map((item, i) => (
                                        <LeaveCard key={i} item={item} loadData={loadData} type="2" />
                                    ))}
                                </div>
                            </>
                        )}



                    </div>
                    <Holidays />
                </div>
            </main>
            {
                isFormOpen &&
                <ModalPage>
                    <LeaveCreate setIsFormOpen={setIsFormOpen} loadData={loadData} />
                </ModalPage>
            }
        </>
    )
}

export default LeaveManager
