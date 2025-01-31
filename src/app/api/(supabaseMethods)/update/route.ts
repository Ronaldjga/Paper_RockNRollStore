import { SUPABASE } from './../../../../../utils/supabase';
import { authOptions } from './../../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export async function POST(res: Request) {
    const session = await getServerSession(authOptions);
    const supabaseAccessToken: string = session?.supabaseAccessToken ?? ''
    const body = await res.json()
    console.log(body)
    if(supabaseAccessToken) {
        const { data, error } = await SUPABASE(supabaseAccessToken)
        .from('users')
        .update(body)
        .eq('name', session?.user.name)
        .eq('email', session?.user.email)
        return new Response(JSON.stringify(body), {status: 200, headers: {'content-type': 'application/json'}})
    }
}

export async function GET(req: Request, res: Response) {
    const session = await getServerSession(authOptions);
    const supabaseAccessToken: string = session?.supabaseAccessToken ?? ''
    if(supabaseAccessToken) {
        const { data, error } = await SUPABASE(supabaseAccessToken)
        .from('users')
        .update({res})
        .eq('name', session?.user.name)
        .eq('email', session?.user.email)
        return new Response(JSON.stringify(data), {status: 200, headers: {'content-type': 'application/json'}})
    }
}