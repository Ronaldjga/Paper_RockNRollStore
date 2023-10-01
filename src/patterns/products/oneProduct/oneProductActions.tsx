'use client'

import { Product } from "@/components/product";
import { wishlistButtonIcon } from "../../../../utils/wishlist";
import { useEffect, useState } from "react";
import { ICart, IShirts, UseDataProducts } from "@/providers/data";
import InputRadio from "@/components/inputs/radios/radio";
import { moneyFomat } from "../../../../utils/operations";
import { addToCart } from "../../../../utils/cart";
import { useNotifications } from "@/providers/notifications";
import Count from "@/components/inputs/count/count";
import { updateDb } from "../../../../utils/methods";

interface IOneProductActions {
    product: IShirts;
    cart: ICart[];
    wishlist: IShirts[]
}

export default function OneProductActions({product, cart, wishlist}: IOneProductActions) {
  const { wishlist: LocalWishlist, setWishlist } = UseDataProducts()
  const { newNotification } = useNotifications() 
  const [newProduct, setNewProduct] = useState<ICart>({
    id: '',
    band: '',
    size: '',
    color: '',
    image: '',
    price: '',
    quantity: 1,
    totalPrice: '0'
  })

  function editNewProduct(prop:string, value: string | number) {
    setNewProduct(newState => ({...newState, [prop]: value}))
  }

  useEffect(()=> {
    if(product != null){
      editNewProduct('id', product.id)
      editNewProduct('image', product.image)
      editNewProduct('band', product.band)
      editNewProduct('price', product.price)
      editNewProduct('totalPrice', product.price)
      console.log('execultando aqui')
    }
  },[product])

  useEffect(() => {
    setWishlist(wishlist)
  }, [wishlist])

  return (
    <>
        <div>
            <Product.Text
              className="font-bold mb-2 inline-block"
              Tag={"h4"}
              text="Tamanhos:"
            />
            {newProduct.size && (
              <Product.Text
                className=" mx-2"
                Tag={"span"}
                text={newProduct.size.toUpperCase()}
              />
            )}
            <InputRadio
              hookState={newProduct}
              hookSetState={setNewProduct}
              type="size"
              items={Object.keys(product.size)}
              name="sizes"
            />
          </div>
        <div>
            <Product.Text
              className="font-bold mb-2 inline-block"
              Tag={"h4"}
              text="Cor:"
            />
            {newProduct.color && (
              <Product.Text
                className=" mx-2"
                Tag={"span"}
                text={newProduct.color.toUpperCase()}
              />
            )}
            <InputRadio
              hookState={newProduct}
              hookSetState={setNewProduct}
              type="color"
              items={Object.keys(product.color)}
              name="colors"
            />
        </div>
        <div>
            <Product.Text
              className="font-bold mb-2"
              Tag={"h4"}
              text="Quantidade:"
            />
            <Count product={newProduct} setProduct={setNewProduct} />
        </div>
        <h4 className="text-center text-[1.5rem] font-bold">
            <Product.Text Tag={"span"} text={`Subtotal: `} />
            <Product.Text
              Tag={"span"}
              className="text-project-quaternary-500"
              text={`${moneyFomat(newProduct.totalPrice)}`}
            />
          </h4>
        <Product.Actions className="flex gap-2 justify-around items-center">
              <Product.Action
                kind="icon"
                className="w-7 h-7"
                icon={wishlistButtonIcon(product, LocalWishlist)}
                action={() => {
                  if (LocalWishlist.find((item) => item.id === product.id)) {
                    const delItem = LocalWishlist.filter(
                      (item) => item.id != product.id
                    );
                    updateDb(delItem, 'wishlist')
                    setWishlist(delItem)
                  } else {
                    updateDb([...LocalWishlist, product], 'wishlist')
                    setWishlist([...LocalWishlist, product])
                  }
                }}
              />
              <Product.Action
                kind="text"
                className="w-full h-auto bg-project-primary-500 text-project-tertiary-500 font-bold"
                text="Adicionar ao carrinho"
                action={() => {
                  if (
                    Object.values(newProduct).some(
                      (value) =>
                        value === "" ||
                        value === undefined ||
                        value === 0 ||
                        value === null
                    )
                  ) {
                    const emptyProperties = Object.entries(newProduct).filter(
                      (value) =>
                        value[1] === "" ||
                        value[1] === undefined ||
                        value[1] === 0 ||
                        value[1] === null
                    );
                    emptyProperties.map((item) =>
                      newNotification({
                        type: "Error",
                        content: `Selecione o valor de ${item[0]}`,
                      })
                    );
                  } else {
                    addToCart({
                      cart: cart,
                      newItem: newProduct,
                    });
                  }
                }}
              />
            </Product.Actions>
    </>
  )
}
