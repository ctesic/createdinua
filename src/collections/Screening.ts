import { revalidatePath } from 'next/cache'
import type { CollectionConfig } from 'payload'
import { locales } from '@/i18n/routing'

const revalidatePages = async (req: any, movieRef: number | string | { id: number | string } | null | undefined) => {
  try {
    for (const locale of locales) {
      revalidatePath(`/${locale}`)
      revalidatePath(`/${locale}/schedule`)
      revalidatePath(`/${locale}/movies`)
    }

    const movieId = typeof movieRef === 'object' && movieRef ? movieRef.id : movieRef
    if (movieId && req?.payload) {
      const movie = await req.payload.findByID({ collection: 'movies', id: movieId, depth: 0 })
      if (movie?.slug) {
        for (const locale of locales) revalidatePath(`/${locale}/movie/${movie.slug}`)
      }
    }
  } catch {
    // revalidatePath may fail during build or seed
  }
}

export const Screening: CollectionConfig = {
  slug: 'screenings',
  admin: {
    useAsTitle: 'datetime',
    defaultColumns: ['movie', 'place', 'datetime', 'isCancelled'],
  },
  hooks: {
    afterChange: [async ({ doc, previousDoc, req }) => {
      await revalidatePages(req, doc?.movie)
      if (previousDoc?.movie && previousDoc.movie !== doc?.movie) await revalidatePages(req, previousDoc.movie)
    }],
    afterDelete: [async ({ doc, req }) => revalidatePages(req, doc?.movie)],
  },
  fields: [
    {
      name: 'movie',
      type: 'relationship',
      relationTo: 'movies',
      required: true,
    },
    {
      name: 'place',
      type: 'relationship',
      relationTo: 'places',
      required: true,
    },
    {
      name: 'datetime',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'dd/MM/yyyy HH:mm',
        },
      },
    },
    {
      name: 'hall',
      type: 'text',
      admin: {
        description: 'Screen/hall number, e.g. "2" or "Hall 5"',
      },
    },
    {
      name: 'ticketUrl',
      type: 'text',
      admin: {
        description: 'Link to buy tickets',
      },
    },
    {
      name: 'price',
      type: 'text',
      admin: {
        description: 'e.g. "50 ₪" or "Free"',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Additional notes about this screening',
      },
    },
    {
      name: 'isCancelled',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
