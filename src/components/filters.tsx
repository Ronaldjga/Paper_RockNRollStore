'use client'

import { IShirts, UseDataProducts } from '@/providers/data'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import searchIcon from '~/img/search.svg'

interface IChildsProps {
    setNewItems: (newState : IShirts[]) => void
    allItems: IShirts[]
}

interface IPrices {
    initialPrice?: number
    finalPrice?: number
}

export function Filters({ setNewItems , allItems }: IChildsProps) {
    const { allBands } = UseDataProducts()
    const [searchBanda, setSearchBanda] = useState<string>('')
    const [optionBand, setOptionBand] = useState<string>('')
    const [optionPrice, setOptionPrice] = useState<IPrices | null>()

    const priceFormat = (data?:IPrices) => {
        const price = data || optionPrice;
        const initialPrice = price?.initialPrice ? `R$ ${price.initialPrice}` : '';
        const finalPrice = price?.finalPrice ? `R$ ${price.finalPrice}` : '';
        const validatedText = price?.finalPrice ? 'até' : 'à partir';
        return `${initialPrice} ${validatedText} ${finalPrice}`
    }

    const prices: IPrices[] = [
        {
            finalPrice: 40
        },
        {
            initialPrice: 41,
            finalPrice: 75
        },
        {
            initialPrice: 76,
            finalPrice: 99
        },
        {
            initialPrice: 100
        }
    ]

    function setNewList(){
        return allItems.filter((value) => {
            if (searchBanda === '') {
                return value
            } else if (value.band.toLowerCase().includes(searchBanda.toLocaleLowerCase())) {
                return value
            }
        }).filter((value)=> {
            if (optionBand === '') {
                return value
            } else if (value.band.toLocaleLowerCase().includes(optionBand.toLocaleLowerCase())) {
                return value
            }
        }).filter((value) => {
            const price: number = parseFloat(value.price);
            if (!optionPrice) {
                return value
            } else if(optionPrice.initialPrice && optionPrice.finalPrice) {
                return price >= optionPrice.initialPrice && price <= optionPrice.finalPrice
            } else if (optionPrice.initialPrice && !optionPrice.finalPrice) {
                return price >= optionPrice.initialPrice
            } else if (optionPrice.finalPrice && !optionPrice.initialPrice) {
                return price <= optionPrice.finalPrice
            }
        })
    }
    
    useEffect(()=> {
        setNewItems(setNewList())
        // console.log(optionPrice)
    },[searchBanda, optionBand, optionPrice])

  return (
    <div className='my-5 p-2 flex flex-wrap gap-2 justify-center items-center bg-Project-black border-b-8 rounded-t-md border-Project-red-fist'>
        <div className='w-full gap-2 flex flex-wrap items-center'>
            <details className="w-full h-12 cursor-pointer relative bg-Project-white rounded-lg">
              <summary className="w-full h-full px-5 flex items-center justify-between flex-wrap">
                <div>
                    <h3 className='inline-block font-semibold'>Preços</h3> 
                    {
                        optionPrice ? 
                        <span className='bg-Project-red-fist rounded-full px-3 py-1 mx-1 text-white text-xs font-light'>{priceFormat()}</span> 
                        : null
                    }
                </div>
              </summary>
              <ul className='w-full max-h-[300px] p-2 overflow-y-auto z-50 flex flex-col gap-1 items-center absolute top-full mt-2 rounded-lg rounded-b-none text-Project-white bg-Project-black border-b-8 border-b-Project-red-fist'>
                {prices.map((data: IPrices, key) => {
                    const price = JSON.stringify(optionPrice);
                    const thisValue = JSON.stringify(data)
                    const isChecked = price === thisValue ? 'bg-Project-red-fist' : ''
                    return(
                        <li
                        key={key}
                        className={`${isChecked} w-full h-fit relative rounded-lg p-4 hover:bg-Project-red-second`}
                        onClick={(e) => {
                                console.log(data)   
                                setOptionPrice(price === thisValue ? null : data)
                                console.log(optionPrice)
                                console.log(optionPrice === data)
                                const details = document.querySelectorAll("details")
                                details.forEach((value) => {
                                    value.open = false
                                })
            
                            }}
                        >
                         {priceFormat(data)}
                        </li>
                    )
                })}
              </ul>
            </details>
            
            <details className="w-full h-12 cursor-pointer relative bg-Project-white rounded-lg text-Project-black">
              <summary className="w-full h-full px-5 flex items-center justify-between flex-wrap">
                <div>
                    <h3 className='inline-block font-semibold'>Bandas</h3>
                    {
                        optionBand ?
                        <span className='bg-Project-red-fist rounded-full px-3 py-1 mx-1 text-white text-xs font-light'>{optionBand}</span>
                        : null
                    }
                </div>
              </summary>
              <ul className='w-full max-h-[300px] p-2 overflow-y-auto z-50 flex flex-col gap-1 items-center absolute top-full mt-2 rounded-lg rounded-b-none text-Project-white bg-Project-black border-b-8 border-b-Project-red-fist'>
                {allBands?.map((data, key) => {
                    const isChecked = optionBand === data ? 'bg-Project-red-fist' : ''
                    return(
                        <li
                        key={key}
                        className={`${isChecked} w-full h-fit relative rounded-lg p-4 hover:bg-Project-red-second`}
                        onClick={(e) => {
                                setOptionBand(optionBand === data ? '' : data)
                                const details = document.querySelectorAll("details")
                                details.forEach((value) => {
                                    value.open = false
                                })
            
                            }}
                        >
                            {data}
                        </li>
                    )
                })}
              </ul>
            </details>
        </div>
        <label className='w-full h-12 pr-5 bg-Project-white rounded-lg flex justify-between gap-1'>
            <input
                name='searchBanda'
                className='w-full h-full bg-transparent p-5'
                placeholder='Pesquise uma Banda'
                onChange={(e)=> {
                setSearchBanda(e.target.value)
            }}/>
            <Image className='w-[40px] h-auto' src={searchIcon} alt='Search Icon'/>
        </label>
    </div>
  )
}
