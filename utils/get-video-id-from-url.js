import { ErrorMessages } from '@/app/contributing/constants'

export const getVideoIdFromUrl = (url) => {
  const data = { videoId: null, platform: null }

  if (!url) {
    return [data]
  }

  try {
    const videoURL = new URL(url)
    if (videoURL.host.includes('facebook') && videoURL.pathname.includes('/watch/live')) {
      data.videoId = videoURL.searchParams.get('v')
      data.platform = 'facebook'
    }

    if (videoURL.host.includes('facebook') && videoURL.pathname.includes('/videos/')) {
      const [, videoId] = videoURL.pathname.split('/videos/')
      data.videoId = videoId.split('/')[0]
      data.platform = 'facebook'
    }

    if (videoURL.host.includes('youtube') && videoURL.pathname.includes('/watch')) {
      data.videoId = videoURL.searchParams.get('v')
      data.platform = 'youtube'
    }
  } catch {
    return [data, ErrorMessages.InvalidURL]
  }

  const videoNotFound = !(data.videoId && data.platform)
  const errorMessage = videoNotFound ? ErrorMessages.NoVideo : null
  return [data, errorMessage]
}
