'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'


interface IProviderAuth {
    children: ReactNode
}

export default function ProviderAuth({children}:IProviderAuth) {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}
