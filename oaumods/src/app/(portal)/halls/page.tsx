import React from 'react';
import { ShieldAlert, CheckCircle2, ExternalLink } from 'lucide-react';
import { GeometricShape, WordAccent } from '@/components/GeometricShapes';

export default function HallsPage() {
  const freshmanHalls = [
    {
      name: 'Angola Hall',
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
    { name: 'Fajuyi Hall', occupants: 'Returning Male Students (200L–500L)', shape: 'square' as const, shapeColor: 'blue' as const, note: 'Largest male hall on campus with blocks surrounding an inner sports court.' },
    { name: 'Awolowo Hall ("Awo")', occupants: 'Returning Male Students (200L–500L)', shape: 'triangle' as const, shapeColor: 'gold' as const, note: 'Historically known as the center of student union activism and vibrant hall culture.' },
    { name: 'Moremi Hall', occupants: 'Returning Female Students (200L–500L)', shape: 'circle' as const, shapeColor: 'emerald' as const, note: 'Centrally located female hall near Hezekiah Library and Senate building.' },
    { name: 'Alumni Hall', occupants: 'Returning Female Students & Finalists', shape: 'hexagon' as const, shapeColor: 'amber' as const, note: 'Quiet residential hall located along the campus perimeter.' },
    { name: 'ETF Hall', occupants: 'Returning Students (Male & Female Wings)', shape: 'square' as const, shapeColor: 'slate' as const, note: 'Modern hall built through the Education Trust Fund.' },
    { name: 'Postgraduate Hall', occupants: 'Masters & PhD Candidates', shape: 'triangle' as const, shapeColor: 'navy' as const, note: 'Quiet, self-contained accommodation for postgraduate scholars.' },
  ];

  return (
    <div className="space-y-8 text-left">
      {/* Page Header */}
      <div className="relative border border-slate-200 bg-white p-6 sm:p-8 space-y-3 overflow-hidden">
        <div className="absolute top-2 right-4 pointer-events-none opacity-20 hidden sm:block">
          <GeometricShape type="circle" color="gold" size="lg" variant="outline" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 border border-slate-300 text-xs font-bold text-slate-800">
          <GeometricShape type="square" color="navy" size="sm" />
          <span>STUDENT HOUSING</span>
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
      </div>

      {/* Anti-Scam Warning Notice */}
      <div className="border-2 border-red-500 bg-red-50/70 p-6 space-y-2">
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
            <div key={hall.name} className="border border-slate-200 bg-white p-6 space-y-4">
              <div className="border-b border-slate-200 pb-2">
                <div className="flex items-center gap-2 mb-1">
                  <GeometricShape type={hall.shape} color={hall.shapeColor} size="sm" />
                  <span className="text-[11px] font-bold uppercase text-campus-blue">
                    {hall.occupants}
                  </span>
                </div>
                <h3 className="text-xl font-black text-oau-navy">{hall.name}</h3>
                <p className="text-xs text-slate-600">{hall.location}</p>
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
          ))}
        </div>
      </div>

      {/* 100-Level Allocation in Other Hostels Notice */}
      <div className="border border-slate-200 bg-white p-5 space-y-2">
        <div className="flex items-center gap-2 text-oau-navy">
          <GeometricShape type="triangle" color="gold" size="sm" />
          <h3 className="font-bold text-sm uppercase tracking-wide">
            100-Level Allocation in Other Hostels (Capacity & Overflow)
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
      <div className="border border-slate-200 bg-white p-6 space-y-4">
        <div className="border-b border-slate-200 pb-2">
          <h2 className="text-base font-bold text-oau-navy uppercase tracking-wide">
            Returning Student Halls (200-Level to Final Year)
          </h2>
          <p className="text-xs text-slate-600">Where sophomores, penultimate, and final-year students reside.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {returningHalls.map((h, i) => (
            <div key={i} className="p-4 border border-slate-200 bg-slate-50 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-oau-navy">{h.name}</h4>
                <GeometricShape type={h.shape} color={h.shapeColor} size="sm" />
              </div>
              <p className="text-xs font-semibold text-slate-700">{h.occupants}</p>
              <p className="text-xs text-slate-600 pt-1 border-t border-slate-200 leading-relaxed">{h.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action for Freshers */}
      <div className="border border-amber-400 bg-amber-50 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-sm text-oau-navy">Need Angola or Mozambique Balloting Advice?</h3>
          <p className="text-xs text-slate-700">
            Open the Freshman Companion App to read our step-by-step balloting survival guide and room item checklist.
          </p>
        </div>
        <a
          href="/app/guide"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-400 text-oau-navy font-bold text-xs border border-amber-500 shrink-0"
        >
          <span>Open Hostel Survival Guide</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
