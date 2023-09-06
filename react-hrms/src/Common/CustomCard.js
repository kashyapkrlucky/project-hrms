import React from 'react'

function CustomCard({ children, classes }) {
    return (
        <div className={"bg-white shadow-md rounded-md p-4 " + classes}>
            {children}
        </div>
    )
}

export default CustomCard
