'use client'

import { ReactNode, createContext, useContext, useState } from "react";

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
    shirt: string
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
    shirts: [
        {
            shirt: "Slipknot",
            size: tamanhos.G,
            color: color.Preto,
            image: require("~/img/slipknotShirt.png").default,
            price: "49,99"
        },
        {
            shirt: "Pearl Jam",
            size: tamanhos.M,
            color: color.Cinza,
            image: require("~/img/pearlJamShirt.png").default,
            price: "88,43"
        },
        {
            shirt: "Sleep Token",
            size: tamanhos.G,
            color: color.Branco,
            image: require('~/img/sleepTokenShirt.png').default,
            price: "103,30"
        },
        {
            shirt: "Guns 'N' Roses",
            size: tamanhos.G,
            color: color.Branco,
            image: require("~/img/gunsNRosesShirt.png").default,
            price: "49,99"
        },
        {
            shirt: "Led Zeppelin",
            size: tamanhos.M,
            color: color.Cinza,
            image: require("~/img/ledZeppelinShirt.png").default,
            price: "88,43"
        }
    ],
    setShirts: () => {},
    allBands: []
}

export const DataProducts = createContext<IdataProductsTypes>(initialValue);


export const DataProductsProvider = ({ children }: IdataProducts) => {
    
    const [shirts, setShirts] = useState<IShirts[]>(initialValue.shirts)
    const [allBands, setAllBands] = useState<string[]>(initialValue.shirts.map((item) => item.shirt))
    
    return(
        <DataProducts.Provider value={{shirts, setShirts, allBands}}>
            { children }
        </DataProducts.Provider>
    );
}

export const UseDataProducts = () => useContext(DataProducts);