'use client'

import { ReactNode, useState } from "react"
import Image from 'next/image'
import menuIconOpen from '~/img/menuIcon.svg'
import menuIconClose from '~/img/closeIcon.svg'

interface IMenuRoot {
    children: ReactNode
}

export default function MenuRoot({children}: IMenuRoot) {
    const [ isOpen, setIsOpen ] = useState<boolean>(false)
    const menuIcon = isOpen === false ? menuIconOpen : menuIconClose

    return (
        <div style={{}} className={`${isOpen === false 
            ? 'fixed w-0 h-full ' 
            : 'w-5/6 h-full flex flex-col py-2 px-5 fixed border-r-4 shadow-[0px_0px_21px_0px_rgba(242,15,56,1)] shadow-Project-red-fist'}
            bg-Project-black border-Project-red-fist text-Project-red-fist top-0 left-0 z-10 transition-all duration-300 ease-in-out
            `}
        >
            <button
            className={`${isOpen === false ? 'fixed duration-300 ease-in-out' : 'absolute duration-300 ease-in-out'} w-fit top-5 right-5 z-10`}
            onClick={(e) => setIsOpen(!isOpen)}><Image src={menuIcon} width={30} height={30} alt='Open Menu'/></button>
            <nav className={`${isOpen === true ? 'relative top-16 block w-full' : 'hidden text-[0px] w-0'}`}>
                <div className={`container h-fit mx-auto grid grid-cols-2 place-items-center gap-5 justify-between items-center`}>
                    {children}
                </div>
            </nav>
        </div>
    )
}
