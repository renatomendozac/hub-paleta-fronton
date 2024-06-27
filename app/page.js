import ListMatches, { matchFields } from '@/components/ListMatches'
import { FilterBy } from '@/utils/filter-by'
import { getListMatches } from '@/services/get-list-matches'

export default async function Home () {
  const matches = await getListMatches({ type: FilterBy.Visible }, matchFields)

  return <ListMatches matches={matches} />
}
