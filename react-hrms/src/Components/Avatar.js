import React from 'react'

function Avatar({ employee, classes = 'h-8 w-8', alt = 'image' }) {
    return (
        <>
            {
                employee?.avatar ?
                    <img
                        className={"rounded-full " + classes}
                        src={"/avatars/" + employee?.avatar}
                        alt={alt}
                    /> :
                    <div className={"rounded-full flex flex-row justify-center items-center border-2 border-slate-500 " + classes}>
                        {employee?.firstName[0]}
                        {employee?.lastName[0]}
                    </div>
            }
        </>
    )
}

export default Avatar