import { Product } from "@/components/product";
import { IShirts } from "@/providers/data";
import addBag from '~/img/backpackBlackBuy.svg'
import addWhishlist from '~/img/heart.svg'

export function ProductsGrid({ products } : { products: IShirts[] }) {
  return (
    <div className="grid grid-cols-2 gap-2">
        {
            products?.map((data, index) => {
                return(
                <Product.Root key={index} className="bg-Project-white border-b-8 border-Project-red-fist rounded-t-md p-2 gap-5 flex flex-col items-center">
                    <Product.Image rootClassName="w-full pb-[125%]" imageClassName="drop-shadow-2xl" imageSize="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" image={data.image} alt={data.band}/>
                    <Product.Content className="w-full p-2 border-t-4 border-Project-black flex flex-wrap justify-between">
                        <div className="">
                            <Product.Text className="font-medium text-[0.8rem]" Tag={"h3"} text={data.band}/>
                            <Product.Text className="font-bold text-[1.2rem]" Tag={"p"} text={`R$ ${data.price}`}/>
                        </div>
                        <Product.Actions className="self-end flex flex-col gap-2 justify-center items-center">
                            <Product.Action className="w-7 h-7" icon={addBag} action={()=> {}}/>
                            <Product.Action className="w-7 h-7" icon={addWhishlist} action={()=> {}}/>
                    </Product.Actions>
                    </Product.Content>
                </Product.Root>
                )
            })
        }
    </div>
  )
}
