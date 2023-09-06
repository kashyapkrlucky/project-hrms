import React, { useState, useContext } from 'react';
import LabelInput from '../../Common/LabelInput';
import BtnSolid from '../../Common/BtnSolid';
import { useNavigate } from 'react-router-dom';
import { cards } from '../../Utils/Classes';
import HttpClient from '../../HttpClient';
import { toast } from 'react-toastify';
import { logoUrl } from '../../Utils/DataService';
import { isExpired, decodeToken } from "react-jwt";
import { UserContext } from '../../Contexts/UserContext';

function SignIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [user, setUser] = useContext(UserContext);
    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData(() => {
            return { ...formData, [name]: value }
        })
    }
    const navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data: { data }, status } = await HttpClient.post('employee/sign-in', formData);
            if (status === 200) {
                const info = decodeToken(data);
                const employee = {
                    _id: info._id,
                    firstName: info.firstName,
                    lastName: info.lastName,
                    email: info.email,
                    avatar: info.avatar
                }
                setUser(employee);
                localStorage.setItem('user', JSON.stringify(employee));
                navigate('/app/dashboard');
            }
        } catch (error) {
            console.log(error);
            // const { response: { data } } = error;
            // toast.error(data.message);
        }
    }
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className='flex flex-row justify-center'>
                    <img className="h-8 w-8" src={logoUrl} alt="Your Company" />
                </div>
                <h2 className="mt-10 text-center text-2xl font-medium text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className={"mt-10 sm:mx-auto sm:w-full sm:max-w-sm " + cards}>
                <form onSubmit={onSubmit} autoComplete='off' className="space-y-6">
                    <LabelInput name="email" value={formData.email} type="email" label="Email Address" onChange={onChange} />
                    <LabelInput name="password" value={formData.password} type="password" label="Password" onChange={onChange} />
                    <div className="text-sm text-gray-500 font-medium text-indigo-600 hover:text-indigo-500">
                        Forgot password?
                    </div>
                    <BtnSolid label="Sign In" />
                </form>
            </div>
        </div>

    )
}

export default SignIn
