'use client'

import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { SUPABASE } from "../../utils/supabase";

export enum ESizes {
    P = "Pequeno",
    M = "Médio",
    G = "Grande",
    GG = "Extra largo"
}

export enum EColor {
    Preto = "Preto",
    Branco = "Branco",
    Cinza = "Cinza"
}

export interface IShirts {
    id: string,
    band: string
    size: ESizes
    color: EColor,
    image: string,
    price: string
}

interface IUserData {
    cart: ICart[],
    wishlist: IWishlist[],
    email: string,
    id: string,
    image: string,
    name: string,
}

interface IdataProducts {
    children: ReactNode
}

export interface ICart {
    id: string,
    band: string,
    size: string,
    color: string,
    image: string,
    price: string,
    quantity: number,
    totalPrice: string
}

export interface IWishlist {
    product: IShirts,
    quatity?: number | string
}

interface IdataProductsTypes {
    shirts: IShirts[],
    cart: ICart[],
    setCart: (newState: ICart[]) => void,
    wishlist: IWishlist[],
    setWishlist: (newState: IWishlist[]) => void,
    setShirts: (newState : IShirts[]) => void,
    allBands: string[],
    userData: IUserData,
    setUserData: (newState : IUserData) => void
}

const initialValue: IdataProductsTypes = {
    shirts: [],
    cart: [],
    wishlist: [],
    allBands: [],
    userData: {cart: [], wishlist: [], email: '', id: '', image: '', name: ''},
    setShirts: () => {},
    setUserData: () => {},
    setCart: () => {},
    setWishlist: () => {}
}

export const DataProducts = createContext<IdataProductsTypes>(initialValue);

export const DataProductsProvider = ({ children }: IdataProducts) => {
    
    const [ shirts, setShirts ] = useState<IShirts[]>(initialValue.shirts)
    const [ allBands, setAllBands ] = useState<string[]>(initialValue.allBands)
    const [ userData, setUserData ] = useState<IUserData>(initialValue.userData)
    const [ cart, setCart ] = useState<ICart[]>(initialValue.cart)
    const [ wishlist, setWishlist ] = useState<IWishlist[]>(initialValue.wishlist)
    const { data: session} = useSession()

    async function reqUserData () {
        const req = await fetch("/api/userdata");
        const res: IUserData[] = await req.json()
        setUserData(res[0])
        setCart(res[0].cart)
        setWishlist(res[0].wishlist)
        console.log(res, 'console da requiisição')
    }

    async function updateDb(data: IWishlist[] | ICart[], update: string) {
        const propertie = {[update]: data}
        console.log(propertie)
        const req = await fetch("/api/update", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(propertie)
        });
        const res = await req.json()
        console.log(res, 'REQUISIÇÃOoooooooooooooooooo POST')
    }

    async function reqStorage() {
        const req = await fetch("/api/storage");
        const res = await req.json();
        const allShirts: IShirts[] = await res?.reduce((acc: IShirts[], obj: { Band: string; Shirts?: IShirts[] }) => {
            if (obj.Shirts) {
            return [...acc, ...obj.Shirts];
            }
            return acc;
        },[]) || [];
        const dataAllbands: string[] = res?.map((band : { Band : string }) => band.Band) || []
        setShirts(allShirts)
        setAllBands(dataAllbands)
        console.log(res, 'console do Storage')
    }

    useEffect(()=> {
        const channel = SUPABASE().channel('realtime userData')
        .on("postgres_changes", {
            event: "UPDATE",
            schema: "public",
            table: "users"
        }, 
        (payload) => {
            console.log({payload}, 'REAAAAALLLLTIME')
        }).subscribe()

        return () => {
            SUPABASE().removeChannel(channel)
        }
    }, [])

    useEffect(() => {
        reqStorage()
    },[])

    useEffect(()=> { 
        if(session) {
            reqUserData()
        }
    },[session])

    useEffect(()=> {
        if(userData.wishlist != wishlist && wishlist.length != 0){
            updateDb(wishlist, 'wishlist')
        }
    },[wishlist])

    useEffect(()=> {
        if(userData.cart != cart && cart.length != 0){
            updateDb(cart, 'cart')
        }
    },[cart])
        
    return(
        <DataProducts.Provider value={{shirts, setShirts, allBands, userData, setUserData, cart, setCart, wishlist, setWishlist}}>
            { children }
        </DataProducts.Provider>
    );
}

export const UseDataProducts = () => useContext(DataProducts);