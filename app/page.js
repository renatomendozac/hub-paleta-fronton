import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home () {
  const { data: matches } = await supabase
    .from('match')
    .select('*')

  return (
    <ul className='grid grid-cols-1 gap-5 list-none sm:grid-cols-2 md:grid-cols-3 items-end'>
      {
        matches.map(({ id, title, link }) => (
          <li key={id}>
            <h1 className='mb-2'>{title}</h1>
            <Link href={`/match/${id}`}>
              <Image
                priority
                alt={title}
                src={`https://img.youtube.com/vi/${link}/0.jpg`}
                width={500}
                height={500}
              />
            </Link>
          </li>
        ))
      }
    </ul>
  )
}
