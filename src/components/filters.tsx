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
    const [optionPrice, setOptionPrice] = useState<IPrices>()

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
            } else if (value.shirt.toLowerCase().includes(searchBanda.toLocaleLowerCase())) {
                return value
            }
        }).filter((value)=> {
            if (optionBand === '') {
                return value
            } else if (value.shirt.toLocaleLowerCase().includes(optionBand.toLocaleLowerCase())) {
                return value
            }
        }).filter((value) => {
            if (!optionPrice) {
                console.log('aqui 1')
                return value
            } else if(optionPrice.initialPrice && optionPrice.finalPrice) {
                console.log('AQUI 222222222222222222222222222222222222222')
                return parseFloat(value.price) >= optionPrice.initialPrice && parseFloat(value.price) <= optionPrice.finalPrice
            } else if (optionPrice.initialPrice && !optionPrice.finalPrice) {
                console.log('AQUI 333333333333333333333333333333333333333')
                return parseFloat(value.price) >= optionPrice.initialPrice
            } else if (optionPrice.finalPrice && !optionPrice.initialPrice) {
                console.log('AQUI 444444444444444444444444444444444444444')
                return parseFloat(value.price) <= optionPrice.finalPrice
            }
        })
    }
    console.log(optionBand)
    useEffect(()=> {
        setNewItems(setNewList())
        console.log(optionPrice)
    },[searchBanda, optionBand, optionPrice])

  return (
    <div className='p-2 flex gap-5 justify-center items-center bg-Project-black border-b-8 border-Project-red-fist'>
        <div className='w-2/4 p-2 gap-5 flex items-center bg-blue-500'>
            <details className="w-full h-12 cursor-pointer relative bg-Project-white rounded-lg">
              <summary className="w-full h-full px-5 flex items-center justify-between flex-wrap">
                <h3>Preços</h3>
              </summary>
              <ul className='w-full max-h-[300px] p-2 overflow-y-auto z-50 flex flex-col gap-1 items-center absolute top-full mt-2 rounded-lg rounded-b-none text-Project-white bg-Project-black border-b-8 border-b-Project-red-fist'>
                {prices.map((data, key) => {
                    const isChecked = optionBand === data ? 'bg-Project-red-fist' : ''
                    const validatedText = data.finalPrice ? 'Até' : 'à partir'
                    const formatInitialValue = data.initialPrice ? `R$ ${data.initialPrice}` : null
                    const formatFinalValue = data.finalPrice ? `R$ ${data.finalPrice}` : null
                    return(
                        <li
                        key={key}
                        className={`${isChecked} w-full h-fit relative rounded-lg p-4 hover:bg-Project-red-second`}
                        onClick={(e) => {
                                setOptionPrice(data)
                                const details = document.querySelectorAll("details")
                                details.forEach((value) => {
                                    value.open = false
                                })
            
                            }}
                        >
                         {formatInitialValue} {validatedText} {formatFinalValue}
                        </li>
                    )
                })}
              </ul>
            </details>
            
            <details className="w-full h-12 cursor-pointer relative bg-Project-white rounded-lg">
              <summary className="w-full h-full px-5 flex items-center justify-between flex-wrap">
                <h3>Bandas</h3>
              </summary>
              <ul className='w-full max-h-[300px] p-2 overflow-y-auto z-50 flex flex-col gap-1 items-center absolute top-full mt-2 rounded-lg rounded-b-none text-Project-white bg-Project-black border-b-8 border-b-Project-red-fist'>
                {allBands.map((data, key) => {
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
        <label className='w-2/4 h-12 pr-5 bg-Project-white rounded-lg flex justify-between gap-5'>
            <input
                name='searchBanda'
                className='w-full h-full bg-transparent p-5'
                placeholder='Pesquise uma Banda'
                onChange={(e)=> {
                setSearchBanda(e.target.value)
            }}/>
            <Image className='w-8 h-auto' src={searchIcon} alt='Search Icon'/>
        </label>
    </div>
  )
}
