'use client'

import Image from 'next/image'
import React from 'react'
import { IShirts } from '@/providers/data'

interface childProps {
  currentItems: IShirts[]
}

export function Product({  currentItems }: childProps) {

  return (
    <div className='grid grid-cols-2 gap-2'>
      {currentItems?.map((data, key) => {
        return(
          <div className='bg-Project-white border-b-8 border-Project-red-fist rounded-t-md p-2 gap-5 flex flex-col items-center' key={key}>
            <div className='w-full pb-[125%] relative'>
              <Image className='drop-shadow-2xl drop' sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' fill src={data.image} alt={data.band} />
            </div>
            <div className='w-full p-2 border-t-4 border-Project-black flex flex-wrap justify-between'>
              <div>
                <h3 className='font-medium text-[0.8rem]'>{data.band}</h3>
                <p className='font-bold text-[1.2rem]'>R$ {data.price}</p>
              </div>
              <button className='self-end'>
                BUY
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
