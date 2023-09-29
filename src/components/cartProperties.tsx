'use client'

import { UseDataProducts } from "@/providers/data"
import { moneyFomat } from "../../utils/operations"
import Modal from "./actions/modal/modal"

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
            <Modal 
                className="text-center text-project-secondary-800" 
                btnClassName="min-w-fit bg-project-primary-700 hover:bg-project-primary-500 p-2 font-bold rounded-md"
                kind="text" 
                text="Comprar agora"
                title={'Finalizar compra'}
                buttonAction={{
                    text: "Comprar",
                    action: () => {
                      
                    }
                }}
            >
                <p>Você tem certeza que deseja excluir o item?</p>
            </Modal>
        </section>
    )
}
