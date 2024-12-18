import { supabase } from '@/lib/supabase'

export const getListCompetitions = async (columns = '*') => {
  const { data } = await supabase.from('competition').select(columns)
  return data
}

export const getCompetitionByAcronym = async (acronym) => {
  const { data: competition } = await supabase.from('competition').select('*').eq('acronym', acronym).single()
  if (competition) {
    return competition.name
  }
}
