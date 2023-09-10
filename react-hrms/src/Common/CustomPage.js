import React from 'react'
import { container } from '../Utils/Classes';
import SubNavBar from '../Layouts/SubNavBar';

function CustomPage({ title, btnOne, children, classes }) {
    return (
        <>
            <SubNavBar title={title} btnOne={btnOne}/>
            <main className={container + ' overflow-y-auto h-4/5 '}>
                {children}
            </main>
        </>
    )
}

export default CustomPage