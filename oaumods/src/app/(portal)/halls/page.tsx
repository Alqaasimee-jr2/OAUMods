import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldAlert, CheckCircle2, ArrowRight, MapPin } from 'lucide-react';
import { GeometricShape, WordAccent } from '@/components/GeometricShapes';

export const metadata: Metadata = {
  title: 'Halls of Residence & Student Housing Guide',
  description:
    'Complete guide to OAU student accommodation: Angola and Mozambique freshman halls, stalite hostels (Fajuyi, Awolowo, Moremi, ETF), rules, and balloting insights. Linked to campus map.',
  alternates: {
    canonical: '/halls',
  },
  openGraph: {
    title: 'Halls of Residence & Student Housing Guide | OAUMods',
    description:
      'Complete guide to OAU student accommodation: Angola and Mozambique freshman halls, stalite hostels (Fajuyi, Awolowo, Moremi, ETF), rules, and balloting insights. Linked to campus map.',
    url: '/halls',
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
    title: 'Halls of Residence & Student Housing Guide | OAUMods',
    description:
      'Complete guide to OAU student accommodation: Angola and Mozambique freshman halls, stalite hostels (Fajuyi, Awolowo, Moremi, ETF), rules, and balloting insights. Linked to campus map.',
    images: ['/og-image.png'],
  },
};

