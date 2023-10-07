'use client'

import { Product } from "@/components/product"
import { wishlistButtonIcon } from "../../../../utils/wishlist"
import { IShirts, UseDataProducts } from "@/providers/data"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import addBag from '~/img/backpackBlackBuy.svg'
import { updateDb } from "../../../../utils/methods"

interface IGridProductsActions {
    product: IShirts;
    wishlist: IShirts[]
}

export default function GridProductsActions({ product, wishlist }: IGridProductsActions) {
    const { wishlist: LocalWishlist, setWishlist } = UseDataProducts()
    const router = useRouter()


    useEffect(() => {
        setWishlist(wishlist)
    }, [wishlist, setWishlist])

    return (
        <>
            <Product.Action
                kind="icon"
                className="w-7 h-7" 
                icon={addBag} 
                action={()=> {
                    router.push(`/products/shirts/${product.id}`)
                }}
            />
            <Product.Action
                kind="icon"
                className="w-7 h-7" 
                icon={wishlistButtonIcon(product, LocalWishlist)} 
                action={()=> {
                    if(LocalWishlist.find(item => item.id === product.id)){
                        const delItem = LocalWishlist.filter(item => item.id != product.id)
                        setWishlist(delItem)
                        updateDb(delItem, 'wishlist')
                    } else {
                        const newWishlist = [...LocalWishlist, product]
                        setWishlist(newWishlist)
                        updateDb(newWishlist, 'wishlist')
                    }
                }}
            />
        </>
    )
}
