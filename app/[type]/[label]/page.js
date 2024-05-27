import WithoutResults from '@/components/WithoutResults'
import { supabase } from '@/lib/supabase'
import { FilterBy } from '@/utils/filter-by'
import { getThumbnail } from '@/utils/get-thumbnail'
import Image from 'next/image'
import Link from 'next/link'

const getMatches = async (type, label) => {
  let results = []

  switch (type) {
    case FilterBy.Tag: {
      if (label === 'TCN') {
        const { data } = await supabase.from('match').select('*, competition!inner(is_tcn)').eq('competition.is_tcn', true)
        results = data
      } else {
        const { data } = await supabase.from('match').select('*').contains('tags', [label])
        results = data
      }
      break
    }

    case FilterBy.Competition: {
      const { data: competition } = await supabase.from('competition').select('id').eq('name', label).single()
      if (competition) {
        const { data } = await supabase.from('match').select('*').eq('competition', competition.id)
        results = data
      }
      break
    }

    case FilterBy.Category: {
      const { data: category } = await supabase.from('category').select('id').eq('acronym', label).single()
      if (category) {
        const { data } = await supabase.from('match').select('*').eq('category', category.id)
        results = data
      }
      break
    }

    case FilterBy.Player: {
      const { data: player } = await supabase.from('player').select('id').eq('full_name', label).single()
      if (player) {
        const { data } = await supabase.from('match').select('*').contains('players', [player.id])
        results = data
      }
      break
    }
  }

  return results
}

export default async function Home ({ params }) {
  const { type, label } = params
  const matches = await getMatches(type, decodeURIComponent(label))

  const hasResults = matches && matches.length > 0
  if (!hasResults) {
    return <WithoutResults title="¡No hay resultados!" />
  }

  return (
    <ul className='grid grid-cols-1 gap-6 list-none sm:grid-cols-2 md:grid-cols-3 items-end'>
      {
        matches.map(({ id, title, platform, link }) => (
          <li key={id}>
            <h1 className='mb-4'>{title}</h1>
            <Link href={`/match/${id}`}>
              <Image
                priority
                alt={title}
                src={getThumbnail(link, platform)}
                width={512}
                height={512}
              />
            </Link>
          </li>
        ))
      }
    </ul>
  )
}
