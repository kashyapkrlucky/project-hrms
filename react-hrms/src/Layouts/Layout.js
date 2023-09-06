import React from 'react'
import { Outlet } from 'react-router-dom'
import SideMenu from './SideMenu'
import NavBar from './NavBar'

function Layout() {
    return (
        <div className='flex flex-row h-screen'>
            <SideMenu />
            <div className='w-5/6'>
                <NavBar />
                <Outlet />
            </div>
        </div>
    )
}

export default Layout
