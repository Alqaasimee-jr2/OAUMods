import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://oaumods.vercel.app"),
  title: {
    default: "Great Ife Freshman Companion | OAUMods",
    template: "%s | OAUMods",
  },
  description:
    "The authoritative, offline-first freshman orientation guide and academic companion for Obafemi Awolowo University (OAU / Great Ife).",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "OAU",
    "Obafemi Awolowo University",
    "Great Ife",
    "OAU freshman guide",
    "OAU clearance pipeline",
    "OAU campus map",
    "Arieh Sharon architecture",
    "OAU 5.0 GPA calculator",
    "Angola Hall",
    "Mozambique Hall",
    "Oduduwa Hall",
    "Hezekiah Library",
    "JAC Health Centre",
    "OAU faculties",
    "Ile-Ife",
    "OAU student portal",
    "Great Ife companion",
  ],
  applicationName: "OAUMods",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "OAUMods",
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
  },
  icons: {
    icon: "/oau-logo.png",
    apple: "/oau-logo.png",
  },
  openGraph: {
    title: "OAUMods — Great Ife Freshman Companion & Campus Hub",
    description:
      "The authoritative, offline-first freshman orientation guide and academic companion for Obafemi Awolowo University (OAU / Great Ife).",
    url: "https://oaumods.vercel.app",
    siteName: "OAUMods | Great Ife Freshman Companion",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OAUMods — Great Ife Freshman Companion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OAUMods — Great Ife Freshman Companion & Campus Hub",
    description:
      "The authoritative, offline-first freshman orientation guide and academic companion for Obafemi Awolowo University (OAU / Great Ife).",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#12345B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": "https://oauife.edu.ng/#organization",
      name: "Obafemi Awolowo University",
      alternateName: "Great Ife",
      url: "https://oauife.edu.ng",
      sameAs: "https://en.wikipedia.org/wiki/Obafemi_Awolowo_University",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ile-Ife",
        addressRegion: "Osun State",
        addressCountry: "NG",
      },
    },
    {
      "@type": "WebApplication",
      "@id": "https://oaumods.vercel.app/#webapp",
      name: "OAUMods",
      alternateName: "Great Ife Freshman Companion",
      url: "https://oaumods.vercel.app",
      applicationCategory: "EducationalApplication",
      operatingSystem: "All",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "NGN",
        availability: "https://schema.org/InStock",
      },
      description:
        "The authoritative, offline-first freshman orientation guide and academic companion for Obafemi Awolowo University.",
      featureList: [
        "Interactive Campus Map & Arieh Sharon Masterplan Atlas",
        "Freshman Clearance & Document Verification Sequence",
        "Great Ife 5.0 GPA Calculator with Pre-Calibrated OAU Grading Scale",
        "Directory of 15 Institutional Faculties and 60+ Academic Departments",
        "Halls of Residence Guide (Angola, Mozambique, Fajuyi, Awolowo, Moremi, ETF)",
        "Lecture Theatres & Venues Directory (Oduduwa Hall, BOOC, AUD, ODLT, White House)",
        "Campus Transit Routes, Regulated Shuttle Fares & Ticketing Rules",
        "Offline Progressive Web App (PWA) Caching via Service Worker",
      ],
      provider: {
        "@type": "EducationalOrganization",
        "@id": "https://oauife.edu.ng/#organization",
        name: "Obafemi Awolowo University",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
