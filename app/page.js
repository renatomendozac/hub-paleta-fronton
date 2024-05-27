import ListMatches, { matchFields } from '@/components/ListMatches'
import { supabase } from '@/lib/supabase'

export default async function Home () {
  const { data: matches } = await supabase
    .from('match')
    .select(matchFields)

  return <ListMatches matches={matches} />
}
