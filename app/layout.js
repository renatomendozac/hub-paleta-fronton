import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Partidos de paleta fronton',
  description: 'Partidos de paleta fronton peruano.'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='es'>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
