'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CheckSquare,
  MapPin,
  GraduationCap,
  Compass,
  ArrowRight,
  Map as MapIcon,
  Calendar as CalendarIcon,
} from 'lucide-react';
import { GeometricShape } from '@/components/GeometricShapes';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isOnline, setIsOnline] = useState(() =>
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const navItems = [
    {
      href: '/app',
      label: 'Dashboard',
      mobileLabel: 'Home',
      icon: LayoutDashboard,
      exact: true,
    },
    {
      href: '/app/clearance',
      label: 'Clearance Steps',
      mobileLabel: 'Clearance',
      icon: CheckSquare,
      exact: false,
    },
    {
      href: '/app/map',
      label: 'Campus Map',
      mobileLabel: 'Map',
      icon: MapIcon,
      exact: false,
    },
    {
      href: '/app/venues',
      label: 'Campus Venues',
      mobileLabel: 'Venues',
      icon: MapPin,
      exact: false,
    },
    {
      href: '/app/academics',
      label: 'Courses & GPA',
      mobileLabel: 'Courses',
      icon: GraduationCap,
      exact: false,
    },
    {
      href: '/app/guide',
      label: 'Hostels & Survival',
      mobileLabel: 'Survival',
      icon: Compass,
      exact: false,
    },
  ];

  const desktopSidebarItems = [
    ...navItems,
    {
      href: '/app/calendar',
      label: 'Harmattan Calendar',
      mobileLabel: 'Calendar',
      icon: CalendarIcon,
      exact: false,
    },
  ];

  const isCurrentActive = (itemHref: string, exact: boolean) => {
    if (exact) {
      return pathname === itemHref;
    }
    return pathname.startsWith(itemHref);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row font-sans text-left">
      {/* ========================================================= */}
      {/* DESKTOP LEFT SIDEBAR (>= 768px)                          */}
      {/* ========================================================= */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 border-r border-slate-200 bg-white sticky top-0 h-screen shrink-0 z-40 text-left">
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-200">
          <Link href="/app" className="flex items-center gap-3">
            <div className="w-10 h-10 border border-slate-200 bg-white p-1 flex items-center justify-center shrink-0">
              <Image
                src="/oau-logo.png"
                alt="OAU Crest"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-base text-oau-navy">
                  OAUMods
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 bg-amber-100 text-amber-900 border border-amber-300">
                  100L GUIDE
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                Freshman Companion App
              </p>
            </div>
          </Link>
        </div>

        {/* Network Status Strip */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 text-xs flex items-center justify-between text-slate-600">
          <span className="font-semibold text-slate-500">Mode:</span>
          <span className="flex items-center gap-1.5 font-bold">
            {isOnline ? (
              <>
                <GeometricShape type="square" color="emerald" size="sm" />
                <span className="text-emerald-700">Online</span>
              </>
            ) : (
              <>
                <GeometricShape type="triangle" color="gold" size="sm" />
                <span className="text-amber-700">Offline Ready</span>
              </>
            )}
          </span>
        </div>

        {/* Main App Navigation Links */}
        <div className="p-3 flex-1 space-y-1">
          <p className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Freshman Toolkit
          </p>
          {desktopSidebarItems.map((item) => {
            const Icon = item.icon;
            const active = isCurrentActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 text-xs font-bold border transition-colors ${
                  active
                    ? 'bg-oau-navy text-white border-oau-navy'
                    : 'text-slate-700 border-transparent hover:bg-slate-100 hover:border-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Switch to Campus Directory */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 space-y-2">
          <Link
            href="/"
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 transition-colors"
          >
            <span>Campus Directory (Faculties & Services)</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          </Link>
          <p className="text-[11px] text-slate-500 px-1">
            Looking for general faculties, facilities, or campus life? Explore the directory.
          </p>
        </div>
      </aside>

      {/* ========================================================= */}
      {/* MOBILE TOP HEADER (< 768px)                               */}
      {/* ========================================================= */}
      <header className="md:hidden sticky top-0 z-40 w-full border-b border-slate-200 bg-white px-3 sm:px-4 h-14 flex items-center justify-between">
        <Link href="/app" className="flex items-center gap-2">
          <Image
            src="/oau-logo.png"
            alt="OAU Crest"
            width={26}
            height={26}
            className="object-contain"
          />
          <div>
            <span className="font-black text-sm text-oau-navy">
              OAUMods
            </span>
            <span className="text-[10px] text-slate-500 ml-1.5 font-bold bg-amber-100 px-1 py-0.2 border border-amber-300">
              100L GUIDE
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-1.5">
          <Link
            href="/app/calendar"
            className="text-[11px] font-black text-oau-navy hover:bg-amber-300 flex items-center gap-1 border border-amber-300 px-2 py-1 bg-amber-400 transition-colors"
            title="Harmattan 2026/2027 Academic Calendar"
          >
            <CalendarIcon className="w-3 h-3 text-oau-navy" />
            <span>Calendar</span>
          </Link>
          <Link
            href="/"
            className="text-xs font-bold text-slate-600 hover:text-oau-navy flex items-center gap-1 border border-slate-200 px-2 py-1 bg-slate-50"
          >
            <span>Directory</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </header>

      {/* ========================================================= */}
      {/* MAIN VIEWPORT                                             */}
      {/* ========================================================= */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {children}
        </div>
      </main>

      {/* ========================================================= */}
      {/* SLEEK FLOATING 6-ICON DOCK (< 768px)                       */}
      {/* ========================================================= */}
      <nav
        aria-label="Freshman toolkit mobile navigation"
        className="md:hidden fixed bottom-3 left-3 right-3 z-50 max-w-sm mx-auto bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] px-2 py-1.5 flex items-center justify-between"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isCurrentActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              title={item.label}
              className={`w-11 h-11 flex flex-col items-center justify-center relative rounded-xl transition-all duration-150 ${
                active
                  ? 'bg-oau-navy text-amber-400 shadow-xs'
                  : 'text-slate-500 hover:text-oau-navy hover:bg-slate-100 active:scale-95'
              }`}
            >
              <Icon className="w-5 h-5" />
              {active && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-amber-400" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
