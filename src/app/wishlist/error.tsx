'use client'

import Image from "next/image"
import errorPageIcon from '~/img/errorPage.svg'

export default function ErrorCartPage({ error, reset }: {error: Error, reset: () => void}) {
    return (
        <main className="h-full flex flex-col items-center gap-5 p-5">
            <div className="">
                <h2 className="text-[4rem] font-bold font-rock text-center text-project-primary-500">Error</h2>
                <h3 className="text-project-primary-200">{error.message}</h3>
            </div>
            <Image className="w-2/4 max-w-[150px] mx-auto" src={errorPageIcon} alt="Error Icon"/>
            <button
                onClick={(e) => {reset()}}
                className="py-2 px-5 bg-project-primary-500 rounded-md"
            >
                Tentar novamente
            </button>
        </main>
    )
}