'use client'

import { UseDataProducts } from '@/providers/data'
import React, { useEffect, useState } from 'react'
import { IShirts } from '@/providers/data'
import { Filters } from '@/components/filters'
import { ProductsGrid } from './products/productsGrid'

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
          {currentItems.length && (<ProductsGrid products={currentItems}/>)}
        </div>
    </>
  )
}
