import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { SigninButton } from '@/components/signinButton';

export default async function Login() {
  const session = await getServerSession<any>(authOptions)
  // console.log(session, 'console na login page')
  if(session){
    redirect("/")
  } 

  return (
    <main className='w-full min-h-screen p-2 flex justify-center items-center relative'>
      <div className='min-w-[50%] w-full p-5 bg-Project-black'>
        <SigninButton.Root provider='github'>
          <SigninButton.Content text='Github'/>
        </SigninButton.Root>
        <SigninButton.Root provider='google'>
          <SigninButton.Content text='Google'/>
        </SigninButton.Root>
      </div>
    </main>
  )
}
