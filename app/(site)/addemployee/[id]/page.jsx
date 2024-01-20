import React from 'react';
import AddEmloyeeForm from '@/app/components/AddEmloyeeForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
const Page = async ({ params }) => {
    const session = await getServerSession(authOptions)
    const id = await params.id
    if (session.user.id !== id) {
        return redirect('/dashboard')
    }

    return (
        <div className='flex items-center justify-center w-full h-[100vh]'>
            <AddEmloyeeForm userid={id} />
        </div>
    );
}

export default Page;
