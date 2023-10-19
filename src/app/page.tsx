import MainSection from "@/patterns/mainSection/mainSection";
import { Suspense } from "react";
import { GridProducts } from "@/patterns/products/grid-products/grid-products";
import { Filter } from "@/components/filter";

export default function Home({searchParams}: {searchParams: {[key:string]: string | string[] | undefined}}) {

  const band = searchParams.band ?? ''

  return (
    <div className="bg-blue-900">
      <section className="relative">
        <MainSection/>
      </section>
      <section className="relative min-h-screen bg-black p-2">
        <Filter.Root>
            <Filter.Options filter="band" list={['Led Zeppelin', 'Pearl Jam', 'Slipknot']} searchParams={band}/>
        </Filter.Root>
        <Suspense fallback={<h3 className="text-3xl text-red-500 text-center bg-blue-500 block min-h-screen w-full">...CARREGANDO</h3>}>
          {/* @ts-expect-error */}
          <GridProducts type="storage" filter={[{title:'band', value: band}]}/>
        </Suspense>
      </section>
    </div>
  )
}
 