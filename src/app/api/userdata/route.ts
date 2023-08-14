import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { SUPABASE } from '../../../../utils/supabase';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(authOptions);
    const supabaseAccessToken: string = session?.supabaseAccessToken ?? ''
    if(supabaseAccessToken) {
        const { data, error } = await SUPABASE(supabaseAccessToken).from('users').select("*").eq('name', session?.user.name).eq('email', session?.user.email)
        return new Response(JSON.stringify(data), {status: 200, headers: {'content-type': 'application/json'}})
    }
}