import { Suspense } from 'react';
import type { Metadata } from 'next';
import CampusMap from '@/components/CampusMap';

export const metadata: Metadata = {
  title: 'Interactive Campus Map & Masterplan Atlas',
  description:
    'Explore the 13,000-acre masterplan of Obafemi Awolowo University (OAU), designed by Arieh Sharon. Verified GPS coordinates, satellite aerial views, and landmark directories.',
  alternates: {
    canonical: '/map',
  },
  openGraph: {
    title: 'Interactive Campus Map & Masterplan Atlas | OAUMods',
    description:
      'Explore the 13,000-acre masterplan of Obafemi Awolowo University (OAU), designed by Arieh Sharon. Verified GPS coordinates, satellite aerial views, and landmark directories.',
    url: '/map',
    siteName: 'OAUMods | Great Ife Freshman Companion',
    locale: 'en_NG',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OAUMods — Great Ife Freshman Companion',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interactive Campus Map & Masterplan Atlas | OAUMods',
    description:
      'Explore the 13,000-acre masterplan of Obafemi Awolowo University (OAU), designed by Arieh Sharon. Verified GPS coordinates, satellite aerial views, and landmark directories.',
    images: ['/og-image.png'],
  },
};

export default function PortalMapPage() {
  return (
    <div className="space-y-6">
      <Suspense
        fallback={
          <div className="w-full h-96 border border-slate-300 bg-white flex items-center justify-center text-slate-500 text-sm font-bold">
            Loading OAU Campus Map Navigator...
          </div>
        }
      >
        <CampusMap />
      </Suspense>
    </div>
  );
}

