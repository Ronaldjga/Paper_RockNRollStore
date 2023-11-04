'use client'

import { signIn, signOut } from "next-auth/react"
import Image from "next/image"
import userIcon from '~/img/userIcon.svg'

interface IAccountActions {
    action?: boolean
    icon?: string
    className?: string
}

export default function AccountActions({ action, icon, className }: IAccountActions) {
    // console.log(action, 'console action')
    return (
        <>
            {
                action === true ? (
                    <button
                        className={`${className} w-10 h-10 rounded-md relative bg-red-400`}
                        onClick={() => signOut()}
                    >
                        <Image className="rounded-md" src={icon || userIcon} alt="Icone de úsuario" fill/>
                    </button>
                ) 
                : (
                    <button
                        className={`${className} w-10 h-10 relative`}
                        onClick={() => signIn()}
                    >
                        <Image src={userIcon} alt="Foto de perfil"/>
                    </button>
                )
            }
        </>
    )
}
