'use client'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import searchIcon from '~/img/search.svg'

export default function FilterSearch({className} : {className?: string}) {
    const [searchProduct, setSearchProduct] = useState<string>('')
    const router = useRouter()
    const myParams = useSearchParams()

    function newParams(data:string): string {
        const params = new URLSearchParams(myParams.toString())
        params.set('product', data)
        if(data === '') {
            params.delete('product')
        }
        return params.toString()
    }

    return (
        <label className={twMerge('w-full h-12 pr-5 bg-project-tertiary-500 rounded-lg flex justify-between gap-1', className)}>
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
