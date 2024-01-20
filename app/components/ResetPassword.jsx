'use client'
import React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import Spinner from './Spinner';
const ResetPassword = ({ token }) => {
    const router = useRouter()
    const [show, setShow] = useState(false)
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const toggleshow = () => {
        if (show) {
            setShow(false)
        } else {
            setShow(true)
        }
    }
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)

        if (!password || !confirmpassword) {
            setLoading(false)
            toast.error('Please Provide All Feilds')
        } else {
            if (password !== confirmpassword) {
                setLoading(false)
                toast.error('Password did not matched')
            } else {
                if (password.length < 6) {
                    setLoading(false)

                    toast.error('Pasword should be at least 7 characters long')
                }
                else {
                    try {
                        const response = await fetch("/api/resetpassword/",
                            {
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                method: "POST",
                                body: JSON.stringify({ password, token })
                            })

                        if (!response.ok) {
                            const responseData = await response.json()
                            setLoading(false)
                            toast.error(responseData.message)

                        } else {
                            const responseData = await response.json()
                            setLoading(false)
                            toast.success(responseData.message)
                            router.push('/')
                        }

                    } catch (error) {
                        setLoading(false)
                        toast.error(error.messsage)
                    }
                }
            }
        }
    }
    return (
        <div className=" absolute top-0 w-full flex min-h-full flex-1 flex-col justify-center items-center lg:px-8">
            <div className='w-fit p-5 backdrop-blur-[14px] rounded-lg sm:p-20'>


                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                        Enter Your New Password
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit} >
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    New Password
                                </label>

                            </div>
                            <div className="mt-2 relative">
                                <input
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                    name="password"
                                    type={show ? "text" : "password"}
                                    className="  px-[10px] outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <FontAwesomeIcon onClick={toggleshow} width={17} height={17} className=' absolute top-[10px] right-[10px] hover:cursor-pointer' color='#4f46e5' icon={show ? faEye : faEyeSlash} />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Confirm Password
                                </label>

                            </div>
                            <div className="mt-2 relative">
                                <input
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value)
                                    }}
                                    name="password"
                                    type={show ? "text" : "password"}
                                    className="  px-[10px] outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <FontAwesomeIcon onClick={toggleshow} width={17} height={17} className=' absolute top-[10px] right-[10px] hover:cursor-pointer' color='#4f46e5' icon={show ? faEye : faEyeSlash} />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Update Password
                            </button>
                        </div>
                    </form >


                </div >
            </div >
            {loading && <Spinner />}
        </div >
    );
}

export default ResetPassword;
