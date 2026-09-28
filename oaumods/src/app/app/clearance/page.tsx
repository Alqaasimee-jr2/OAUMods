'use client';

import React from 'react';
import ClearanceChecklist from '@/components/ClearanceChecklist';
import { GeometricShape, WordAccent } from '@/components/GeometricShapes';

export default function ClearancePage() {
  return (
    <div className="space-y-6 text-left">
      {/* Header Banner */}
      <div className="relative border border-slate-200 bg-white p-6 space-y-2 overflow-hidden">
        <div className="absolute top-2 right-4 pointer-events-none opacity-20 hidden sm:block">
          <GeometricShape type="square" color="navy" size="lg" variant="outline" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wide">
          <GeometricShape type="triangle" color="gold" size="sm" />
          <span>OFFICIAL VERIFICATION WORKFLOW</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-oau-navy">
          Freshman <WordAccent shape="square" color="navy">Clearance Master</WordAccent> Pipeline
        </h1>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-2xl">
          The verified sequence of administrative requirements to officially register as a Great Ife
          student. Check each stage off as you submit files and receive official signatures.
        </p>
      </div>

      {/* Main Checklist Component */}
      <ClearanceChecklist />
    </div>
  );
}
