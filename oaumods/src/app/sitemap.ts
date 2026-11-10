import type { MetadataRoute } from 'next';

const BASE_URL = 'https://oaumods.vercel.app';

/**
 * Dynamic Sitemap Generator for OAUMods (Great Ife Freshman Companion).
 * Indexes all 13 canonical public routes across the Institutional Portal
 * and Freshman Companion Application, excluding redirect routes (/app/gpa).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  return [
    // Primary Entrypoint (Institutional Portal)
    {
      url: `${BASE_URL}/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    // Freshman Companion App Core Dashboard
    {
      url: `${BASE_URL}/app`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    // High-Traffic Spatial & Orientation Tools
    {
      url: `${BASE_URL}/app/clearance`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/app/map`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/map`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Freshman Core Academic & Venue Tools
    {
      url: `${BASE_URL}/app/venues`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/app/academics`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/app/guide`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    // Institutional Portal Guides & Directories
    {
      url: `${BASE_URL}/faculties`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/facilities`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/halls`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/heritage`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/life`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
