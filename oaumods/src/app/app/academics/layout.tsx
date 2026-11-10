
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Curricula Directory & 5.0 GPA Calculator',
  description:
    'Calculate semester and cumulative grade point averages calibrated to OAU 5.0 grading scale (A=5 to F=0). Includes 100-level core course templates for all 15 faculties.',
  alternates: {
    canonical: '/app/academics',
  },
  openGraph: {
    title: 'Curricula Directory & 5.0 GPA Calculator | OAUMods',
    description:
      'Calculate semester and cumulative grade point averages calibrated to OAU 5.0 grading scale (A=5 to F=0). Includes 100-level core course templates for all 15 faculties.',
    url: '/app/academics',
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
    title: 'Curricula Directory & 5.0 GPA Calculator | OAUMods',
    description:
      'Calculate semester and cumulative grade point averages calibrated to OAU 5.0 grading scale (A=5 to F=0). Includes 100-level core course templates for all 15 faculties.',
    images: ['/og-image.png'],
  },
};

export default function AcademicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
