import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lecture Theatres, Amphitheatres & Venues',
  description:
    'Locate every major OAU lecture theatre and hall: Oduduwa Hall, Afrika Amphitheatre, BOOC, AUD I & II, White House 01/02, ODLT, and Chemical Engineering LT.',
  alternates: {
    canonical: '/app/venues',
  },
  openGraph: {
    title: 'Lecture Theatres, Amphitheatres & Venues | OAUMods',
    description:
      'Locate every major OAU lecture theatre and hall: Oduduwa Hall, Afrika Amphitheatre, BOOC, AUD I & II, White House 01/02, ODLT, and Chemical Engineering LT.',
    url: '/app/venues',
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
    title: 'Lecture Theatres, Amphitheatres & Venues | OAUMods',
    description:
      'Locate every major OAU lecture theatre and hall: Oduduwa Hall, Afrika Amphitheatre, BOOC, AUD I & II, White House 01/02, ODLT, and Chemical Engineering LT.',
    images: ['/og-image.png'],
  },
};

export default function VenuesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
