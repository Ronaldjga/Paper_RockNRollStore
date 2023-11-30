import CartProperties from "@/components/cartProperties";
import Title from "@/components/title/titleText";
import ProductsList from "@/patterns/products/list-products/list-products";
import { Suspense } from "react";

export const revalidate = 5

export default function ShoppingCart() {
  return (
    <main>
      <Suspense fallback={<h3>...Carregando</h3>}>
        {/* @ts-expect-error */}
        <ProductsList/>
      </Suspense>
      <CartProperties/>
    </main>
  )
}
