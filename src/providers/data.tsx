'use client'

import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useSession } from "next-auth/react";
import { SUPABASE } from "../../utils/supabase";

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
    allBands: string[],
}

const initialValue = {
    shirts: [],
    setShirts: () => {},
    allBands: [],
}

export const DataProducts = createContext<IdataProductsTypes>(initialValue);

export const DataProductsProvider = ({ children }: IdataProducts) => {
    
    const [ shirts, setShirts ] = useState<IShirts[]>(initialValue.shirts)
    const [ allBands, setAllBands ] = useState<string[]>(initialValue.allBands)
    const [ userData, setUserData ] = useState<any>(null)
    const { data: session, status} = useSession()

    async function testeReq () {
        const req = await fetch("/api/login", {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        const res = await req.json()
        console.log(res, 'console da requiisição')
    }

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
            if(session != undefined && status === 'authenticated') {
                testeReq()
                // console.log(status)
                // const { supabaseAccessToken }: any = session
                // if(supabaseAccessToken) {
                //   SUPABASE(supabaseAccessToken)
                //   .from('users')
                //   .select('*')
                //   .then(({data})=> console.log(data, 'console no dataaaaaaaaaaa'))
                // }
            }
        },[session, status])
        
        // console.log(userData, 'console em data')
    return(
        <DataProducts.Provider value={{shirts, setShirts, allBands}}>
            { children }
        </DataProducts.Provider>
    );
}

export const UseDataProducts = () => useContext(DataProducts);