import React, { useContext, useState } from 'react'
import { UserContext } from '../Contexts/UserContext';
import Avatar from './Avatar';
import { CameraIcon, XMarkIcon } from '@heroicons/react/24/outline';
import BtnOutline from '../Common/BtnOutline';
import { bgTheme, borderTheme, outlineBtn } from '../Utils/Classes';
import { ModalPage } from './ModelPage';
import { Avatars } from '../Utils/DataService';
import BtnSolid from '../Common/BtnSolid';

function UpdateAvatar({onPhotoChange}) {
    const [user] = useContext(UserContext);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [currentImg, setCurrentImg] = useState(user.avatar);
    const getCurrentImgStyle = (item) => {
        let classes = '';
        if (item.url === user.avatar) {
            classes = `${borderTheme} ${bgTheme}`;
        } else if (item.url === currentImg) {
            classes = `border-amber-700 bg-amber-700`;
        } else {
            classes = 'border-white';
        }
        return classes;
    }

    const onSelect = async (url) => {
        
        onPhotoChange(url);
        setIsEditorOpen(false);
    }

    return (
        <>
            <div className='flex flex-row gap-4 items-center'>
                <Avatar url={currentImg} classes="w-20 h-20" />
                <p className={outlineBtn + ' cursor-pointer'} onClick={() => setIsEditorOpen(true)}>Change</p>
            </div>
            {
                isEditorOpen &&
                <ModalPage>
                    <div className='flex flex-col w-1/3 bg-white radius-4'>
                        <div className='flex flex-row justify-between items-center p-4'>
                            <h3>Change Avatar</h3>
                            <button className='p-1' onClick={() => { setIsEditorOpen(false); setCurrentImg(user.avatar); }}>
                                <XMarkIcon className='w-6 text-slate-500' />
                            </button>
                        </div>
                        <div className='flex flex-row grid grid-cols-5 gap-4 flex-wrap p-4 border-b-2 border-t-2 border-slate-100'>
                            {
                                Avatars.map((item, index) => (
                                    <div key={index} className={"rounded-full border-4 " + getCurrentImgStyle(item)} onClick={() => {setCurrentImg(item.url);onSelect(item.url)}}>
                                        <Avatar name={item.name} url={item.url} classes='w-20 h-20 cursor-pointer' />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </ModalPage>
            }
        </>
    )
}

export default UpdateAvatar