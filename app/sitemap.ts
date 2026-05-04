import type { MetadataRoute } from 'next';
import { BUSINESS } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = BUSINESS.url;
  const lastModified = new Date();

  const routes = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/booking', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/gallery', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },
  ];

  return routes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
