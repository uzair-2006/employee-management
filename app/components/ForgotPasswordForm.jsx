'use client'
import React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Spinner from './Spinner';
import Link from 'next/link';
const ForgotPasswordForm = () => {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)
        if (!email) {
            setLoading(false)
            toast.error('Please Provide An Email')
        } else {
            try {
                const response = await fetch("/api/forgotpassword",
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        method: "POST",
                        body: JSON.stringify({ email: email })
                    })

                if (!response.ok) {
                    const responseData = await response.json()
                    setLoading(false)

                    toast.error(responseData.message)
                } else {
                    setLoading(false)
                    setEmail("")
                    toast.success('Email Verification Link Sent')
                }

            } catch (error) {
                setLoading(false)
                toast.error(error.messsage)
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
                        Enter Your Email To Update Password
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
                                        setEmail(e.target.value)
                                    }}
                                    value={email}
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    className="px-[10px] outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Send Link
                            </button>
                        </div>
                    </form >

                    <p className="mt-10 text-center text-sm text-gray-500">
                        {' '}
                        <Link href="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Go Back
                        </Link>
                    </p>
                </div >
            </div >
            {loading && <Spinner />}
        </div >
    );
}

export default ForgotPasswordForm;
