import ListMatches, { matchFields } from '@/components/ListMatches'
import { supabase } from '@/lib/supabase'

export default async function Home () {
  const { data: matches } = await supabase
    .from('match')
    .select(matchFields)
    .eq('is_visible', false)

  return (
    <>
      <h1 className='text-xl font-bold text-center mb-6'>
        Pronto seran revisados! ...
      </h1>

      {
        matches.length > 0
          ? <ListMatches matches={matches} />
          : <p>No hay nada pendiente por revisar.</p>
      }
    </>
  )
}
