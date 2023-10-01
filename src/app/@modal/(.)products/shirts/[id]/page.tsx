import ModalPage from "@/components/actions/modal/modalPage"
import ProductSingle from "@/patterns/products/oneProduct/oneProduct"
import Product from "@/patterns/products/oneProduct/oneProduct"

interface IProductPage{
    params: {
        id: string
    }
}

export default function ModalProducPage({ params }: IProductPage) {
    

    return (
        <ModalPage>
            <section className="text-project-primary-500 min-h-screen flex flex-col items-center justify-center">
                <ProductSingle id={params.id}/>
            </section>
        </ModalPage>
    )
}
