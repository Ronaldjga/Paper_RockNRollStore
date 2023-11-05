import { Product } from "@/components/product";
import { IShirts, IUserData } from "@/providers/data";
import Link from "next/link";
import { productStorage } from "../../../../utils/product";
import { moneyFomat } from "../../../../utils/operations";
import { reqUserStorage } from "../../../../utils/reqUserData";
import GridProductsActions from "./grid-products-actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface IFilter {
    title: keyof IShirts
    value: string
}

interface IGridProducts { 
    type: "storage" | "wishlist";
    filter: IFilter[]
}

export const revalidate = 30

export async function GridProducts({type = "storage", filter}: IGridProducts) {
    const session = await getServerSession(authOptions)
    const reqProducts = await productStorage() as IShirts[]
    
    let allProducts: IShirts[] = []
    let wishlist: IShirts[] = []

    if(reqProducts.length != 0) {
        allProducts = reqProducts
    }
    if(session){
        const userStorage = await reqUserStorage() as IUserData
        wishlist = userStorage.wishlist
    }

    const products = type === 'storage' ? allProducts : wishlist

    const filteredProducts =  products.filter((val) => {
        if (filter.every(filtersObject => filtersObject.value === '')) {
            return true;
        } else if (filter.some(e => (e.title === 'minPrice' as keyof IShirts || e.title === 'maxPrice' as keyof IShirts) && e.value !== '')) {
            const minPrice = parseFloat(filter.find(e => e.title === 'minPrice' as keyof IShirts)?.value || '') || null;
            const maxPrice = parseFloat(filter.find(e => e.title === 'maxPrice' as keyof IShirts)?.value || '') || null;
            const price = parseFloat(val.price);
    
            if ((minPrice === null || price >= minPrice) && (maxPrice === null || price <= maxPrice)) {
                return true;
            }
        } else if (filter.some(filtersObject => filtersObject.value !== '' && val[filtersObject.title].toLowerCase().includes(filtersObject.value.toLowerCase()))){
            return true;
        }
    
        return false;
    });

    return (
        <div className="grid grid-cols-2 gap-2">
            {
                filteredProducts.map((data, index) => {
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
