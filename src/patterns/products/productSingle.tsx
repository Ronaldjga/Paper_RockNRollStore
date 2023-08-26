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
  const [quantity, setQuantity] = useState<number>(1)
  const [productTotalPrice, setProductTotalPrice] = useState<string>('0')
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
    if(productSingle) {
      setProductTotalPrice(moneyFomat(totalCalculationOneProduct(quantity, productSingle?.price)))
      console.log((quantity * parseFloat(productSingle.price)).toString())
    }
  },[quantity])

  useEffect(()=> {
    setProductSingle(idProductPage(id, shirts))
    setProductTotalPrice(moneyFomat(idProductPage(id, shirts)?.price ?? '0'))
  }, [shirts])
  
  useEffect(()=> {
    if(productSingle != null){
      editNewProduct('id', id)
      editNewProduct('image', productSingle.image)
      editNewProduct('band', productSingle.band)
      editNewProduct('price', productSingle.price)
    }
  },[productSingle])
  
  console.log(newProduct)

  return (
    <main className="w-11/12 bg-Project-black rounded-md p-2">
      {
        productSingle === null ? (<p>... Carregando</p>) 
        : (
          <Product.Root className="flex-col gap-5">
            <Product.Image rootClassName="w-full pb-[100%]" image={productSingle.image} alt={productSingle.band} imageClassName="drop-shadow-2xl" imageSize="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
            <Product.Content className="w-full p-2 border-t-4 border-Project-black flex flex-col flex-wrap justify-between gap-2">
                            <div className="text-center">
                                <Product.Text className="font-medium text-[0.9rem]" Tag={"h3"} text={productSingle.band}/>
                                <Product.Text className="font-bold text-[1.5rem]" Tag={"p"} text={moneyFomat(productSingle.price)}/>
                            </div>
                            <div>
                              <Product.Text className="font-bold" Tag={"h4"} text="Tamanhos:"/>
                              <InputRadio hookState={productSize} hookSetState={setProductSize} items={Object.keys(productSingle.size)} name="sizes"/>
                            </div>
                            <div>
                              <Product.Text className="font-bold" Tag={"h4"} text="Cor:"/>
                              <InputRadio hookState={productColor} hookSetState={setProductColor} items={Object.keys(productSingle.color)} name="colors"/>
                            </div>
                            <div>
                              <Product.Text className="font-bold" Tag={"h4"} text="Quantidade:"/>
                              <Count product={newProduct} setProduct={setNewProduct}/>
                            </div>
                            <Product.Text Tag={"h4"} className="text-[1.5rem] font-bold text-center" text={`Total: ${productTotalPrice}`}/>
                            <Product.Actions className="flex gap-2 justify-around items-center">
                              <Product.Action 
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
                                  className="w-full h-auto bg-Project-black bg-opacity-60 text-black font-bold" 
                                  text="Adicionar ao carrinho"
                                  action={()=> {
                                    if(Object.values(newProduct).some(value => value === '' || value === undefined || value === 0 || value === null)) {
                                      const emptyProperties = Object.entries(newProduct).filter(value => value[1]  === '' || value[1] === undefined || value[1] === 0 || value[1] === null)
                                      emptyProperties.map(item => newNotification({type: "Error", content: `Selecione o valor de ${item[0]}`}))
                                    } else{
                                      console.log('passou aqui')
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
