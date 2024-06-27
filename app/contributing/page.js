import { supabase } from '@/lib/supabase'
import Form from './form'

export const revalidate = 0

const Contributing = async () => {
  const { data: competitions } = await supabase
    .from('competition')
    .select('*')
    .order('start_date')
    .filter('start_date', 'lte', new Date().toISOString())

  const { data: categories } = await supabase
    .from('category')
    .select('*')

  const { data: players } = await supabase
    .from('player')
    .select('*')

  return (
    <Form
      competitions={competitions.sort((first, second) => new Date(second.end_date) - new Date(first.end_date))}
      categories={categories.sort((first, second) => first.order - second.order)}
      players={players}
    />
  )
}

export default Contributing
