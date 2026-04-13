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

export async function getFeaturedMovie(locale: Locale) {
  try {
    const payload = await getPayloadClient()
    const now = new Date().toISOString()

    // Get the next upcoming screening with its movie
    const result = await payload.find({
      collection: 'screenings',
      where: {
        datetime: { greater_than: now },
        isCancelled: { equals: false },
      },
      sort: 'datetime',
      limit: 20,
      locale,
      depth: 2,
    })

    if (result.docs.length === 0) return null

    // Group screenings by movie, take the first movie
    const firstScreening = result.docs[0]
    const movie = typeof firstScreening.movie === 'object' ? firstScreening.movie : null
    if (!movie) return null

    // Collect all screenings for this movie
    const screenings = result.docs
      .filter((s: any) => {
        const m = typeof s.movie === 'object' ? s.movie : null
        return m && m.id === movie.id
      })
      .map((s: any) => {
        const dt = new Date(s.datetime)
        const place = typeof s.place === 'object' ? s.place : null
        return {
          date: `${dt.getDate().toString().padStart(2, '0')}.${(dt.getMonth() + 1).toString().padStart(2, '0')}`,
          time: `${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}`,
          city: place?.city || '',
        }
      })

    return { movie, screenings }
  } catch {
    return null
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

export async function getMoviesGroupedByScreeningStatus(locale: Locale) {
  try {
    const payload = await getPayloadClient()
    const now = new Date().toISOString()

    const [upcoming, past] = await Promise.all([
      payload.find({
        collection: 'screenings',
        where: { datetime: { greater_than: now }, isCancelled: { equals: false } },
        limit: 200,
        locale,
        depth: 2,
      }),
      payload.find({
        collection: 'screenings',
        where: { datetime: { less_than: now } },
        sort: '-datetime',
        limit: 200,
        locale,
        depth: 2,
      }),
    ])

    const upcomingMovieIds = new Set<number | string>()
    const nowShowing: any[] = []
    for (const s of upcoming.docs) {
      const movie = typeof s.movie === 'object' ? s.movie : null
      if (movie && !upcomingMovieIds.has(movie.id)) {
        upcomingMovieIds.add(movie.id)
        nowShowing.push(movie)
      }
    }

    const pastMovieIds = new Set<number | string>()
    const previouslyShown: any[] = []
    for (const s of past.docs) {
      const movie = typeof s.movie === 'object' ? s.movie : null
      if (movie && !pastMovieIds.has(movie.id) && !upcomingMovieIds.has(movie.id)) {
        pastMovieIds.add(movie.id)
        previouslyShown.push(movie)
      }
    }

    return { nowShowing, previouslyShown }
  } catch {
    return { nowShowing: [], previouslyShown: [] }
  }
}

export async function getCatalogMovies(locale: Locale) {
  try {
    const payload = await getPayloadClient()

    return await payload.find({
      collection: 'movies',
      where: { isCatalog: { equals: true } },
      sort: '-year',
      limit: 100,
      locale,
      depth: 1,
    })
  } catch {
    return { docs: [], totalDocs: 0, totalPages: 0, page: 1, limit: 100, hasPrevPage: false, hasNextPage: false, prevPage: null, nextPage: null, pagingCounter: 1 }
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
