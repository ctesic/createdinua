import { getPayload } from 'payload'
import config from '@payload-config'
import type { Locale } from '@/i18n/routing'

export const getPayloadClient = () => getPayload({ config })

export async function getUpcomingScreenings(locale: Locale, limit = 10) {
  try {
    const payload = await getPayloadClient()
    const now = new Date().toISOString()

    return await payload.find({
      collection: 'screenings',
      where: {
        datetime: { greater_than: now },
        isCancelled: { equals: false },
      },
      sort: 'datetime',
      limit,
      locale,
      depth: 2,
    })
  } catch {
    return { docs: [], totalDocs: 0, totalPages: 0, page: 1, limit, hasPrevPage: false, hasNextPage: false, prevPage: null, nextPage: null, pagingCounter: 1 }
  }
}

export async function getAllMovies(locale: Locale) {
  try {
    const payload = await getPayloadClient()

    return await payload.find({
      collection: 'movies',
      sort: '-year',
      limit: 100,
      locale,
      depth: 1,
    })
  } catch {
    return { docs: [], totalDocs: 0, totalPages: 0, page: 1, limit: 100, hasPrevPage: false, hasNextPage: false, prevPage: null, nextPage: null, pagingCounter: 1 }
  }
}

export async function getMovieBySlug(slug: string, locale: Locale) {
  try {
    const payload = await getPayloadClient()

    const result = await payload.find({
      collection: 'movies',
      where: {
        slug: { equals: slug },
      },
      locale,
      depth: 1,
      limit: 1,
    })

    return result.docs[0] || null
  } catch {
    return null
  }
}

export async function getScreeningsForMovie(movieId: number | string, locale: Locale) {
  try {
    const payload = await getPayloadClient()

    return await payload.find({
      collection: 'screenings',
      where: {
        movie: { equals: movieId },
      },
      sort: 'datetime',
      locale,
      depth: 2,
    })
  } catch {
    return { docs: [], totalDocs: 0, totalPages: 0, page: 1, limit: 10, hasPrevPage: false, hasNextPage: false, prevPage: null, nextPage: null, pagingCounter: 1 }
  }
}

export async function getRecentlyScreenedMovies(locale: Locale, limit = 4) {
  try {
    const payload = await getPayloadClient()
    const now = new Date().toISOString()

    // Get recent past screenings, sorted by most recent first
    const screenings = await payload.find({
      collection: 'screenings',
      where: {
        datetime: { less_than: now },
        isCancelled: { equals: false },
      },
      sort: '-datetime',
      limit: 50,
      locale,
      depth: 2,
    })

    // Deduplicate by movie, keeping only the first (most recent) screening per movie
    const seen = new Set<number | string>()
    const movies: any[] = []
    for (const screening of screenings.docs) {
      const movie = typeof screening.movie === 'object' ? screening.movie : null
      if (movie && !seen.has(movie.id)) {
        seen.add(movie.id)
        movies.push(movie)
        if (movies.length >= limit) break
      }
    }

    return movies
  } catch {
    return []
  }
}

export async function getAnnouncement(locale: Locale) {
  try {
    const payload = await getPayloadClient()

    return await payload.findGlobal({
      slug: 'announcement',
      locale,
    })
  } catch {
    return null
  }
}

export async function getSiteSettings(locale: Locale) {
  try {
    const payload = await getPayloadClient()

    return await payload.findGlobal({
      slug: 'site-settings',
      locale,
    })
  } catch {
    return null
  }
}
