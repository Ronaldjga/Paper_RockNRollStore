import MainSection from "@/patterns/mainSection/mainSection";
import { Suspense } from "react";
import { GridProducts } from "@/patterns/products/grid-products/grid-products";
import { Filter } from "@/components/filter";
import MainFiltersGroup from "@/patterns/filters/main-filters-group";

export default function Home({searchParams}: {searchParams: {[key:string]: string | string[] | undefined}}) {

  const band = searchParams.band ?? ''
  const minPrice = searchParams.min_price ?? ''
  const maxPrice = searchParams.max_price ?? ''
  const product = searchParams.product ?? ''

  return (
    <main className="relative min-h-screen bg-black p-2">
      <Suspense fallback={<h3 className="w-full">...CARREGANDO</h3>}>
        {/* @ts-expect-error */}
        <MainFiltersGroup band={band}/>
      </Suspense>
      <Suspense fallback={<h3 className="text-3xl text-red-500 text-center bg-blue-500 block min-h-screen w-full">...CARREGANDO</h3>}>
        {/* @ts-expect-error */}
        <GridProducts type="storage" filter={[{title:'band', value: band}, {title:'band', value: product}, {title: 'minPrice', value: minPrice}, {title: 'maxPrice', value: maxPrice}]}/>
      </Suspense>
    </main>
  )
}
 