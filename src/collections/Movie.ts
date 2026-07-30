import { revalidatePath } from 'next/cache'
import type { CollectionConfig } from 'payload'
import { locales } from '@/i18n/routing'

const revalidatePages = (slug?: string) => {
  try {
    for (const locale of locales) {
      revalidatePath(`/${locale}`)
      revalidatePath(`/${locale}/movies`)
      revalidatePath(`/${locale}/catalog`)
      if (slug) revalidatePath(`/${locale}/movie/${slug}`)
    }
  } catch {
    // may fail during build
  }
}

export const Movie: CollectionConfig = {
  slug: 'movies',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'year', 'director', 'isCatalog'],
  },
  hooks: {
    afterChange: [({ doc, previousDoc }) => {
      revalidatePages(doc?.slug)
      if (previousDoc?.slug && previousDoc.slug !== doc?.slug) revalidatePages(previousDoc.slug)
    }],
    afterDelete: [({ doc }) => revalidatePages(doc?.slug)],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
    },
    {
      name: 'temporaryDescription',
      type: 'richText',
      localized: true,
      admin: {
        description: 'Promotional or event-specific text',
      },
    },
    {
      name: 'posterVertical',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Vertical poster (2:3 aspect ratio)',
      },
    },
    {
      name: 'posterHorizontal',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Horizontal poster (16:9 aspect ratio)',
      },
    },
    {
      name: 'background',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Homepage hero image, desktop — used instead of the horizontal poster, on the homepage only. Recommended 3040×1040 (~2.9:1) WebP.',
      },
    },
    {
      name: 'backgroundMobile',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Homepage hero image, mobile (<768px) — used instead of the vertical poster, on the homepage only. Recommended 1200×1800 (2:3) WebP.',
      },
    },
    {
      name: 'backgroundVideo',
      type: 'upload',
      relationTo: 'videos',
      admin: {
        description:
          'Homepage hero loop — plays silently over the background image once it has fully downloaded. MP4 (H.264) 720p, no audio track, ≤5 MB. Keep the subject centred: on phones only the middle ~38% of the frame is visible.',
      },
    },
    {
      name: 'stills',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      admin: {
        description: 'Stills gallery shown on the movie page (opens in a lightbox)',
      },
    },
    {
      name: 'trailerUrl',
      type: 'text',
      admin: {
        description: 'YouTube or Vimeo URL',
      },
    },
    {
      name: 'year',
      type: 'number',
      min: 1900,
      max: 2100,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'country',
      type: 'text',
      localized: true,
      admin: {
        description: 'e.g. "Україна" or "Україна, Франція, Бельгія"',
        position: 'sidebar',
      },
    },
    {
      name: 'director',
      type: 'text',
      localized: true,
    },
    {
      name: 'screenwriter',
      type: 'text',
      localized: true,
    },
    {
      name: 'producer',
      type: 'text',
      localized: true,
    },
    {
      name: 'executiveProducers',
      type: 'text',
      localized: true,
    },
    {
      name: 'duration',
      type: 'number',
      admin: {
        description: 'Duration in minutes',
        position: 'sidebar',
      },
    },
    {
      name: 'genre',
      type: 'text',
      localized: true,
      admin: {
        description: 'e.g. "Drama, Comedy"',
        position: 'sidebar',
      },
    },
    {
      name: 'ageRestriction',
      type: 'text',
      admin: {
        description: 'e.g. "12+", "6+", "16+"',
        position: 'sidebar',
      },
    },
    {
      name: 'language',
      type: 'text',
      localized: true,
      admin: {
        description: 'e.g. "Українська"',
        position: 'sidebar',
      },
    },
    {
      name: 'subtitles',
      type: 'text',
      localized: true,
      admin: {
        description: 'e.g. "англійські"',
        position: 'sidebar',
      },
    },
    {
      name: 'isCatalog',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Movie we have distribution rights for (shown in Catalog)',
        position: 'sidebar',
      },
    },
  ],
}
