import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https' as const, hostname: 'img.youtube.com' },
      { protocol: 'https' as const, hostname: 'i.ytimg.com' },
    ],
  },
}

export default withPayload(withNextIntl(nextConfig))
