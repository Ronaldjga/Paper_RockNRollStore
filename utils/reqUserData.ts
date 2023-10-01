import { getServerSession } from 'next-auth';
import { SUPABASE } from './supabase';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function reqUserStorage() {
    const session = await getServerSession(authOptions);
    const supabaseAccessToken: string = session?.supabaseAccessToken ?? ''
    if(supabaseAccessToken) {
        const { data, error } = await SUPABASE(supabaseAccessToken).from('users').select("*").eq('name', session?.user.name).eq('email', session?.user.email)
        if(data && data.length > 0) {
            const userData = data[0]
            return userData
        }
        return data
    }
}