import ProductSingle from "@/patterns/products/productSingle"
import Product from "@/patterns/products/productSingle"

interface IProductPage{
    params: {
        id: string
    }
}

export default function ProducPage({ params }: IProductPage) {
    

    return (
        <section className="text-project-primary-500 min-h-screen flex flex-col items-center justify-center">
            <ProductSingle id={params.id}/>
        </section>
    )
}
