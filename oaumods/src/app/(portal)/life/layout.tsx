import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Campus Life, Faith, Sports & Societies',
  description:
    'Discover the vibrant student culture of Great Ife: Christian & Muslim fellowships, collegiate sports facilities, NUGA legacy, and student organizations.',
  alternates: {
    canonical: '/life',
  },
  openGraph: {
    title: 'Campus Life, Faith, Sports & Societies | OAUMods',
    description:
      'Discover the vibrant student culture of Great Ife: Christian & Muslim fellowships, collegiate sports facilities, NUGA legacy, and student organizations.',
    url: '/life',
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
    title: 'Campus Life, Faith, Sports & Societies | OAUMods',
    description:
      'Discover the vibrant student culture of Great Ife: Christian & Muslim fellowships, collegiate sports facilities, NUGA legacy, and student organizations.',
    images: ['/og-image.png'],
  },
};

export default function LifeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
