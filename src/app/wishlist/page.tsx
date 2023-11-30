import CartProperties from "@/components/cartProperties";
import Title from "@/components/title/titleText";
import { GridProducts } from "@/patterns/products/grid-products/grid-products";
import ProductsList from "@/patterns/products/list-products/list-products";
import { Suspense } from "react";

export const revalidate = 0
export const dynamic = 'force-dynamic'

export default function WishlistPage() {
  return (
    <main className="py-5 px-2">
      <Suspense fallback={<h3>...Carregando</h3>}>
        {/* @ts-expect-error */}
        <GridProducts type="wishlist"/>
      </Suspense>
    </main>
  )
}
