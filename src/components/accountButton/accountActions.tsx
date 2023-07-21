'use client'

import { signIn, signOut } from "next-auth/react"
import Image from "next/image"
import userIcon from '~/img/userIcon.svg'

interface IAccountActions {
    action?: boolean
    icon?: string
}

export default function AccountActions({ action, icon }: IAccountActions) {
    // console.log(action, 'console action')
    return (
        <>
            {
                action === true ? (
                    <button
                        className='w-10 h-10 rounded-full relative bg-red-400'
                        onClick={() => signOut()}
                    >
                        <Image className="rounded-full" src={icon || userIcon} alt="Icone de úsuario" fill/>
                    </button>
                ) 
                : (
                    <button
                        className='w-8 h-8 relative bg-blue-500'
                        onClick={() => signIn()}
                    >
                        <Image src={userIcon} alt="Foto de perfil"/>
                        LOGAR
                    </button>
                )
            }
        </>
    )
}
