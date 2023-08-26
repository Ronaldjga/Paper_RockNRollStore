'use client'

import { Product } from "@/components/product"
import { UseDataProducts } from "@/providers/data"
import { moneyFomat } from "../../../utils/operations"
import Count from "@/components/inputs/count/count"
import { useEffect, useState } from "react"
import { wishlistButtonIcon } from "../../../utils/wishlist"


export default function ProductsList() {
    const { cart, wishlist, setWishlist, shirts, setCart } = UseDataProducts()

    console.log(cart)
    return (
        <main className="p-5">
            {cart === null ? (<p className="text-white">... Carregando</p>) 
            : (
                cart.map((item, i) => {
                    const productFromStorage = shirts.find(data => data.id === item.id && data.band === item.band) ?? null
                    return (
                        <Product.Root key={i} className="w-full h-fit min-h-[100px] flex-row flex-wrap gap-2 border-b-4">
                            <Product.Image
                                image={item.image}
                                alt={item.band}
                                rootClassName="min-w-[100px] w-[75px] h-[100px] border-2 bg-white shadow-sm rounded-md"
                                imageClassName="drop-shadow-2xl object-contain p-1"
                                imageSize="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <Product.Content className="grow flex flex-col flex-wrap gap-2 justify-around">
                                <div className="">
                                    <Product.Text className="font-medium text-[0.7rem]" Tag={"h3"} text={item.band}/>
                                    <Product.Content className="flex gap-2">
                                        <Product.Text className="text-[0.7rem] border rounded-md py-[1px] px-2" Tag={"p"} text={item.size.toUpperCase()}/>
                                        <Product.Text className="text-[0.7rem] border rounded-md py-[1px] px-2" Tag={"p"} text={item.color.toUpperCase()}/>
                                    </Product.Content>
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <Product.Content>
                                        <Product.Text className="font-bold text-[0.7rem]" Tag={"p"} text={`Unidade: ${moneyFomat(item.price)}`}/>
                                        <Product.Text Tag={"p"} className="text-[0.7rem] font-bold text-center" text={`Subtotal: ${moneyFomat(item.totalPrice)}`}/>
                                    </Product.Content>
                                </div>
                                <Product.Content className="flex gap-2 items-center justify-start">
                                    <Count className="!gap-1" buttonClassname="w-8 h-6 text-[0.8rem]" product={item} setProduct={setCart} fromList={cart}/>
                                    <Product.Actions className="h-fit flex items-center justify-center gap-2">
                                        <Product.Action
                                            className="w-5 h-5" 
                                            icon={wishlistButtonIcon(productFromStorage, wishlist)} 
                                            action={()=> {
                                              if(wishlist.find(itemWishlist => itemWishlist.id === item.id)){
                                                const delItem = wishlist.filter(itemWishlist => itemWishlist.id != item.id)
                                                setWishlist(delItem)
                                              } else {
                                                if(productFromStorage != null){
                                                    setWishlist([...wishlist, productFromStorage])
                                                }
                                              }
                                            }}
                                        />
                                        <Product.Action
                                            className="w-5 h-5" 
                                            icon={wishlistButtonIcon(productFromStorage, wishlist)} 
                                            action={()=> {
                                              if(cart.find(data => data.id === item.id)){
                                                const delItem = cart.filter(data => data.id != item.id)
                                                setCart(delItem)
                                              }
                                            }}
                                        />
                                    </Product.Actions>
                                </Product.Content>
                            </Product.Content>
                        </Product.Root>
                    )
                })
            )
            }
        </main>
  )
}
