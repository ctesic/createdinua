import type { CollectionConfig } from 'payload'

export const Movie: CollectionConfig = {
  slug: 'movies',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'year', 'director'],
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
      name: 'poster',
      type: 'upload',
      relationTo: 'media',
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
      required: true,
      min: 1900,
      max: 2100,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'director',
      type: 'text',
      required: true,
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
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
