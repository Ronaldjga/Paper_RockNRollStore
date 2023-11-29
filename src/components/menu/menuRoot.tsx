'use client'

import { ReactNode, useState, useCallback, useEffect } from "react"
import Image from 'next/image'
import menuIconOpen from '~/img/menuIcon.svg'
import menuIconClose from '~/img/closeIcon.svg'

interface IMenuRoot {
    children: ReactNode,
}

export default function MenuRoot({children}: IMenuRoot) {
    const [ isOpen, setIsOpen ] = useState<boolean>(false)
    const menuIcon = isOpen === false ? menuIconOpen : menuIconClose

    const [windowWidth, setWindowWidth] = useState<number>(() => {
        if (typeof window === "undefined"){
            return 0
        } else {
            return window.innerWidth
        }
    });

    const handleResize = useCallback(() => {
        setWindowWidth(window.innerWidth);
        if (window.innerWidth > 640) {
            setIsOpen(false);
        }
    }, []);

    useEffect(() => {
        if (typeof window === "undefined"){
            
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);

    
    return (
        <div className={`${isOpen === false 
            ? 'fixed w-0 h-full ' 
            : 'w-5/6 h-full flex flex-col py-2 pr-2 pl-10 fixed border-r-4 shadow-[0px_0px_21px_0px_rgba(242,15,56,1)] shadow-project-primary-500'}
            bg-project-secondary-900 border-project-primary-500 text-project-quaternary-500 transition-all duration-300 ease-in-out
            sm:w-full sm:h-fit sm:p-2 z-50 sm:border-b-2 sm:border-b-project-primary-500
            `}
        >
            <button
            className={`${isOpen === false ? 'fixed duration-300 ease-in-out' : 'absolute duration-300 ease-in-out'} w-fit top-5 right-5 z-10 sm:hidden`}
            onClick={(e) => setIsOpen(!isOpen)}><Image src={menuIcon} width={30} height={30} alt='Open Menu'/></button>
            <nav className={`${isOpen === true ? 'relative top-16 block w-full' : 'hidden text-[0px] w-0'} sm:block sm:w-full`}>
                <div onClick={e => windowWidth > 640 ? null : setIsOpen(!isOpen)} className={`container h-fit mx-auto flex flex-col gap-5 justify-between 
                    sm:flex-row
                `}>
                    {children}
                </div>
            </nav>
        </div>
    )
}
