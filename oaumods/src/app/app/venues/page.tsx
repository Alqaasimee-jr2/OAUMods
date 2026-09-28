'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navigation, Coffee, AlertCircle, Building2, MapPin, Map as MapIcon } from 'lucide-react';
import { GeometricShape, WordAccent, ShapeType, ShapeColor } from '@/components/GeometricShapes';

interface VenueItem {
  code: string;
  name: string;
  location: string;
  scope: 'central' | 'science' | 'admin-social' | 'arts' | 'tech';
  scopeLabel: string;
  courses: string;
  capacity: string;
  directions: string;
  fresherTip: string;
  shape: ShapeType;
  shapeColor: ShapeColor;
}

export default function VenuesPage() {
  const [filter, setFilter] = useState<'all' | 'central' | 'science' | 'admin-social' | 'arts' | 'tech'>('all');

  const venues: VenueItem[] = [
    // Central / University-Wide Venues
    {
      code: 'ODUDUWA HALL',
      name: 'Oduduwa Hall & Foyer',
      location: 'Central Campus Core (Opposite Senate Building & Hezekiah Library)',
      scope: 'central',
      scopeLabel: 'Central / University-Wide Auditorium',
      courses: 'University Matriculation, Convocation ceremonies, Academic Symposiums, and Senate public lectures',
      capacity: 'Over 2,000 Tiered Seats & Acoustic Balcony',
      directions:
        'Heart of the university campus core. Easily reached from the main gate drop-off or walking across the central academic lawn from SUB.',
      fresherTip:
        'This is the grand ceremonial hall where your formal Matriculation ceremony takes place. Dress in official matriculation academic gowns and arrive very early to get inside seats.',
      shape: 'square',
      shapeColor: 'navy',
    },
    {
      code: 'AUD I & II',
      name: 'Amphitheatre Lecture Theatres (AUD I & AUD II)',
      location: 'Beside Oduduwa Hall & Central Afrika Amphitheatre',
      scope: 'central',
      scopeLabel: 'Central / University-Wide Theatre',
      courses: 'Campus-wide courses (GST 111, GST 112, LIB 101), general university electives, and large multi-faculty lectures',
      capacity: 'Dual Wing Auditoriums (AUD I Left Wing, AUD II Right Wing)',
      directions:
        'Walk towards Oduduwa Hall from the main university gate or SUB. Take the covered concrete stairs down into the Amphitheatre complex.',
      fresherTip:
        'Always verify whether your lecture timetable specifies AUD I or AUD II. AUD I is on the left wing; AUD II is on the right wing across the central open breezeway.',
      shape: 'triangle',
      shapeColor: 'gold',
    },
    {
      code: 'ODLT 1 & 2',
      name: 'Open Distance Learning Theatres (ODLT 1 & 2)',
      location: 'Afrika Amphitheatre / Sports Complex Axis',
      scope: 'central',
      scopeLabel: 'Central / University-Wide Theatre',
      courses: 'Multi-faculty lecture streams, campus-wide exams, evening tutorials, and academic conferences',
      capacity: 'Large Tiered Lecture Auditoriums with Independent Stages',
      directions:
        'Walk past Oduduwa Hall and the Amphitheatre towards the Directorate of Sports / Orente Grills axis.',
      fresherTip:
        'ODLT serves large classes from several faculties simultaneously. Note your assigned stream number (e.g. Stream A or Stream B) before walking in.',
      shape: 'hexagon',
      shapeColor: 'emerald',
    },

    // Faculty of Science Venues
    {
      code: 'BOOC',
      name: 'Babcock & Brown Ocean Complex (BOOC)',
      location: 'Faculty of Science Quadrangle (Behind Chemistry & Central Science)',
      scope: 'science',
      scopeLabel: 'Faculty of Science Specific',
      courses: 'CHM 101, PHY 101, BIO 101 (Science, Technology, Health Sciences, Pharmacy, Agriculture)',
      capacity: 'Large Tiered Lecture Auditorium',
      directions:
        'From Motion Ground, walk straight down the central T-paving pathway towards the Faculty of Science. Walk past the White House building into the rear courtyard.',
      fresherTip:
        'Because students from Science, Tech, Medicine, and Pharmacy converge here for General Chemistry and Physics, BOOC fills up quickly. Arrive at least 20 minutes early to secure a seat with clear audio and chalkboard visibility.',
      shape: 'hexagon',
      shapeColor: 'blue',
    },
    {
      code: 'WHITE HOUSE',
      name: 'White House (Faculty of Science)',
      location: 'Central Science Quadrangle',
      scope: 'science',
      scopeLabel: 'Faculty of Science Specific',
      courses: 'MTH 101, MTH 102, Chemistry and Physics practical laboratory sessions',
      capacity: 'Multi-Floor Complex with Multiple Lecture Halls & Labs',
      directions:
        'Located in the heart of the Science area. Easily recognized by its white painted pillars, elevated walkways, and open corridors.',
      fresherTip:
        'White House houses multiple lecture rooms (e.g., WH 01, WH 02) and ground-floor chemistry/physics laboratories. Always check the department notice board for exact room allocations.',
      shape: 'square',
      shapeColor: 'navy',
    },
    {
      code: 'CHEM LT',
      name: 'Chemistry Lecture Theatre (Chem LT)',
      location: 'Ground Floor, Department of Chemistry (Science Complex)',
      scope: 'science',
      scopeLabel: 'Faculty of Science Specific',
      courses: 'Departmental Chemistry lectures and introductory laboratory briefings',
      capacity: 'Medium Tiered Lecture Hall',
      directions:
        'Enter through the main Chemistry department corridor near Central Science.',
      fresherTip:
        'Laboratory safety coats and protective goggles are strictly mandatory before entering Chemistry labs in this corridor.',
      shape: 'circle',
      shapeColor: 'emerald',
    },
    {
      code: 'GEOL LT',
      name: 'Geology Lecture Theatre (Geol LT)',
      location: 'Earth Sciences Wing (near Natural History Museum)',
      scope: 'science',
      scopeLabel: 'Faculty of Science Specific',
      courses: 'Geology lectures, Earth Sciences seminars, and Science elective classes',
      capacity: 'Medium Tiered Lecture Hall',
      directions:
        'Follow the walkway past the Faculty of Agriculture towards the distinctive Natural History Museum building.',
      fresherTip:
        'Well ventilated and quieter than BOOC. A popular quiet study and revision venue for students in the evenings.',
      shape: 'hexagon',
      shapeColor: 'amber',
    },

    // Faculty of Administration & Social Sciences Venues
    {
      code: '1000-SEATER',
      name: '1000-Seater Lecture Theatre',
      location: 'Between Faculty of Social Sciences and Faculty of Administration',
      scope: 'admin-social',
      scopeLabel: 'Social Sciences & Administration Axis',
      courses: 'ECN 101, POL 101, SOC 101, SSC 105, and campus-wide general examinations',
      capacity: '1,000 Tiered Auditorium Seats',
      directions:
        'Walk past Hezekiah Library down towards the Social Sciences quadrangle; located right at the central entrance.',
      fresherTip:
        'Due to its expansive length, hearing from the back row can be difficult during large classes. Aim for middle or front seats for clear comprehension.',
      shape: 'square',
      shapeColor: 'blue',
    },
    {
      code: 'FIRST BANK LT',
      name: 'First Bank Lecture Theatre (Admin LT)',
      location: 'Faculty of Administration Quadrangle (Opposite Pit Theatre)',
      scope: 'admin-social',
      scopeLabel: 'Faculty of Administration Specific',
      courses: 'ACC 101, BUS 101, PAD 101, and Management Sciences lectures',
      capacity: 'Medium-Large Tiered Lecture Auditorium',
      directions:
        'Walk down the flight of stairs from the Hezekiah Library walkway into the Faculty of Administration courtyard.',
      fresherTip:
        'Equipped with tiered wooden bench desks. Accounting and Public Administration students spend much of their lecture hours here.',
      shape: 'triangle',
      shapeColor: 'gold',
    },

    // Faculty of Arts Venues
    {
      code: 'HLT 1 & 2',
      name: 'Humanities Lecture Theatres (HLT 1 & HLT 2)',
      location: 'Faculty of Arts Humanities Blocks',
      scope: 'arts',
      scopeLabel: 'Faculty of Arts Specific',
      courses: 'LIT 101, ENG 101, HIS 101, PHL 101, Foreign Languages, and Humanities electives',
      capacity: 'Twin Tiered Auditoriums inside the Arts Complex',
      directions:
        'Walk through the Faculty of Arts courtyard near the Pit Theatre and Department of English.',
      fresherTip:
        'Humanities streams for English and Literature hold here. Always confirm your assigned lecture group on the departmental notice board.',
      shape: 'circle',
      shapeColor: 'gold',
    },
    {
      code: 'PIT THEATRE',
      name: 'Pit Theatre',
      location: 'Between Faculty of Arts and Faculty of Administration',
      scope: 'arts',
      scopeLabel: 'Faculty of Arts (Dramatic Arts Axis)',
      courses: 'Dramatic Arts productions, stage acting rehearsals, play directorships, and cultural performances',
      capacity: 'Iconic Sunken Open-Air Amphitheatre Layout',
      directions:
        'Directly adjacent to the Department of Dramatic Arts and Humanities Block 1.',
      fresherTip:
        'Historic home of Great Ife stagecraft and cultural performances. Frequented for evening student stage plays and department drama rehearsals.',
      shape: 'triangle',
      shapeColor: 'amber',
    },

    // Faculty of Technology & EDM Venues
    {
      code: 'SPIDER HOUSE',
      name: 'Spider House (Faculty of Technology)',
      location: 'Faculty of Technology complex (Behind Hezekiah Library)',
      scope: 'tech',
      scopeLabel: 'Faculty of Technology Specific',
      courses: 'TPD 101, introductory engineering classes, and departmental technical briefings',
      capacity: 'Open Covered Architectural Complex with Concrete Arches',
      directions:
        'Follow the covered pedestrian walkway past the central library towards the Technology quadrangle.',
      fresherTip:
        'Nicknamed "Spider House" by generations of Great Ife students due to its arched concrete pillars resembling spider legs. A distinctive engineering landmark.',
      shape: 'triangle',
      shapeColor: 'navy',
    },
  ];

  const walkingRoutes = [
    {
      from: 'Angola Hall (Male)',
      to: 'Faculty of Science & BOOC',
      time: '10–12 minutes walk',
      route: 'Exit Angola gate -> Walk past Motion Ground -> Cross the main paved road -> Take the T-paving pathway straight into Central Science.',
      shape: 'square' as const,
      shapeColor: 'navy' as const,
    },
    {
      from: 'Mozambique Hall (Female)',
      to: 'Faculty of Arts & Hezekiah Library',
      time: '8–10 minutes walk',
      route: 'Exit Moz gate -> Follow the paved pedestrian sidewalk towards SUB -> Cross past the Senate building lawn into Hezekiah Library and Faculty of Arts.',
      shape: 'circle' as const,
      shapeColor: 'gold' as const,
    },
    {
      from: 'Angola & Moz Halls',
      to: '1000-Seater & Social Sciences',
      time: '12–15 minutes walk',
      route: 'Take the main T-paving past Fajuyi Hall -> Walk through the central core past the Library -> Continue down towards Social Sciences.',
      shape: 'triangle' as const,
      shapeColor: 'blue' as const,
    },
  ];

  const foodSpots = [
    { name: 'Faculty Private Restaurants', location: 'Science (White House), Admin (Pit Theatre axis), Social Sciences', note: 'Save the trek to New Buka between lectures. Cooked rice, swallow, pastries, and cold drinks.' },
    { name: 'Orente Grills', location: 'Beside Afrika Amphitheatre & ODLT axis', note: 'Late afternoon and evening grilled catfish, chicken & chips, and shawarma.' },
    { name: 'SUB Cafeterias & New Buka', location: 'Student Union Building ground floor & Central Food Corridor', note: 'Large variety of traditional meals, swallows, and student groceries.' },
  ];

  const filteredVenues = venues.filter((v) => {
    if (filter === 'all') return true;
    return v.scope === filter;
  });

  return (
    <div className="space-y-8 text-left">
      {/* Header Banner */}
      <div className="relative border border-slate-200 bg-white p-6 space-y-2 overflow-hidden">
        <div className="absolute top-2 right-3 pointer-events-none opacity-20 hidden sm:block">
          <GeometricShape type="hexagon" color="blue" size="lg" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-blue-100 text-blue-900 border border-blue-300 text-xs font-bold uppercase tracking-wide">
          <GeometricShape type="triangle" color="blue" size="sm" />
          <span>CAMPUS SPATIAL ORIENTATION</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-oau-navy">
          <WordAccent shape="hexagon" color="blue">Campus</WordAccent> Lecture Venues &amp; Theatres Directory
        </h1>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-2xl">
          Comprehensive spatial guide to university lecture halls — from central institutional auditoriums
          to faculty-specific lecture complexes across Great Ife.
        </p>
      </div>

      {/* Institutional Reality Callout: Venues Serve the Whole School */}
      <div className="border border-blue-200 bg-blue-50/70 p-5 space-y-2 text-xs text-slate-800">
        <div className="flex items-center gap-2 text-oau-navy font-black uppercase tracking-wide text-xs sm:text-sm">
          <Building2 className="w-4 h-4 text-campus-blue shrink-0" />
          <span>Institutional Reality: Campus Venues Serve the Entire University</span>
        </div>
        <p className="leading-relaxed">
          There is no such term as <em>&ldquo;100L venues&rdquo;</em>. All lecture theatres, auditoriums, and halls serve the entire university across all academic levels.
          Some venues are <strong>central and university-wide</strong> (such as Oduduwa Hall, AUD I &amp; II, ODLT 1 &amp; 2, and the Amphitheatre), while other venues are{' '}
          <strong>anchored within specific faculties</strong> (such as BOOC and White House in Science, First Bank LT in Administration, 1000-Seater in Social Sciences, HLT in Arts, and Spider House in Technology).
          Freshers attend campus-wide courses in central theatres and faculty core classes in their respective faculty halls.
        </p>
      </div>

      {/* Interactive Map Callout */}
      <div className="border border-emerald-300 bg-emerald-50/80 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <span className="font-bold text-xs text-emerald-950 flex items-center gap-1.5 uppercase tracking-wide">
            <MapIcon className="w-4 h-4 text-emerald-700" />
            Prefer Visual Spatial Navigation?
          </span>
          <p className="text-xs text-slate-700">
            Switch to the <strong>Interactive Campus Map</strong> to trace animated walking paths from Angola and Mozambique Halls directly to BOOC, AUD, White House, or the Health Centre.
          </p>
        </div>
        <Link
          href="/app/map"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 transition-colors shadow-xs"
        >
          <span>Open Interactive Map</span>
          <MapIcon className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Walking Routes from Hostels */}
      <div className="border border-slate-200 bg-white p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-oau-navy">
          <Navigation className="w-4 h-4 text-campus-blue" />
          <h2 className="text-base font-bold uppercase tracking-wide">
            Walking Routes from Angola &amp; Mozambique Halls
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {walkingRoutes.map((r, i) => (
            <div key={i} className="relative p-4 border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-oau-navy flex items-center gap-1.5">
                  <GeometricShape type={r.shape} color={r.shapeColor} size="sm" />
                  <span>{r.from}</span>
                </span>
                <span className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2">
                  {r.time}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-800">To: {r.to}</p>
              <p className="text-xs text-slate-600 leading-relaxed pt-1 border-t border-slate-200">
                {r.route}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Directory of Lecture Theatres with Scope Filter */}
      <div className="space-y-4">
        <div className="border-b border-slate-200 pb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-oau-navy uppercase tracking-wide">
              Campus Lecture Theatres &amp; Auditoriums Directory
            </h2>
            <p className="text-xs text-slate-600">
              Filter by central university auditoriums or specific faculty complexes.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500 self-start sm:self-auto">
            Showing {filteredVenues.length} of {venues.length} venues
          </span>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 pt-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-bold transition-colors ${
              filter === 'all'
                ? 'bg-oau-navy text-white'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            All Venues ({venues.length})
          </button>
          <button
            onClick={() => setFilter('central')}
            className={`px-3 py-1.5 text-xs font-bold transition-colors ${
              filter === 'central'
                ? 'bg-oau-navy text-white'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Central University Auditoriums (Oduduwa, AUD, ODLT)
          </button>
          <button
            onClick={() => setFilter('science')}
            className={`px-3 py-1.5 text-xs font-bold transition-colors ${
              filter === 'science'
                ? 'bg-oau-navy text-white'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Faculty of Science (BOOC, White House)
          </button>
          <button
            onClick={() => setFilter('admin-social')}
            className={`px-3 py-1.5 text-xs font-bold transition-colors ${
              filter === 'admin-social'
                ? 'bg-oau-navy text-white'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Social Sciences &amp; Admin (1000-Seater, First Bank LT)
          </button>
          <button
            onClick={() => setFilter('arts')}
            className={`px-3 py-1.5 text-xs font-bold transition-colors ${
              filter === 'arts'
                ? 'bg-oau-navy text-white'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Faculty of Arts (HLT, Pit Theatre)
          </button>
          <button
            onClick={() => setFilter('tech')}
            className={`px-3 py-1.5 text-xs font-bold transition-colors ${
              filter === 'tech'
                ? 'bg-oau-navy text-white'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Faculty of Technology (Spider House)
          </button>
        </div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredVenues.map((v) => (
            <div key={v.code} className="relative border border-slate-200 bg-white p-5 space-y-3">
              <div className="border-b border-slate-100 pb-2.5 flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black text-campus-blue uppercase tracking-wider flex items-center gap-1.5">
                      <GeometricShape type={v.shape} color={v.shapeColor} size="sm" />
                      <span>{v.code}</span>
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 border border-slate-300 text-slate-700">
                      {v.scopeLabel}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-oau-navy leading-snug">{v.name}</h3>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{v.location}</span>
                  </p>
                </div>
                <div className="opacity-25 pointer-events-none hidden sm:block shrink-0">
                  <GeometricShape type={v.shape} color={v.shapeColor} size="md" variant="outline" />
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-700">
                <p>
                  <strong className="text-slate-900">Scale / Capacity: </strong>
                  {v.capacity}
                </p>
                <p>
                  <strong className="text-slate-900">Key Usage / Courses: </strong>
                  {v.courses}
                </p>
                <p>
                  <strong className="text-slate-900">How to Locate: </strong>
                  {v.directions}
                </p>
              </div>

              <div className="p-3 bg-amber-50/70 border border-amber-200 text-xs text-slate-800 space-y-0.5">
                <span className="font-bold text-amber-900 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                  Student Practical Advice:
                </span>
                <p className="leading-relaxed">{v.fresherTip}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Food Spots Near Venues */}
      <div className="border border-slate-200 bg-white p-6 space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-oau-navy">
          <Coffee className="w-4 h-4 text-amber-600" />
          <h2 className="text-base font-bold uppercase tracking-wide">
            Where to Eat &amp; Refresh Near Lecture Corridors
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {foodSpots.map((f, i) => (
            <div key={i} className="p-4 border border-slate-200 bg-slate-50 space-y-1 text-xs">
              <h4 className="font-bold text-sm text-slate-900">{f.name}</h4>
              <p className="font-semibold text-slate-600">{f.location}</p>
              <p className="text-slate-600 pt-1 border-t border-slate-200 leading-relaxed">{f.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
