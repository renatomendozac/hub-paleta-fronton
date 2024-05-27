import ListMatches, { matchFields } from '@/components/ListMatches'
import WithoutResults from '@/components/WithoutResults'
import { supabase } from '@/lib/supabase'
import { FilterBy } from '@/utils/filter-by'

const getMatches = async (type, label) => {
  let results = []

  switch (type) {
    case FilterBy.Tag: {
      if (label === 'TCN') {
        const { data } = await supabase.from('match').select(`${matchFields}, competition!inner(is_tcn)`).eq('competition.is_tcn', true)
        results = data
      } else {
        const { data } = await supabase.from('match').select(matchFields).contains('tags', [label])
        results = data
      }
      break
    }

    case FilterBy.Competition: {
      const { data: competition } = await supabase.from('competition').select('id').eq('name', label).single()
      if (competition) {
        const { data } = await supabase.from('match').select(matchFields).eq('competition', competition.id)
        results = data
      }
      break
    }

    case FilterBy.Category: {
      const { data: category } = await supabase.from('category').select('id').eq('acronym', label).single()
      if (category) {
        const { data } = await supabase.from('match').select(matchFields).eq('category', category.id)
        results = data
      }
      break
    }

    case FilterBy.Player: {
      const { data: player } = await supabase.from('player').select('id').eq('full_name', label).single()
      if (player) {
        const { data } = await supabase.from('match').select(matchFields).contains('players', [player.id])
        results = data
      }
      break
    }
  }

  return results
}

export default async function Home ({ params }) {
  const { type, label } = params
  const decodedLabel = decodeURIComponent(label)
  const matches = await getMatches(type, decodedLabel)

  const hasResults = matches && matches.length > 0
  if (!hasResults) {
    return <WithoutResults title="¡No hay resultados!" />
  }

  return (
    <>
      <h1 className='text-xl font-bold text-center mb-6'>{decodedLabel}</h1>
      <ListMatches matches={matches} />
    </>
  )
}
