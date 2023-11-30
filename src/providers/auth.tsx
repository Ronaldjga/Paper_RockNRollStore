'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'


interface IAuthProvider {
    children: ReactNode
}

export default function AuthProvider({children}:IAuthProvider) {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}
