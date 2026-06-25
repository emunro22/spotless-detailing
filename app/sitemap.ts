import type { MetadataRoute } from 'next';
import { BUSINESS } from '@/lib/constants';
import { getAllValetingSlugs, getAllCleaningSlugs } from '@/lib/seo-pages';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = BUSINESS.url;
  const lastModified = new Date();

  const staticRoutes = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/cleaning', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/booking', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/gallery', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },
  ];

  const valetingSlugs = getAllValetingSlugs();
  const cleaningSlugs = getAllCleaningSlugs();

  const valetingRoutes = valetingSlugs.map((slug) => ({
    path: `/valeting/${slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }));

  const cleaningRoutes = cleaningSlugs.map((slug) => ({
    path: `/cleaning/${slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }));

  const allRoutes = [...staticRoutes, ...valetingRoutes, ...cleaningRoutes];

  return allRoutes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
