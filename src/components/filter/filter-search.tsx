'use client'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import searchIcon from '~/img/search.svg'

export default function FilterSearch() {
    const [searchProduct, setSearchProduct] = useState<string>('')
    const router = useRouter()
    const myParams = useSearchParams()

    function newParams(data:string): string {
        const params = new URLSearchParams(myParams.toString())
        params.set('product', data)
        if(data === '') {
            params.delete('product')
        }
        console.log(myParams.get('product'), 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        return params.toString()
    }

    return (
        <label className='w-full h-12 pr-5 bg-project-tertiary-500 rounded-lg flex justify-between gap-1'>
            <input
                name='searchBanda'
                className='w-full h-full bg-transparent p-5'
                placeholder='Pesquise uma Banda'
                onChange={(e)=> {
                    setSearchProduct(e.target.value)
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        router.replace(`?${newParams(searchProduct)}`, {
                            scroll: false
                        })
                    }
                }}
            />
            <Image className='w-[40px] h-auto' src={searchIcon} alt='Search Icon'/>
        </label>
    )
}
