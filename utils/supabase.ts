import { createClient } from "@supabase/supabase-js"

const SUPABASEURL = process.env.SUPABASE_URL ?? ''
const SUPABASEANONKEY = process.env.SUPABASE_ANON_KEY ?? ''

export const SUPABASE = (userToken?:string) => {
    if(userToken) {
        const client = createClient(SUPABASEURL, SUPABASEANONKEY, {global: {headers: {Authorization: `Bearer ${userToken}`}}})
        return client
    } else {
        const client = createClient(SUPABASEURL, SUPABASEANONKEY)
        return client
    }
}