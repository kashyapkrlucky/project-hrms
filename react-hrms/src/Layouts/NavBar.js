import React, { useContext, useState } from 'react';
import { BellIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import { NavLink, useNavigate } from 'react-router-dom';
import { textTheme } from '../Utils/Classes';
import { UserContext } from '../Contexts/UserContext';
import Avatar from '../Components/Avatar';

function NavBar({ title = '' }) {
    const [showMenu, setShowMenu] = useState(false);
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();
    const onMenuClick = (e) => {
        if (e.target.name === 'signout') {
            localStorage.clear();
            setUser(null);
            navigate('/');
        }
        setShowMenu(false);
    }
    const defaultColor = " block px-4 py-2 text-sm ";
    const selectedColor = ` ${textTheme} font-medium `;
    return (
        <nav className="bg-white">
            <div className="mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        {
                            title ?
                                (
                                    <div className='flex flex-row items-center gap-4'>
                                        <NavLink to={'/app/dashboard'} className={textTheme}>
                                            <ChevronLeftIcon className='w-6 h-6' />
                                        </NavLink>
                                        <p className='text-2xl'>@{title}</p>
                                    </div>
                                )
                                : <p>Search</p>
                        }
                    </div>
                    <div className='flex items-center gap-2'>
                        <button type="button" className="relative ml-auto flex-shrink-0 rounded-full p-1 text-gray-400 hover:text-slate-700">
                            <span className="absolute -inset-1.5"></span>
                            <span className="sr-only">View notifications</span>
                            <BellIcon className='w-6 h-6' />
                        </button>
                        <div className="ml-3 flex flex-col gap-1">
                            <div className="text-base font-medium leading-none">{user.firstName} {user.lastName}</div>
                            <div className="text-sm leading-none text-gray-400">{user.email}</div>
                        </div>

                        <div className="relative ml-3">
                            <div>
                                <button type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" onClick={() => setShowMenu(!showMenu)}>
                                    <span className="absolute -inset-1.5"></span>
                                    <Avatar employee={user} />
                                </button>
                            </div>
                            {showMenu && <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" onClick={(e) => onMenuClick(e)}>
                                <NavLink
                                    to='/app/my-profile'
                                    className={({ isActive, isPending }) =>
                                        (isPending ? "pending" : isActive ? selectedColor : "text-gray-700") + defaultColor
                                    }
                                >Profile</NavLink>
                                <NavLink
                                    to='/app/settings'
                                    className={({ isActive, isPending }) =>
                                        (isPending ? "pending" : (isActive ? selectedColor : "text-gray-700") + defaultColor)
                                    }
                                >Settings</NavLink>
                                <button name="signout" className={defaultColor}>Sign out</button>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
