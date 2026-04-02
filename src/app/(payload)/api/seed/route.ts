import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

// ─── CSV Parser (handles quoted fields with commas and newlines) ───

function parseCSV(content: string): Record<string, string>[] {
  const rows: string[][] = []
  let current: string[] = []
  let field = ''
  let inQuotes = false

  for (let i = 0; i < content.length; i++) {
    const ch = content[i]
    if (inQuotes) {
      if (ch === '"') {
        if (content[i + 1] === '"') {
          field += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        field += ch
      }
    } else {
      if (ch === '"') {
        inQuotes = true
      } else if (ch === ',') {
        current.push(field)
        field = ''
      } else if (ch === '\n') {
        current.push(field)
        field = ''
        if (current.length > 1) rows.push(current)
        current = []
      } else if (ch !== '\r') {
        field += ch
      }
    }
  }
  if (field || current.length) {
    current.push(field)
    if (current.length > 1) rows.push(current)
  }

  const headers = rows[0]
  return rows.slice(1).map((row) => {
    const obj: Record<string, string> = {}
    headers.forEach((h, i) => {
      obj[h.trim()] = (row[i] || '').trim()
    })
    return obj
  })
}

// ─── Genre mapping (Ukrainian → enum values) ───

const genreMap: Record<string, string> = {
  'комедія': 'comedy', 'комедіа': 'comedy',
  'драма': 'drama',
  'документальний': 'documentary',
  'анімація': 'animation',
  'сімейний': 'family',
  'пригоди': 'adventure',
  'фантастика': 'sci-fi',
  'трилер': 'thriller',
  'романтичний': 'romance', 'романтична комедія': 'romance',
  'воєнний': 'war',
  'історичний': 'historical',
  'мюзикл': 'musical', 'фільм-спектакль': 'musical',
  'короткометражний': 'short',
}

function parseGenres(raw: string): string[] {
  if (!raw) return []
  const genres: string[] = []
  const parts = raw.toLowerCase().split(/[,;/]/).map((s) => s.trim())
  for (const part of parts) {
    if (genreMap[part]) {
      genres.push(genreMap[part])
    } else {
      // Try partial match
      for (const [key, val] of Object.entries(genreMap)) {
        if (part.includes(key)) {
          if (!genres.includes(val)) genres.push(val)
        }
      }
    }
  }
  return [...new Set(genres)]
}

function extractYear(countryYear: string): number | undefined {
  const match = countryYear.match(/(\d{4})/)
  return match ? parseInt(match[1]) : undefined
}

function extractCountry(countryYear: string): string {
  return countryYear.replace(/[,\s]*\d{4}.*$/, '').trim()
}

// ─── HTML to Lexical richText ───

function htmlToLexical(html: string) {
  if (!html || html === '<p><br></p>' || html === '<p dir="auto"><br></p>') return undefined
  // Store as a simple paragraph node with raw text stripped of HTML
  const text = html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>\s*<p[^>]*>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .trim()
  if (!text) return undefined
  return {
    root: {
      type: 'root',
      children: text.split('\n\n').filter(Boolean).map((para) => ({
        type: 'paragraph',
        children: [{ type: 'text', text: para.replace(/\n/g, ' '), version: 1 }],
        version: 1,
      })),
      direction: null,
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

// ─── Combine date + time into ISO string ───

function combineDatetime(dateStr: string, timeStr: string): string | null {
  if (!dateStr) return null
  try {
    const d = new Date(dateStr)
    if (timeStr) {
      const [hours, minutes] = timeStr.split(':').map(Number)
      d.setUTCHours(hours || 0, minutes || 0, 0, 0)
    }
    return d.toISOString()
  } catch {
    return null
  }
}

// ─── Main seed logic ───

export async function POST(request: Request) {
  const payload = await getPayload({ config })

  // Parse optional query param to force reseed
  const url = new URL(request.url)
  const force = url.searchParams.get('force') === 'true'

  if (!force) {
    const existing = await payload.find({ collection: 'movies', limit: 1 })
    if (existing.docs.length > 0) {
      return NextResponse.json({ message: 'Already seeded. Use ?force=true to reseed.' })
    }
  }

  // If forcing, clear existing data
  if (force) {
    const screenings = await payload.find({ collection: 'screenings', limit: 1000 })
    for (const s of screenings.docs) {
      await payload.delete({ collection: 'screenings', id: s.id })
    }
    const movies = await payload.find({ collection: 'movies', limit: 1000 })
    for (const m of movies.docs) {
      await payload.delete({ collection: 'movies', id: m.id })
    }
    const places = await payload.find({ collection: 'places', limit: 1000 })
    for (const p of places.docs) {
      await payload.delete({ collection: 'places', id: p.id })
    }
  }

  // ─── Read CSV files ───
  // Try multiple paths for CSV files
  let movieCsvPath = ''
  let eventCsvPath = ''

  const basePaths = [
    join(process.cwd(), 'data'),
    '/Users/alexeykisets/Downloads/2026/03/31/export cua',
  ]

  for (const base of basePaths) {
    try {
      readFileSync(join(base, 'Movie.csv'), 'utf-8')
      movieCsvPath = join(base, 'Movie.csv')
      eventCsvPath = join(base, 'Event.csv')
      break
    } catch { /* try next */ }
  }

  if (!movieCsvPath) {
    return NextResponse.json(
      { error: 'CSV files not found. Place Movie.csv and Event.csv in project data/ directory.' },
      { status: 400 },
    )
  }

  const moviesCsv = parseCSV(readFileSync(movieCsvPath, 'utf-8'))
  const eventsCsv = parseCSV(readFileSync(eventCsvPath, 'utf-8'))

  // ─── 1. Import Movies ───
  const movieIdMap = new Map<string, string | number>() // slug → payload ID
  let moviesCreated = 0

  for (const row of moviesCsv) {
    const slug = row['Slug']
    const isDraft = row[':draft'] === 'true'
    const title = row['Title']
    if (!title) continue

    const countryYear = row['Country and year'] || ''
    const year = extractYear(countryYear)
    const country = extractCountry(countryYear)
    const genres = parseGenres(row['Genre'] || '')
    const description = htmlToLexical(row['Permanent description'] || '')
    const temporaryDescription = htmlToLexical(row['Temporary description'] || '')
    const isActive = row['Active'] === 'true'

    const movieData: Record<string, any> = {
      title,
      slug,
      isActive: !isDraft && isActive,
      posterVerticalUrl: row['Poster - vertical'] || undefined,
      posterHorizontalUrl: row['Poster - horizontal'] || undefined,
      trailerUrl: row['Trailer'] || undefined,
      director: row['Director'] || undefined,
      genre: genres.length ? genres : undefined,
      ageRestriction: row['Age restrictions'] || undefined,
      language: row['Language'] || undefined,
      subtitles: row['Subtitles'] || undefined,
      screenwriter: row['Сценарист'] || undefined,
      producer: row['Продюсер'] || undefined,
      executiveProducers: row['Виконавчі продюсери:'] || undefined,
      description,
      temporaryDescription,
    }

    if (year) movieData.year = year
    if (country) movieData.country = country

    // Remove undefined values
    for (const key of Object.keys(movieData)) {
      if (movieData[key] === undefined || movieData[key] === '') {
        delete movieData[key]
      }
    }

    try {
      const movie = await payload.create({
        collection: 'movies',
        locale: 'uk',
        data: movieData,
      })
      movieIdMap.set(slug, movie.id)
      moviesCreated++
    } catch (err: any) {
      console.error(`Failed to create movie "${title}":`, err.message)
    }
  }

  // ─── Build reverse map: event slug → movie ID (from Movie.csv "Screenings" column) ───
  const eventSlugToMovieId = new Map<string, string | number>()
  for (const row of moviesCsv) {
    const movieSlug = row['Slug']
    const movieId = movieIdMap.get(movieSlug)
    if (!movieId) continue
    const screeningSlugs = (row['Screenings'] || '').split(',').map((s: string) => s.trim()).filter(Boolean)
    for (const eventSlug of screeningSlugs) {
      eventSlugToMovieId.set(eventSlug, movieId)
    }
  }

  // ─── 2. Extract and create Places from Events ───
  const placeIdMap = new Map<string, string | number>() // dedup key → payload ID

  for (const row of eventsCsv) {
    const placeName = row['Place']
    const city = row['City1']
    if (!placeName || !city) continue

    // Deduplicate by Google Maps URL, or by name+city
    const mapsUrl = row['Address'] || ''
    const dedupKey = mapsUrl || `${placeName}|${city}`

    if (placeIdMap.has(dedupKey)) continue

    try {
      const place = await payload.create({
        collection: 'places',
        data: {
          name: placeName,
          city,
          address: row['Addres'] || undefined,
          googleMapsUrl: mapsUrl || undefined,
        },
      })
      placeIdMap.set(dedupKey, place.id)
    } catch (err: any) {
      console.error(`Failed to create place "${placeName}":`, err.message)
    }
  }

  // ─── 3. Create Screenings from Events ───
  let screeningsCreated = 0

  for (const row of eventsCsv) {
    const isDraft = row[':draft'] === 'true'
    if (isDraft) continue

    const placeName = row['Place']
    const city = row['City1']
    const dateStr = row['Date']
    if (!placeName || !city || !dateStr) continue

    // Find place
    const mapsUrl = row['Address'] || ''
    const dedupKey = mapsUrl || `${placeName}|${city}`
    const placeId = placeIdMap.get(dedupKey)
    if (!placeId) continue

    // Find movie: first try direct Movie column, then reverse map from event slug
    const movieSlug = row['Movie']
    const eventSlug = row['Slug']
    const movieId = (movieSlug ? movieIdMap.get(movieSlug) : undefined)
      || eventSlugToMovieId.get(eventSlug)

    // Combine date + time
    const datetime = combineDatetime(dateStr, row['Time'] || '')
    if (!datetime) continue

    const screeningData: Record<string, any> = {
      place: placeId,
      datetime,
      ticketUrl: row['Tickets'] || undefined,
      notes: row['Screening note'] || undefined,
    }

    // Only create screening if we have a movie reference
    if (movieId) {
      screeningData.movie = movieId
    } else {
      // Skip events without a linked movie
      continue
    }

    // Remove undefined
    for (const key of Object.keys(screeningData)) {
      if (screeningData[key] === undefined || screeningData[key] === '') {
        delete screeningData[key]
      }
    }

    try {
      await payload.create({
        collection: 'screenings',
        data: screeningData,
      })
      screeningsCreated++
    } catch (err: any) {
      console.error(`Failed to create screening:`, err.message)
    }
  }

  // ─── 4. Site Settings (keep existing or create defaults) ───
  const settings = await payload.findGlobal({ slug: 'site-settings' })
  if (!settings.heroTitle) {
    await payload.updateGlobal({
      slug: 'site-settings',
      locale: 'uk',
      data: {
        heroTitle: 'Знято в Україні',
        heroTagline: 'Українське кіно в Ізраїлі',
        socialLinks: {
          facebook: 'https://www.facebook.com/createdinua',
          telegram: 'https://t.me/createdinua',
          instagram: 'https://www.instagram.com/createdinua',
        },
        stats: [
          { value: '50+', label: 'сучасних українських фільмів' },
          { value: '14', label: 'міст Ізраїлю' },
          { value: '3', label: 'мережі кінотеатрів' },
          { value: '1+2', label: 'кінофестиваль + Українавів' },
        ],
      },
    })
    await payload.updateGlobal({
      slug: 'site-settings',
      locale: 'en',
      data: {
        heroTitle: 'Created in Ukraine',
        heroTagline: 'Ukrainian cinema in Israel',
        stats: [
          { value: '50+', label: 'contemporary Ukrainian films' },
          { value: '14', label: 'Israeli cities' },
          { value: '3', label: 'cinema chains' },
          { value: '1+2', label: 'film festival + Ukraineaviv' },
        ],
      },
    })
    await payload.updateGlobal({
      slug: 'site-settings',
      locale: 'he',
      data: {
        heroTitle: 'נוצר באוקראינה',
        heroTagline: 'קולנוע אוקראיני בישראל',
        stats: [
          { value: '50+', label: 'סרטים אוקראיניים עכשוויים' },
          { value: '14', label: 'ערים בישראל' },
          { value: '3', label: 'רשתות קולנוע' },
          { value: '1+2', label: 'פסטיבל קולנוע + אוקראינאביב' },
        ],
      },
    })
  }

  return NextResponse.json({
    message: 'Seeded successfully from CSV',
    data: {
      movies: moviesCreated,
      places: placeIdMap.size,
      screenings: screeningsCreated,
    },
  })
}
