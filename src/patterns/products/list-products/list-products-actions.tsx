"use client";

import Modal from "@/components/actions/modal/modal";
import { Product } from "@/components/product";
import { wishlistButtonIcon } from "../../../../utils/wishlist/wishlist-button-icon";
import deleteIcon from "~/img/delete.svg";
import { ICart, IShirts, UseDataProducts } from "@/providers/data";
import { wishlistItemTroggle } from "../../../../utils/wishlist/wishlist-item-troggle";
import { useEffect, useState, useTransition } from "react";
import { removeItemFromCart } from "../../../../utils/cart/remove-item";
import { useRouter } from "next/navigation";

interface IListProductsActions {
  product: ICart;
  wishlist: IShirts[];
  cart: ICart[],
  allProducts: IShirts[]
}

export default function ListProductsActions({ product, wishlist}: IListProductsActions) {
  const { wishlist: localWishlist, setWishlist, shirts, cart, setCart } = UseDataProducts()
  const router = useRouter()
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setWishlist(wishlist)
  }, [wishlist, setWishlist])

  return (
    <>
      <Product.Action
        kind="icon"
        className="w-5 h-5 min-w-[0px] min-h-[0px]"
        icon={wishlistButtonIcon(product, localWishlist)}
        action={() => {
          wishlistItemTroggle({product, setLocalWishlist: setWishlist, wishlist: localWishlist, allProducts: shirts});
        }}
      />
      <Modal
        className="text-center"
        btnClassName="w-5 h-5 min-w-[0px] min-h-[0px]"
        kind="icon"
        icon={deleteIcon}
        title={product.band}
        buttonAction={{
          text: "Excluir",
          action: async () => {
            await removeItemFromCart({product, cart, setLocalCart: setCart})
            startTransition(() => {
              router.refresh();
            }); 
          }
        }}
      >
        <p>
          Você tem certeza que deseja excluir o item?
        </p>
      </Modal>
    </>
  );
}
