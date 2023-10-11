import CartProperties from "@/components/cartProperties";
import Title from "@/components/title/titleText";
import ProductsList from "@/patterns/products/list-products/list-products";
import { Suspense } from "react";

export const revalidate = 5

export default function ShoppingCart() {
  return (
    <main className="bg-project-secondary-800 pt-12 pb-16">
      <Title Tag={"h2"} text="Cart" />
      <Suspense fallback={<h3>...Carregando</h3>}>
        {/* @ts-expect-error */}
        <ProductsList/>
      </Suspense>
      <CartProperties/>
    </main>
  )
}