export default function HallsPage() {
  const freshmanHalls = [
    {
      name: 'Angola Hall',
      landmarkId: 'angola-hall',
      occupants: '100-Level Freshmen (Male)',
      location: 'Near Motion Ground & Fajuyi Hall',
      shape: 'square' as const,
      shapeColor: 'navy' as const,
      description:
        'Angola Hall is the dedicated residential hall for newly admitted male undergraduate students. It is built in a wide quadrangle design with blocks of rooms surrounding an open courtyard. It is famous for high energy and lively student interactions.',
      features: ['Central quadrangle courtyard', 'Hall buttery & snack stalls', 'Shared laundry washing area', 'Close to Motion Ground'],
    },
    {
      name: 'Mozambique Hall ("Moz")',
      landmarkId: 'mozambique-hall',
      occupants: '100-Level Freshmen (Female)',
      location: 'Adjacent to Angola Hall & Motion Ground',
      shape: 'hexagon' as const,
      shapeColor: 'emerald' as const,
      description:
        'Mozambique Hall is the dedicated residential hall for newly admitted female undergraduate students. It is situated right next to Angola Hall across the walking path. It has an active inner buttery market and 24-hour porter security at the main gate.',
      features: ['Dedicated inner market & salons', 'Strict security gate check', 'Private inner courtyard', 'Close to SUB bus stop'],
    },
  ];

  const returningHalls = [
    { name: 'Fajuyi Hall', landmarkId: 'fajuyi-hall', occupants: 'Returning Male Students (200L–500L)', shape: 'square' as const, shapeColor: 'blue' as const, note: 'Largest male hall on campus with blocks surrounding an inner sports court.' },
    { name: 'Awolowo Hall ("Awo")', landmarkId: 'awolowo-hall', occupants: 'Returning Male Students (200L–500L)', shape: 'triangle' as const, shapeColor: 'gold' as const, note: 'Historically known as the center of student union activism and vibrant hall culture.' },
    { name: 'Moremi Hall', landmarkId: 'moremi-hall', occupants: 'Returning Female Students (200L–500L)', shape: 'circle' as const, shapeColor: 'emerald' as const, note: 'Centrally located female hall near Hezekiah Library and Senate building.' },
    { name: 'Alumni Hall', landmarkId: 'moremi-hall', occupants: 'Returning Female Students & Finalists', shape: 'hexagon' as const, shapeColor: 'amber' as const, note: 'Quiet residential hall located along the campus perimeter.' },
    { name: 'ETF Hall', landmarkId: 'etf-hall', occupants: 'Returning Students (Male & Female Wings)', shape: 'square' as const, shapeColor: 'slate' as const, note: 'Modern hall built through the Education Trust Fund.' },
    { name: 'Postgraduate Hall', landmarkId: 'pg-hall', occupants: 'Masters & PhD Candidates', shape: 'triangle' as const, shapeColor: 'navy' as const, note: 'Quiet, self-contained accommodation for postgraduate scholars.' },
  ];

  return (
    <div className="space-y-8 text-left">
      {/* Page Header */}
      <div className="relative border border-slate-200 bg-white p-6 sm:p-8 space-y-3 overflow-hidden shadow-xs">
        <div className="absolute top-2 right-4 pointer-events-none opacity-20 hidden sm:block">
          <GeometricShape type="circle" color="gold" size="lg" variant="outline" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 border border-slate-300 text-xs font-bold text-slate-800">
          <GeometricShape type="square" color="navy" size="sm" />
          <span>STUDENT HOUSING &amp; HOSTEL LOCATIONS</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-oau-navy">
          <WordAccent shape="circle" color="gold">Halls of Residence</WordAccent> Guide (Campus Hostels)
        </h1>
        <p className="text-sm text-slate-700 leading-relaxed max-w-3xl">
          Obafemi Awolowo University operates 9 halls of residence on campus. First-year students
          who secure accommodation are primarily housed in Angola Hall (for males) and Mozambique Hall (for females).
          In cases where Angola or Mozambique are filled up, 100-level students also receive official allocations
          into other halls of residence.
        </p>

        <div className="pt-2 flex flex-wrap gap-2.5 text-xs font-bold">
          <Link
            href="/map"
            className="px-4 py-2 bg-oau-navy text-white hover:bg-slate-800 border border-oau-navy flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>View Hostels on Campus Map</span>
          </Link>
          <Link
            href="/app/guide"
            className="px-4 py-2 bg-white text-slate-800 hover:bg-slate-100 border border-slate-300 flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <span>Freshman Balloting Tips</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Anti-Scam Warning Notice */}
      <div className="border-2 border-red-500 bg-red-50/70 p-6 space-y-2 shadow-xs">
        <div className="flex items-center gap-2 text-red-700">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          <h2 className="text-base font-black uppercase tracking-wide">
            Anti-Scam Alert: Official Bed Space Policy
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
          <strong>Never pay money to anyone on WhatsApp, Telegram, or social media claiming to sell
          an official OAU hostel bed space.</strong> Bed spaces are allocated strictly through the
          official university ePortal via a balloting exercise. Anyone selling bed spaces privately
          is violating university rules and risking immediate disciplinary action.
        </p>
      </div>

      {/* Freshman Halls Section */}
      <div className="space-y-4">
        <div className="border-b border-slate-200 pb-2">
          <h2 className="text-base font-bold text-oau-navy uppercase tracking-wide">
            Freshman Halls (100-Level Only)
          </h2>
          <p className="text-xs text-slate-600">The two designated hostels for newly admitted first-year students.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {freshmanHalls.map((hall) => (
            <div key={hall.name} className="border border-slate-200 bg-white p-6 space-y-4 flex flex-col justify-between shadow-xs">
              <div className="space-y-3">
                <div className="border-b border-slate-200 pb-2 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <GeometricShape type={hall.shape} color={hall.shapeColor} size="sm" />
                      <span className="text-[11px] font-bold uppercase text-campus-blue">
                        {hall.occupants}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-oau-navy">{hall.name}</h3>
                    <p className="text-xs text-slate-600">{hall.location}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">{hall.description}</p>

                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-800 block">Hall Amenities:</span>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {hall.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Hostel GPS Node</span>
                <Link
                  href={`/map?landmark=${hall.landmarkId}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-oau-navy hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-xs"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>View on Map</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 100-Level Allocation in Other Hostels Notice */}
      <div className="border border-slate-200 bg-white p-5 space-y-2 shadow-xs">
        <div className="flex items-center gap-2 text-oau-navy">
          <GeometricShape type="triangle" color="gold" size="sm" />
          <h3 className="font-bold text-sm uppercase tracking-wide">
            100-Level Allocation in Other Hostels (Capacity &amp; Overflow)
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          While Angola and Mozambique are the dedicated primary hostels for freshers, in proven situations where
          they reach maximum capacity, 100-level students are allocated bed spaces in other campus halls. Male freshmen
          may be assigned to <strong>Fajuyi Hall</strong> or <strong>Awolowo Hall</strong>, and female freshmen to <strong>Moremi Hall</strong> or <strong>Alumni Hall</strong>.
          All allocations are officially generated on the university ePortal.
        </p>
      </div>

      {/* Returning Students Halls Section */}
      <div className="space-y-4">
        <div className="border-b border-slate-200 pb-2">
          <h2 className="text-base font-bold text-oau-navy uppercase tracking-wide">
            Returning Student Halls (200-Level to Final Year)
          </h2>
          <p className="text-xs text-slate-600">Where sophomores, penultimate, and final-year students reside.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {returningHalls.map((h, i) => (
            <div key={i} className="p-4 border border-slate-200 bg-white space-y-2 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-oau-navy">{h.name}</h4>
                  <GeometricShape type={h.shape} color={h.shapeColor} size="sm" />
                </div>
                <p className="text-xs font-semibold text-slate-700 mt-0.5">{h.occupants}</p>
                <p className="text-xs text-slate-600 pt-1 border-t border-slate-100 leading-relaxed mt-1">{h.note}</p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-end">
                <Link
                  href={`/map?landmark=${h.landmarkId}`}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-campus-blue hover:text-oau-navy hover:underline"
                >
                  <MapPin className="w-3 h-3 text-amber-500" />
                  <span>Locate on Map</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action for Freshers */}
      <div className="border border-amber-400 bg-amber-50 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div>
          <h3 className="font-bold text-sm text-oau-navy">Need Angola or Mozambique Balloting Advice?</h3>
          <p className="text-xs text-slate-700 mt-1">
            Open the Freshman Companion App to read our step-by-step balloting survival guide and room item checklist.
          </p>
        </div>
        <Link
          href="/app/guide"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-oau-navy font-bold text-xs border border-amber-500 shrink-0 transition-colors shadow-xs"
        >
          <span>Open Hostel Survival Guide</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
