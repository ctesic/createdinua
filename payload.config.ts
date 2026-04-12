import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Movie } from '@/collections/Movie'
import { Screening } from '@/collections/Screening'
import { Place } from '@/collections/Place'
import { Media } from '@/collections/Media'
import { Users } from '@/collections/Users'
import { Announcement } from '@/globals/Announcement'
import { SiteSettings } from '@/globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  editor: lexicalEditor(),
  collections: [Users, Movie, Screening, Place, Media],
  globals: [Announcement, SiteSettings],
  secret: process.env.PAYLOAD_SECRET || 'default-secret',
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./db/payload.db',
    },
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
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
})
