import { supabase } from '@/lib/supabase'

export const getCompetitionByAcronym = async (acronym) => {
  const { data: competition } = await supabase.from('competition').select('*').eq('acronym', acronym).single()
  if (competition) {
    return competition.name
  }
}
