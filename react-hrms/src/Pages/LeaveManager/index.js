import React, { useContext, useEffect, useState } from 'react'
import SubNavBar from '../../Layouts/SubNavBar'
import { container } from '../../Utils/Classes'
import { ModalPage } from '../../Components/ModelPage';
import LeaveCreate from './Create';
import Holidays from './Holidays';
import HttpClient from '../../HttpClient';
import { UserContext } from '../../Contexts/UserContext';
import CustomGrid from '../../Components/CustomGrid';
import LeaveStatus from './LeaveStatus';
import Moment from 'react-moment';
import { leaveTypes } from '../../Utils/DataService';
import MoreMenu from '../../Common/MoreMenu';

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
            const newData = genData(data, '1');
            setMyLeaves(newData);
        }
    }
    const getApprovalLeaves = async () => {
        const { data: { data }, status } = await HttpClient.get(`/leave/approval/${user._id}`);
        if (status === 200) {
            const newData = genData(data, '2');
            setApproveLeaves(newData);
        }
    }
    const loadData = () => {
        getBalance();
        getMyLeaves();
        getApprovalLeaves();
    }

    const updateStatus = async (item, leaveStatus) => {
        const payload = {
            id: item?._id,
            balanceId: item.balance,
            leaveType: leaveTypes[item?.leaveType - 1].key,
            status: leaveStatus
        }
        const { status } = await HttpClient.post(`/leave/update/status`, payload);
        if (status === 200) {
            loadData();
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    const genData = (data, type) => {
        const result = [];
        for (const item of data) {
            const newItem = {
                ...item,
                employee: item.employee ? `${item?.employee?.firstName} ${item?.employee.lastName}` : '--',
                startDate: <Moment format="Do MMM, YYYY">{item?.startDate}</Moment>,
                endDate: <Moment format="Do MMM, YYYY">{item?.endDate}</Moment>,
                isHalfDay: item.isHalfDay ? 'Yes' : 'No',
                leaveType: leaveTypes[item?.leaveType - 1].name,
                status: <LeaveStatus classes='w-24' status={item?.status} />,
                actions: (
                    item?.status === 1 ?
                        (
                            type === '1'
                                ? <MoreMenu list={[{ label: 'Cancel Leave', action: () => updateStatus(item, 4) }]} />
                                : <MoreMenu list={[{ label: 'Approve Leave', action: () => updateStatus(item, 2) }, { label: 'Reject Leave', action: () => updateStatus(item, 3) }]} />
                        )
                        :
                        <div className='text-xs text-slate-400'>No Actions</div>
                )
            }
            result.push(newItem);
        }
        return result;
    }

    const gHeaders = [
        { key: 'employee', name: 'Employee', width: '18%' },
        { key: 'leaveType', name: 'Leave Type', width: '12.5%' },
        { key: 'reason', name: 'Reason', width: '18%' },
        { key: 'isHalfDay', name: 'Half Day', width: '8%' },
        { key: 'startDate', name: 'From', width: '12%' },
        { key: 'endDate', name: 'To', width: '12%' },
        { key: 'days', name: 'Days', width: '5%' },
        { key: 'status', name: 'Status', width: '10%' },
        { key: 'actions', name: 'Actions', width: '8%' }
    ];

    return (
        <>
            <SubNavBar title="Leave Manager" btnOne={btnOne} />
            <main className={container + ' overflow-y-auto h-4/5'}>
                <div className='flex flex-row gap-4'>
                    <div className='w-3/4 flex flex-col'>
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
                        <div className='flex flex-col gap-4 bg-white px-4 mb-4'>
                            <CustomGrid gHeaders={gHeaders.slice(1, gHeaders.length)} list={myLeaves} />
                        </div>


                        {approveLeaves.length > 0 && (
                            <>
                                <div className='bg-emerald-300 px-4 py-1'>Approve Leaves</div>
                                <div className='flex flex-col gap-4 bg-white px-4 mb-4'>
                                    <CustomGrid gHeaders={gHeaders} list={approveLeaves} />
                                </div>
                            </>
                        )}



                    </div>
                    <div className='w-1/4'>
                        <Holidays />
                    </div>
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
