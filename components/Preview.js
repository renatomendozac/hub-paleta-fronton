import { getVideoUrl } from '@/utils/get-video-url'

const Preview = ({ videoId, platform }) => {
  return (
    <div className="md:flex md:items-center mb-4">
      <div className="md:w-1/3" />
      <div className="md:w-2/3">
        <div className='relative w-full pb-[56.25%] overflow-hidden'>
          <iframe
            src={getVideoUrl(videoId, platform)}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className='absolute top-0 left-0 w-full h-full'
          />
        </div>
      </div>
    </div>
  )
}

export default Preview
