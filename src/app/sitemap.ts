import type { MetadataRoute } from 'next'
import { locales } from '@/i18n/routing'
import { getPayloadClient } from '@/lib/payload'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://createdinua.org'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ['', '/schedule', '/movies', '/catalog', '/about']
  const entries: MetadataRoute.Sitemap = []

  // Static pages — one entry per route with hreflang alternates
  for (const route of staticRoutes) {
    const languages: Record<string, string> = {}
    for (const locale of locales) {
      languages[locale] = `${SITE_URL}/${locale}${route}`
    }

    entries.push({
      url: `${SITE_URL}/uk${route}`,
      lastModified: new Date(),
      alternates: { languages },
    })
  }

  // Dynamic movie pages from Payload DB
  try {
    const payload = await getPayloadClient()
    const movies = await payload.find({
      collection: 'movies',
      limit: 1000,
      depth: 0,
      select: { slug: true },
    })

    for (const movie of movies.docs) {
      const languages: Record<string, string> = {}
      for (const locale of locales) {
        languages[locale] = `${SITE_URL}/${locale}/movie/${movie.slug}`
      }

      entries.push({
        url: `${SITE_URL}/uk/movie/${movie.slug}`,
        lastModified: new Date(),
        alternates: { languages },
      })
    }
  } catch {
    // If DB is unavailable at build time, return static routes only
  }

  return entries
}
