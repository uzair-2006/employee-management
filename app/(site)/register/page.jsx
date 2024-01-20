import RegisterForm from '@/app/components/RegisterForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
const Page = async () => {
    const session = await getServerSession(authOptions)
    if (session) {
        return redirect('/dashboard')
    }

    return (
        <>
            <div className=" relative   w-full h-[100vh] bg-center bg-cover bg-no-repeat bg-[url('/images/background-image.jpg')]">
            </div>
            <RegisterForm />
        </>

    );
}

export default Page;
