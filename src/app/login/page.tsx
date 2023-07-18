import { GithubSignIn } from '@/components/signIn'
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function Login() {
  const session = await getServerSession<any>(authOptions)
  console.log(session, 'console na login page')
  if(session) redirect("/")

  return (
    <main className='w-full min-h-screen bg-black flex justify-center items-center'>
      <div className='min-w-[50%] p-5 bg-Project-black'>
        <GithubSignIn/>
      </div>
    </main>
  )
}
