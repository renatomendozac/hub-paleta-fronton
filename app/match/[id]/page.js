import Tag from '@/components/Tag'
import { supabase } from '@/lib/supabase'
import { getVideoUrl } from '@/utils/get-video-url'

const Match = async ({ params }) => {
  const { data: matches } = await supabase
    .from('match')
    .select('*')
    .eq('id', params.id)

  if (!(matches && matches.length)) {
    return <main>No se ha encontrado el partido.</main>
  }

  const [{ title, link, tags, platform }] = matches

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

      <div className='mt-6'>
        {tags.map(label => <Tag key={label} label={label} />)}
      </div>
    </>
  )
}

export default Match
