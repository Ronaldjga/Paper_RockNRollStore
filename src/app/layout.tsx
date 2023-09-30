import './globals.css'
import { Inter } from 'next/font/google'
import { Menu } from '@/components/menu'
import backpackIcon from '~/img/backpack.svg'
import SessionAccount from '@/components/accountButton'
import Notifications from '@/patterns/widget/notifications'
import { DataProductsProvider } from '@/providers/data'
import { NotificationsProvider } from '@/providers/notifications'
import AuthProvider from '@/providers/auth'
import { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Rock 'N' Roll Store",
  description: "Loja de bandas de rock 'n' roll",
}

export default function RootLayout(props:any) {
  const menuLinks = [
    {link: '/', title: 'Inicio'},
    {link: '/', title: 'Produtos'},
    {link: '/', title: 'Sobre'},
    {link: '/', title: 'Reportar'}
  ]

  return (
    <html lang="ptBR">
      <body className={`${inter.className} bg-project-secondary-900`}>
        <AuthProvider>
          <DataProductsProvider>
            <NotificationsProvider>
              <Menu.Root>
                {/* @ts-expect-error */}
                <SessionAccount/>
                <Menu.Links links={menuLinks}/>
                <Menu.Icon icon={backpackIcon} alt='Carrinho de compras' link='/cart'/>
              </Menu.Root>
              <Notifications/>
              {props.children}
              {props.modal}
            </NotificationsProvider>
          </DataProductsProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
