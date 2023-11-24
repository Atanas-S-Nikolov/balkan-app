import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/nav/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Балкан АД - Разбивки',
  description: 'Приложение за разбивки на фирма Балкан АД',
}

export default function RootLayout({ children }) {
  return (
    <html lang="bg">
      <body className={inter.className}>
        <main>
          <Navbar/>
          {children}
        </main>
      </body>
    </html>
  )
}