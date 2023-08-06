import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { NextResponse, NextRequest } from 'next/server';
import NodeCache from 'node-cache';
import { authOptions } from '../auth/[...nextauth]/route';
import { createClient } from '@supabase/supabase-js';

const SUPABASEURL = process.env.SUPABASE_URL ?? ''
const SUPABASEANONKEY = process.env.SUPABASE_ANON_KEY ?? ''

const cache = new NodeCache({ stdTTL: 60 });

export async function POST(res:NextRequest) {
    const body = await res.json();
    const dataProfile = body 
    console.log(dataProfile, 'CONSOLE LOG NA APIIIIIIIIIIIIIIIIIIIII')

    cache.set('data', dataProfile);
    return new Response(JSON.stringify(dataProfile), {status: 200, headers: {'content-type': 'application/json'}})
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession<any>(authOptions);
    const supabaseAccessToken: string = await session?.supabaseAccessToken
    if(supabaseAccessToken) {
        const SUPABASECLIENT = createClient(SUPABASEURL, SUPABASEANONKEY, {global: {headers: {Authorization: `Bearer ${supabaseAccessToken}`}}})
        const { data, error } = await SUPABASECLIENT.from('users').select("*")
        return new Response(JSON.stringify({data, error, session}), {status: 200, headers: {'content-type': 'application/json'}})
    }
}