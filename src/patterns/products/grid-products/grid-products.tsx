import { Product } from "@/components/product";
import { IShirts, IUserData } from "@/providers/data";
import Link from "next/link";
import { productStorage } from "../../../../utils/product";
import { moneyFomat } from "../../../../utils/operations";
import { reqUserStorage } from "../../../../utils/reqUserData";
import GridProductsActions from "./grid-products-actions";

interface IGridProducts { 
    type: "storage" | "wishlist";
}

export const revalidate = 30

export async function GridProducts({type = "storage"}: IGridProducts) {
    const [reqProducts, { wishlist }] = await Promise.all([productStorage() as Promise<IShirts[]>, reqUserStorage() as Promise<IUserData>])
    const products = type === 'storage' ? reqProducts : wishlist


    return (
        <div className="grid grid-cols-2 gap-2">
            {
                products.map((data, index) => {
                    return(
                    <Product.Root key={index} className="bg-project-tertiary-400 border-b-8 border-project-primary-500 rounded-t-md gap-5 flex flex-col items-center">
                        <Link className="h-[225px] w-full" href={`/products/shirts/${data.id}`}>
                            <Product.Image
                                rootClassName="w-full h-full "
                                image={data.image}
                                alt={data.band}
                            />
                        </Link>
                        <Product.Content className="w-full p-2 border-t-4 border-project-secondary-500 flex flex-wrap justify-between">
                            <div className="">
                                <Product.Text className="font-medium text-[0.8rem]" Tag={"h3"} text={data.band}/>
                                <Product.Text className="font-bold text-[1.2rem]" Tag={"p"} text={moneyFomat(data.price)}/>
                            </div>
                            <Product.Actions className="self-end flex flex-col gap-2 justify-center items-center">
                                <GridProductsActions product={data} wishlist={wishlist}/>
                            </Product.Actions>
                        </Product.Content>
                    </Product.Root>
                    )
                })
            }
        </div>
  )
}
