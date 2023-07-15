'use client'

import { GithubSignIn } from '@/components/signIn'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function Login() {
  const { data: session } = useSession();

  useEffect(() => {
    if(session){
      console.log('usuario ja logado')
      redirect('/')
    }
    console.log(session)
  }, [session])

  return (
    <main className='w-full min-h-screen bg-black flex justify-center items-center'>
      <div className='min-w-[50%] p-5 bg-Project-black'>
        <GithubSignIn/>
      </div>
    </main>
  )
}
