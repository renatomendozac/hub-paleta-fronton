import { supabase } from '@/lib/supabase'
import { getVideoUrl } from '@/utils/get-video-url'
import PageTags from './page-tags'
import WithoutResults from '@/components/WithoutResults'

const Match = async ({ params }) => {
  const { data: matches } = await supabase
    .from('match')
    .select('title, link, tags, platform, players, category (acronym), competition (id, city, name, is_tcn, points, start_date, end_date)')
    .eq('id', params.id)

  if (!(matches && matches.length)) {
    return <WithoutResults title="¡No se ha encontrado el partido!" />
  }

  const [{
    title,
    link,
    tags,
    platform,
    players: playersId,
    category: { acronym: categoryAcronym },
    competition: { name: competitionName, is_tcn: isTcn }
  }] = matches

  const { data: players } = await supabase.from('player').select('id, full_name').in('id', playersId)

  return (
    <>
      <h1 className='mb-6'>{title}</h1>

      <div className='relative w-full pb-[56.25%] overflow-hidden'>
        <iframe
          src={getVideoUrl(link, platform)}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className='absolute top-0 left-0 w-full h-full'
        />
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
