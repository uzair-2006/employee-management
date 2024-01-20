'use client'
import React from 'react';
import Link from 'next/link';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Spinner from './Spinner';

const RegisterForm = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [data, setData] = useState({ name: "", email: "", password: "" })

    const toggleshow = () => {
        if (show) {
            setShow(false)
        } else {
            setShow(true)
        }
    }
    async function handleSubmit(e) {
        setLoading(true)
        e.preventDefault()
        if (!data.name || !data.email || !data.password) {
            setLoading(false)
            toast.error('Please provide all feilds')
        }
        else {
            if (data.password.length < 6) {
                setLoading(false)
                toast.error('Pasword should be at least 7 characters long')
            } else {
                try {
                    const response = await fetch("/api/register",
                        {
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            method: "POST",
                            body: JSON.stringify(data)
                        })
                    const responseData = await response.json()
                    if (responseData.type === "failiure") {
                        setLoading(false)
                        toast.error(responseData.message)
                    }
                    else {
                        toast.success(responseData.message)
                        router.push('/')
                        setLoading(false)
                    }
                } catch (error) {
                    toast.error(error.messsage)
                    setLoading(false)
                }

            }
        }
    }
    return (
        <div className=" absolute top-0 w-full  flex min-h-full flex-1 flex-col justify-center px-6 py-12 items-center lg:px-8">
            <div className='w-fit p-5 backdrop-blur-[10px] rounded-lg sm:p-20'>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                        Register For Free Account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit} >
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Your Company Name
                            </label>
                            <div className="mt-2 ">
                                <input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => {
                                        setData({ ...data, name: e.target.value })
                                    }}
                                    name="email"
                                    type="text"
                                    className=" px-[10px] outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    value={data.email}
                                    onChange={(e) => {
                                        setData({ ...data, email: e.target.value })
                                    }}
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    className=" px-[10px] outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>

                            </div>
                            <div className="mt-2 relative">
                                <input
                                    id="password"
                                    value={data.password}
                                    onChange={(e) => {
                                        setData({ ...data, password: e.target.value })
                                    }}
                                    name="password"
                                    type={show ? "text" : "password"}
                                    autoComplete="current-password"
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
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link href="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            SignIn here
                        </Link>
                    </p>
                </div>
            </div>
            {loading && <Spinner />}
        </div>
    );
}

export default RegisterForm;
