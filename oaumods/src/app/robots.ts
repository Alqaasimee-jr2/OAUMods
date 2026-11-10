import type { MetadataRoute } from 'next';

const BASE_URL = 'https://oaumods.vercel.app';

/**
 * Dynamic Robots Directive Generator for OAUMods.
 * Allows full crawling across all public search discovery routes
 * and points search engine crawlers to the canonical XML sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
