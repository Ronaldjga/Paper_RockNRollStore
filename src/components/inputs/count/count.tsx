'use client'

import { ICart, UseDataProducts } from "@/providers/data"
import { ComponentProps, useEffect, useState } from "react"
import { totalCalculationOneProduct } from "../../../../utils/operations"
import { tv, VariantProps } from 'tailwind-variants'
import { updateDb } from "../../../../utils/methods"
import { useRouter } from "next/navigation"

const count = tv({
    base: 'flex gap-2 justify-center flex-wrap'
})

const button = tv({
    base: 'w-10 h-10 border-2 flex justify-center items-center font-bold text-lg active:bg-project-primary-500 rounded-md text-center',
    variants: {
        color: {
            black: 'bg-project-secondary-500 text-project-tertiary-500',
            white: 'bg-project-tertiary-500 text-project-secondary-500'
        }
    },
    defaultVariants: {
        color: "white"
    }
})

interface ICount extends VariantProps<typeof count>, ComponentProps<'div'> {
    setProduct?: (newState: ICart) => void
    product: ICart,
    buttonClassName?: string,
    color?: 'white' | 'black'
}

type ICountButton = ComponentProps<'button'> & VariantProps<typeof button> & {
    value: string,
    setQuantity: (newState: any) => void,
    quantity: number,
    color?: 'white' | 'black'
}

export default function Count({product, setProduct, buttonClassName, className, color}: ICount) {
    const [quantity, setQuantity] = useState<number>(1)
    const {cart ,setCart} = UseDataProducts()
    const router = useRouter()

    async function newQuantity(newQuantity: number){
        if(setProduct){
            const updateQuantity = {...product, quantity: newQuantity, totalPrice: totalCalculationOneProduct(newQuantity, product.price).toString()}
            setProduct(updateQuantity)
        } else {
            const newCart = cart.map(value =>
                value.id === product.id &&
                value.band === product.band &&
                value.size === product.size &&
                (value.quantity === product.quantity || value.quantity != product.quantity)
                ? {...value, quantity: newQuantity, totalPrice: totalCalculationOneProduct(newQuantity, product.price).toString()}
                : value)
            await updateDb(newCart, 'cart')
            setCart(newCart)
            await window.clearTimeout(undefined);
            const newTimeoutId = setTimeout(() => {
                router.refresh();
            }, 1000);          
        }
    }
    
    useEffect(()=> {
        if(product){
            setQuantity(product.quantity)
        }
    },[product.quantity])
    
    return (
        <div className={count({color, className})}>
            <CountButton 
                className={buttonClassName}
                color={color}
                setQuantity={setQuantity}
                quantity={quantity} value="-"
                onClick={(e)=> {
                    setQuantity(newState => newState - 1)
                    newQuantity(quantity - 1)
                }}
            />
            <input 
                type="text"
                required
                className={button({ color, className: buttonClassName })} value={quantity}
                onChange={(e) => {
                    const inputValue = e.target.value
                    const numericValue = inputValue.replace(/[^0-9.-]/g, '');

                    if(numericValue !== '' && numericValue !== '-') {
                        const parsedValue = parseFloat(numericValue)
                        if(!isNaN(parsedValue)){
                            newQuantity(parsedValue)
                        }
                    } else {
                        newQuantity(1)
                    }
                }}
            />
            <CountButton
                className={buttonClassName}
                color={color}
                setQuantity={setQuantity}
                quantity={quantity}
                value="+"
                onClick={(e)=> {
                    setQuantity(newState => newState + 1)
                    newQuantity(quantity + 1)
                }}
            />
        </div>
    )
}

function CountButton({value, setQuantity, quantity, className, color, ...props} : ICountButton) {
    const disabled = quantity === 1 && value === '-' ? true : false
    return (
        <button
            disabled={disabled}
            className={button({color, className})}
            {...props}
        >
            {value}
        </button>
    )
}