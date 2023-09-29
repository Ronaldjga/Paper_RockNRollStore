'use client'

import { Product } from "@/components/product";
import { IShirts, UseDataProducts } from "@/providers/data";
import { useRouter } from "next/navigation";
import addBag from '~/img/backpackBlackBuy.svg'
import { wishlistButtonIcon } from "../../../utils/wishlist";
import { moneyFomat } from "../../../utils/operations";
import { updateDb } from "../../../utils/methods";

export function ProductsGrid({ products } : { products: IShirts[] }) {
    const { wishlist, setWishlist } = UseDataProducts()
    const router = useRouter()

    return (
        <div className="grid grid-cols-2 gap-2">
            {
                products?.map((data, index) => {
                    return(
                    <Product.Root key={index} className="bg-project-tertiary-400 border-b-8 border-project-primary-500 rounded-t-md gap-5 flex flex-col items-center">
                        <Product.Image 
                            rootClassName="w-full pb-[125%] bg-"
                            image={data.image}
                            alt={data.band}
                            action={() => {
                                router.push(`/products/shirts/${data.id}`)
                            }}
                        />
                        <Product.Content className="w-full p-2 border-t-4 border-project-secondary-500 flex flex-wrap justify-between">
                            <div className="">
                                <Product.Text className="font-medium text-[0.8rem]" Tag={"h3"} text={data.band}/>
                                <Product.Text className="font-bold text-[1.2rem]" Tag={"p"} text={moneyFomat(data.price)}/>
                            </div>
                            <Product.Actions className="self-end flex flex-col gap-2 justify-center items-center">
                                <Product.Action
                                    kind="icon"
                                    className="w-7 h-7" 
                                    icon={addBag} 
                                    action={()=> {
                                        router.push(`/products/shirts/${data.id}`)
                                    }}
                                />
                                <Product.Action
                                    kind="icon"
                                    className="w-7 h-7" 
                                    icon={wishlistButtonIcon(data, wishlist)} 
                                    action={()=> {
                                        if(wishlist.find(item => item.id === data.id)){
                                            const delItem = wishlist.filter(item => item.id != data.id)
                                            setWishlist(delItem)
                                            updateDb(delItem, 'wishlist')
                                        } else {
                                            const newWishlist = [...wishlist, data]
                                            setWishlist(newWishlist)
                                            updateDb(newWishlist, 'wishlist')
                                        }
                                    }}
                                />
                            </Product.Actions>
                        </Product.Content>
                    </Product.Root>
                    )
                })
            }
        </div>
  )
}
