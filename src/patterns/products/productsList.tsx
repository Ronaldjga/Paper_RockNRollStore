'use client'

import { Product } from "@/components/product"
import { ICart, UseDataProducts } from "@/providers/data"
import { moneyFomat } from "../../../utils/operations"
import Count from "@/components/inputs/count/count"
import { useEffect, useRef, useState } from "react"
import { wishlistButtonIcon } from "../../../utils/wishlist"
import deleteIcon from '~/img/delete.svg'
import Modal from "@/components/actions/modal/modal"
import { updateDb } from "../../../utils/methods"


export default function ProductsList() {
    const { cart, wishlist, setWishlist, shirts, setCart } = UseDataProducts()
    const [myCart, setMyCart] = useState<ICart[] | null>(null)


    useEffect(() => {
        setMyCart(cart)
    }, [cart])

    console.log(cart)
    return (
        <section className="p-5 flex flex-col gap-2 min-h-screen">
            {myCart === null ? (<p className="text-white">... Carregando</p>) 
            : (
                myCart.map((item, i) => {
                    const productFromStorage = shirts.find(data => data.id === item.id && data.band === item.band) ?? null
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
                                    <Count 
                                        className="!gap-1" 
                                        buttonClassName="w-8 h-6 text-[0.8rem]"
                                        color="black"
                                        product={item}
                                    />
                                    <Product.Actions className="h-fit flex items-center justify-center gap-2">
                                        <Product.Action
                                            kind="icon"
                                            className="w-5 h-5 min-w-[0px] min-h-[0px]" 
                                            icon={wishlistButtonIcon(productFromStorage, wishlist)} 
                                            action={()=> {
                                              if(wishlist.find(itemWishlist => itemWishlist.id === item.id)){
                                                const delItem = wishlist.filter(itemWishlist => itemWishlist.id != item.id)
                                                setWishlist(delItem)
                                                updateDb(delItem, 'wishlist')
                                              } else {
                                                if(productFromStorage != null){
                                                    const newWishlist = [...wishlist, productFromStorage]
                                                    setWishlist(newWishlist)
                                                    updateDb(newWishlist, 'wishlist')
                                                }
                                              }
                                            }}
                                        />
                                        <Modal 
                                            className="text-center" 
                                            btnClassName="w-5 h-5 min-w-[0px] min-h-[0px]"
                                            kind="icon" 
                                            icon={deleteIcon} 
                                            title={item.band}
                                            buttonAction={{
                                                text: "Excluir",
                                                action: () => {
                                                    if(myCart.find(data => data.id === item.id)){
                                                        const delItem = myCart.filter(data => data != item)
                                                        setCart(delItem)
                                                    }
                                                }
                                            }}
                                        >
                                            <p>Você tem certeza que deseja excluir o item?</p>
                                        </Modal>
                                    </Product.Actions>
                                </Product.Content>
                            </Product.Content>
                        </Product.Root>
                    )
                })
            )
            }
        </section>
  )
}
