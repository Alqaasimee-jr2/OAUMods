import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  CheckSquare,
  MapPin,
  GraduationCap,
  Building2,
  Building,
  PhoneCall,
  ArrowRight,
  Map as MapIcon,
  Sparkles,
} from 'lucide-react';
import { GeometricShape, WordAccent } from '@/components/GeometricShapes';

export const metadata: Metadata = {
  title: {
    absolute: 'OAUMods — Great Ife Freshman Companion & Campus Hub',
  },
  description:
    'The authoritative, offline-first digital compass for Obafemi Awolowo University (OAU). Explore 15 faculties, campus landmarks, clearance workflows, and student tools.',
  alternates: {
    canonical: 'https://oaumods.vercel.app/',
  },
  openGraph: {
    title: 'OAUMods — Great Ife Freshman Companion & Campus Hub',
    description:
      'The authoritative, offline-first digital compass for Obafemi Awolowo University (OAU). Explore 15 faculties, campus landmarks, clearance workflows, and student tools.',
    url: 'https://oaumods.vercel.app/',
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
    title: 'OAUMods — Great Ife Freshman Companion & Campus Hub',
    description:
      'The authoritative, offline-first digital compass for Obafemi Awolowo University (OAU). Explore 15 faculties, campus landmarks, clearance workflows, and student tools.',
    images: ['/og-image.png'],
  },
};

