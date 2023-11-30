import './globals.css'
import { Inter } from 'next/font/google'
import { Menu } from '@/components/menu'
import backpackIcon from '~/img/backpack.svg'
import SessionAccount from '@/components/accountButton'
import Notifications from '@/patterns/widget/notifications'
import { DataProductsProvider } from '@/providers/data'
import { NotificationsProvider } from '@/providers/notifications'
import AuthProvider from '@/providers/auth'
import wishlistICon from '~/img/heartRedBorder.svg'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Rock 'N' Roll Store",
  description: "Loja de bandas de rock 'n' roll",
}

export default function RootLayout(props:any) {
  const menuLinks = [
    {link: '/', title: 'Inicio'},
    {link: '/products', title: 'Produtos'},
    {link: '/sobre', title: 'Sobre'},
    {link: '/reportar', title: 'Reportar'}
  ]

  return (
    <html lang="ptBR">
      <body className={`${inter.className} bg-project-secondary-900`}>
        <AuthProvider>
          <DataProductsProvider>
            <NotificationsProvider>
              <Menu.Root>
                <div className='w-full flex justify-between items-center  pr-5 sm:order-2 sm:justify-end sm:gap-2'>
                  {/* @ts-expect-error */}
                  <SessionAccount className={`sm:w-7 sm:h-7`}/>
                  <Menu.Icon className='order-3 sm:w-6 sm:h-6' icon={backpackIcon} alt='Carrinho de compras' link='/cart'/>
                  <Menu.Icon className='sm:w-6 sm:h-6' icon={wishlistICon} alt='Lista de desejos' link='/wishlist'/>
                </div>
                <Menu.Links className='sm:order-1 sm:flex-row sm:items-center' links={menuLinks}/>
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
