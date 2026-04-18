import type { CollectionConfig } from 'payload'

export const Place: CollectionConfig = {
  slug: 'places',
  admin: {
    useAsTitle: 'displayTitle',
    defaultColumns: ['name', 'city', 'cinemaChain'],
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data) {
          data.displayTitle = data.city ? `${data.name} — ${data.city}` : data.name
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'displayTitle',
      type: 'text',
      admin: { hidden: true },
      hooks: {
        beforeValidate: [
          ({ siblingData }) => {
            return siblingData?.city ? `${siblingData.name} — ${siblingData.city}` : siblingData?.name
          },
        ],
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'city',
      type: 'text',
      required: true,
    },
    {
      name: 'address',
      type: 'text',
    },
    {
      name: 'googleMapsUrl',
      type: 'text',
      admin: {
        description: 'Google Maps link',
      },
    },
    {
      name: 'cinemaChain',
      type: 'text',
      admin: {
        description: 'e.g. "Yes Planet", "Cinema City"',
        position: 'sidebar',
      },
    },
  ],
}
