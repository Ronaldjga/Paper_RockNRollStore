import { IShirts } from "@/providers/data";
import { SUPABASE } from "./supabase";

export function idProductPage(id:string, products:IShirts[]): IShirts | null {
    const findProduct = products.find(item => item.id === id) ?? null
    return findProduct
}

export async function productStorage(id?: string): Promise<IShirts | IShirts[] | null> {
    const { data, error } = await SUPABASE().from('Storage').select('Band, Shirts')
    const products: IShirts[] = data?.reduce((acc: IShirts[], obj: { Band: string; Shirts?: IShirts[] }) => {
        if (obj.Shirts) {
        return [...acc, ...obj.Shirts];
        }
        return acc;
    },[]) || [];
    if (id && products) {
        const singleProduct = products.find(item => item.id === id)
        return singleProduct ?? null
    } else if (products && !id) {
        return products
    } else {
        return  null
    }
}