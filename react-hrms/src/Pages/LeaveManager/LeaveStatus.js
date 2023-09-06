import React from 'react'

function LeaveStatus({ status, classes }) {
    const statusList = ['pending', 'accepted', 'rejected', 'cancelled'];
    const colorList = ['text-amber-500', 'text-green-500', 'text-red-500', 'text-red-500'];
    return (
        <div className={classes + ' capitalize ' + colorList[status - 1]}>
            {statusList[status - 1]}
        </div>
    )
}

export default LeaveStatus