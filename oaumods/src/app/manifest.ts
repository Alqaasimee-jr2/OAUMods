import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Great Ife Freshman Companion | OAUMods',
    short_name: 'OAUMods',
    description:
      'The authoritative, offline-first freshman orientation guide and academic companion for Obafemi Awolowo University.',
    start_url: '/app',
    display: 'standalone',
    background_color: '#FAFCFE',
    theme_color: '#12345B',
    icons: [
      {
        src: '/oau-logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/oau-logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
