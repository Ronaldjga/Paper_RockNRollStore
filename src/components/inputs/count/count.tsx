'use client'

import { ICart, IShirts } from "@/providers/data"
import { useEffect, useState } from "react"

interface ICount {
    setProduct: (newState: any) => void
    product: ICart,
    fromList?: ICart[]
    buttonClassname?: string,
    className?: string
}

export default function Count({product, setProduct, buttonClassname, className, fromList}: ICount) {
    const [quantity, setQuantity] = useState<number>(1)
    console.log(typeof product, typeof setProduct)

    useEffect(()=> {
        if(fromList) {
            const updateQuantity = fromList.map(item => {
                if(item.id === product.id){
                    return {...item, quantity: quantity}
                }
                return item
            })
            setProduct(updateQuantity)
        } else {
            const updateQuantity = {...product, quantity: quantity}
            setProduct(updateQuantity)
        }
    },[quantity])
    
    useEffect(()=> {
        if(product){
            setQuantity(product.quantity)
        }
    },[])

    return (
        <div className={`flex gap-2 justify-center flex-wrap ${className}`}>
            <CountButton className={buttonClassname} setQuantity={setQuantity} quantity={quantity} value="-"/>
            <input 
                type="text" 
                className={`w-10 h-10 text-center border-2 rounded-md ${buttonClassname}`} value={quantity}
                onChange={(e) => {
                    const inputValue = e.target.value
                    const numericValue = inputValue.replace(/[^0-9.-]/g, '');

                    if(numericValue !== '' && numericValue !== '-') {
                        const parsedValue = parseFloat(numericValue)
                        if(!isNaN(parsedValue)){
                            setQuantity(parsedValue)
                        }
                    } else {
                        setQuantity(1)
                    }
                }}
            />
            <CountButton className={buttonClassname} setQuantity={setQuantity} quantity={quantity} value="+"/>
        </div>
    )
}

function CountButton({value, setQuantity, quantity, className} : { value: string, setQuantity: (newState: any) => void, quantity: number, className?: string }) {
    const disabled = quantity === 1 && value === '-' ? true : false
    return (
        <button
            disabled={disabled}
            className={`w-8 h-10 border-2 flex justify-center items-center font-bold text-[1.2rem] active:bg-Project-red-fist rounded-md ${className}`}
            onClick={(e) => { setQuantity((newState : number) => value === '+' ? newState + 1 : newState - 1) }}
        >
            {value}
        </button>
    )
}