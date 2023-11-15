'use client'

import { UseDataProducts } from "@/providers/data"
import { moneyFomat } from "../../utils/operations"
import Modal from "./actions/modal/modal"
import { useEffect, useState } from "react"
import { updateDb } from "../../utils/methods"
import { useNotifications } from "@/providers/notifications"

export default function CartProperties() {
    const { cart, setCart } = UseDataProducts()
    const { newNotification } = useNotifications()
    const [name, setName] = useState<string>('')
    const [adress, setAdress] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const subtotal = moneyFomat(cart.reduce((acc, obj) => {
        return (acc + parseFloat(obj.totalPrice))
    }, 0))

    const [modalBtnDisable, setModalBtnDisable] = useState(false)

    useEffect(() => {
        if(name === '' || adress === '' || description === ''){
            setModalBtnDisable(true)
        } else {
            setModalBtnDisable(false)
        }
    }, [name, adress, description])

    return (
        <section className="fixed flex gap-2 justify-around items-center p-2 min-h-[50px] w-full bottom-0 bg-black border-t-4 border-project-primary-400 text-project-tertiary-500">
            {cart && (
                <h5>
                    <span className="text-project-quaternary-500 text-sm">Subtotal: </span>
                    <span className="font-bold">
                        {subtotal}
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
                    text: "Finalizar",
                    action: async () => {
                        await updateDb([], 'cart')
                        setCart([])
                        console.log('execuyto')
                    }
                }}
                btnDisable={modalBtnDisable}
            >
                <div>
                    <div>
                        <label >
                            <span>Nome:</span>
                            <input className="w-full px-2 py-1 border rounded-md" type="text" name="name" onChange={(e) => setName(e.target.value)}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            <span>Endereço:</span>
                            <input className="w-ful px-2 py-1 border rounded-md" type="text" onChange={(e) => setAdress(e.target.value)}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            <span>Mensagem:</span>
                            <textarea className="resize-none w-full px-2 py-1 border rounded-md" onChange={(e) => setDescription(e.target.value)}/>
                        </label>
                    </div>
                </div>
                <h4>Total: <span className="font-semibold">{subtotal}</span></h4>
            </Modal>
        </section>
    )
}
