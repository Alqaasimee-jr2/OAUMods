'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Compass,
  Building2,
  BookOpen,
  ExternalLink,
  Menu,
  X,
  Landmark,
  Building,
  Trophy,
  Map as MapIcon,
} from 'lucide-react';

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Overview', icon: Compass },
    { href: '/map', label: 'Campus Map', icon: MapIcon },
    { href: '/faculties', label: 'Faculties', icon: Building2 },
    { href: '/facilities', label: 'Facilities', icon: Landmark },
    { href: '/halls', label: 'Campus Hostels', icon: Building },
    { href: '/life', label: 'Faith & Sports', icon: Trophy },
    { href: '/heritage', label: 'Heritage', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Main Header / Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          {/* Logo & Identity */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 border border-slate-200 bg-white p-1 flex items-center justify-center shrink-0">
              <Image
                src="/oau-logo.png"
                alt="OAU Great Ife Crest"
                width={34}
                height={34}
                className="object-contain"
              />
            </div>
            <div className="text-left">
              <span className="font-black text-lg tracking-tight text-oau-navy block">
                OAU Campus Hub
              </span>
              <p className="text-xs text-slate-600 font-medium">
                Obafemi Awolowo University Information Portal
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 border transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-slate-100 text-oau-navy font-bold border-slate-300'
                      : 'text-slate-700 border-transparent hover:text-oau-navy hover:bg-slate-50 hover:border-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4 text-slate-600" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Launch Layer B Freshman App */}
          <div className="hidden sm:flex items-center gap-2">
            <a
              href="/app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-oau-navy bg-amber-400 hover:bg-amber-300 border border-amber-500 shadow-xs transition-colors"
            >
              <span>Freshman Guide (App)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-oau-navy border border-slate-200"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white p-4 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 text-sm font-semibold border ${
                    isActive
                      ? 'bg-slate-100 text-oau-navy border-slate-300'
                      : 'text-slate-700 border-transparent hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4 text-slate-600" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
            <div className="pt-2 border-t border-slate-200">
              <a
                href="/app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-oau-navy bg-amber-400 hover:bg-amber-300 border border-amber-500"
              >
                <span>Freshman Guide (OAUMods App)</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 text-left">
        {children}
      </main>

      {/* Standard School Footer */}
      <footer className="border-t border-slate-200 bg-white text-slate-700 py-10 px-4 sm:px-6 text-left">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-3">
                <Image
                  src="/oau-logo.png"
                  alt="OAU Crest"
                  width={28}
                  height={28}
                  className="object-contain"
                />
                <span className="font-black text-base tracking-tight text-oau-navy">
                  Obafemi Awolowo University Campus Hub
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed max-w-md">
                Official information directory for all students, staff, and visitors.
                Provides verified information on faculties, campus buildings, transportation,
                and health services.
              </p>
              <p className="text-xs text-slate-500">
                Location: Obafemi Awolowo University, Ile-Ife, Osun State, Nigeria.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-oau-navy border-b border-slate-200 pb-1">
                Campus Directory
              </h4>
              <ul className="space-y-1 text-xs text-slate-600">
                <li>
                  <Link href="/map" className="hover:text-oau-navy hover:underline font-semibold text-campus-blue">
                    Interactive Campus Map (Masterplan)
                  </Link>
                </li>
                <li>
                  <Link href="/faculties" className="hover:text-oau-navy hover:underline">
                    15 Faculties & Departments
                  </Link>
                </li>
                <li>
                  <Link href="/facilities" className="hover:text-oau-navy hover:underline">
                    Hezekiah Library & JAC Health Centre
                  </Link>
                </li>
                <li>
                  <Link href="/heritage" className="hover:text-oau-navy hover:underline">
                    Oduduwa Hall & Sharon Architecture
                  </Link>
                </li>
                <li>
                  <Link href="/halls" className="hover:text-oau-navy hover:underline">
                    Halls of Residence
                  </Link>
                </li>
                <li>
                  <Link href="/life" className="hover:text-oau-navy hover:underline">
                    Faith, Sports & Societies
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-oau-navy border-b border-slate-200 pb-1">
                For New Students
              </h4>
              <p className="text-xs text-slate-600">
                Newly admitted 100-level student? Use our dedicated companion web app:
              </p>
              <a
                href="/app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-oau-navy bg-amber-400 hover:bg-amber-300 border border-amber-500"
              >
                <span>Launch Freshman Guide</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} Obafemi Awolowo University, Ile-Ife. Built for Great Ife students.</p>
            <p className="font-semibold text-oau-navy">For Learning and Culture</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
