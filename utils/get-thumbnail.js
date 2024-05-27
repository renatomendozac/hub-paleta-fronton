export const getThumbnail = (videoId, platform) => {
  if (platform === 'facebook') {
    const accessToken = process.env.FB_ACCESS_TOKEN
    return `https://graph.facebook.com/${videoId}/picture?access_token=${accessToken}`
  }

  if (platform === 'youtube') {
    return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
  }

  return '/image-not-available.png'
}
