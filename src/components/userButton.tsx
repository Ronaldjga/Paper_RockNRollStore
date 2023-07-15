'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

export default function UserButton() {
    const { data: session } = useSession()
    console.log(session)

    return (
        <>
            {
            session 
            ? (
                <button className='px-5 py-2 bg-Project-red-fist text-white' onClick={() => signOut()}>Sair</button>
            ) 
            : (<button className='px-5 py-2 bg-Project-red-fist text-white' onClick={() => signIn()}>Login</button>)
            }
        </>
    )
}
