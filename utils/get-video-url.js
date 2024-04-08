export const getVideoUrl = (link, platform) => {
  if (platform === 'facebook') {
    return `https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/facebook/videos/${link}/`
  }

  return `https://www.youtube.com/embed/${link}`
}
