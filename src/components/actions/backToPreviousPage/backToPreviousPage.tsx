'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"
import { twMerge } from "tailwind-merge"
import arrow from '~/img/redArrow.svg'

interface IBackToPreviousPage {
    className?: string
}

export default function BackToPreviousPage({ className }: IBackToPreviousPage) {
    const router = useRouter()

    if(window.history.length > 2){
        return (
            <button
            className={twMerge('relative w-8 h-8', className)}
                onClick={(e)=> {
                    router.back()
                }}
            >
                <Image src={arrow} alt="Back to previous page" fill/>
            </button>
        )
    }
    return (
        <></>
    )
}
