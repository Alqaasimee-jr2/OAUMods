'use client';

import React, { useState } from 'react';
import {
  Bus,
  Utensils,
  Building,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Trophy,
  Sparkles,
} from 'lucide-react';
import { GeometricShape, WordAccent } from '@/components/GeometricShapes';
import { DINING_SPOTS } from '@/data/diningSpots';
import {
  SPORTS_FACILITIES,
  SPORTS_DISCIPLINES,
  HOW_TO_JOIN_SPORTS,
} from '@/data/studentLife';
import {
  SPATIAL_NICKNAMES,
  CAMPUS_MYTHBUSTERS,
} from '@/data/campusHistoryAndActivities';

export default function GuidePage() {
  const [activeTab, setActiveTab] = useState<'hostels' | 'transit' | 'food' | 'sports' | 'traditions'>('hostels');
  const [foodCategory, setFoodCategory] = useState<'all' | 'faculty' | 'grills' | 'bukas' | 'hostels'>('all');

  const transitFares = [
    {
      type: 'Campus Shuttle Bus',
      boarding: 'Paper Ticket Required',
      route: 'Campus Gate to SUB, Halls, Market, and Religious Grounds',
      rule: 'Cash is strictly rejected on buses. Buy official tickets at the park booth before entering.',
    },
    {
      type: 'Town Campus Bus',
      boarding: 'Cash to Driver / Conductor',
      route: 'Campus Gate <-> Mayfair / Lagere / Town center',
      rule: 'Town buses connect campus main gate park to Mayfair and town commercial stops. Conductor/driver accepts cash directly.',
    },
    {
      type: 'Teaching Hospital Cab (OAUTHC)',
      boarding: 'Direct Cash to Driver',
      route: 'Main Campus Gate <-> Teaching Hospital complex',
      rule: 'Direct route for clinical students and hospital visits.',
    },
    {
      type: 'Electric Tricycle (E-Trike / Keke)',
      boarding: 'Paper Ticket Required',
      route: 'Gate to SUB / Gate to Faculty corridors',
      rule: 'Uses official paper tickets purchased at the park booth.',
    },
  ];

  const filteredDiningSpots = DINING_SPOTS.filter((spot) => {
    if (foodCategory === 'all') return true;
    if (foodCategory === 'faculty') return spot.category === 'Faculty Restaurant';
    if (foodCategory === 'grills') return spot.category === 'Grills & Fast Food' || spot.category === 'Finger Foods';
    if (foodCategory === 'bukas') return spot.category === 'Swallow & Bukas';
    if (foodCategory === 'hostels') return spot.category === 'Hostel Diner';
    return true;
  });

  const hostelTips = [
    {
      title: 'Angola Hall (100L Males)',
      badge: 'MALE FRESHMEN',
      shape: 'square' as const,
      shapeColor: 'navy' as const,
      points: [
        'Quadrangle layout with large central courtyards for student recreation and hall briefings.',
        'Electricity and water supply are shared; bring your own bucket, hangers, and power extension.',
        'Observe hall quiet hours during late-night reading and examination preparation.',
        'Cooking with electric hot plates or boiling rings is strictly forbidden by university rules.',
      ],
    },
    {
      title: 'Mozambique Hall (100L Females)',
      badge: 'FEMALE FRESHMEN',
      shape: 'hexagon' as const,
      shapeColor: 'emerald' as const,
      points: [
        'Safe, gated hostel with 24-hour porter security at the front check-in desk.',
        'Has an active inner buttery market selling food, groceries, laundry supplies, and hair styling.',
        'Visitors are strictly restricted to the porter lounge; male visitors are not allowed into room blocks.',
        'Always lock your room door whenever leaving for lectures.',
      ],
    },
    {
      title: 'Spillover in Other Hostels',
      badge: 'CAPACITY & OVERFLOW',
      shape: 'triangle' as const,
      shapeColor: 'gold' as const,
      points: [
        'When Angola or Mozambique reach full capacity, 100-level students receive official bed space allocation in other campus halls.',
        'Male freshmen are accommodated into Fajuyi Hall or Awolowo Hall through official ePortal balloting.',
        'Female freshmen are accommodated into Moremi Hall or Alumni Hall.',
        'Clearance and key collection take place at the assigned hall porter office with your official ePortal slip.',
      ],
    },
  ];

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="relative border border-slate-200 bg-white p-6 space-y-2 overflow-hidden">
        <div className="absolute top-2 right-4 pointer-events-none opacity-20 hidden sm:block">
          <GeometricShape type="hexagon" color="gold" size="lg" variant="outline" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wide">
          <GeometricShape type="triangle" color="gold" size="sm" />
          <span>FRESHMAN SURVIVAL GUIDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-oau-navy">
          Hostels, Transit Routes & Campus <WordAccent shape="circle" color="gold">Survival Guide</WordAccent>
        </h1>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-2xl">
          Everything you need to navigate daily life as a fresher: hostel rules in Angola, Moz, and spillover halls,
          verified bus and cab boarding rules, and affordable student dining spots.
        </p>
      </div>

      {/* Mode Tabs */}
      <div className="flex border-b border-slate-300 gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('hostels')}
          className={`px-4 py-2.5 text-xs font-bold border-t-2 border-l border-r -mb-px flex items-center gap-1.5 transition-colors whitespace-nowrap ${
            activeTab === 'hostels'
              ? 'border-t-oau-navy border-slate-300 bg-white text-oau-navy'
              : 'border-transparent text-slate-600 hover:text-oau-navy bg-slate-100'
          }`}
        >
          <Building className="w-4 h-4 text-purple-700" />
          <span>Hostel Rules & Scams</span>
        </button>
        <button
          onClick={() => setActiveTab('transit')}
          className={`px-4 py-2.5 text-xs font-bold border-t-2 border-l border-r -mb-px flex items-center gap-1.5 transition-colors whitespace-nowrap ${
            activeTab === 'transit'
              ? 'border-t-oau-navy border-slate-300 bg-white text-oau-navy'
              : 'border-transparent text-slate-600 hover:text-oau-navy bg-slate-100'
          }`}
        >
          <Bus className="w-4 h-4 text-amber-700" />
          <span>Campus Transit & Routes</span>
        </button>
        <button
          onClick={() => setActiveTab('food')}
          className={`px-4 py-2.5 text-xs font-bold border-t-2 border-l border-r -mb-px flex items-center gap-1.5 transition-colors whitespace-nowrap ${
            activeTab === 'food'
              ? 'border-t-oau-navy border-slate-300 bg-white text-oau-navy'
              : 'border-transparent text-slate-600 hover:text-oau-navy bg-slate-100'
          }`}
        >
          <Utensils className="w-4 h-4 text-emerald-700" />
          <span>Food & Cafeterias</span>
        </button>
        <button
          onClick={() => setActiveTab('sports')}
          className={`px-4 py-2.5 text-xs font-bold border-t-2 border-l border-r -mb-px flex items-center gap-1.5 transition-colors whitespace-nowrap ${
            activeTab === 'sports'
              ? 'border-t-oau-navy border-slate-300 bg-white text-oau-navy'
              : 'border-transparent text-slate-600 hover:text-oau-navy bg-slate-100'
          }`}
        >
          <Trophy className="w-4 h-4 text-amber-600" />
          <span>Sports & Fitness</span>
        </button>
        <button
          onClick={() => setActiveTab('traditions')}
          className={`px-4 py-2.5 text-xs font-bold border-t-2 border-l border-r -mb-px flex items-center gap-1.5 transition-colors whitespace-nowrap ${
            activeTab === 'traditions'
              ? 'border-t-oau-navy border-slate-300 bg-white text-oau-navy'
              : 'border-transparent text-slate-600 hover:text-oau-navy bg-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span>Nicknames & Myths</span>
        </button>
      </div>

      {/* Tab 1: Hostels & Anti-Scam */}
      {activeTab === 'hostels' && (
        <div className="space-y-6">
          {/* Anti-Scam Callout */}
          <div className="border-2 border-red-500 bg-red-50/80 p-5 space-y-2">
            <div className="flex items-center gap-2 text-red-700 font-black">
              <ShieldAlert className="w-5 h-5 shrink-0" />
              <h2 className="text-sm sm:text-base uppercase tracking-wide">
                Urgent Anti-Scam Warning: Hostel Bed Spaces
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
              <strong>Do not pay any money to individuals on WhatsApp, Telegram, or Facebook claiming
              they can give or sell you an official OAU bed space.</strong> Official bed spaces in Angola
              and Mozambique are balloted exclusively on the student ePortal. Selling or buying hostel
              slots is an offence punishable by immediate loss of accommodation and university discipline.
            </p>
          </div>

          {/* Angola, Moz & Spillover Guidelines */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {hostelTips.map((h, i) => (
              <div key={i} className="border border-slate-200 bg-white p-5 space-y-3">
                <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GeometricShape
                      type={h.shape}
                      color={h.shapeColor}
                      size="sm"
                    />
                    <div>
                      <h3 className="font-black text-sm sm:text-base text-oau-navy">{h.title}</h3>
                      <span className="text-[11px] font-semibold text-slate-500">Official Resident Guidelines</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 border border-slate-300 text-slate-700">
                    {h.badge}
                  </span>
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  {h.points.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Essential Hostel Items Checklist */}
          <div className="border border-slate-200 bg-white p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="text-sm font-bold uppercase tracking-wide text-oau-navy">
                Essential Items to Bring to Campus Hostels
              </h3>
              <span className="text-[11px] text-slate-500 font-semibold">Recommended Packing</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-slate-900">Bedding</p>
                  <GeometricShape type="square" color="navy" size="sm" />
                </div>
                <p className="text-slate-600">Mattress cover, bed sheets, blanket, and pillow.</p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-slate-900">Sanitation</p>
                  <GeometricShape type="circle" color="emerald" size="sm" />
                </div>
                <p className="text-slate-600">Plastic bucket, washing soap, mop, and antiseptic.</p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-slate-900">Power & Light</p>
                  <GeometricShape type="triangle" color="gold" size="sm" />
                </div>
                <p className="text-slate-600">Rechargeable lamp, surge-protected extension cord.</p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-slate-900">Security</p>
                  <GeometricShape type="hexagon" color="blue" size="sm" />
                </div>
                <p className="text-slate-600">Sturdy padlocks for your wardrobe and travel bag.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Campus Transit Routes */}
      {activeTab === 'transit' && (
        <div className="space-y-6">
          <div className="border border-slate-200 bg-white p-5 space-y-3">
            <div className="border-b border-slate-200 pb-2">
              <h2 className="text-base font-bold text-oau-navy uppercase tracking-wide">
                Campus Transit Routes & Boarding Guidelines
              </h2>
              <p className="text-xs text-slate-600">
                Official transport corridors and boarding regulations across campus and town.
              </p>
            </div>

            <div className="border border-blue-200 bg-blue-50/70 p-4 space-y-1.5 text-xs text-slate-800">
              <span className="font-bold text-blue-950 flex items-center gap-1.5 uppercase tracking-wide">
                <Bus className="w-3.5 h-3.5 text-oau-navy" />
                Campus Transport Currency: Official Paper Tickets
              </span>
              <p className="leading-relaxed">
                The official transport fare currency within campus is <strong>paper tickets</strong>. Specific transport costs from location to location are not fixed or known at the moment.
                Always purchase your official tickets at designated park ticket booths (Campus Main Gate and SUB Car Park) before boarding. Shuttle buses and tricycles (kekes) do not accept cash.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {transitFares.map((f, i) => {
                const fareShapes: Array<{ type: 'square' | 'triangle' | 'hexagon' | 'circle'; color: 'navy' | 'gold' | 'blue' | 'emerald' }> = [
                  { type: 'square', color: 'navy' },
                  { type: 'triangle', color: 'gold' },
                  { type: 'hexagon', color: 'blue' },
                  { type: 'circle', color: 'emerald' },
                ];
                const cur = fareShapes[i % fareShapes.length];
                return (
                  <div key={i} className="p-4 border border-slate-200 bg-slate-50 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GeometricShape type={cur.type} color={cur.color} size="sm" />
                        <h3 className="font-black text-sm text-slate-900">{f.type}</h3>
                      </div>
                      <span className="text-xs font-black text-oau-navy bg-white border border-slate-300 px-2 py-0.5">
                        {f.boarding}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700">
                      <strong>Route: </strong>
                      {f.route}
                    </p>
                    <p className="text-xs text-slate-600 pt-1 border-t border-slate-200 leading-relaxed">
                      <strong className="text-slate-800">Rule: </strong>
                      {f.rule}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border border-amber-400 bg-amber-50 p-4 space-y-1 text-xs text-slate-800">
            <span className="font-bold text-amber-900 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
              How the Campus Ticket System Works:
            </span>
            <p className="leading-relaxed">
              When entering from the main campus gate, buy <strong>official paper tickets</strong> from the ticket booth.
              Hand your ticket to the bus or tricycle (keke) conductor when boarding. Because location-to-location fares are not fixed right now, always confirm ticket requirements at the booth, and keep spare tickets in your wallet or bag so you are never delayed by ticket lines.
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: Food & Cafeterias */}
      {activeTab === 'food' && (
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-oau-navy uppercase tracking-wide">
                Campus Dining & Hidden Food Gems
              </h2>
              <p className="text-xs text-slate-600">
                Proven faculty private restaurants, central cafeterias, evening grills, and hostel butteries.
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-500 self-start sm:self-auto">
              Showing {filteredDiningSpots.length} of {DINING_SPOTS.length} spots
            </span>
          </div>

          {/* Institutional Note on Faculty Restaurants & Orente */}
          <div className="border border-blue-200 bg-blue-50/60 p-4 space-y-1.5 text-xs text-slate-800">
            <span className="font-bold text-blue-950 flex items-center gap-1.5 uppercase tracking-wide">
              <Utensils className="w-3.5 h-3.5 text-oau-navy" />
              Fresher Advice: Faculty Private Restaurants &amp; Orente Grills
            </span>
            <p className="leading-relaxed">
              You do not need to walk all the way down to New Buka or SUB during a tight 30-minute break between lectures.
              Proven private restaurants operate inside the <strong>Faculty of Science</strong> (White House / Chemistry quadrangle),
              the <strong>Faculty of Administration</strong> (Pit Theatre / First Bank LT axis), and the{' '}
              <strong>Faculty of Social Sciences</strong> (1000-Seater axis), plus the Archi Hut in EDM.
              In the late afternoons and evenings, <strong>Orente Grills</strong> at the Afrika Amphitheatre &amp; ODLT axis is the
              hub for freshly grilled fish, chicken &amp; chips, and shawarma.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={() => setFoodCategory('all')}
              className={`px-3 py-1.5 text-xs font-bold transition-colors ${
                foodCategory === 'all'
                  ? 'bg-oau-navy text-white'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              All Spots ({DINING_SPOTS.length})
            </button>
            <button
              onClick={() => setFoodCategory('faculty')}
              className={`px-3 py-1.5 text-xs font-bold transition-colors ${
                foodCategory === 'faculty'
                  ? 'bg-oau-navy text-white'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Faculty Restaurants (Science, Admin, Social Sciences, EDM)
            </button>
            <button
              onClick={() => setFoodCategory('grills')}
              className={`px-3 py-1.5 text-xs font-bold transition-colors ${
                foodCategory === 'grills'
                  ? 'bg-oau-navy text-white'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Orente &amp; Grills
            </button>
            <button
              onClick={() => setFoodCategory('bukas')}
              className={`px-3 py-1.5 text-xs font-bold transition-colors ${
                foodCategory === 'bukas'
                  ? 'bg-oau-navy text-white'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Traditional Bukas &amp; Swallows
            </button>
            <button
              onClick={() => setFoodCategory('hostels')}
              className={`px-3 py-1.5 text-xs font-bold transition-colors ${
                foodCategory === 'hostels'
                  ? 'bg-oau-navy text-white'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Hostel Butteries
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDiningSpots.map((d, i) => {
              const spotShapes: Array<{
                type: 'square' | 'triangle' | 'hexagon' | 'circle';
                color: 'gold' | 'emerald' | 'blue' | 'amber' | 'navy';
              }> = [
                { type: 'square', color: 'gold' },
                { type: 'hexagon', color: 'emerald' },
                { type: 'triangle', color: 'blue' },
                { type: 'circle', color: 'amber' },
                { type: 'square', color: 'navy' },
              ];
              const cur = spotShapes[i % spotShapes.length];

              return (
                <div key={d.id} className="border border-slate-200 bg-white p-5 space-y-3">
                  <div className="border-b border-slate-100 pb-2.5 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <div className="pt-0.5">
                        <GeometricShape type={cur.type} color={cur.color} size="sm" />
                      </div>
                      <div>
                        <h3 className="font-black text-base text-oau-navy leading-snug">{d.name}</h3>
                        <p className="text-xs text-slate-500 font-semibold mt-0.5">{d.location}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-slate-100 border border-slate-300 text-slate-700 shrink-0">
                      {d.category}
                    </span>
                  </div>

                  {d.facultyAffiliation && (
                    <div className="inline-block bg-amber-50 border border-amber-300 px-2 py-0.5 text-[11px] font-bold text-amber-900">
                      PROVEN FACULTY EATERY: {d.facultyAffiliation}
                    </div>
                  )}

                  {d.settingNote && (
                    <div className="text-[11px] text-slate-500 font-medium">
                      <strong>Schedule/Setting: </strong>
                      {d.settingNote}
                    </div>
                  )}

                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-800">Specialties:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {d.specialties.map((item, sIdx) => (
                        <span
                          key={sIdx}
                          className="bg-slate-50 border border-slate-200 px-2 py-0.5 text-xs text-slate-700"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong className="text-slate-800">Atmosphere: </strong>
                    {d.vibe}
                  </p>

                  <div className="p-3 bg-slate-50 border-l-2 border-oau-navy text-xs text-slate-700">
                    <strong className="text-oau-navy font-bold">Fresher Tip: </strong>
                    <span>{d.tips}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}


      {/* Tab 5: Sports, Fitness & Extracurriculars */}
      {activeTab === 'sports' && (
        <div className="space-y-6">
          <div className="border border-slate-200 bg-white p-5 space-y-3">
            <div className="border-b border-slate-200 pb-2">
              <h2 className="text-base font-bold text-oau-navy uppercase tracking-wide">
                Campus Sports Facilities & The OAU Giants
              </h2>
              <p className="text-xs text-slate-600">
                Pioneers of the Nigerian Universities Games Association (NUGA) with world-class facilities on Road 1.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SPORTS_FACILITIES.map((f) => (
                <div key={f.id} className="p-4 border border-slate-200 bg-slate-50 space-y-2">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
                    <GeometricShape type={f.shape} color={f.shapeColor} size="sm" />
                    <h3 className="font-black text-xs text-slate-900">{f.name}</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong className="text-slate-800">Specs: </strong>
                    {f.specs}
                  </p>
                  <p className="text-xs text-slate-600 border-t border-slate-200 pt-1 leading-relaxed">
                    <strong className="text-slate-800">Activities: </strong>
                    {f.activities.join(' ')}
                  </p>
                  <div className="text-[11px] text-slate-500 pt-1">
                    <strong className="text-slate-700">Access: </strong>
                    {f.accessRule}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How freshers join sports */}
          <div className="border border-slate-200 bg-slate-50 p-5 space-y-3">
            <h2 className="text-sm font-bold text-oau-navy uppercase tracking-wide border-b border-slate-200 pb-2">
              How Freshmen Join Varsity Teams & Intramurals
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {HOW_TO_JOIN_SPORTS.map((h, i) => (
                <div key={i} className="bg-white border border-slate-200 p-3 space-y-1">
                  <h3 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    {h.step}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed pl-5">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 15+ Disciplines */}
          <div className="border border-slate-200 bg-white p-5 space-y-3">
            <h2 className="text-sm font-bold text-oau-navy uppercase tracking-wide border-b border-slate-200 pb-2">
              All 15+ Available Competitive Disciplines
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {SPORTS_DISCIPLINES.map((d, i) => (
                <div key={i} className="border border-slate-200 bg-slate-50 p-2.5 space-y-0.5">
                  <p className="font-bold text-xs text-slate-900">{d.category}</p>
                  <p className="text-[11px] text-slate-600">{d.items}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: Spatial Nicknames, Myths & Exam Rules */}
      {activeTab === 'traditions' && (
        <div className="space-y-6">
          {/* 48-Hour Exam Illness Rule Warning */}
          <div className="border-2 border-red-500 bg-red-50/80 p-5 space-y-2">
            <div className="flex items-center gap-2 text-red-700 font-black">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <h2 className="text-sm sm:text-base uppercase tracking-wide">
                Critical Academic Rule: The Strict 48-Hour Exam Illness Rule
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
              If acute illness or hospital emergency forces you to miss an official university semester examination, you <strong>MUST report to the University Health Centre (&ldquo;JAC&rdquo;) within 48 hours</strong> of the missed exam. Uncertified missed exams result in an automatic <strong>&lsquo;F&rsquo; grade (0.0 Quality Points)</strong> and cannot be retaken as special exams.
            </p>
          </div>

          {/* Spatial Nicknames Matrix */}
          <div className="border border-slate-200 bg-white p-5 space-y-4">
            <div className="border-b border-slate-200 pb-2">
              <h2 className="text-base font-bold text-oau-navy uppercase tracking-wide">
                Campus Spatial Nicknames & Decoders
              </h2>
              <p className="text-xs text-slate-600">
                Essential slang and informal names used daily by Great Ife students.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {SPATIAL_NICKNAMES.map((n, idx) => (
                <div key={idx} className="p-3 border border-slate-200 bg-slate-50 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-black text-xs text-oau-navy">{n.nickname}</h3>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 bg-white border border-slate-300 text-slate-600">
                      {n.category}
                    </span>
                  </div>
                  <p className="text-[11px] font-semibold text-slate-700">{n.officialName}</p>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1 border-t border-slate-200">
                    {n.meaning}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Campus Myth-Busters */}
          <div className="border border-red-300 bg-red-50/70 p-5 space-y-3">
            <div className="border-b border-red-200 pb-2 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-700" />
              <h2 className="text-sm font-bold text-red-950 uppercase tracking-wide">
                Institutional Myth-Busters (Don&apos;t Get Scammed)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CAMPUS_MYTHBUSTERS.map((m, idx) => (
                <div key={idx} className="bg-white border border-red-200 p-3 space-y-1">
                  <p className="font-black text-xs text-red-800">❌ {m.myth}</p>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    <strong className="text-emerald-800">✓ Fact: </strong>
                    {m.truth}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
