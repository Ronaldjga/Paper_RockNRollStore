import { createClient } from "@supabase/supabase-js"

const SUPABASEURL = process.env.SUPABASE_URL ?? ''
const SUPABASEANONKEY = process.env.SUPABASE_ANON_KEY ?? ''

export const SUPABASE = createClient(SUPABASEURL, SUPABASEANONKEY)