'use client'

import { UseDataProducts } from "@/providers/data"
import { moneyFomat } from "../../utils/operations"

export default function CartProperties() {
    const { cart } = UseDataProducts()

    return (
        <section className="fixed flex gap-2 justify-around items-center p-2 min-h-[50px] w-full bottom-0 bg-black border-t-4 border-project-primary-400 text-project-tertiary-500">
            {cart && (
                <h5>
                    <span className="text-project-quaternary-500 text-sm">Subtotal: </span>
                    <span className="font-bold">
                        {moneyFomat(cart.reduce((acc, obj) => {
                            return (acc + parseFloat(obj.totalPrice))
                        }, 0))}
                    </span>
                </h5>
            )}
            <button className="bg-project-primary-700 hover:bg-project-primary-500 p-2 font-bold rounded-md">Comprar Agora</button>
        </section>
    )
}