export default function PortalHomePage() {
  const quickActions = [
    {
      title: 'Clearance Steps',
      subtitle: '7-phase physical & online checklist',
      href: '/app/clearance',
      icon: CheckSquare,
      badge: 'Action Required',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      shape: 'square' as const,
      shapeColor: 'navy' as const,
    },
    {
      title: 'Campus GPS Map',
      subtitle: 'Geospatial trails & walking times',
      href: '/map',
      icon: MapIcon,
      badge: 'Interactive',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      shape: 'hexagon' as const,
      shapeColor: 'emerald' as const,
    },
    {
      title: 'Lecture Venues',
      subtitle: 'BOOC, White House, AUD, ODLT',
      href: '/app/venues',
      icon: MapPin,
      badge: 'Venues Directory',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
      shape: 'triangle' as const,
      shapeColor: 'blue' as const,
    },
    {
      title: 'Courses & 5.0 GPA',
      subtitle: '100L curricula & grade simulator',
      href: '/app/academics',
      icon: GraduationCap,
      badge: 'Academics',
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
      shape: 'square' as const,
      shapeColor: 'gold' as const,
    },
    {
      title: '15 Faculties Guide',
      subtitle: 'Departments, offices & locations',
      href: '/faculties',
      icon: Building2,
      badge: 'Directory',
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
      shape: 'hexagon' as const,
      shapeColor: 'blue' as const,
    },
    {
      title: 'Hostels & Housing',
      subtitle: 'Angola, Moz, porter clearance',
      href: '/halls',
      icon: Building,
      badge: 'Accommodation',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      shape: 'circle' as const,
      shapeColor: 'amber' as const,
    },
  ];

  const gatewayCards = [
    {
      title: 'Freshman Companion & Orientation Hub',
      category: '100-Level Roadmap',
      desc: 'Complete guide to Great Ife freshman survival: step-by-step physical clearance in pale yellow manila folders, health screening at JAC, bed space balloting, and freshman course credit units.',
      href: '/app',
      cta: 'Open Freshman Companion',
      shape: 'square' as const,
      shapeColor: 'navy' as const,
      tags: ['Clearance Checklist', 'Angola & Moz Rules', '5.0 GPA Calculator'],
    },
    {
      title: 'Spatial Campus Atlas & Sharon Masterplan',
      category: 'Geospatial Navigator',
      desc: 'Explore Arieh Sharon’s iconic brutalist and tropical modernist campus masterplan. Interactive OpenStreetMap tiles, verified GPS coordinates, walking times from student halls, and photo dossiers.',
      href: '/map',
      cta: 'Explore Campus Atlas',
      shape: 'hexagon' as const,
      shapeColor: 'emerald' as const,
      tags: ['30+ Landmark POIs', 'Walking Trails', 'Oduduwa Hall'],
    },
    {
      title: 'Directory of 15 Institutional Faculties',
      category: 'Academic Structure',
      desc: 'Comprehensive breakdown of all 15 university faculties and 90+ academic departments. Find exact locations for faculty officers, deans, departmental secretaries, and foundational requirements.',
      href: '/faculties',
      cta: 'View All 15 Faculties',
      shape: 'triangle' as const,
      shapeColor: 'blue' as const,
      tags: ['Administration', 'Science', 'Technology', 'Health Sciences'],
    },
    {
      title: 'Campus Transit, Facilities & Student Life',
      category: 'Daily Living',
      desc: 'Everything you need for daily life on campus: official paper ticket transit rules, shuttle bus and e-trike routes, Hezekiah Library borrower registration, JAC clinic protocols, faith communities, and sports.',
      href: '/facilities',
      cta: 'Browse Facilities & Transit',
      shape: 'circle' as const,
      shapeColor: 'gold' as const,
      tags: ['Shuttle Bus Fares', 'JAC Clinic Card', 'Faith & Sports'],
    },
  ];

  return (
    <div className="space-y-10 text-left">
      {/* ========================================================= */}
      {/* 1. HERO SECTION (Compact, Visual & Focused)              */}
      {/* ========================================================= */}
      <section className="relative rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 overflow-hidden shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
        <div className="absolute -top-6 -right-6 pointer-events-none opacity-20 hidden sm:block">
          <GeometricShape type="hexagon" color="gold" size="xl" variant="outline" />
        </div>
        <div className="absolute bottom-2 right-1/3 pointer-events-none opacity-15 hidden sm:block">
          <GeometricShape type="triangle" color="blue" size="lg" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-amber-100 text-oau-navy text-xs font-black uppercase tracking-wide border border-amber-300">
              <GeometricShape type="square" color="navy" size="sm" />
              <span>Great Ife Digital Compass</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-oau-navy leading-tight">
              <WordAccent shape="hexagon" color="gold">Obafemi Awolowo</WordAccent>{' '}
              University Campus Hub
            </h1>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-xl">
              The verified, offline-first companion for Great Ife students. Navigate clearance steps, calculate your 5.0 GPA, locate lecture theatres (BOOC, White House), and explore 15 academic faculties.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/app"
                className="oa-action inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-oau-navy font-black text-xs sm:text-sm border-2 border-oau-navy shadow-xs transition-colors"
              >
                <span>Launch Freshman Companion</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/map"
                className="oa-action inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-oau-navy hover:bg-slate-800 text-white font-bold text-xs sm:text-sm border border-oau-navy shadow-xs transition-colors"
              >
                <MapIcon className="w-4 h-4 text-amber-400" />
                <span>Campus GPS Map</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative border border-slate-200 bg-slate-50 p-2">
            <div className="absolute -top-3 -left-3 pointer-events-none opacity-30 z-20">
              <GeometricShape type="circle" color="gold" size="md" />
            </div>

            <Image
              src="/freshers.jpg"
              alt="Great Ife Campus View"
              width={540}
              height={320}
              className="w-full h-48 sm:h-56 object-cover"
              priority
            />
            <div className="p-2.5 bg-white border-t border-slate-200 text-xs text-slate-700 flex items-center justify-between">
              <p className="font-bold text-oau-navy flex items-center gap-1.5">
                <GeometricShape type="triangle" color="gold" size="sm" />
                <span>Obafemi Awolowo University</span>
              </p>
              <span className="text-[11px] text-slate-500 font-semibold">Est. 1961</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. ⚡ QUICK-ACTION LAUNCHPAD (Above the Fold Utility Grid) */}
      {/* ========================================================= */}
      <section className="space-y-3">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-black uppercase tracking-wider text-oau-navy">
              Quick-Action Launchpad
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">Instant student utilities</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                href={action.href}
                className="group relative bg-white border border-slate-200 hover:border-oau-navy p-3.5 sm:p-4 transition-all duration-200 hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-oau-navy group-hover:text-amber-400 text-oau-navy flex items-center justify-center transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <GeometricShape type={action.shape} color={action.shapeColor} size="sm" />
                  </div>
                  <h3 className="font-bold text-sm text-oau-navy group-hover:text-campus-blue transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    {action.subtitle}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500 group-hover:text-oau-navy">
                  <span>Open Tool</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. 🧭 4 HIGH-LEVEL PROGRESSIVE GATEWAYS                    */}
      {/* ========================================================= */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 pb-2">
          <h2 className="text-base font-black text-oau-navy uppercase tracking-wide">
            Explore Campus Knowledge Portals
          </h2>
          <p className="text-xs text-slate-600">
            Progressive guides covering the complete Great Ife student experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gatewayCards.map((gateway) => (
            <div
              key={gateway.title}
              className="bg-white border border-slate-200 p-5 flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors shadow-xs"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 border border-slate-200">
                    {gateway.category}
                  </span>
                  <GeometricShape type={gateway.shape} color={gateway.shapeColor} size="sm" />
                </div>
                <h3 className="font-bold text-base text-oau-navy">
                  {gateway.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {gateway.desc}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {gateway.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium px-2 py-0.5 bg-slate-50 text-slate-600 border border-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <Link
                  href={gateway.href}
                  className="w-full inline-flex items-center justify-between px-4 py-2.5 bg-slate-50 hover:bg-oau-navy hover:text-white border border-slate-300 hover:border-oau-navy text-xs font-bold text-oau-navy transition-colors rounded-sm"
                >
                  <span>{gateway.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. 🚨 EMERGENCY HELPLINES BAR (Clean 1-Tap Access)        */}
      {/* ========================================================= */}
      <section className="border border-slate-200 bg-white p-4 sm:p-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-red-600" />
            <h3 className="text-sm font-black text-oau-navy uppercase tracking-wide">
              Emergency &amp; Health Centre Helplines
            </h3>
          </div>
          <span className="text-xs text-slate-500">24/7 Mobile Medical Dispatch</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <a
            href="tel:08153750977"
            className="p-3 bg-red-50/60 hover:bg-red-50 border border-red-200 flex items-center justify-between group transition-colors"
          >
            <div>
              <p className="text-[10px] uppercase font-bold text-red-700">Ambulance Line 1</p>
              <p className="text-sm font-black text-oau-navy group-hover:text-red-700">0815 375 0977</p>
            </div>
            <PhoneCall className="w-4 h-4 text-red-600" />
          </a>

          <a
            href="tel:09035699725"
            className="p-3 bg-red-50/60 hover:bg-red-50 border border-red-200 flex items-center justify-between group transition-colors"
          >
            <div>
              <p className="text-[10px] uppercase font-bold text-red-700">Ambulance Line 2</p>
              <p className="text-sm font-black text-oau-navy group-hover:text-red-700">0903 569 9725</p>
            </div>
            <PhoneCall className="w-4 h-4 text-red-600" />
          </a>

          <a
            href="tel:08152092813"
            className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between group transition-colors"
          >
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-600">OAUTHC Hospital Emergency</p>
              <p className="text-sm font-black text-oau-navy">0815 209 2813</p>
            </div>
            <PhoneCall className="w-4 h-4 text-slate-600" />
          </a>
        </div>
      </section>
    </div>
  );
}
