import './globals.css'
import { Inter, Rubik_Wet_Paint } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const rubik_Wet_Paint = Rubik_Wet_Paint({ subsets: ['latin'] , weight: '400'})

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
        <nav className={`${rubik_Wet_Paint.className} w-full py-2 px-5 absolute top-0 left-0 z-10 bg-Project-black text-Project-red-fist`}>
          <div className='container mx-auto flex justify-between items-center'>
            <div className='w-8 h-8 bg-Project-red-fist'/>
            <ul className='flex gap-5'>
              <li>Inicio</li>
              <li>Produtos</li>
              <li>Sobre</li>
              <li>Reportar</li>
            </ul>
            <div className='w-8 h-8 bg-Project-red-fist'/>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
