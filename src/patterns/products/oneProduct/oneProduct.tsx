import { IShirts, IUserData } from "@/providers/data";
import { Product } from "@/components/product/index";
import {moneyFomat} from "../../../../utils/operations";
import { productStorage, idProductPage } from "../../../../utils/product";
import OneProductActions from "./oneProductActions";
import { reqUserStorage } from "../../../../utils/reqUserData";
import { tv } from "tailwind-variants";

const oneProductStyles = tv({
  slots: {
    base: "w-full h-full rounded-md min-h-screen overflow-y-auto",
    productRoot: 'p-0 bg-project-tertiary-300 border-project-primary-500',
    imageContainer: "w-full h-[300px] max-h-2/4",
    productContent: "w-full h-full flex-1 p-2 py-4 border-t-4 border-project-secondary-500 bg-project-secondary-700 flex flex-col flex-wrap justify-between gap-5 !text-project-tertiary-500",
    smallTexts: "font-medium text-[0.9rem]",
    bigText: "font-bold text-[1.5rem]"
  },
  variants: {
    type: {
      page: "",
      modal: {
        base: 'w-full min-h-0 max-h-[95vh]',
        imageContainer: 'min-h-[200px]',
        productContent: 'py-2 gap-2',
        productRoot: 'h-full'
      }
    }
  },
  defaultVariants: {
    type: "page"
  }
})

export default async function OneProduct({ id, type = 'page' }: { id: string, type: 'page' | 'modal' }) {
  // const product = await productStorage(id) as IShirts;
  // const { cart, wishlist } = await reqUserStorage() as IUserData

  const [product, {cart, wishlist}] = await Promise.all([productStorage(id) as Promise<IShirts>, reqUserStorage() as Promise<IUserData>])

  const { base, bigText, imageContainer, productContent, smallTexts, productRoot } = oneProductStyles({type})

  return (
    <main className={base()}>
      <Product.Root className={productRoot()}>
        <Product.Image
          rootClassName={imageContainer()}
          image={product.image}
          alt={product.band}
          imageClassName="drop-shadow-2xl object-contain"
          imageSize="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <Product.Content className={productContent()}>
          <div className="text-center">
            <Product.Text
              className={smallTexts()}
              Tag={"h3"}
              text={product.band}
            />
            <Product.Text
              className={bigText({className: "text-project-quaternary-500"})}
              Tag={"p"}
              text={moneyFomat(product.price)}
            />
          </div>
          <OneProductActions cart={cart} product={product} wishlist={wishlist} type={type}/>
        </Product.Content>
      </Product.Root>
    </main>
  );
}
