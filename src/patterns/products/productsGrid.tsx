'use client'

import { Product } from "@/components/product";
import { IShirts, IWishlist, UseDataProducts } from "@/providers/data";
import { useEffect, useState } from "react";
import addBag from '~/img/backpackBlackBuy.svg'
import heartWhite from '~/img/heart.svg'
import heartRed from '~/img/heartRed.svg'

export function ProductsGrid({ products } : { products: IShirts[] }) {
    const { wishlist, setWishlist } = UseDataProducts()
    const [localWishlist, setLocalWishlist] = useState<IWishlist[]>(wishlist)

    const wishlistButton = (item:IShirts): string => {
        const foundItem = wishlist.find((data) => data.product.id === item.id)
        const buttonIcon = foundItem ? heartRed : heartWhite
        return buttonIcon
    }

    useEffect(()=> {
        setWishlist(localWishlist)
    },[localWishlist])

    return (
        <div className="grid grid-cols-2 gap-2">
            {
                products?.map((data, index) => {
                    return(
                    <Product.Root key={index} className="bg-Project-white border-b-8 border-Project-red-fist rounded-t-md p-2 gap-5 flex flex-col items-center">
                        <Product.Image rootClassName="w-full pb-[125%]" imageClassName="drop-shadow-2xl" imageSize="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" image={data.image} alt={data.band}/>
                        <Product.Content className="w-full p-2 border-t-4 border-Project-black flex flex-wrap justify-between">
                            <div className="">
                                <Product.Text className="font-medium text-[0.8rem]" Tag={"h3"} text={data.band}/>
                                <Product.Text className="font-bold text-[1.2rem]" Tag={"p"} text={`R$ ${data.price}`}/>
                            </div>
                            <Product.Actions className="self-end flex flex-col gap-2 justify-center items-center">
                                <Product.Action 
                                    className="w-7 h-7" 
                                    icon={addBag} 
                                    action={()=> {
                                    }}
                                />
                                <Product.Action 
                                    className="w-7 h-7" 
                                    icon={wishlistButton(data)} 
                                    action={()=> {
                                        if(wishlist.find(item => item.product.id === data.id)){
                                            const delItem = wishlist.filter(item => item.product.id != data.id)
                                            setLocalWishlist(delItem)
                                        } else {
                                            setLocalWishlist((state) => [...state, {product: data, quatity: 1}])
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
