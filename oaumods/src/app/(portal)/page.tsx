import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ExternalLink,
  Bus,
  PhoneCall,
  ArrowRight,
  Trophy,
  Map as MapIcon,
  Compass,
} from 'lucide-react';
import { GeometricShape, WordAccent, ShapeType, ShapeColor } from '@/components/GeometricShapes';

export default function PortalHomePage() {
  const faculties: Array<{
    name: string;
    code: string;
    location: string;
    shape: ShapeType;
    shapeColor: ShapeColor;
  }> = [
    { name: 'Faculty of Administration', code: 'ADMIN', location: 'Near Hezekiah Library & Pit Theatre', shape: 'square', shapeColor: 'navy' },
    { name: 'Faculty of Agriculture', code: 'AGRIC', location: 'Agric Complex & Teaching Farm', shape: 'hexagon', shapeColor: 'emerald' },
    { name: 'Faculty of Arts', code: 'ARTS', location: 'Humanities Blocks 1, 2 & 3', shape: 'circle', shapeColor: 'amber' },
    { name: 'Faculty of Basic Medical Sciences', code: 'BMS', location: 'Health Sciences corridor', shape: 'triangle', shapeColor: 'blue' },
    { name: 'Faculty of Clinical Sciences', code: 'CLIN', location: 'Teaching Hospital (OAUTHC) campus', shape: 'square', shapeColor: 'emerald' },
    { name: 'Faculty of Computing', code: 'COMP', location: 'Computing Complex & INTECU Axis', shape: 'hexagon', shapeColor: 'blue' },
    { name: 'Faculty of Dentistry', code: 'DENT', location: 'Dental Hospital Complex (Road 2 & OAUTHC)', shape: 'circle', shapeColor: 'gold' },
    { name: 'Faculty of Education', code: 'EDUC', location: 'Education Building near Social Sciences', shape: 'circle', shapeColor: 'gold' },
    { name: 'Faculty of Environmental Design & Mgt', code: 'EDM', location: 'Near Yellow House & Architecture Studio', shape: 'hexagon', shapeColor: 'amber' },
    { name: 'Faculty of Law', code: 'LAW', location: 'Law Complex near Central Administration', shape: 'square', shapeColor: 'navy' },
    { name: 'Faculty of Nursing Science', code: 'NURS', location: 'Health Sciences Complex & OAUTHC', shape: 'triangle', shapeColor: 'emerald' },
    { name: 'Faculty of Pharmacy', code: 'PHARM', location: 'Pharmacy Complex along Road 2', shape: 'circle', shapeColor: 'emerald' },
    { name: 'Faculty of Science', code: 'SCI', location: 'White House & Central Science Building', shape: 'triangle', shapeColor: 'blue' },
    { name: 'Faculty of Social Sciences', code: 'SOC SCI', location: 'Faculty Quadrangle & 1000-Seater', shape: 'square', shapeColor: 'blue' },
    { name: 'Faculty of Technology', code: 'TECH', location: 'Spider House & Tech Blocks', shape: 'hexagon', shapeColor: 'gold' },
  ];

  const transitOptions = [
    {
      type: 'Campus Shuttle Bus',
      paymentMethod: 'Official Paper Ticket',
      note: 'Paper tickets required before boarding; cash is not accepted directly on buses.',
      shape: 'square' as const,
      shapeColor: 'navy' as const,
    },
    {
      type: 'Town Campus Bus',
      paymentMethod: 'Cash to Conductor / Driver',
      note: 'Buses connecting Campus Gate park to Mayfair and town commercial stops.',
      shape: 'triangle' as const,
      shapeColor: 'gold' as const,
    },
    {
      type: 'Teaching Hospital Cab',
      paymentMethod: 'Direct Cash to Driver',
      note: 'Direct route between Main Campus Gate and OAUTHC Hospital complex.',
      shape: 'hexagon' as const,
      shapeColor: 'blue' as const,
    },
    {
      type: 'Electric Tricycle (E-Trike / Keke)',
      paymentMethod: 'Official Paper Ticket',
      note: 'Operates internal shuttle routes between Gate, SUB, and student halls.',
      shape: 'circle' as const,
      shapeColor: 'emerald' as const,
    },
  ];

  return (
    <div className="space-y-10 text-left">
      {/* Top Welcome Header with Bauhaus Geometric Accents */}
      <div className="relative border border-slate-200 bg-white p-6 sm:p-8 overflow-hidden">
        {/* Architectural Background Shapes (Subtle Contrast) */}
        <div className="absolute -top-6 -right-6 pointer-events-none opacity-20 hidden sm:block">
          <GeometricShape type="hexagon" color="gold" size="xl" variant="outline" />
        </div>
        <div className="absolute bottom-2 right-1/3 pointer-events-none opacity-15 hidden sm:block">
          <GeometricShape type="triangle" color="blue" size="lg" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">

            <h1 className="text-2xl sm:text-3xl font-black text-oau-navy leading-tight">
              <WordAccent shape="hexagon" color="gold">Obafemi Awolowo</WordAccent>{' '}
              University Campus Information Hub
            </h1>
            <p className="text-sm text-slate-700 leading-relaxed">
              Welcome to the general information guide for Obafemi Awolowo University (OAU),
              Ile-Ife. This portal is built for students, staff, and visitors to easily find
              faculties, campus services, transit routes, and emergency help.
            </p>

            <div className="pt-2 flex flex-wrap gap-2.5 text-xs font-bold">
              <Link
                href="/map"
                className="px-4 py-2 bg-oau-navy text-white hover:bg-slate-800 border border-oau-navy flex items-center gap-1.5 shadow-xs"
              >
                <MapIcon className="w-3.5 h-3.5 text-amber-400" />
                <span>Interactive Campus Map</span>
              </Link>
              <Link
                href="/faculties"
                className="px-4 py-2 bg-white text-slate-800 hover:bg-slate-100 border border-slate-300 flex items-center gap-1.5"
              >
                <span>15 Faculties</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/facilities"
                className="px-4 py-2 bg-white text-slate-800 hover:bg-slate-100 border border-slate-300 flex items-center gap-1.5"
              >
                <span>Facilities & Services</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative border border-slate-200 bg-slate-50 p-2">
            {/* Contrast Geometric Stamp behind photo corner */}
            <div className="absolute -top-3 -left-3 pointer-events-none opacity-30 z-20">
              <GeometricShape type="circle" color="gold" size="md" />
            </div>

            <Image
              src="/freshers.jpg"
              alt="Great Ife Campus View"
              width={540}
              height={320}
              className="w-full h-56 sm:h-64 object-cover"
              priority
            />
            <div className="p-3 bg-white border-t border-slate-200 text-xs text-slate-700">
              <p className="font-bold text-oau-navy flex items-center gap-1.5">
                <GeometricShape type="triangle" color="gold" size="sm" />
                <span>Obafemi Awolowo University, Ile-Ife</span>
              </p>
              <p className="text-[11px] text-slate-500">Established 1961 • Renowned for architecture and academic excellence</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dedicated Freshman Guide Callout Box with Geometric Contrast */}
      <div className="relative border-2 border-amber-500 bg-amber-50/70 p-6 sm:p-7 overflow-hidden">
        {/* Contrast Background Hexagon */}
        <div className="absolute -right-4 -bottom-4 pointer-events-none opacity-25">
          <GeometricShape type="hexagon" color="amber" size="xl" />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-amber-400 text-oau-navy text-[11px] font-black uppercase tracking-wide">
              <GeometricShape type="square" color="navy" size="sm" />
              <span>ATTENTION: 100-LEVEL FRESHMEN</span>
            </div>
            <h2 className="text-xl font-black text-oau-navy">
              Are You a Newly Admitted Student?
            </h2>
            <p className="text-xs sm:text-sm text-slate-800 max-w-2xl leading-relaxed">
              We built a dedicated, step-by-step companion web application called <strong>OAUMods</strong>.
              It guides you through your physical and online clearance steps, shows you where 100-level
              classes hold (like BOOC, White House, and AUD), helps you with Angola and Mozambique hostel
              rules, and includes a 5.0 CGPA calculator.
            </p>
          </div>

          <a
            href="/app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-oau-navy font-black text-sm border-2 border-oau-navy shrink-0 shadow-xs"
          >
            <span>Launch Freshman Guide (App)</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* University Key Facts */}
      <div className="border border-slate-200 bg-white p-6">
        <h3 className="text-base font-bold text-oau-navy uppercase tracking-wide border-b border-slate-200 pb-2 mb-4 flex items-center gap-2">
          <GeometricShape type="circle" color="navy" size="sm" />
          <span>University Quick Facts</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          <div className="relative p-3 bg-slate-50 border border-slate-200 overflow-hidden">
            <div className="absolute top-2 right-2 opacity-20">
              <GeometricShape type="circle" color="blue" size="md" />
            </div>
            <p className="text-xs text-slate-500 uppercase font-semibold">Founded</p>
            <p className="text-xl font-black text-oau-navy">1961</p>
            <p className="text-[11px] text-slate-600">Formerly University of Ife</p>
          </div>

          <div className="relative p-3 bg-slate-50 border border-slate-200 overflow-hidden">
            <div className="absolute top-2 right-2 opacity-20">
              <GeometricShape type="triangle" color="gold" size="md" />
            </div>
            <p className="text-xs text-slate-500 uppercase font-semibold">Faculties</p>
            <p className="text-xl font-black text-oau-navy">15 Faculties</p>
            <p className="text-[11px] text-slate-600">Over 90 academic depts</p>
          </div>

          <div className="relative p-3 bg-slate-50 border border-slate-200 overflow-hidden">
            <div className="absolute top-2 right-2 opacity-20">
              <GeometricShape type="square" color="navy" size="md" />
            </div>
            <p className="text-xs text-slate-500 uppercase font-semibold">Campus Land</p>
            <p className="text-xl font-black text-oau-navy">11,861 Ha</p>
            <p className="text-[11px] text-slate-600">One of Africa&apos;s largest</p>
          </div>

          <div className="relative p-3 bg-slate-50 border border-slate-200 overflow-hidden">
            <div className="absolute top-2 right-2 opacity-20">
              <GeometricShape type="hexagon" color="emerald" size="md" />
            </div>
            <p className="text-xs text-slate-500 uppercase font-semibold">Student Body</p>
            <p className="text-xl font-black text-oau-navy">35,000+</p>
            <p className="text-[11px] text-slate-600">Undergrad & Postgrad</p>
          </div>
        </div>
      </div>

      {/* Interactive Campus Map & Masterplan Showcase */}
      <div className="relative border border-slate-300 bg-white p-6 sm:p-7 overflow-hidden space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-blue-100 text-blue-900 border border-blue-300 text-[10px] font-bold uppercase tracking-wide mb-1">
              <Compass className="w-3 h-3 text-campus-blue" />
              <span>SPATIAL ORIENTATION &amp; MASTERPLAN</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-oau-navy">
              Interactive Campus <WordAccent shape="square" color="navy">Map &amp; Navigator</WordAccent>
            </h3>
            <p className="text-xs text-slate-600 max-w-xl">
              Navigate 30+ verified campus landmarks, lecture theatres (BOOC, White House, AUD), student hostels (Angola, Mozambique), and transit shuttle stops across Sharon&apos;s 11 functional zones.
            </p>
          </div>
          <Link
            href="/map"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-oau-navy hover:bg-slate-800 text-white font-bold text-xs shrink-0 transition-colors shadow-xs"
          >
            <MapIcon className="w-4 h-4 text-amber-400" />
            <span>Launch Interactive Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">🗺️ 100% Offline Vector</span>
            <p className="text-[11px] text-slate-600">Fast interactive masterplan schematic with zero data consumption.</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">🚶 Walking Trail Finder</span>
            <p className="text-[11px] text-slate-600">Walking times and step-by-step directions from Angola and Moz.</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">🏛️ 30+ Mapped POIs</span>
            <p className="text-[11px] text-slate-600">Amphitheatres, faculties, libraries, health clinics, and sports arena.</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">🌐 Live OpenStreetMap</span>
            <p className="text-[11px] text-slate-600">Real-time geospatial tiles and mobile GPS navigation links.</p>
          </div>
        </div>
      </div>

      {/* Directory of 15 Faculties with Geometric Badges */}
      <div className="border border-slate-200 bg-white p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-oau-navy uppercase tracking-wide">
              The <WordAccent shape="triangle" color="blue">15 Faculties</WordAccent> of Obafemi Awolowo University
            </h3>
            <p className="text-xs text-slate-600">
              Classes and departments are divided across these 15 academic faculties.
            </p>
          </div>
          <Link
            href="/faculties"
            className="text-xs font-bold text-campus-blue hover:underline flex items-center gap-1"
          >
            <span>Full Faculty Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {faculties.map((fac) => (
            <div key={fac.code} className="relative p-3.5 border border-slate-200 bg-slate-50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className="text-oau-navy flex items-center gap-1.5">
                    <GeometricShape type={fac.shape} color={fac.shapeColor} size="sm" />
                    <span>{fac.code}</span>
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-white border border-slate-300 text-slate-600">
                    OAU Faculty
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900">{fac.name}</h4>
              </div>
              <p className="text-xs text-slate-600 mt-2 pt-2 border-t border-slate-200">
                <span className="font-semibold text-slate-700">Location:</span> {fac.location}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Regulated Campus Transit & Mobility with Geometric Markers */}
      <div className="border border-slate-200 bg-white p-6">
        <div className="border-b border-slate-200 pb-2 mb-4">
          <div className="flex items-center gap-2 text-oau-navy">
            <Bus className="w-4 h-4 text-amber-500" />
            <h3 className="text-base font-bold uppercase tracking-wide">
              Official Campus Transit & Routes (<WordAccent shape="circle" color="amber">Regulated</WordAccent> Mobility)
            </h3>
          </div>
          <p className="text-xs text-slate-600">
            The transport currency within campus is official paper tickets. Specific fare costs from location to location are not known or fixed at the moment. Purchase paper tickets at designated ticketing booths (Campus Main Gate and SUB Car Park) before boarding.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {transitOptions.map((t, idx) => (
            <div key={idx} className="relative p-4 border border-slate-200 bg-slate-50 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Route Type</span>
                <GeometricShape type={t.shape} color={t.shapeColor} size="sm" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">{t.type}</h4>
              <div className="pt-1">
                <span className="inline-block px-2 py-0.5 bg-white border border-slate-300 text-xs font-bold text-oau-navy">
                  {t.paymentMethod}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-normal">{t.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Campus Faith Communities, Sports & Extracurricular Life */}
      <div className="border border-slate-200 bg-white p-6 space-y-4">
        <div className="border-b border-slate-200 pb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-oau-navy">
              <Trophy className="w-4 h-4 text-amber-500" />
              <h3 className="text-base font-bold uppercase tracking-wide">
                Faith Communities, <WordAccent shape="triangle" color="gold">Sports</WordAccent> & Student Societies
              </h3>
            </div>
            <p className="text-xs text-slate-600">
              Spiritual sanctuaries, collegiate athletic championships, independent campus journalism, and debating societies at Great Ife.
            </p>
          </div>
          <Link
            href="/life"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-oau-navy bg-slate-100 hover:bg-slate-200 border border-slate-300 self-start sm:self-auto shrink-0"
          >
            <span>Explore All Faith & Sports</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-slate-200 bg-slate-50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-1.5 py-0.5">Faith Ecosystem</span>
              <GeometricShape type="square" color="emerald" size="sm" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">Mosques, Chapels & Fellowships</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              OAU Central Mosque & hall mosques (MSSN), Catholic Chaplaincy OLPLC, All Souls’ Chapel, and UJCM fellowships (ECU, RCF, DLCF).
            </p>
          </div>

          <div className="p-4 border border-slate-200 bg-slate-50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-1.5 py-0.5">Collegiate Athletics</span>
              <GeometricShape type="hexagon" color="gold" size="sm" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">The OAU Giants & Sports Complex</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              IAAF-certified Main Bowl stadium, Olympic 50m competition pool, indoor gymnasium, tennis and basketball courts. Open Harmattan trials.
            </p>
          </div>

          <div className="p-4 border border-slate-200 bg-slate-50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 bg-blue-100 px-1.5 py-0.5">Societies & Traditions</span>
              <GeometricShape type="triangle" color="blue" size="sm" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">Journalism, Debates & Hall Weeks</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Association of Campus Journalists (ACJ OAU), legendary hall press boards, debating societies, and the famous Awo Aro Carnival.
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Assistance & Health Care */}
      <div className="border border-slate-200 bg-white p-6">
        <div className="border-b border-slate-200 pb-2 mb-4">
          <div className="flex items-center gap-2 text-oau-navy">
            <PhoneCall className="w-4 h-4 text-red-600" />
            <h3 className="text-base font-bold uppercase tracking-wide">
              <WordAccent shape="square" color="navy">Emergency</WordAccent> & Health Centre Helplines
            </h3>
          </div>
          <p className="text-xs text-slate-600">
            University Health Centre (&ldquo;JAC&rdquo;) provides round-the-clock primary medical care.
            For medical emergencies on campus, reach the mobile ambulance service immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 border border-slate-200 bg-slate-50 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase text-slate-500">Ambulance Line 1</p>
              <GeometricShape type="square" color="navy" size="sm" />
            </div>
            <p className="text-base font-black text-oau-navy">0815 375 0977</p>
            <p className="text-xs text-slate-600">Available 24/7 for students and staff on campus.</p>
          </div>

          <div className="p-4 border border-slate-200 bg-slate-50 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase text-slate-500">Ambulance Line 2</p>
              <GeometricShape type="triangle" color="gold" size="sm" />
            </div>
            <p className="text-base font-black text-oau-navy">0903 569 9725</p>
            <p className="text-xs text-slate-600">Direct mobile dispatch for student medical distress.</p>
          </div>

          <div className="p-4 border border-slate-200 bg-slate-50 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase text-slate-500">Hospital Emergency (OAUTHC)</p>
              <GeometricShape type="hexagon" color="blue" size="sm" />
            </div>
            <p className="text-base font-black text-oau-navy">0815 209 2813</p>
            <p className="text-xs text-slate-600">Teaching Hospital Emergency Department.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
