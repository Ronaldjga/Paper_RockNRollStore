import CartProperties from "@/components/cartProperties";
import Title from "@/components/title/titleText";
import MainFiltersGroup from "@/patterns/filters/main-filters-group";
import { GridProducts } from "@/patterns/products/grid-products/grid-products";
import ProductsList from "@/patterns/products/list-products/list-products";
import { Suspense } from "react";

export const revalidate = 0
export const dynamic = 'force-dynamic'

export default function ProductPage({searchParams}: {searchParams: {[key:string]: string | string[] | undefined}}) {
    const band = searchParams.band ?? ''
    const minPrice = searchParams.min_price ?? ''
    const maxPrice = searchParams.max_price ?? ''
    const product = searchParams.product ?? ''

    return (
        <main className="py-5 px-2">
            <Suspense fallback={<h3 className="w-full">...CARREGANDO</h3>}>
                {/* @ts-expect-error */}
                <MainFiltersGroup band={band}/>
            </Suspense>
            <Suspense fallback={<h3>...Carregando</h3>}>
                {/* @ts-expect-error */}
                <GridProducts type="storage" filter={[{title:'band', value: band}, {title:'band', value: product}, {title: 'minPrice', value: minPrice}, {title: 'maxPrice', value: maxPrice}]}/>
            </Suspense>
        </main>
    )
}
