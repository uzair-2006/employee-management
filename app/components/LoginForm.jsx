'use client'
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Link from "next/link"
import toast from 'react-hot-toast';
import React from 'react';
import Spinner from './Spinner';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
const LoginForm = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [data, setData] = useState({ email: "", password: "" })
    const toggleshow = () => {
        if (show) {
            setShow(false)
        } else {
            setShow(true)
        }
    }
    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();

        if (!data.email || !data.password) {
            setLoading(false)
            toast.error('Please provide all fields');
        } else {
            const { email, password } = data;

            try {
                const response = await signIn('credentials', { email, password, redirect: false });
                if (response.error) {
                    setLoading(false)
                    toast.error('Invalid Username Or Password');
                } else {
                    toast.success('Authentication successful');
                    router.replace(`/dashboard/`);
                    setLoading(false)
                }
            } catch (error) {
                toast.error(error.message);
                setLoading(false)
            }
        }
    };

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
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    onChange={(e) => {
                                        setData({ ...data, email: e.target.value })
                                    }}
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    className="px-[10px] outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <Link href="/forgotpassword" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-2 relative">
                                <input
                                    id="password"
                                    name="password"
                                    onChange={(e) => {
                                        setData({ ...data, password: e.target.value })
                                    }}
                                    type={show ? "text" : "password"}
                                    autoComplete="current-password"
                                    className="  px-[10px] outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <FontAwesomeIcon width={17} height={17} onClick={toggleshow} className=' absolute top-[10px] right-[10px] hover:cursor-pointer' color='#4f46e5' icon={show ? faEye : faEyeSlash} />
                            </div>
                        </div >

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form >

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Don't have an account{' '}
                        <Link href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Register here
                        </Link>
                    </p>
                </div >
            </div >
            {loading && <Spinner />}
        </div >
    );
}

export default LoginForm;
