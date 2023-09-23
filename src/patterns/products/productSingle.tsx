'use client'

import { ICart, IShirts, UseDataProducts } from "@/providers/data"
import { useEffect, useState } from "react"
import { Product } from "@/components/product/index"
import { moneyFomat, totalCalculationOneProduct } from "../../../utils/operations"
import { wishlistButtonIcon } from "../../../utils/wishlist"
import InputRadio from "@/components/inputs/radios/radio"
import Count from "@/components/inputs/count/count"
import { idProductPage } from "../../../utils/product"
import { addToCart } from "../../../utils/cart"
import { useNotifications } from "@/providers/notifications"

export default function ProductSingle({ id } : { id: string } ) {
  const { shirts, wishlist, setWishlist, cart, setCart } = UseDataProducts()
  const { newNotification } = useNotifications()
  const [ productSingle, setProductSingle ] = useState<IShirts | null>(null)

  const [productSize, setProductSize] = useState<string | null>(null)
  const [productColor, setProductColor] = useState<string | null>(null)
  const [newProduct, setNewProduct] = useState<ICart>({
    id: '',
    band: '',
    size: '',
    color: '',
    image: '',
    price: '',
    quantity: 1,
    totalPrice: ''
  })

  function editNewProduct(prop:string, value: string | number) {
    setNewProduct(newState => ({...newState, [prop]: value}))
  }

  useEffect(()=> {
    if(shirts){
      setProductSingle(idProductPage(id, shirts))
    }
  }, [shirts])
  
  useEffect(()=> {
    if(productSingle != null){
      editNewProduct('id', id)
      editNewProduct('image', productSingle.image)
      editNewProduct('band', productSingle.band)
      editNewProduct('price', productSingle.price)
      editNewProduct('totalPrice', productSingle.price)
    }
  },[productSingle])


  return (
    <main className="w-full rounded-md min-h-screen">
      {
        productSingle === null ? (<p>... Carregando</p>) 
        : (
          <Product.Root className="p-0 bg-project-tertiary-300 border-project-primary-500">
              <Product.Image rootClassName="w-full h-[300px] max-h-2/4" image={productSingle.image} alt={productSingle.band} imageClassName="drop-shadow-2xl object-contain" imageSize="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
            <Product.Content className="w-full p-2 py-4 border-t-4 border-project-secondary-500 bg-project-secondary-700 flex flex-col flex-wrap justify-between gap-5 !text-project-tertiary-500">
                            <div className="text-center">
                                <Product.Text className="font-medium text-[0.9rem]" Tag={"h3"} text={productSingle.band}/>
                                <Product.Text className="font-bold text-[1.5rem] text-project-quaternary-500" Tag={"p"} text={moneyFomat(productSingle.price)}/>
                            </div>
                            <div>
                              <Product.Text className="font-bold mb-2 inline-block" Tag={"h4"} text="Tamanhos:"/>
                              {newProduct.size && <Product.Text className=" mx-2" Tag={"span"} text={newProduct.size.toUpperCase()}/>}
                              <InputRadio hookState={newProduct} hookSetState={setNewProduct} type="size" items={Object.keys(productSingle.size)} name="sizes"/>
                            </div>
                            <div>
                              <Product.Text className="font-bold mb-2 inline-block" Tag={"h4"} text="Cor:"/>
                              {newProduct.color && <Product.Text className=" mx-2" Tag={"span"} text={newProduct.color.toUpperCase()}/>}
                              <InputRadio hookState={newProduct} hookSetState={setNewProduct} type="color" items={Object.keys(productSingle.color)} name="colors"/>
                            </div>
                            <div>
                              <Product.Text className="font-bold mb-2" Tag={"h4"} text="Quantidade:"/>
                              <Count product={newProduct} setProduct={setNewProduct}/>
                            </div>
                            <h4 className="text-center text-[1.5rem] font-bold">
                              <Product.Text Tag={"span"} text={`Subtotal: `}/>
                              <Product.Text Tag={"span"} className="text-project-quaternary-500" text={`${moneyFomat(newProduct.totalPrice)}`}/>
                            </h4>
                            <Product.Actions className="flex gap-2 justify-around items-center">
                              <Product.Action
                                  kind="icon"
                                  className="w-7 h-7" 
                                  icon={wishlistButtonIcon(productSingle, wishlist)} 
                                  action={()=> {
                                    if(wishlist.find(item => item.id === productSingle.id)){
                                      const delItem = wishlist.filter(item => item.id != productSingle.id)
                                      setWishlist(delItem)
                                    } else {
                                        setWishlist([...wishlist, productSingle])
                                    }
                                  }}
                              />
                              <Product.Action
                                  kind="text"
                                  className="w-full h-auto bg-project-primary-500 text-project-tertiary-500 font-bold"
                                  text="Adicionar ao carrinho"
                                  action={()=> {
                                    if(Object.values(newProduct).some(value => value === '' || value === undefined || value === 0 || value === null)) {
                                      const emptyProperties = Object.entries(newProduct).filter(value => value[1]  === '' || value[1] === undefined || value[1] === 0 || value[1] === null)
                                      emptyProperties.map(item => newNotification({type: "Error", content: `Selecione o valor de ${item[0]}`}))
                                    } else{
                                      addToCart({
                                        cart: cart,
                                        setCart: setCart,
                                        newItem: newProduct
                                      })
                                    }
                                  }}
                              />
                        </Product.Actions>
                        </Product.Content>
          </Product.Root>
        )
      }
    </main>
  )
}
