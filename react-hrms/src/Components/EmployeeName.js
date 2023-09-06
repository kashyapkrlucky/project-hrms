import React from 'react'
import Avatar from './Avatar';

function EmployeeName({ employee }) {
    return (
        <div className='flex flex-row items-center gap-4'>
            <Avatar url={employee?.avatar}/>
            <p>{employee?.firstName} {employee?.lastName}</p>
        </div>
    )
}

export default EmployeeName
