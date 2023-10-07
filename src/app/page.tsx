import { ProductsListDois } from "@/patterns/productsList";
import MainSection from "@/patterns/mainSection/mainSection";
import { Suspense } from "react";
import { GridProducts } from "@/patterns/products/grid-products/grid-products";

export default function Home() {

  return (
    <div className="bg-blue-900">
      <section className="relative">
        <MainSection/>
      </section>
      <section className="relative min-h-screen bg-black p-2">
        <Suspense fallback={<h3 className="text-3xl text-red-500 text-center bg-blue-500 block min-h-screen w-full">...CARREGANDO</h3>}>
          {/* @ts-expect-error */}
          <GridProducts type="storage"/>
        </Suspense>
      </section>
    </div>
  )
}
 