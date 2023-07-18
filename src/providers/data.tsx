'use client'

import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useSession } from "next-auth/react";

const SUPABASEURL = process.env.SUPABASE_URL
const SUPABASEANONKEY = process.env.SUPABASE_ANON_KEY

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

interface IdataProducts {
    children: ReactNode
}

interface IdataProductsTypes {
    shirts: IShirts[],
    setShirts: (newState : IShirts[]) => void,
    allBands: string[]
}

const initialValue = {
    shirts: [],
    setShirts: () => {},
    allBands: []
}

export const DataProducts = createContext<IdataProductsTypes>(initialValue);


export const DataProductsProvider = ({ children }: IdataProducts) => {
    
    const [ shirts, setShirts ] = useState<IShirts[]>(initialValue.shirts)
    const [ allBands, setAllBands ] = useState<string[]>(initialValue.allBands)
    const [ userData, setUserData ] = useState<any>(null)
    const { data: session,} = useSession()

    useEffect(()=> { 
        if (SUPABASEURL && SUPABASEANONKEY) {
            const supabaseClient = createClient(SUPABASEURL, SUPABASEANONKEY);
            supabaseClient
              .from('Storage')
              .select('Band, Shirts')
              .then(({ data }) => {
                const allShirts: IShirts[] = data?.reduce((acc: IShirts[], obj: { Band: string; Shirts?: IShirts[] }) => {
                    if (obj.Shirts) {
                      return [...acc, ...obj.Shirts];
                    }
                    return acc;
                },[]) || [];
                const dataAllbands: string[] = data?.map(band => band.Band) || []
                setShirts(allShirts)
                setAllBands(dataAllbands)
            });
        }
        if(session && SUPABASEURL && SUPABASEANONKEY ){
            const { supabaseAccessToken }: any = session;
            const supabaseClient = createClient(SUPABASEURL, SUPABASEANONKEY, {global: {headers: {Authorization: `Bearer ${supabaseAccessToken}`}}})
            supabaseClient
                .from('users')
                .select('*')
                .then(({data}) => setUserData(data))
            }
        },[session])
        
        console.log(userData, 'console em data')
    return(
        <DataProducts.Provider value={{shirts, setShirts, allBands}}>
            { children }
        </DataProducts.Provider>
    );
}

export const UseDataProducts = () => useContext(DataProducts);