import Menu from '@/components/menu'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Rock 'N' Roll Store",
  description: "Loja de bandas de rock 'n' roll",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ptBR">
      <body className={inter.className}>
        <Menu/>
        {children}
      </body>
    </html>
  )
}
