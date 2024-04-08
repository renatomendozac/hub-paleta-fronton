import Image from 'next/image'
import Link from 'next/link'

const Header = () => (
  <header className='flex-col flex justify-between mb-8 gap-4 sm:items-center sm:flex-row'>
    <div className='flex items-center gap-4'>
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={64}
          height={64}
          priority
        />
      </Link>
      <h1 className='text-2xl'>Partidos de paleta frontón</h1>
    </div>
    <Link className='underline underline-offset-8 text-right' href="/contributing">Contribuir</Link>
  </header>
)

export default Header
