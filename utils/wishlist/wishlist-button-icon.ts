import heartWhite  from '~/img/heart.svg';
import heartRed from '~/img/heartRed.svg';
import { ICart, IShirts, IUserData } from "@/providers/data"
import { reqUserStorage } from '../reqUserData';

export function wishlistButtonIcon(product:IShirts | ICart, wishlist: IShirts[]): string {
    const foundItem = product != null ? wishlist.find((item:IShirts) => item.id === product.id) : false
    const buttonIcon = foundItem ? heartRed : heartWhite
    return buttonIcon
}
