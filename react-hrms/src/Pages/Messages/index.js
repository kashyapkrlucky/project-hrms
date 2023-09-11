import React, { useContext, useEffect, useState } from 'react'
import { FaceSmileIcon, PaperAirplaneIcon, PaperClipIcon, PhoneIcon, PlusIcon } from '@heroicons/react/24/outline'
import Avatar from '../../Components/Avatar'
import HttpClient from '../../HttpClient';
import LabelInput from '../../Common/LabelInput'
import { UserContext } from '../../Contexts/UserContext';
import Moment from 'react-moment';

function Messages() {
    const [user] = useContext(UserContext);
    const [text, setText] = useState('');
    const [currentThread, setCurrentThread] = useState({});
    const [threads, setThreads] = useState([]);
    const [messages, setMessages] = useState([]);
    const getThreads = async () => {
        const { data: { data }, status } = await HttpClient.get(`message/threads/${user._id}`);
        if (status === 200) {
            setThreads(data);
            setCurrentThread(data[0]?.user)
        }
    }

    const onThreadSelect = (user) => {
        setCurrentThread(user);
    }

    const getMessages = async () => {
        if (currentThread) {
            const payload = { from: user._id, to: currentThread._id }
            const { data: { data }, status } = await HttpClient.post(`message/list`, payload);
            if (status === 200) {
                setMessages(data);
            }
        }
    }

    const onChange = (e) => {
        setText(e.target.value);
    }

    const sendMessage = async () => {
        if (text) {
            const payload = { from: user._id, to: currentThread._id, text }
            const { status } = await HttpClient.post(`message/send`, payload);
            if (status === 200) {
                setText('');
                getMessages();
            }
        }
    }


    useEffect(() => {
        getThreads();
    }, []);


    useEffect(() => {
        getMessages();
    }, [currentThread]);

    return (
        <div className={'h-5/6 bg-white shadow-md rounded-md m-4 px-4 py-0 flex flex-row gap-4 divide-x divide-slate-200'}>
            <div className='w-1/5 flex flex-col divide-y divide-slate-200'>
                <div className='flex flex-row justify-between items-center pt-4 mb-2 h-12'>
                    <p>My Messages</p>
                    <button>
                        <PlusIcon className='w-6 h-6' />
                    </button>
                </div>
                <div className='flex flex-col divide-y divide-slate-200'>
                    {
                        threads.map((e, i) => (
                            <div className='flex flex-row gap-2 py-2 cursor-pointer' key={i} onClick={() => onThreadSelect(e?.user)}>
                                <Avatar classes='w-10 h-10' url={e?.user?.avatar} />
                                <div className='flex flex-col w-full'>
                                    <p className='text-sm text-lg text-gray-900'>{e?.user?.firstName + ' ' + e?.user?.lastName}</p>
                                    <p className='text-xs text-gray-500'>{e?.lastMessage}</p>
                                </div>
                                <div className='flex flex-row items-center'>
                                    {/* <p className='w-4 h-4 flex flex-row justify-center items-center bg-red-500 text-white rounded-full text-xs'>3</p> */}
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
            {
                currentThread ?
                    <div className='w-4/5 pl-4 flex flex-col divide-y divide-slate-200'>
                        <div className='flex flex-row justify-between mb-2 h-12 pt-4'>
                            <div className='flex flex-row gap-2 items-center'>
                                <Avatar classes='w-8 h-8' url={currentThread?.avatar} />
                                <div className='flex flex-col w-full justify-center'>
                                    <span className='text-sm text-gray-900'>{currentThread?.firstName + ' ' + currentThread?.lastName}</span>
                                    <span className='text-xs text-gray-500'>Online</span>
                                </div>
                            </div>
                            <button>
                                <PhoneIcon className='w-6 h-6' />
                            </button>
                        </div>
                        <div className='pt-4 h-full'>
                            <div className='h-5/6 flex flex-col gap-4'>
                                {
                                    messages.map((msg, j) => (
                                        <div className={'flex flex-row ' + (msg?.from === user._id ? '' : 'justify-end')} key={j}>
                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-row gap-2 items-center'>
                                                    <Avatar url={msg?.from === user._id ? user.avatar : currentThread.avatar} />
                                                    <div className={(msg?.from === user._id ? 'bg-gray-50' : 'bg-blue-500 text-white') + ' px-4 py-2 rounded-md'}>
                                                        {msg?.text}
                                                    </div>
                                                </div>
                                                <div className='text-xs text-slate-500 pl-10'>
                                                    <Moment fromNow>{msg.created_at}</Moment>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='h-1/6 flex flex-row gap-4 items-center border-t border-slate-300'>
                                <LabelInput name="text" value={text} onChange={onChange} />
                                <button className='text-amber-500'>
                                    <FaceSmileIcon className='w-6 h-6' />
                                </button>
                                <button className='text-slate-500'>
                                    <PaperClipIcon className='w-6 h-6' />
                                </button>
                                <button className='text-blue-500' onClick={() => sendMessage()}>
                                    <PaperAirplaneIcon className='w-6 h-6' />
                                </button>
                            </div>
                        </div>
                    </div> :
                    <div className='w-4/5 pl-4 flex flex-col justify-center items-center'>
                        <p className='text-3xl text-gray-400'>No Messages</p>
                    </div>
            }
        </div>
    )
}

export default Messages