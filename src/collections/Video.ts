import type { CollectionConfig } from 'payload'

export const Video: CollectionConfig = {
  slug: 'videos',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'filename',
    description: 'Silent background loops for the homepage hero. MP4 (H.264) or WebM.',
  },
  upload: {
    mimeTypes: ['video/mp4', 'video/webm'],
  },
  fields: [],
}
