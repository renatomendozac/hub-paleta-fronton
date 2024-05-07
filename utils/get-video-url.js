export const getVideoUrl = (videoId, platform) => {
  if (platform === 'facebook') {
    return `https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/facebook/videos/${videoId}/`
  }

  return `https://www.youtube.com/embed/${videoId}`
}
