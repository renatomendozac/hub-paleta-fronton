import { supabase } from '@/lib/supabase'
import { FilterBy } from '../utils/filter-by'

export const getListMatches = async ({ type, label }, columns = '*') => {
  let results = []

  switch (type) {
    case FilterBy.Tag: {
      if (label === 'TCN') {
        const { data } = await supabase
          .from('match')
          .select(`${columns}, competition!inner(is_tcn)`)
          .eq('competition.is_tcn', true)
          .order('date', { ascending: false })
          .order('created', { ascending: false })

        results = data
      } else {
        const { data } = await supabase
          .from('match')
          .select(columns)
          .contains('tags', [label])
          .order('date', { ascending: false })
          .order('created', { ascending: false })

        results = data
      }
      break
    }

    case FilterBy.Competition: {
      const { data: competition } = await supabase
        .from('competition')
        .select('id')
        .eq('name', label)
        .single()

      if (competition) {
        const { data } = await supabase
          .from('match')
          .select(columns)
          .eq('competition', competition.id)
          .order('date', { ascending: false })
          .order('created', { ascending: false })

        results = data
      }
      break
    }

    case FilterBy.Category: {
      const { data: category } = await supabase
        .from('category')
        .select('id')
        .eq('acronym', label)
        .single()

      if (category) {
        const { data } = await supabase
          .from('match')
          .select(columns)
          .eq('category', category.id)
          .order('date', { ascending: false })
          .order('created', { ascending: false })

        results = data
      }
      break
    }

    case FilterBy.Player: {
      const { data: player } = await supabase
        .from('player')
        .select('id')
        .eq('full_name', label)
        .single()

      if (player) {
        const { data } = await supabase
          .from('match')
          .select(columns)
          .contains('players', [player.id])
          .order('date', { ascending: false })
          .order('created', { ascending: false })

        results = data
      }
      break
    }

    case FilterBy.Visible: {
      const { data } = await supabase
        .from('match')
        .select(columns)
        .eq('is_visible', true)
        .order('date', { ascending: false })
        .order('created', { ascending: false })

      results = data
      break
    }

    case FilterBy.Hidden: {
      const { data } = await supabase
        .from('match')
        .select(columns)
        .eq('is_visible', false)
        .order('date')

      results = data
      break
    }
  }

  return results
}
