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
  title: "Great Ife Freshman Companion | OAUMods",
  description: "The authoritative, offline-first freshman orientation guide and academic companion for Obafemi Awolowo University (OAU / Great Ife).",
  icons: {
    icon: "/oau-logo.png",
    apple: "/oau-logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#12345B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
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
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
