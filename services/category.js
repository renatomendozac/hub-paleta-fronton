import { supabase } from '@/lib/supabase'

export const getListCategory = async (columns = '*') => {
  const { data } = await supabase.from('category').select(columns)
  return data
}
