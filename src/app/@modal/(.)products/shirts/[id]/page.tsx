import ModalPage from "@/components/actions/modal/modalPage"
import OneProduct from "@/patterns/products/oneProduct/oneProduct"
import { Suspense } from "react"

interface IProductPage{
    params: {
        id: string
    }
}

export default function ModalProducPage({ params }: IProductPage) {
    

    return (
        <ModalPage>
            <main className="w-full h-full text-project-primary-500 flex flex-col items-center justify-center overflow-y-auto">
                <Suspense fallback={<h3 className="text-3xl text-red-500 text-center">...CARREGANDO</h3>}>
                    {/* @ts-expect-error */}
                    <OneProduct id={params.id} type="modal"/>
                </Suspense>
            </main>
        </ModalPage>
    )
}
