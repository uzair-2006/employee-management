import LoginForm from "../components/LoginForm"
import { getServerSession } from 'next-auth';
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation';
export default async function Home() {
  const session = await getServerSession(authOptions)
  if (session) {
    return redirect('/dashboard')
  }
  return (
    <>
      <div className=" relative   w-full h-[100vh] bg-center bg-cover bg-no-repeat bg-[url('/images/background-image.jpg')]">

      </div>
      <LoginForm />
    </>
  )
}
