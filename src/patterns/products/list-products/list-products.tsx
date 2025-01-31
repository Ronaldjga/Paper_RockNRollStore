import { Product } from "@/components/product"
import { ICart, IShirts, IUserData } from "@/providers/data"
import { moneyFomat } from "../../../../utils/operations"
import Count from "@/components/inputs/count/count"
import { productStorage } from "../../../../utils/product"
import { reqUserStorage } from "../../../../utils/reqUserData"
import ListProductsActions from "./list-products-actions"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export const dynamic = 'force-dynamic'
export const revalidate = 'no-store'

export default async function ProductsList() {
    const allProduct = await productStorage() as IShirts[]
    const session = await getServerSession(authOptions)

    let products: IShirts[] = []
    let wishlist: IShirts[] = []
    let cart: ICart[] = []

    if(allProduct.length != 0) {
        products = allProduct
    }

    if(session){
        const userStorage = await reqUserStorage() as IUserData
        wishlist = userStorage.wishlist
        cart = userStorage.cart
    } else{
        wishlist = []
        cart = []
    } 

    return (
        <section className="p-5 flex flex-col gap-2 min-h-screen">
            {
                cart.map((item, i) => {
                    return (
                        <Product.Root key={i} className="w-full h-fit min-h-[100px] flex-row flex-wrap gap-2 border-b-4">
                            <Product.Image
                                image={item.image}
                                alt={item.band}
                                rootClassName="min-w-[100px] w-[75px] h-[100px] border-2 bg-white shadow-sm rounded-md"
                                imageClassName="object-contain p-1"
                            />
                            <Product.Content className="grow flex flex-col flex-wrap gap-2 justify-around">
                                <div className="">
                                    <Product.Text
                                        className="font-medium text-[0.7rem]"
                                        Tag={"h3"}
                                        text={item.band}
                                    />
                                    <Product.Content className="flex gap-2">
                                        <Product.Text
                                            className="text-[0.7rem] border rounded-md py-[1px] px-2"
                                            Tag={"p"}
                                            text={item.size.toUpperCase()}
                                        />
                                        <Product.Text
                                            className="text-[0.7rem] border rounded-md py-[1px] px-2"
                                            Tag={"p"}
                                            text={item.color.toUpperCase()}
                                        />
                                    </Product.Content>
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <Product.Content>
                                        <Product.Text
                                            className="font-bold text-[0.7rem]"
                                            Tag={"p"}
                                            text={`Unidade: ${moneyFomat(item.price)}`}
                                        />
                                        <Product.Text
                                            className="text-[0.7rem] font-bold text-center"
                                            Tag={"p"}
                                            text={`Subtotal: ${moneyFomat(item.totalPrice)}`}
                                        />
                                    </Product.Content>
                                </div>
                                <Product.Content className="flex gap-2 items-center justify-start">                                    
                                    <ListProductsActions product={item} wishlist={wishlist} cart={cart} allProducts={products}/>
                                </Product.Content>
                            </Product.Content>
                        </Product.Root>
                    )
                })
            }
        </section>
    )
}
