import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home () {
  const { data: matches } = await supabase
    .from('match')
    .select('*')

  return (
    <main className="min-h-screen p-12">
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
        <Link className='text-right' href="/contributing">Contribuir</Link>
      </header>

      <ul className='grid grid-cols-1 gap-4 list-none sm:grid-cols-2 md:grid-cols-3 items-end'>
        {
          matches.map(({ title, link }) => (
            <li key={link}>
              <h1 className='mb-2'>{title}</h1>
              <Image
                priority
                alt={title}
                src={`https://img.youtube.com/vi/${link}/0.jpg`}
                width={500}
                height={500}
              />
            </li>
          ))
        }
      </ul>
    </main>
  )
}
