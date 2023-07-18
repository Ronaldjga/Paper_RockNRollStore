import { signIn, signOut, useSession } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function UserButton() {
    const session = await getServerSession<any>(authOptions)

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
