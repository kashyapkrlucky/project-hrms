import React from 'react'
import { useParams } from 'react-router-dom'
import NavBar from '../../Layouts/NavBar';

function Employee() {
    let { username } = useParams();
    return (
        <>
            <NavBar title={username} />
            
        </>
    )
}

export default Employee