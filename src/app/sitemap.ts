import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://villebiz.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    //   images: ['https://example.com/image.jpg'],
    },
    {
      url: 'https://villebiz.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://villebiz.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]
}