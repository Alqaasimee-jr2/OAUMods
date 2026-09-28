'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CheckSquare,
  MapPin,
  GraduationCap,
  Compass,
  ArrowRight,
  PhoneCall,
  AlertTriangle,
  Map as MapIcon,
} from 'lucide-react';
import { GeometricShape, WordAccent, ShapeType, ShapeColor } from '@/components/GeometricShapes';

export default function AppDashboard() {
  const [completedSteps, setCompletedSteps] = useState<number>(0);
  const totalSteps = 7;

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const saved = localStorage.getItem('oau_clearance_progress');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setCompletedSteps(parsed.length);
          }
        }
      } catch {
        // LocalStorage access fallback
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const modules: Array<{
    title: string;
    badge: string;
    badgeColor: string;
    description: string;
    href: string;
    icon: typeof CheckSquare;
    cta: string;
    shape: ShapeType;
    shapeColor: ShapeColor;
  }> = [
    {
      title: '1. Clearance Steps & Documents',
      badge: 'Action Required',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      description:
        'Step-by-step checklist of your 7 clearance stages: school fees on Remita, bio-data, JAC Health Centre screening, faculty file endorsement, and library registration.',
      href: '/app/clearance',
      icon: CheckSquare,
      cta: 'View Clearance Checklist',
      shape: 'square',
      shapeColor: 'navy',
    },
    {
      title: '2. Interactive Campus Map & Routes',
      badge: 'Interactive Navigator',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      description:
        'Interactive vector masterplan and walking trail navigator. Tap on any landmark (BOOC, White House, AUD, Health Centre) to calculate walking times from Angola & Moz and trace walking routes.',
      href: '/app/map',
      icon: MapIcon,
      cta: 'Open Campus Map Navigator',
      shape: 'hexagon',
      shapeColor: 'emerald',
    },
    {
      title: '3. Campus Lecture Venues & Atlas',
      badge: 'Campus Navigation',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
      description:
        'Locate major lecture theatres across the university — from central auditoriums (AUD, ODLT, Oduduwa Hall) to faculty-specific complexes (BOOC, White House, First Bank LT, 1000-Seater, HLT, Spider House). Includes walking routes from hostels.',
      href: '/app/venues',
      icon: MapPin,
      cta: 'Explore Campus Venues',
      shape: 'triangle',
      shapeColor: 'blue',
    },
    {
      title: '4. 100L Courses & 5.0 CGPA',
      badge: 'Academics & Grades',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      description:
        'Understand credit units for campus-wide courses (GST 111, GST 112, LIB 101) and faculty core courses across Science, Tech, Arts, Admin, Law, Social Sciences, etc., and calculate your GPA using the official 5.0 scale.',
      href: '/app/academics',
      icon: GraduationCap,
      cta: 'Open Course & GPA Hub',
      shape: 'square',
      shapeColor: 'gold',
    },
    {
      title: '5. Hostels & Daily Survival',
      badge: 'Campus Living',
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
      description:
        'Hostel regulations for Angola, Moz, and spillover halls, bed space balloting rules, official bus ticket boarding, and student dining spots.',
      href: '/app/guide',
      icon: Compass,
      cta: 'View Hostel & Survival Guide',
      shape: 'circle',
      shapeColor: 'gold',
    },
  ];

  return (
    <div className="space-y-6 text-left">
      {/* Header Banner */}
      <div className="relative border border-slate-200 bg-white p-6 space-y-2 overflow-hidden">
        {/* Subtle Background Triangle */}
        <div className="absolute top-2 right-4 pointer-events-none opacity-20 hidden sm:block">
          <GeometricShape type="triangle" color="gold" size="lg" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-400 text-oau-navy text-xs font-black uppercase tracking-wide">
          <GeometricShape type="square" color="navy" size="sm" />
          <span>100-LEVEL FRESHMAN COMPANION</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-oau-navy">
          <WordAccent shape="circle" color="gold">Freshman</WordAccent> Survival Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-2xl">
          Welcome to Great Ife. This guide is built to help you navigate your first weeks on campus.
          Track your clearance, locate your lecture rooms, and master campus life without stress.
        </p>
      </div>

      {/* Live Clearance Progress Meter */}
      <div className="relative border border-slate-200 bg-white p-5 space-y-3 overflow-hidden">
        <div className="absolute top-2 right-2 pointer-events-none opacity-15">
          <GeometricShape type="hexagon" color="gold" size="lg" />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
          <div>
            <h2 className="text-sm font-bold text-oau-navy uppercase tracking-wide flex items-center gap-1.5">
              <GeometricShape type="square" color="navy" size="sm" />
              <span>Your Clearance Progress</span>
            </h2>
            <p className="text-xs text-slate-500">
              Saved automatically on this phone or browser
            </p>
          </div>
          <div className="text-xs font-bold text-oau-navy bg-slate-100 px-3 py-1 border border-slate-300 self-start sm:self-auto">
            <span>{completedSteps} of {totalSteps} Steps Completed</span>
          </div>
        </div>

        {/* Progress Bar (Sharp Rectangular) */}
        <div className="w-full bg-slate-100 h-3 border border-slate-300 overflow-hidden">
          <div
            className="bg-emerald-600 h-full transition-all duration-300"
            style={{ width: `${(completedSteps / totalSteps) * 100}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
          <span>{completedSteps === 0 ? 'Not started yet' : completedSteps === 7 ? 'Clearance Completed!' : 'In progress'}</span>
          <Link
            href="/app/clearance"
            className="font-bold text-campus-blue hover:underline flex items-center gap-1"
          >
            <span>Update Checklist</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 4 Core Freshman Action Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className="relative border border-slate-200 bg-white p-5 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 border ${m.badgeColor}`}>
                    <GeometricShape type={m.shape} color={m.shapeColor} size="sm" />
                    <span>{m.badge}</span>
                  </span>
                  <Icon className="w-4 h-4 text-slate-400" />
                </div>
                <h3 className="font-black text-base text-oau-navy">{m.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{m.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <Link
                  href={m.href}
                  className="w-full inline-flex items-center justify-between px-3 py-2 text-xs font-bold text-oau-navy bg-slate-100 hover:bg-amber-400 border border-slate-300 transition-colors"
                >
                  <span>{m.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* First Week Important Notices */}
      <div className="border border-slate-200 bg-white p-5 space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2 text-oau-navy">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <h3 className="text-sm font-bold uppercase tracking-wide">
            First-Week Freshman Golden Rules
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700">
          <div className="relative p-3 bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center justify-between">
              <p className="font-bold text-slate-900">1. Pale Yellow Manila File</p>
              <GeometricShape type="square" color="navy" size="sm" />
            </div>
            <p className="text-slate-600">
              Buy the official Pale Yellow Manila file jacket for faculty screening. Do not buy blue or green files.
            </p>
          </div>
          <div className="relative p-3 bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center justify-between">
              <p className="font-bold text-slate-900">2. Tickets Are Campus Fare Currency</p>
              <GeometricShape type="triangle" color="gold" size="sm" />
            </div>
            <p className="text-slate-600">
              The tfare currency within campus is official paper tickets. Specific costs from location to location are not known or fixed right now.
            </p>
          </div>
          <div className="relative p-3 bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center justify-between">
              <p className="font-bold text-slate-900">3. Anti-Scam Rule</p>
              <GeometricShape type="circle" color="amber" size="sm" />
            </div>
            <p className="text-slate-600">
              Never pay anyone for bed spaces or clearance assistance. All processes are done personally by you.
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Ambulances Box */}
      <div className="border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-3 text-oau-navy">
          <PhoneCall className="w-4 h-4 text-red-600" />
          <h3 className="text-sm font-bold uppercase tracking-wide">
            Emergency Campus Medical Lines
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-slate-500 font-semibold uppercase">Ambulance Line 1</p>
              <p className="font-black text-sm text-oau-navy">0815 375 0977</p>
            </div>
            <a
              href="tel:08153750977"
              className="px-2.5 py-1 bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100"
            >
              Call
            </a>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-slate-500 font-semibold uppercase">Ambulance Line 2</p>
              <p className="font-black text-sm text-oau-navy">0903 569 9725</p>
            </div>
            <a
              href="tel:09035699725"
              className="px-2.5 py-1 bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100"
            >
              Call
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
