import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { SUPABASE } from "../../../utils/supabase"


export default async function Notifications() {
    const session = await getServerSession<any>(authOptions)
    // if(session) {
    //     await SUPABASE.from('users').select('*').eq('email', session.user.email).then(({data}) => console.log(data, 'CONSOLE EM NOTIFICATIONS WIDGET'))
    // }
    // const req = await fetch('http://localhost:3000/api/signin')
    // const data = await req.json()
    // console.log(data, 'CONSOLE DA REQUISIÇÃO DA API NA NOTIFICAÇÃO')

    return (
        <div className="fixed">
            
        </div>
    )
}
