'use client'
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
const EmployeeTable = () => {

    const { data: session } = useSession();
    const [employedata, setData] = useState(null)
    useEffect(() => {
        async function getAllusers() {
            try {
                const id = session?.user.id
                const response = await fetch("/api/employees/getallemployees",
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        method: "POST",
                        body: JSON.stringify(id)
                    })
                const responseData = await response.json()
                console.log(responseData.data)
                setData(responseData.data)

            } catch (error) {
                toast.error(error.messsage)
                setLoading(false)
            }
        }
        getAllusers()

    }, [session])
    return (
        <>




            <div className='pt-[180px]' >
                <div className="overflow-x-auto cursor-pointer pt-10">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>.#</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Status</th>
                                <th>Department</th>
                                <th>Gender</th>
                                <th>Ations</th>

                            </tr>
                        </thead>
                        <tbody>
                            {employedata && employedata.map((employee, index) => (
                                <>


                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        {console.log('length', employee.length)}
                                        <td>{employee.name ? (employee.name) : (<p className='text-red-500'>Not added</p>)}</td>
                                        <td>{employee.phoneNumber ? (employee.phoneNumber) : (<p className='text-red-500'>Not added</p>)}</td>
                                        <td>{employee.address ? (employee.address) : (<p className='text-red-500'>Not added</p>)}</td>
                                    </tr>
                                </>
                            ))}
                            {!employedata && <tr className='border-0'>
                                <td colSpan="8" className='w-full border-0'>
                                    <p className='text-center text-2xl'>No employees Found</p>
                                </td>
                            </tr>}




                        </tbody>
                    </table>
                </div>

            </div>

        </>
    );
}

export default EmployeeTable;
