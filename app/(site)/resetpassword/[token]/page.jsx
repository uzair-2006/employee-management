

import React from 'react';
import ResetPassword from '@/app/components/ResetPassword';
const Page = ({ params }) => {

    return (
        <>
            <div className=" relative   w-full h-[100vh] bg-center bg-cover bg-no-repeat bg-[url('/images/background-image.jpg')]">

            </div>
            <ResetPassword token={params.token} />

        </>
    );
}

export default Page;
