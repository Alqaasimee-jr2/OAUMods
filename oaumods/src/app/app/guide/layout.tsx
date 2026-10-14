
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hostel Rules, Transit & Survival Guide',
  description:
    'Crucial survival intelligence for Great Ife freshers: shuttle bus ticketing, appliance restrictions, 48-hour exam illness rule, and campus dining spots.',
  alternates: {
    canonical: '/app/guide',
  },
  openGraph: {
    title: 'Hostel Rules, Transit & Survival Guide | OAUMods',
    description:
      'Crucial survival intelligence for Great Ife freshers: shuttle bus ticketing, appliance restrictions, 48-hour exam illness rule, and campus dining spots.',
    url: '/app/guide',
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
    title: 'Hostel Rules, Transit & Survival Guide | OAUMods',
    description:
      'Crucial survival intelligence for Great Ife freshers: shuttle bus ticketing, appliance restrictions, 48-hour exam illness rule, and campus dining spots.',
    images: ['/og-image.png'],
  },
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
