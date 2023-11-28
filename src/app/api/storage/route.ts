import { SUPABASE } from '../../../../utils/supabase';

export async function GET(req: Request, res: Response) {
    const { data, error } = await SUPABASE().from('Storage').select('Band, Shirts')
    return new Response(JSON.stringify(data), {status: 200, headers: {'content-type': 'application/json'}})
}