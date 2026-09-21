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
    <div className="min-h-screen bg-zinc-50 dark:bg-[#070b12] text-zinc-900 dark:text-zinc-100 flex flex-col pb-24 md:pb-12">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-[#0a0f1d]/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-amber-500 flex items-center justify-center text-white font-black text-lg shadow-xs shadow-emerald-500/20">
              O
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-600 dark:from-emerald-400 dark:via-emerald-300 dark:to-amber-400 bg-clip-text text-transparent">
                  OAUMods
                </h1>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                  v1.0
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                Great Ife Freshman Companion
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800/70 p-1 rounded-xl border border-zinc-200 dark:border-zinc-700/60 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('gpa')}
              className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'gpa'
                  ? 'bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>GPA Hub</span>
            </button>
            <button
              onClick={() => setActiveTab('clearance')}
              className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'clearance'
                  ? 'bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>Clearance</span>
            </button>
            <button
              onClick={() => setActiveTab('academics')}
              className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'academics'
                  ? 'bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Academics</span>
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'guide'
                  ? 'bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Campus Guide</span>
            </button>
          </nav>

          {/* Status & Motto */}
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full border ${
                isOnline
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40'
                  : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/40'
              }`}
            >
              {isOnline ? (
                <>
                  <Wifi className="w-3 h-3 text-emerald-500" />
                  <span className="hidden sm:inline">Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3 h-3 text-amber-500" />
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
              <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                Great Ife 5.0 GPA & Forecaster
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                Official OAU 5.0 scale with Harmattan/Rain session simulations and 1-tap course presets.
              </p>
            </div>
            <GpaCalculator />
          </div>
        )}

        {activeTab === 'clearance' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="text-center sm:text-left space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                Freshman Physical Clearance Tracker
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                Interactive 5-stage clearance roadmap with offline checklist and Pale Yellow file mandate.
              </p>
            </div>
            <ClearanceChecklist />
          </div>
        )}

        {activeTab === 'academics' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="text-center sm:text-left space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                Academics & Faculty Matrix
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                Directory of all 14 faculties, 60+ departments, lecture halls, and file jacket rules.
              </p>
            </div>
            <AcademicsHub />
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="text-center sm:text-left space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                Campus Dining, Sanctuaries & Transit
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                Curated dining gems (Orente, Captain Cook, As E Dey Hot), scenic retreats, and transport tariffs.
              </p>
            </div>
            <CampusGuide />
          </div>
        )}
      </main>

      {/* Mobile Bottom Sticky Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-200/80 dark:border-zinc-800 bg-white/90 dark:bg-[#0a0f1d]/90 backdrop-blur-lg px-2 py-1.5">
        <div className="grid grid-cols-4 gap-1">
          <button
            onClick={() => setActiveTab('gpa')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
              activeTab === 'gpa'
                ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <Calculator className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">GPA</span>
          </button>
          <button
            onClick={() => setActiveTab('clearance')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
              activeTab === 'clearance'
                ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <CheckSquare className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Clearance</span>
          </button>
          <button
            onClick={() => setActiveTab('academics')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
              activeTab === 'academics'
                ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <GraduationCap className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Academics</span>
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
              activeTab === 'guide'
                ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <Compass className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Guide</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-zinc-200/60 dark:border-zinc-800/60 pt-6 pb-2 text-center text-xs text-zinc-500 dark:text-zinc-400 space-y-1">
        <p className="font-semibold text-zinc-700 dark:text-zinc-300">
          Obafemi Awolowo University, Ile-Ife • Africa's Most Beautiful Campus
        </p>
        <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
          "For Learning and Culture" • OAUMods Offline Companion • 100% Client-Side Persistent
        </p>
      </footer>
    </div>
  );
}
