import { ICart } from "@/providers/data";
import { updateDb } from "../methods";

interface IRemoveItemFromCart{
    product: ICart;
    cart: ICart[];
    setLocalCart: (newState: ICart[]) => void
}

export async function removeItemFromCart({product, cart, setLocalCart}: IRemoveItemFromCart) {
    const delItem = cart.filter((data) => JSON.stringify(data) != JSON.stringify(product));
    setLocalCart(delItem)
    await updateDb(delItem, 'cart')
}