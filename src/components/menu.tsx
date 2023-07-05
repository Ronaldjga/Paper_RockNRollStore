'use client'

import React, { useState } from 'react'
import { Rubik_Wet_Paint } from 'next/font/google'
import menuIconOpen from '~/img/menuIcon.svg'
import menuIconClose from '~/img/closeIcon.svg'
import Image from 'next/image'

const rubik_Wet_Paint = Rubik_Wet_Paint({ subsets: ['latin'] , weight: '400'})

export default function Menu() {
    const [ isOpen, setIsOpen ] = useState<boolean>(false)
    const menuIcon = isOpen === false ? menuIconOpen : menuIconClose
  
    return (
        <div className={`${isOpen === false 
            ? 'fixed w-0 h-full ' 
            : 'w-5/6 h-full flex flex-col py-2 px-5 fixed border-r-4 shadow-[0px_0px_21px_0px_rgba(242,15,56,1)] shadow-Project-red-fist'}
            bg-Project-black border-Project-red-fist text-Project-red-fist top-0 left-0 z-10 transition-all duration-300 ease-in-out
            `}
        >
            <button
                className={`${isOpen === false ? 'fixed duration-300 ease-in-out' : 'absolute duration-300 ease-in-out'} w-fit top-5 right-5 z-10`}
                onClick={(e) => {
                    setIsOpen(!isOpen)
                    console.log(isOpen)
                }}
            >
                <Image src={menuIcon} width={30} height={30} alt='Open Menu'/>
            </button>
            <nav className={`${isOpen === true 
                ? 'relative top-16 block w-full' 
                : 'hidden text-[0px] w-0'
                } ${rubik_Wet_Paint.className}`}>
                <div className={`container h-fit mx-auto grid grid-cols-2 place-items-center gap-5 justify-between items-center`}>
                    <div className='w-8 h-8 col bg-Project-red-fist'/>
                    <ul className='flex flex-col col-span-2 gap-5 order-3'>
                        <li>Inicio</li>
                        <li>Produtos</li>
                        <li>Sobre</li>
                        <li>Reportar</li>
                    </ul>
                    <div className='w-8 h-8 flex-none order-2 bg-Project-red-second'/>
                </div>
            </nav>
        </div>
    )
}
