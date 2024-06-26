import { supabase } from '@/lib/supabase'
import { getVideoUrl } from '@/utils/get-video-url'
import PageTags from './page-tags'
import WithoutResults from '@/components/WithoutResults'

const formatDate = new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium' }).format

export const revalidate = 0

const Match = async ({ params }) => {
  const decodedTitle = decodeURIComponent(params.title)
  const { data: matches } = await supabase
    .from('match')
    .select('title, date, link, tags, platform, players, category (acronym, is_single), competition (id, city, name, is_tcn, points, start_date, end_date)')
    .eq('title', decodedTitle)

  if (!(matches && matches.length)) {
    return <WithoutResults title="¡No se ha encontrado el partido!" />
  }

  const [{
    link,
    date,
    tags,
    platform,
    players: playersId,
    category: { acronym: categoryAcronym, is_single: isSingle },
    competition: { name: competitionName, is_tcn: isTcn }
  }] = matches

  const { data: players } = await supabase.from('player').select('id, full_name').in('id', playersId)
  const playersName = playersId.map((playerId) => players.find(({ id }) => id === playerId).full_name)
  const firstTeam = isSingle ? playersName.slice(0, 1) : playersName.slice(0, 2)
  const secondTeam = isSingle ? playersName.slice(1) : playersName.slice(2)
  const names = `${firstTeam.join(' & ')} vs ${secondTeam.join(' & ')}`

  return (
    <>
      <h1 className='text-xl font-bold text-center mb-6'>
        {names}<br />
        {competitionName}

        <span className='block font-normal mt-2 text-sm'>{formatDate(new Date(date))}</span>
      </h1>

      <div className='max-w-[768px] m-auto'>
        <div className='relative h-0 pb-[56.25%] overflow-hidden'>
          <iframe
            src={getVideoUrl(link, platform)}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className='absolute top-0 left-0 w-full h-full'
          />
        </div>
      </div>

      <PageTags
        categoryAcronym={categoryAcronym}
        competition={competitionName}
        isTcn={isTcn}
        players={players}
        tags={tags}
      />
    </>
  )
}

export default Match
