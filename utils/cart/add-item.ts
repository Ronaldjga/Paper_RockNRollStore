import { ICart } from "@/providers/data";
import { updateDb } from "../methods";

interface IAddToCart {
  cart: ICart[],
  newItem: {
      id: string,
      band: string,
      size: string,
      color: string,
      image: string,
      price: string,
      quantity: number,
      totalPrice: string
  },
  setLocalCart: (newState: ICart[]) => void
}

export async function addToCart({ cart, newItem, setLocalCart }: IAddToCart) {
  const product = newItem;
  console.log(cart)
  console.log(newItem)
  const existingCartItemIndex = cart.findIndex  ((item) =>
      item.id === product.id &&
      item.color === product.color &&
      item.size === product.size
  );

  if (existingCartItemIndex !== -1) {
    // Item já existe no carrinho
    const updatedCart = [...cart];
    updatedCart[existingCartItemIndex] = {
      ...updatedCart[existingCartItemIndex],
      quantity: product.quantity,
    };
    setLocalCart(updatedCart)
    await updateDb(updatedCart, 'cart');
    console.log('Quantidade atualizada');
  } else {
    // Item não existe no carrinho, adicione-o
    const newCart = [...cart, product];
    setLocalCart(newCart)
    await updateDb(newCart, 'cart');
    console.log('Item adicionado ao carrinho');
  }
}


