import ListMatches, { matchFields } from '@/components/ListMatches'
import { FilterBy } from '@/utils/filter-by'
import { getListMatches } from '@/services/get-list-matches'

export const revalidate = 0

export default async function Home () {
  const matches = await getListMatches({ type: FilterBy.Hidden }, matchFields)

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
