'use client'
// import { useSession } from 'next-auth/react';
import { LogoutButton } from '../components/Buttons';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import Spinner from './Spinner';
import { AddEmployeeButtton } from '../components/Buttons';
const Navbar = (props) => {
    const [loading, setLoading] = useState(false)
    const userid = props.userid
    return (
        <div className='bg-indigo-600 flex items-center justify-between px-10 text-white w-full h-[60px]'>
            <div>
                <h1 className='text-2xl font-bold'>Management Dashboard</h1>
            </div>
            <div className='flex items-center justify-between gap-5'>
                <LogoutButton onClick={() => {
                    setLoading(true)
                    signOut()
                    setLoading(false)
                }} />
                <Link href={`/addemployee/${userid}`}>
                    <AddEmployeeButtton />
                </Link>
            </div>
            {loading && <Spinner />}
        </div>
    );
}

export default Navbar;
