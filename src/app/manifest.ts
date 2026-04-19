import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Created in Ukraine — Ukrainian Cinema in Israel',
    short_name: 'Created in Ukraine',
    description: 'A cultural initiative promoting Ukrainian cinema in Israel',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#33b5ff',
    icons: [
      { src: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
      { src: '/apple-icon', type: 'image/png', sizes: '180x180' },
    ],
  }
}
