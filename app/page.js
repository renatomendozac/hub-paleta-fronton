import { supabase } from '@/lib/supabase'
import Image from 'next/image'

export default async function Home () {
  const { data: matches } = await supabase
    .from('match')
    .select('*')

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <h1 className='text-center'>Hub - Videos de paleta fronton</h1>

      <ul className='grid grid-cols-1 gap-4 box-border list-none my-8 sm:grid-cols-2 md:grid-cols-3 items-end'>
        {
          matches.map(({ title, link }) => (
            <li key={link}>
              <h1>{title}</h1>
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
