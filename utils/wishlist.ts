import heartWhite  from '~/img/heart.svg';
import heartRed from '~/img/heartRed.svg';
import { IShirts } from "@/providers/data"

export function wishlistButtonIcon(thisProduct:IShirts | null, thisWishlist:IShirts[]): string {
    const foundItem = thisProduct != null ? thisWishlist.find((item:IShirts) => item.id === thisProduct.id) : false
    const buttonIcon = foundItem ? heartRed : heartWhite
    return buttonIcon
}