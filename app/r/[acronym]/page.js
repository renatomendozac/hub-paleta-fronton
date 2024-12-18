import { getCompetitionByAcronym } from '@/services/competition'
import { redirect } from 'next/navigation'

export const revalidate = 0

export default async function ShortLinkRedirect ({ params }) {
  const { acronym } = params
  const competitionName = await getCompetitionByAcronym(acronym)
  redirect(`/competition/${encodeURIComponent(competitionName)}`)
}
