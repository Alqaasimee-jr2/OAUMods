'use client';

import React, { useState, useEffect } from 'react';
import GpaCalculator from '@/components/GpaCalculator';
import ClearanceChecklist from '@/components/ClearanceChecklist';
import AcademicsHub from '@/components/AcademicsHub';
import CampusGuide from '@/components/CampusGuide';
import {
  Calculator,
  CheckSquare,
  GraduationCap,
  Compass,
  Sparkles,
  Wifi,
  WifiOff,
  BookOpen,
  MapPin,
  Flame,
  Info,
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'gpa' | 'clearance' | 'academics' | 'guide'>('gpa');
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="min-h-screen bg-warm-white dark:bg-[#09101A] text-deep-slate dark:text-zinc-100 flex flex-col pb-24 md:pb-12">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-soft-blue-gray dark:border-[#1C2D44] bg-pure-white/90 dark:bg-[#0E1827]/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-oau-navy via-campus-blue to-student-gold flex items-center justify-center text-white font-black text-lg shadow-xs shadow-oau-navy/20">
              O
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base sm:text-lg tracking-tight text-oau-navy dark:text-sky-blue">
                  OAUMods
                </h1>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-pale-blue dark:bg-oau-navy/60 text-campus-blue dark:text-sky-blue border border-soft-blue-gray dark:border-campus-blue/30">
                  v1.0
                </span>
              </div>
              <p className="text-[11px] text-muted-slate dark:text-slate-400 font-medium">
                Great Ife Freshman Companion
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-pale-blue/60 dark:bg-[#122033] p-1 rounded-xl border border-soft-blue-gray dark:border-[#1C2D44] text-xs font-semibold">
            <button
              onClick={() => setActiveTab('gpa')}
              className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'gpa'
                  ? 'bg-pure-white dark:bg-[#0E1827] text-campus-blue dark:text-sky-blue shadow-xs font-bold'
                  : 'text-muted-slate dark:text-slate-400 hover:text-deep-slate dark:hover:text-slate-200'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>GPA Hub</span>
            </button>
            <button
              onClick={() => setActiveTab('clearance')}
              className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'clearance'
                  ? 'bg-pure-white dark:bg-[#0E1827] text-campus-blue dark:text-sky-blue shadow-xs font-bold'
                  : 'text-muted-slate dark:text-slate-400 hover:text-deep-slate dark:hover:text-slate-200'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>Clearance</span>
            </button>
            <button
              onClick={() => setActiveTab('academics')}
              className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'academics'
                  ? 'bg-pure-white dark:bg-[#0E1827] text-campus-blue dark:text-sky-blue shadow-xs font-bold'
                  : 'text-muted-slate dark:text-slate-400 hover:text-deep-slate dark:hover:text-slate-200'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Academics</span>
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'guide'
                  ? 'bg-pure-white dark:bg-[#0E1827] text-campus-blue dark:text-sky-blue shadow-xs font-bold'
                  : 'text-muted-slate dark:text-slate-400 hover:text-deep-slate dark:hover:text-slate-200'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Campus Guide</span>
            </button>
          </nav>

          {/* Status & Motto */}
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border ${
                isOnline
                  ? 'bg-fresh-green/10 text-fresh-green border-fresh-green/20 dark:bg-fresh-green/20 dark:text-emerald-300'
                  : 'bg-amber-warn/10 text-amber-warn border-amber-warn/20 dark:bg-amber-warn/20 dark:text-amber-300'
              }`}
            >
              {isOnline ? (
                <>
                  <Wifi className="w-3 h-3 text-fresh-green" />
                  <span className="hidden sm:inline">Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3 h-3 text-amber-warn" />
                  <span>Offline Ready</span>
                </>
              )}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-6 pb-8">
        {activeTab === 'gpa' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="text-center sm:text-left space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-oau-navy dark:text-white tracking-tight">
                Great Ife 5.0 GPA & Forecaster
              </h2>
              <p className="text-xs sm:text-sm text-muted-slate dark:text-slate-400">
                Official OAU 5.0 scale with Harmattan/Rain session simulations and 1-tap course presets.
              </p>
            </div>
            <GpaCalculator />
          </div>
        )}

        {activeTab === 'clearance' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="text-center sm:text-left space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-oau-navy dark:text-white tracking-tight">
                Freshman Physical Clearance Tracker
              </h2>
              <p className="text-xs sm:text-sm text-muted-slate dark:text-slate-400">
                Interactive 5-stage clearance roadmap with offline checklist and Pale Yellow file mandate.
              </p>
            </div>
            <ClearanceChecklist />
          </div>
        )}

        {activeTab === 'academics' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="text-center sm:text-left space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-oau-navy dark:text-white tracking-tight">
                Academics & Faculty Matrix
              </h2>
              <p className="text-xs sm:text-sm text-muted-slate dark:text-slate-400">
                Directory of all 14 faculties, 79 departments, lecture halls, and file jacket rules.
              </p>
            </div>
            <AcademicsHub />
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="text-center sm:text-left space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-oau-navy dark:text-white tracking-tight">
                Campus Dining, Sanctuaries & Transit
              </h2>
              <p className="text-xs sm:text-sm text-muted-slate dark:text-slate-400">
                Curated dining gems (Orente, Captain Cook, As E Dey Hot), scenic retreats, and transport tariffs.
              </p>
            </div>
            <CampusGuide />
          </div>
        )}
      </main>

      {/* Mobile Bottom Sticky Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-soft-blue-gray dark:border-[#1C2D44] bg-pure-white/95 dark:bg-[#0E1827]/95 backdrop-blur-lg px-2 py-1.5">
        <div className="grid grid-cols-4 gap-1">
          <button
            onClick={() => setActiveTab('gpa')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
              activeTab === 'gpa'
                ? 'text-campus-blue dark:text-sky-blue font-bold'
                : 'text-muted-slate hover:text-deep-slate dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <Calculator className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">GPA</span>
          </button>
          <button
            onClick={() => setActiveTab('clearance')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
              activeTab === 'clearance'
                ? 'text-campus-blue dark:text-sky-blue font-bold'
                : 'text-muted-slate hover:text-deep-slate dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <CheckSquare className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Clearance</span>
          </button>
          <button
            onClick={() => setActiveTab('academics')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
              activeTab === 'academics'
                ? 'text-campus-blue dark:text-sky-blue font-bold'
                : 'text-muted-slate hover:text-deep-slate dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <GraduationCap className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Academics</span>
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
              activeTab === 'guide'
                ? 'text-campus-blue dark:text-sky-blue font-bold'
                : 'text-muted-slate hover:text-deep-slate dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <Compass className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Guide</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-soft-blue-gray dark:border-[#1C2D44] pt-6 pb-2 text-center text-xs text-muted-slate dark:text-slate-400 space-y-1">
        <p className="font-semibold text-deep-slate dark:text-slate-200">
          Obafemi Awolowo University, Ile-Ife • Africa's Most Beautiful Campus
        </p>
        <p className="text-[11px] text-muted-slate/80 dark:text-slate-500">
          "For Learning and Culture" • OAUMods Offline Companion • 100% Client-Side Persistent
        </p>
      </footer>
    </div>
  );
}
