import Image from "next/image";
import homeBg from '../../public/img/rockstorebg.png'
import palheta from '../../public/img/palheta.png'
import { DataProductsProvider } from "@/providers/data";
import { ProductsList } from "@/patterns/productsList";

export default function Home() {
  return (
    <DataProductsProvider>
      <div className="bg-blue-500">
        <section className="relative h-screen">
          <div className="h-screen absolute inset-0">
            <Image priority src={homeBg} alt="Rock 'N' Roll Store background" fill/>
          </div>
          <div className="relative h-full flex flex-col justify-around items-center">
            <h1 className="text-Project-red-fist font-rock text-8xl z-20 maintitle">Rock &#39;N&#39; Roll Store</h1>
            <Image src={palheta} alt="palheta" className="w-24 h-24"/>
          </div>
        </section>
        <section className="relative h-screen bg-black">
          <ProductsList/>
        </section>
      </div>
    </DataProductsProvider>
  )
}
 