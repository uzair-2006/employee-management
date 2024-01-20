'use client'
import { useSession } from 'next-auth/react';
import Navbar from '@/app/components/Navbar';
import Spinner from '@/app/components/Spinner';
import EmployeeTable from '@/app/components/EmployeeTable';

const Page = () => {
    const { data: session } = useSession();




    return (
        <>
            <div>
                <Navbar userid={session?.user.id} />
                <div className='w-full h-fit p-10 flex items-center justify-center'>
                    <EmployeeTable />
                </div>
            </div>
            {!session && <Spinner />}
        </>
    );
};

export default Page;
