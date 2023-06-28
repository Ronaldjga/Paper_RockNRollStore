'use client'

import { Product } from '@/components/product'
import { UseDataProducts } from '@/providers/data'
import React, { useState } from 'react'
import { IShirts } from '@/providers/data'
import { Filters } from '@/components/filters'

export function ProductsList() {
  const { shirts } = UseDataProducts()

  const [currentItems, setCurrentItems] = useState<IShirts[]>(shirts)

  return (
    <div className='w-full'>
        <div className='container mx-auto bg-Project-black'>
          <Filters allItems={shirts} setNewItems={setCurrentItems}/>
          <Product currentItems={currentItems}/>
        </div>
    </div>
  )
}
