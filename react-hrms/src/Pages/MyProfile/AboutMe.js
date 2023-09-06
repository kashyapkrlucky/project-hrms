import React, { useContext, useState } from 'react'
import UpdateAvatar from '../../Components/UpdateAvatar';
import LabelInput from '../../Common/LabelInput';
import LabelTextarea from '../../Common/LabelTextarea';
import BtnSolid from '../../Common/BtnSolid';
import { UserContext } from '../../Contexts/UserContext';
import HttpClient from '../../HttpClient';

function AboutMe() {
    const [user, setUser] = useContext(UserContext);
    const [formData, setFormData] = useState({
        avatar: '',
        aboutMe: '',
        username: '',
        id: user._id
    });
    const onPhotoChange = (e) => {
        setFormData(prev => {
            return { ...prev, avatar: e };
        })
    }
    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData(() => {
            return { ...formData, [name]: value }
        })
    }
    const onSave = async () => {
        const { data: { data }, status } = await HttpClient.put('employee/update/profile', formData);
        if (status === 200) {
            setUser({...user, avatar: formData.avatar})
        }
    }
    return (
        <div className='flex flex-col gap-4 p-3'>
            <UpdateAvatar onPhotoChange={onPhotoChange} />
            <div className="sm:col-span-4">
                <LabelInput label='Username' type="text" value={formData.username} name="username" onChange={onChange} />
            </div>

            <div className="col-span-full">
                <LabelTextarea label='About Me' value={formData.aboutMe} name="aboutMe" onChange={onChange} />
                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
            </div>
            <div className="mt-2 flex items-center justify-end gap-4">
                <BtnSolid label="Save" onClick={onSave} />
            </div>
        </div>
    )
}

export default AboutMe