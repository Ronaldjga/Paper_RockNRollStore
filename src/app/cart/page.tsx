import CartProperties from "@/components/cartProperties";
import Title from "@/components/title/titleText";
import ProductsList from "@/patterns/products/productsList";


export default function ShoppingCart() {
  return (
    <main className="bg-project-secondary-800 pt-12 pb-16">
      <Title Tag={"h2"} text="Cart" />
      <ProductsList/>
      <CartProperties/>
    </main>
  )
}
