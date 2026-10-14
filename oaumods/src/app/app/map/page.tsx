import { Suspense } from 'react';
import type { Metadata } from 'next';
import CampusMap from '@/components/CampusMap';

export const metadata: Metadata = {
  title: 'Freshman Campus Route Navigator',
  description:
    'Interactive walking trails connecting freshman halls (Angola & Mozambique) to BOOC, White House, Spider House, ODLT, and the Central Academic Core.',
  alternates: {
    canonical: '/app/map',
  },
  openGraph: {
    title: 'Freshman Campus Route Navigator | OAUMods',
    description:
      'Interactive walking trails connecting freshman halls (Angola & Mozambique) to BOOC, White House, Spider House, ODLT, and the Central Academic Core.',
    url: '/app/map',
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
    title: 'Freshman Campus Route Navigator | OAUMods',
    description:
      'Interactive walking trails connecting freshman halls (Angola & Mozambique) to BOOC, White House, Spider House, ODLT, and the Central Academic Core.',
    images: ['/og-image.png'],
  },
};

export default function AppMapPage() {
  return (
    <div className="space-y-6">
      <Suspense
        fallback={
          <div className="w-full h-96 border border-slate-300 bg-white flex items-center justify-center text-slate-500 text-sm font-bold">
            Loading Freshman Route Navigator...
          </div>
        }
      >
        <CampusMap isFreshmanContext={true} />
      </Suspense>
    </div>
  );
}

