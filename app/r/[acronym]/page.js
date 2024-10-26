import { getCompetitionByAcronym } from '@/services/get-competition-by-acronym'
import { redirect } from 'next/navigation'

export const revalidate = 0

export default async function ShortLinkRedirect ({ params }) {
  const { acronym } = params
  const competitionName = await getCompetitionByAcronym(acronym)
  encodeURIComponent(competitionName)
  redirect(`/competition/${competitionName}`)
}
