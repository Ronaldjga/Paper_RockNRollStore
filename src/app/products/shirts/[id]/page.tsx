import OneProduct from "@/patterns/products/oneProduct/oneProduct"
import { Suspense } from "react"

interface IProductPage{
    params: {
        id: string
    }
}

export default function ProducPage({ params }: IProductPage) {
    

    return (
        <main className="text-project-primary-500 min-h-screen flex flex-col items-center justify-center">
             <Suspense fallback={<h3 className="text-3xl text-red-500 text-center">...CARREGANDO</h3>}>
                {/* @ts-expect-error */}
                <OneProduct id={params.id}/>
             </Suspense>
        </main>
    )
}
