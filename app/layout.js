import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Partidos de paleta fronton',
  description: 'Partidos de paleta fronton peruano.'
}

export const revalidate = 0

export default function RootLayout ({ children }) {
  return (
    <html lang='es'>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
