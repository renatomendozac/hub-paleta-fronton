import ListMatches, { matchFields } from '@/components/ListMatches'
import WithoutResults from '@/components/WithoutResults'
import { getListMatches } from '@/services/get-list-matches'

export const revalidate = 0

export default async function Home ({ params }) {
  const { type, label } = params
  const decodedLabel = decodeURIComponent(label)
  const getListMatchesArgs = [{ type, label: decodedLabel }, matchFields]
  const matches = await getListMatches(...getListMatchesArgs)

  const hasResults = matches && matches.length > 0
  if (!hasResults) {
    return <WithoutResults title="¡No hay resultados!" />
  }

  return (
    <>
      <h1 className='text-xl font-bold text-center mb-6'>{decodedLabel}</h1>
      <ListMatches matches={matches} />
    </>
  )
}
