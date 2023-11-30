import { ICart, IShirts, IUserData } from "@/providers/data"
import { productStorage } from "../product";
import { reqUserStorage } from "../reqUserData";
import { updateDb } from "../methods";

interface IWishlistItemTroggle {
    product: ICart | IShirts;
    setLocalWishlist: (newState: IShirts[]) => void;
    wishlist: IShirts[];
    allProducts: IShirts[];
}

export async function wishlistItemTroggle({product, setLocalWishlist, wishlist, allProducts}: IWishlistItemTroggle){

    const productFromStorage = allProducts.find(data => data.id === product.id && data.band === product.band) ?? null

    if (wishlist.find((itemWishlist) => itemWishlist.id === product.id)) {
        const delItem = wishlist.filter(
            (itemWishlist) => itemWishlist.id != product.id
        );
        setLocalWishlist(delItem);
        updateDb(delItem, "wishlist");
    } else {
        if (productFromStorage != null) {
            const newWishlist = [...wishlist, productFromStorage];
            setLocalWishlist(newWishlist);
            updateDb(newWishlist, "wishlist");
        }
    }
}