'use client'

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation";

interface OptionsFilter {
    list: string[];
    searchParams: string | string[];
    filter: string
}

export default function FilterOptions({ list , searchParams, filter}: OptionsFilter) {
    const router = useRouter()
    const myParams = useSearchParams()

    function newParams(data:string): string {
        const params = new URLSearchParams(myParams.toString())
        params.set(filter, data)
        if(data === myParams.get(filter)) {
            params.delete(filter)
        }
        console.log(myParams.get(filter), 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        return params.toString()
    }

    return (
        <details className="w-full h-12 cursor-pointer relative bg-project-tertiary-500 rounded-lg text-project-secondary-500">
            <summary className="w-full h-full px-5 flex items-center justify-between flex-wrap">
                <div>
                    <h3 className='inline-block font-semibold'>{filter}</h3>
                    {
                        searchParams ?
                        <span className='bg-project-primary-500 rounded-full px-3 py-1 mx-1 text-project-tertiary-500 text-xs font-light'>{searchParams}</span>
                        : null
                    }
                </div>
            </summary>
            <ul className='w-full max-h-[300px] p-2 overflow-y-auto z-50 flex flex-col gap-1 items-center absolute top-full mt-2 rounded-lg rounded-b-none text-project-quaternary-500 bg-project-secondary-700 border-b-4 border-b-project-primary-500'>
                {list?.map((data, key) => {
                    const isChecked = searchParams === data ? 'bg-project-primary-600 text-project-quaternary-300' : ''
                    return (
                        <li
                            className="contents"
                            key={key}
                            onClick={(e) => {
                                const details = document.querySelectorAll("details")
                                details.forEach((value) => {
                                    value.open = false
                                })
            
                            }}
                        >
                            <Link 
                                className={`${isChecked} w-full h-fit block relative rounded-lg p-4 hover:bg-project-primary-700`}
                                href={`?${newParams(data)}`}
                                scroll={false}
                            >
                                {data}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </details>
    )
}
