import { createClient } from "@supabase/supabase-js"

const SUPABASEURL = process.env.SUPABASE_URL ?? ''
const SUPABASEANONKEY = process.env.SUPABASE_ANON_KEY ?? ''

export const SUPABASE = (userToken?:string) => {
    if(userToken) {
        return createClient(SUPABASEURL, SUPABASEANONKEY, {global: {headers: {Authorization: `Bearer ${userToken}`}}})
    } else {
        return createClient(SUPABASEURL, SUPABASEANONKEY)
    }
}