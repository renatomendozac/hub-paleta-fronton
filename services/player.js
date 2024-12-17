import { supabase } from '@/lib/supabase'

export const getListPlayers = async (columns = '*') => {
  const { data } = await supabase.from('player').select(columns)
  return data
}
