import { IShirts } from "@/providers/data";

export function idProductPage(id:string, products:IShirts[]): IShirts | null {
    const findProduct = products.find(item => item.id === id) ?? null
    return findProduct
}