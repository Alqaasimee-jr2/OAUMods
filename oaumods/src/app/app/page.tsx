import React from 'react';
import type { Metadata } from 'next';
import FreshmanDashboardClient from './FreshmanDashboardClient';

export const metadata: Metadata = {
  title: 'Freshman Companion Dashboard',
  description:
    'Your personal digital launchpad for Great Ife orientation. Track clearance progress, navigate lecture rooms, inspect curricula, and calculate target GPAs.',
  alternates: {
    canonical: '/app',
  },
  openGraph: {
    title: 'Freshman Companion Dashboard | OAUMods',
    description:
      'Your personal digital launchpad for Great Ife orientation. Track clearance progress, navigate lecture rooms, inspect curricula, and calculate target GPAs.',
    url: '/app',
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
    title: 'Freshman Companion Dashboard | OAUMods',
    description:
      'Your personal digital launchpad for Great Ife orientation. Track clearance progress, navigate lecture rooms, inspect curricula, and calculate target GPAs.',
    images: ['/og-image.png'],
  },
};

export default function AppDashboardPage() {
  return <FreshmanDashboardClient />;
}
