import { Filter } from '@/components/filter'
import React from 'react'
import { reqAllBands } from '../../../utils/product'

interface IMainFiltersGroup {
    band: string | string[];
}

export default async function MainFiltersGroup({band}: IMainFiltersGroup) {
    const allBands = await reqAllBands()
    console.log(allBands)
  return (
    <Filter.Root className='flex flex-col gap-3 mb-2'>
        <Filter.Options filter="band" list={allBands} searchParams={band}/>
        <Filter.Search/>
        <Filter.MinMax/>
    </Filter.Root>    
  )
}
