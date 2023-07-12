import { DataProductsProvider } from "@/providers/data";
import { ProductsList } from "@/patterns/productsList";
import MainSection from "@/patterns/mainSection/mainSection";
import { Carousel } from "@material-tailwind/react";
import Image from "next/image";

import shirt1 from "~/img/gunsNRosesShirt.png"
import shirt2 from "~/img/ledZeppelinShirt.png"
import shirt3 from "~/img/pearlJamShirt.png"

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
 