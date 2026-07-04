import { MetadataRoute } from 'next'
import { SITE_META } from '@/lib/constants'

// All static routes in the app
const routes = [
  '',           // homepage /
  '/about',
  '/skills',
  '/projects',
  '/education',
  '/certificates',
  '/learning',
  '/resume',
  '/contact',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_META.url

  const staticRoutes = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return staticRoutes
}
