import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import AccountActions from './accountActions'

export default async function SessionAccount() {
    const session: any = await getServerSession<any>(authOptions)
    // console.log(session, 'console no sessionAccount')
    return (
        <>
            {
            session 
            ? (
                <AccountActions action={true} icon={session.user.image}/>
            ) 
            : (<AccountActions action={false}/>)
            }
        </>
    )
}
