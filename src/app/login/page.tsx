import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { SigninButton } from '@/components/signinButton';
import githubIcon from '~/img/github-icon.svg'
import googleIcon from '~/img/google-icon.svg'


export default async function Login() {
  const session = await getServerSession<any>(authOptions)
  // console.log(session, 'console na login page')
  if(session){
    redirect("/")
  } 

  return (
    <main className='w-full min-h-screen p-2 flex flex-col justify-center items-center relative gap-5'>
      <div>
        <h2 className='text-project-quaternary-500 font-bold text-[2rem] text-center'>Login</h2>
        <p className='text-project-quaternary-300 text-center'>Por favor, faça login para continuar</p>
      </div>
      <div className='min-w-[50%] min-h-[50vh] w-full p-5 bg-project-secondary-500 rounded-md'>
        <SigninButton.Root className=' w-full h-full flex flex-col gap-3 justify-center'>
          <SigninButton.Content provider='github' text='Github' icon={githubIcon}/>
          <SigninButton.Content provider='google' text='Google' icon={googleIcon}/>
        </SigninButton.Root>
      </div>
    </main>
  )
}
