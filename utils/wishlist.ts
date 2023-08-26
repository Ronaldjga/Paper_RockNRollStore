import heartWhite  from '~/img/heart.svg';
import heartRed from '~/img/heartRed.svg';
import { IShirts, IWishlist } from "@/providers/data"

export function wishlistButtonIcon(thisProduct:IShirts | null, thisWishlist:IWishlist[]): string {
    const foundItem = thisProduct != null ? thisWishlist.find((item:IWishlist) => item.product.id === thisProduct.id) : false
    const buttonIcon = foundItem ? heartRed : heartWhite
    return buttonIcon
}