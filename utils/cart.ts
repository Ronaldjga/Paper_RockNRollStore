import { ICart } from "@/providers/data";
import { updateDb } from "./methods";

interface IAddToCart {
    cart: ICart[],
    newItem: {
        id: string,
        band: string,
        size: string,
        color: string,
        image: string,
        price: string,
        quantity: number,
        totalPrice: string
    }
}

export function addToCart({cart, newItem}: IAddToCart){
    const product = newItem

    if(cart.find((item) => JSON.stringify(item) === JSON.stringify(product))){
        console.log('aqui 1')
        return
    } else if(cart.find((item) => item.id === product.id && item.color === product.color && item.size === product.size && item.quantity != product.quantity)){
        const updateCart = cart.map((item) => item.id === product.id && item.color === product.color && item.size === product.size && item.quantity != product.quantity ? product : item)
        updateDb(updateCart, 'cart')
        console.log('aqui 2')
        
    } else {
        if(cart != undefined && product != undefined){
            console.log('aqui 3')
            const newCart = [...cart, product]
            updateDb(newCart, 'cart')
        } 
    }
}