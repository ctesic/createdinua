import type { CollectionConfig } from 'payload'

export const Movie: CollectionConfig = {
  slug: 'movies',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'year', 'director', 'isActive'],
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
    },
    {
      name: 'producer',
      type: 'text',
    },
    {
      name: 'executiveProducers',
      type: 'text',
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
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Drama', value: 'drama' },
        { label: 'Comedy', value: 'comedy' },
        { label: 'Documentary', value: 'documentary' },
        { label: 'Animation', value: 'animation' },
        { label: 'Thriller', value: 'thriller' },
        { label: 'Romance', value: 'romance' },
        { label: 'War', value: 'war' },
        { label: 'Historical', value: 'historical' },
        { label: 'Family', value: 'family' },
        { label: 'Short', value: 'short' },
        { label: 'Adventure', value: 'adventure' },
        { label: 'Sci-Fi', value: 'sci-fi' },
        { label: 'Fantasy', value: 'fantasy' },
        { label: 'Musical', value: 'musical' },
      ],
      admin: {
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
      admin: {
        description: 'e.g. "Українська"',
        position: 'sidebar',
      },
    },
    {
      name: 'subtitles',
      type: 'text',
      admin: {
        description: 'e.g. "англійські"',
        position: 'sidebar',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Whether this movie is currently featured on the site',
        position: 'sidebar',
      },
    },
  ],
}
