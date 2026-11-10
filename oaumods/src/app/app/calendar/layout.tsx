import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Harmattan Academic Calendar 2026/2027 — OAUMods',
  description:
    'Official Obafemi Awolowo University (OAU) 2026/2027 Harmattan Semester academic calendar. Real-time countdowns for freshers resumption, online registration, matriculation, and examinations.',
  alternates: {
    canonical: 'https://oaumods.vercel.app/app/calendar',
  },
  openGraph: {
    title: 'Harmattan Academic Calendar 2026/2027 — OAUMods',
    description:
      'Official Obafemi Awolowo University (OAU) 2026/2027 Harmattan Semester academic calendar. Track resumption, orientation, matriculation, and exam dates.',
    url: 'https://oaumods.vercel.app/app/calendar',
    siteName: 'OAUMods | Great Ife Freshman Companion',
    locale: 'en_NG',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OAU 2026/2027 Harmattan Semester Calendar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harmattan Academic Calendar 2026/2027 — OAUMods',
    description:
      'Official Obafemi Awolowo University (OAU) 2026/2027 Harmattan Semester academic calendar with live milestone countdowns.',
    images: ['/og-image.png'],
  },
};

export default function AcademicCalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
