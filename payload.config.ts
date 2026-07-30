import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Movie } from '@/collections/Movie'
import { Screening } from '@/collections/Screening'
import { Place } from '@/collections/Place'
import { Media } from '@/collections/Media'
import { Video } from '@/collections/Video'
import { Users } from '@/collections/Users'
import { Announcement } from '@/globals/Announcement'
import { SiteSettings } from '@/globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  editor: lexicalEditor(),
  collections: [Users, Movie, Screening, Place, Media, Video],
  globals: [Announcement, SiteSettings],
  secret: process.env.PAYLOAD_SECRET || 'default-secret',
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./db/payload.db',
      authToken: process.env.DATABASE_AUTH_TOKEN,
    },
    push: true,
  }),
  sharp,
  localization: {
    locales: [
      { label: 'Українська', code: 'uk' },
      { label: 'English', code: 'en' },
      { label: 'עברית', code: 'he' },
    ],
    defaultLocale: 'uk',
    fallback: true,
  },
  plugins: [
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            collections: { media: true, videos: true },
            // Uploads go straight from the browser to Blob storage, so video
            // files aren't capped by Vercel's 4.5 MB serverless body limit.
            clientUploads: true,
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ]
      : []),
  ],
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
})
