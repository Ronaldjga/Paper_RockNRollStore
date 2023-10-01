import { IShirts, IUserData } from "@/providers/data";
import { Product } from "@/components/product/index";
import {moneyFomat} from "../../../../utils/operations";
import { productStorage, idProductPage } from "../../../../utils/product";
import OneProductActions from "./oneProductActions";
import { reqUserStorage } from "../../../../utils/reqUserData";

export const revalidate = 10

export default async function OneProduct({ id }: { id: string }) {
  const product = await productStorage(id) as IShirts;
  const { cart, wishlist } = await reqUserStorage() as IUserData
  // console.log(product, "console do single product em server-side");
  // console.log(wishlist, "console do WISHLIST em server-side");
  // console.log(cart, "console do CART em server-side");

  return (
    <main className="w-full rounded-md min-h-screen">
      <Product.Root className="p-0 bg-project-tertiary-300 border-project-primary-500">
        <Product.Image
          rootClassName="w-full h-[300px] max-h-2/4"
          image={product.image}
          alt={product.band}
          imageClassName="drop-shadow-2xl object-contain"
          imageSize="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <Product.Content className="w-full p-2 py-4 border-t-4 border-project-secondary-500 bg-project-secondary-700 flex flex-col flex-wrap justify-between gap-5 !text-project-tertiary-500">
          <div className="text-center">
            <Product.Text
              className="font-medium text-[0.9rem]"
              Tag={"h3"}
              text={product.band}
            />
            <Product.Text
              className="font-bold text-[1.5rem] text-project-quaternary-500"
              Tag={"p"}
              text={moneyFomat(product.price)}
            />
          </div>
          <OneProductActions cart={cart} product={product} wishlist={wishlist}/>
        </Product.Content>
      </Product.Root>
    </main>
  );
}
