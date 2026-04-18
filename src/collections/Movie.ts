import type { CollectionConfig } from 'payload'

export const Movie: CollectionConfig = {
  slug: 'movies',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'year', 'director', 'isCatalog'],
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
