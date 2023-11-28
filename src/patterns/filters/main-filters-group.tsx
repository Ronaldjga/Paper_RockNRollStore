import { Filter } from '@/components/filter'
import React from 'react'
import { reqAllBands } from '../../../utils/product'

interface IMainFiltersGroup {
    band: string | string[];
}

export default async function MainFiltersGroup({band}: IMainFiltersGroup) {
    const allBands = await reqAllBands()
  return (
    <Filter.Root className='container mx-auto rounded-t-md px-2 py-5 flex flex-wrap justify-center lg:justify-around gap-3 mb-5 bg-project-secondary-500 border-b-4 border-b-project-primary-800'>
        <Filter.Options className='w-[300px] lg:flex-1' filter="band" list={allBands} searchParams={band}/>
        <Filter.Search className='w-[300px] lg:flex-1'/>
        <Filter.MinMax className='w-[300px]  lg:flex-1'/>
    </Filter.Root>    
  )
}
