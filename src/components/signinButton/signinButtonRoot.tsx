'use client'

import { ReactNode } from "react"
import { signIn } from "next-auth/react"

interface ISigninButtonRoot {
    children: ReactNode,
    provider: string,
    className?: ''
}

export default function SigninButtonRoot({ children, provider, className } : ISigninButtonRoot) {
  return (
    <button
        className={`${className} py-2 px-5 bg-Project-red-fist`}
        onClick={() => signIn(provider)}
    >
        {children}
    </button>
  )
}
