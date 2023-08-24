import heartWhite  from '~/img/heart.svg';
import heartRed from '~/img/heartRed.svg';
import { IShirts, IWishlist } from "@/providers/data"

export function wishlistButtonIcon(thisProduct:IShirts, thisWishlist:IWishlist[]): string {
    const foundItem = thisWishlist.find((item:IWishlist) => item.product.id === thisProduct.id)
    const buttonIcon = foundItem ? heartRed : heartWhite
    return buttonIcon
}