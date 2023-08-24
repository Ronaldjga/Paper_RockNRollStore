import { ICart } from "@/providers/data";

interface IAddToCart {
    cart: ICart[],
    setCart?: (newCart: ICart[]) => void,
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

export function addToCart({cart, setCart, newItem}: IAddToCart){
    const product = newItem
    console.log(product)
    console.log(newItem)

    if(cart.find((item) => JSON.stringify(item) === JSON.stringify(product))){
        console.log('iguallllllllllllllllllllllllllll')
    } else {
        if(cart != undefined && product != undefined && setCart != undefined){
            setCart([...cart, product])
        } 
        console.log('não achou laaaaaaaaaaaaaaaa')
    }
}