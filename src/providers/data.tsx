'use client'

import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

enum tamanhos {
    P = "Pequeno",
    M = "Médio",
    G = "Grande",
    GG = "Extra largo"
}

enum color {
    Preto = "Preto",
    Branco = "Branco",
    Cinza = "Cinza"
}

export interface IShirts {
    band: string
    size: tamanhos
    color: color,
    image: string,
    price: string
}

interface IUserData {
    cart: [],
    email: string,
    id: string,
    image: string,
    name: string,
    wishlist: string
}

interface IdataProducts {
    children: ReactNode
}

interface IdataProductsTypes {
    shirts: IShirts[],
    setShirts: (newState : IShirts[]) => void,
    allBands: string[],
    userData: IUserData[],
    setUserData: (newState : IUserData[]) => void
}

const initialValue = {
    shirts: [],
    setShirts: () => {},
    allBands: [],
    userData: [],
    setUserData: () => {}
}

export const DataProducts = createContext<IdataProductsTypes>(initialValue);

export const DataProductsProvider = ({ children }: IdataProducts) => {
    
    const [ shirts, setShirts ] = useState<IShirts[]>(initialValue.shirts)
    const [ allBands, setAllBands ] = useState<string[]>(initialValue.allBands)
    const [ userData, setUserData ] = useState<IUserData[]>(initialValue.userData)
    const { data: session} = useSession()

    async function reqUserData () {
        const req = await fetch("/api/userdata");
        const res = await req.json()
        setUserData(res)
        console.log(res, 'console da requiisição')
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
    }

    useEffect(() => {
        reqStorage()
    },[])

    useEffect(()=> { 
        if(session) {
            reqUserData()
        }
    },[session])
        
    return(
        <DataProducts.Provider value={{shirts, setShirts, allBands, userData, setUserData}}>
            { children }
        </DataProducts.Provider>
    );
}

export const UseDataProducts = () => useContext(DataProducts);