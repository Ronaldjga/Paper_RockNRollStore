import './globals.css'
import { Inter } from 'next/font/google'
import ProviderAuth from './providers/provider'
import { Menu } from '@/components/menu'
import backpackIcon from '~/img/backpack.svg'
import SessionAccount from '@/components/accountButton'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Rock 'N' Roll Store",
  description: "Loja de bandas de rock 'n' roll",
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  const menuLinks = [
    {link: '/', title: 'Inicio'},
    {link: '/', title: 'Produtos'},
    {link: '/', title: 'Sobre'},
    {link: '/', title: 'Reportar'}
  ]

  return (
    <html lang="ptBR">
      <body className={inter.className}>
        <ProviderAuth>
          <Menu.Root>
            {/* @ts-expect-error */}
            <SessionAccount/>
            <Menu.Links links={menuLinks}/>
            <Menu.Icon icon={backpackIcon} alt='Carrinho de compras' link='/carrinho'/>
          </Menu.Root>
          {children}
        </ProviderAuth>
      </body>
    </html>
  )
}
