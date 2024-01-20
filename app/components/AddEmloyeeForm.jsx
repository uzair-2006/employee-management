'use client'
import React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Spinner from './Spinner';
import { useRouter } from 'next/navigation';

const AddEmloyeeForm = ({ userid }) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [data, setData] = useState({
        name: '',
        email: '',
        gender: undefined,
        phone: null,
        emergencyPhone: null,
        salary: null,
        address: '',
        id: userid
    })
    async function handleSubmit(e) {
        e.preventDefault()
        if (!data.name || !data.email || !data.phone || !data.address || !data.gender || !data.salary || !data.emergencyPhone) {
            toast.error('Please provide all feilds')
        } else {
            setLoading(true)
            try {
                const response = await fetch("/api/employees/create-employee",
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        method: "POST",
                        body: JSON.stringify(data)
                    })
                const responseData = await response.json()
                console.log(responseData)
                if (responseData.success === false) {
                    setLoading(false)
                    toast.error(responseData.message)
                }
                else {
                    toast.success(responseData.message)
                    setLoading(false)
                    return router.push('/dashboard')
                }
            } catch (error) {
                toast.error(error.message)
                setLoading(false)
            }
        }

    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div id='container' className='flex flex-col items-center justify-center gap-5 h-[100%] w-[100%] ' >


                    <div id='inputcont' className='flex gap-2'>
                        <input type="text" onChange={(e) => { setData({ ...data, name: e.target.value }) }} id='input1' placeholder="Name" className="input input-bordered input-md w-[270px] " />
                        <input type="email" onChange={(e) => { setData({ ...data, email: e.target.value }) }} id='input2' placeholder="Email" className="input input-bordered input-md w-[270px] " />
                    </div>
                    <div id='inputcont2' className='flex gap-2'>
                        <select onChange={(e) => { setData({ ...data, gender: e.target.value }) }} id='input4' className="select text-[#9b9b9b] select-bordered w-[270px]  ">
                            <option disabled selected>Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Confedential</option>
                        </select>
                        <input type="integer" onChange={(e) => { setData({ ...data, phone: e.target.value }) }} id='input5' placeholder="PhoneNumber" className="input input-bordered input-md w-[270px] " />
                    </div>
                    <div id='inputcont3' className='flex gap-2'>
                        <input type="integer" id='input6' onChange={(e) => { setData({ ...data, emergencyPhone: e.target.value }) }} placeholder="Emergency PhoneNumber" className="input input-bordered input-md w-[270px]    " />
                        <input type="integer" id='input7' onChange={(e) => { setData({ ...data, salary: e.target.value }) }} placeholder="Basic Salary" className="input input-bordered input-md w-[270px] " />
                    </div>

                    <input type="text" id='input3' onChange={(e) => { setData({ ...data, address: e.target.value }) }} placeholder="Employee Address" className="  input input-bordered input-md w-[550px] " />
                    <button type='submit' className='h-[40px] w-[160px] rounded-md text-white font-bold bg-green-500 transition duration-[.3s] hover:bg-green-300'>Create Employee</button>


                    <style jsx>{`
                @media (max-width: 594px) {
                     #inputcont, #inputcont2, #inputcont3, #inputcont4, #input1, #input2, #input3, #input4, #input5, #input6, #input7 {
                         width:100%
                        }
                        #container {
                            margin:0px 20px
                        }
                    }
                    @media (max-width: 388px) {
                        #inputcont {
                            flex-direction:column;
                            gap:20px;
                        }
                        
                    }
                    `}</style>

                </div>
            </form>
            {loading && <Spinner />}
        </>
    );
}

export default AddEmloyeeForm;
