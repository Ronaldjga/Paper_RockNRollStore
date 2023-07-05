import { DataProductsProvider } from "@/providers/data";
import { ProductsList } from "@/patterns/productsList";
import MainSection from "@/patterns/mainSection/mainSection";

export default function Home() {
  return (
    <DataProductsProvider>
      <div className="bg-blue-900">
        <section className="relative">
          <MainSection/>
        </section>
        <section className="relative bg-black p-2">
          <ProductsList/>
        </section>
      </div>
    </DataProductsProvider>
  )
}
 