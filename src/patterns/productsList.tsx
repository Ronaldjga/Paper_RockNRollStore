'use client'

import { Product } from '@/components/product'
import { UseDataProducts } from '@/providers/data'
import React, { useEffect, useState } from 'react'
import { IShirts } from '@/providers/data'
import { Filters } from '@/components/filters'

export function ProductsList() {
  const { shirts } = UseDataProducts()
  
  const [currentItems, setCurrentItems] = useState<IShirts[]>([])
  
  useEffect(() => {
    setCurrentItems(shirts)  
  },[shirts])
  
  return (
    <>
        <div className='container mx-auto'>
          <Filters allItems={shirts} setNewItems={setCurrentItems}/>
          <Product currentItems={currentItems}/>
        </div>
    </>
  )
}
