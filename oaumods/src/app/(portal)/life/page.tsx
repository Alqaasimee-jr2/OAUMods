'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  HeartHandshake,
  Trophy,
  Users,
  GraduationCap,
  Calendar,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { GeometricShape, WordAccent } from '@/components/GeometricShapes';
import {
  FAITH_COMMUNITIES,
  RELIGIOUS_REGULATIONS,
  SPORTS_FACILITIES,
  SPORTS_DISCIPLINES,
  HOW_TO_JOIN_SPORTS,
  EXTRACURRICULAR_CLUBS,
} from '@/data/studentLife';
import {
  ACADEMIC_CALENDAR_STRUCTURE,
  STUDENT_LIFECYCLE_STAGES,
} from '@/data/campusHistoryAndActivities';

export default function CampusLifePage() {
  const [activeSection, setActiveSection] = useState<'faith' | 'sports' | 'activities' | 'clubs'>('faith');
  const [faithFilter, setFaithFilter] = useState<'all' | 'Islam' | 'Christianity'>('all');

  const filteredFaith = FAITH_COMMUNITIES.filter((item) => {
    if (faithFilter === 'all') return true;
    return item.faith === faithFilter;
  });

  return (
    <div className="space-y-10 text-left">
      {/* Header */}
      <div className="relative border border-slate-200 bg-white p-6 sm:p-8 overflow-hidden">
        <div className="absolute -top-6 -right-6 pointer-events-none opacity-20 hidden sm:block">
          <GeometricShape type="hexagon" color="gold" size="xl" variant="outline" />
        </div>
        <div className="absolute bottom-2 right-1/3 pointer-events-none opacity-15 hidden sm:block">
          <GeometricShape type="triangle" color="blue" size="lg" />
        </div>

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-oau-navy bg-amber-100 border border-amber-300 px-2 py-0.5">
              Faith, Athletics & Student Life
            </span>
            <span className="text-xs text-slate-500">• Great Ife Ecosystem</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-oau-navy leading-tight">
            Campus <WordAccent shape="hexagon" color="gold">Faith Communities</WordAccent>, Sports & Extracurriculars
          </h1>
          <p className="text-sm text-slate-700 leading-relaxed">
            At Obafemi Awolowo University, intellectual rigor is matched by vibrant spiritual life, championship collegiate athletics, and student-run media and debating societies. Explore verified places of worship, world-class athletic facilities, and campus organizations.
          </p>
        </div>
      </div>

      {/* Main Section Navigation Bar */}
      <div className="flex border-b border-slate-300 gap-2 overflow-x-auto pb-px">
        <button
          onClick={() => setActiveSection('faith')}
          className={`px-4 py-3 text-xs sm:text-sm font-black border-t-2 border-l border-r -mb-px flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeSection === 'faith'
              ? 'border-t-oau-navy border-slate-300 bg-white text-oau-navy'
              : 'border-transparent text-slate-600 hover:text-oau-navy bg-slate-100'
          }`}
        >
          <HeartHandshake className="w-4 h-4 text-emerald-700" />
          <span>Faith & Places of Worship</span>
          <span className="text-[10px] font-bold px-1.5 py-0.2 bg-slate-200 text-slate-800">
            {FAITH_COMMUNITIES.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSection('sports')}
          className={`px-4 py-3 text-xs sm:text-sm font-black border-t-2 border-l border-r -mb-px flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeSection === 'sports'
              ? 'border-t-oau-navy border-slate-300 bg-white text-oau-navy'
              : 'border-transparent text-slate-600 hover:text-oau-navy bg-slate-100'
          }`}
        >
          <Trophy className="w-4 h-4 text-amber-700" />
          <span>Sports & OAU Giants</span>
          <span className="text-[10px] font-bold px-1.5 py-0.2 bg-slate-200 text-slate-800">
            {SPORTS_FACILITIES.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSection('activities')}
          className={`px-4 py-3 text-xs sm:text-sm font-black border-t-2 border-l border-r -mb-px flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeSection === 'activities'
              ? 'border-t-oau-navy border-slate-300 bg-white text-oau-navy'
              : 'border-transparent text-slate-600 hover:text-oau-navy bg-slate-100'
          }`}
        >
          <Calendar className="w-4 h-4 text-purple-700" />
          <span>School Activities & Calendar</span>
          <span className="text-[10px] font-bold px-1.5 py-0.2 bg-slate-200 text-slate-800">
            Harmattan / Rain
          </span>
        </button>

        <button
          onClick={() => setActiveSection('clubs')}
          className={`px-4 py-3 text-xs sm:text-sm font-black border-t-2 border-l border-r -mb-px flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeSection === 'clubs'
              ? 'border-t-oau-navy border-slate-300 bg-white text-oau-navy'
              : 'border-transparent text-slate-600 hover:text-oau-navy bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4 text-blue-700" />
          <span>Journalism, Debates & Societies</span>
          <span className="text-[10px] font-bold px-1.5 py-0.2 bg-slate-200 text-slate-800">
            {EXTRACURRICULAR_CLUBS.length}
          </span>
        </button>
      </div>

      {/* SECTION 1: FAITH & PLACES OF WORSHIP */}
      {activeSection === 'faith' && (
        <div className="space-y-8">
          {/* Institutional Reality Callout */}
          <div className="border border-blue-200 bg-blue-50/70 p-5 space-y-2 text-xs text-slate-800">
            <span className="font-bold text-blue-950 flex items-center gap-1.5 uppercase tracking-wide">
              <ShieldCheck className="w-4 h-4 text-oau-navy" />
              Freedom of Conscience & Academic Safety Net
            </span>
            <p className="leading-relaxed">
              Faith communities at Great Ife serve as essential social safety nets. Beyond spiritual worship, both the Muslim Students’ Society of Nigeria (MSSN) and the University Joint Christian Mission (UJCM) fellowships organize <strong>free Part 1 Academic Tutorial Clinics</strong> (MTH 101, PHY 101, CHM 101), provide indigent accommodation relief, and operate emergency welfare support for incoming freshers.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600">Filter by Faith:</span>
              <div className="flex gap-1.5">
                {(['all', 'Islam', 'Christianity'] as const).map((faith) => (
                  <button
                    key={faith}
                    onClick={() => setFaithFilter(faith)}
                    className={`px-3 py-1 text-xs font-bold border transition-colors ${
                      faithFilter === faith
                        ? 'bg-oau-navy text-white border-oau-navy'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {faith === 'all' ? 'All Communities' : faith}
                  </button>
                ))}
              </div>
            </div>
            <span className="text-xs text-slate-500 font-semibold">
              Showing {filteredFaith.length} of {FAITH_COMMUNITIES.length} bodies
            </span>
          </div>

          {/* Communities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredFaith.map((c) => (
              <div
                key={c.id}
                className="border border-slate-200 bg-white p-5 space-y-4 hover:border-slate-300 transition-colors"
              >
                <div className="border-b border-slate-200 pb-3 flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <GeometricShape type={c.shape} color={c.shapeColor} size="sm" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                        {c.category}
                      </span>
                    </div>
                    <h2 className="text-base font-black text-slate-900 leading-snug">{c.name}</h2>
                  </div>
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 border ${
                      c.faith === 'Islam'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-blue-50 text-blue-800 border-blue-300'
                    }`}
                  >
                    {c.faith}
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">{c.description}</p>

                {/* Key Venues */}
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-slate-900 block">Primary Venues & Mosques:</span>
                  <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                    {c.keyVenues.map((v, i) => (
                      <li key={i}>{v}</li>
                    ))}
                  </ul>
                </div>

                {/* Flagship Programs */}
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-slate-900 block">Flagship Campus Events:</span>
                  <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                    {c.flagshipPrograms.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>

                {/* Academic & Welfare */}
                <div className="space-y-1 text-xs bg-slate-50 border border-slate-200 p-2.5">
                  <span className="font-bold text-oau-navy block flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-amber-700" />
                    Student Academic & Welfare Support:
                  </span>
                  <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                    {c.academicAndWelfare.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>

                {c.meetingTimes && (
                  <div className="text-[11px] text-slate-500 border-t border-slate-100 pt-2 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{c.meetingTimes}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* DSA Regulations & Harmony Rules */}
          <div className="border border-amber-300 bg-amber-50/80 p-5 space-y-3 text-xs text-slate-800">
            <span className="font-bold text-amber-950 flex items-center gap-1.5 uppercase tracking-wide">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              Division of Student Affairs (DSA) Religious Decorum & Venue Rules
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {RELIGIOUS_REGULATIONS.map((r, i) => (
                <div key={i} className="border border-amber-200 bg-white p-3 space-y-1">
                  <p className="font-bold text-slate-900 text-xs">{r.title}</p>
                  <p className="text-slate-600 leading-relaxed text-[11px]">{r.rule}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: SPORTS & OAU GIANTS */}
      {activeSection === 'sports' && (
        <div className="space-y-8">
          {/* Header Banner */}
          <div className="border border-slate-200 bg-white p-5 space-y-2 text-xs text-slate-800">
            <span className="font-bold text-oau-navy flex items-center gap-1.5 uppercase tracking-wide">
              <Trophy className="w-4 h-4 text-amber-700" />
              The OAU Giants & Championship Facilities
            </span>
            <p className="leading-relaxed">
              The Directorate of Sports manages one of West Africa’s most complete collegiate sports installations. Great Ife pioneered the Nigerian Universities Games Association (NUGA) and has hosted the games four times (1970, 1973, 1984, and 2014). Students can participate recreationally or compete for varsity honors.
            </p>
          </div>

          {/* Facilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SPORTS_FACILITIES.map((f) => (
              <div key={f.id} className="border border-slate-200 bg-white p-5 space-y-3">
                <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GeometricShape type={f.shape} color={f.shapeColor} size="sm" />
                    <h2 className="font-black text-sm text-slate-900">{f.name}</h2>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">Specs: </strong>
                  {f.specs}
                </p>
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-slate-900 block">Key Activities:</span>
                  <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                    {f.activities.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-slate-200 pt-2 text-[11px] text-slate-500">
                  <strong className="text-slate-700">Access: </strong>
                  {f.accessRule}
                </div>
              </div>
            ))}
          </div>

          {/* 15+ Disciplines */}
          <div className="border border-slate-200 bg-white p-5 space-y-3">
            <h2 className="text-sm font-bold text-oau-navy uppercase tracking-wide border-b border-slate-200 pb-2">
              Competitive Sports Disciplines Available
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {SPORTS_DISCIPLINES.map((d, i) => (
                <div key={i} className="border border-slate-200 bg-slate-50 p-3 space-y-1">
                  <p className="font-bold text-xs text-slate-900">{d.category}</p>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{d.items}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How to Join */}
          <div className="border border-slate-200 bg-slate-50 p-5 space-y-3">
            <h2 className="text-sm font-bold text-oau-navy uppercase tracking-wide border-b border-slate-200 pb-2">
              How New Students Can Join Teams & Compete
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {HOW_TO_JOIN_SPORTS.map((h, i) => (
                <div key={i} className="border border-slate-200 bg-white p-4 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <h3 className="font-black text-xs text-slate-900">{h.step}</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-6">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: SCHOOL ACTIVITIES, CALENDAR & STUDENT LIFECYCLE */}
      {activeSection === 'activities' && (
        <div className="space-y-8">
          {/* Calendar Banner */}
          <div className="border border-purple-200 bg-purple-50/70 p-5 space-y-2 text-xs text-slate-800">
            <span className="font-bold text-purple-950 flex items-center gap-1.5 uppercase tracking-wide">
              <Calendar className="w-4 h-4 text-purple-800" />
              The Authentic Great Ife Academic Calendar
            </span>
            <p className="leading-relaxed">
              Obafemi Awolowo University designates its semesters after the prevailing natural weather seasons: the <strong>Harmattan Semester</strong> (First Semester) and the <strong>Rain Semester</strong> (Second Semester). Understanding this seasonal rhythm is essential for course registration, continuous assessment tests, and exam preparation.
            </p>
          </div>

          {/* Harmattan vs Rain Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-slate-200 bg-white p-5 space-y-3">
              <div className="border-b border-slate-200 pb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 bg-purple-100 px-1.5 py-0.5">
                  1st Semester
                </span>
                <h3 className="font-black text-base text-slate-900 mt-1">
                  {ACADEMIC_CALENDAR_STRUCTURE.harmattanSemester.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {ACADEMIC_CALENDAR_STRUCTURE.harmattanSemester.timing}
                </p>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {ACADEMIC_CALENDAR_STRUCTURE.harmattanSemester.milestones.map((m, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-700 mt-1.5 shrink-0" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-slate-200 bg-white p-5 space-y-3">
              <div className="border-b border-slate-200 pb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 bg-blue-100 px-1.5 py-0.5">
                  2nd Semester
                </span>
                <h3 className="font-black text-base text-slate-900 mt-1">
                  {ACADEMIC_CALENDAR_STRUCTURE.rainSemester.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {ACADEMIC_CALENDAR_STRUCTURE.rainSemester.timing}
                </p>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {ACADEMIC_CALENDAR_STRUCTURE.rainSemester.milestones.map((m, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-700 mt-1.5 shrink-0" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Core Academic Regulations */}
          <div className="border border-amber-300 bg-amber-50/80 p-5 space-y-3 text-xs text-slate-800">
            <span className="font-bold text-amber-950 flex items-center gap-1.5 uppercase tracking-wide">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              Core Academic Survival Regulations & Rules
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {ACADEMIC_CALENDAR_STRUCTURE.coreRules.map((r, i) => (
                <div key={i} className="border border-amber-200 bg-white p-3 space-y-1">
                  <p className="font-bold text-slate-900 text-xs">{r.title}</p>
                  <p className="text-slate-600 leading-relaxed text-[11px]">{r.rule}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Student Social Lifecycle & Milestone Traditions */}
          <div className="space-y-4">
            <div className="border-b border-slate-200 pb-2">
              <h2 className="text-base font-bold text-oau-navy uppercase tracking-wide flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-700" />
                The Great Ife Student Social Lifecycle & Rites of Passage
              </h2>
              <p className="text-xs text-slate-600">
                From timid 100-level arrival to white shirt signatures on Motion Ground and professional induction oaths.
              </p>
            </div>

            <div className="space-y-6">
              {STUDENT_LIFECYCLE_STAGES.map((s, idx) => (
                <div key={idx} className="border border-slate-200 bg-white p-5 space-y-4">
                  <div className="border-b border-slate-200 pb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-oau-navy bg-slate-100 border border-slate-300 px-2 py-0.5">
                        {s.level}
                      </span>
                      <h3 className="font-black text-base text-slate-900 mt-1">{s.stage}</h3>
                    </div>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{s.summary}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {s.traditions.map((t, tIdx) => (
                      <div key={tIdx} className="p-3 border border-slate-200 bg-slate-50 space-y-1">
                        <h4 className="font-black text-xs text-oau-navy">{t.title}</h4>
                        <p className="text-[11px] text-slate-600 leading-relaxed">{t.details}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: CLUBS, JOURNALISM & SOCIETIES */}
      {activeSection === 'clubs' && (
        <div className="space-y-8">
          <div className="border border-slate-200 bg-white p-5 space-y-2 text-xs text-slate-800">
            <span className="font-bold text-oau-navy flex items-center gap-1.5 uppercase tracking-wide">
              <Users className="w-4 h-4 text-blue-700" />
              Student Journalism, Oratory & Democratic Tradition
            </span>
            <p className="leading-relaxed">
              Great Ife is celebrated for its fierce intellectual culture. The Association of Campus Journalists (ACJ) runs independent hall press boards, while debating societies represent the university nationally in the All-Nigeria Universities Debating Championship (ANUDC).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EXTRACURRICULAR_CLUBS.map((club) => (
              <div key={club.id} className="border border-slate-200 bg-white p-5 space-y-4">
                <div className="border-b border-slate-200 pb-2 flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <GeometricShape type={club.shape} color={club.shapeColor} size="sm" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                        {club.category}
                      </span>
                    </div>
                    <h2 className="text-base font-black text-slate-900">{club.name}</h2>
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">{club.summary}</p>

                <div className="space-y-1 text-xs">
                  <span className="font-bold text-slate-900 block">Key Units / Events:</span>
                  <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                    {club.keyUnitsOrEvents.map((u, i) => (
                      <li key={i}>{u}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-2.5 text-xs text-slate-700">
                  <strong className="text-slate-900">How to Join: </strong>
                  {club.howToJoin}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Navigation Callout */}
      <div className="border border-slate-200 bg-white p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="font-black text-sm text-oau-navy">Ready for Daily Freshman Survival?</h2>
          <p className="text-xs text-slate-600">
            Check our offline-ready companion app with clearance checklists, hostel anti-scam advisories, and the 5.0 CGPA simulator.
          </p>
        </div>
        <Link
          href="/app"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-oau-navy bg-amber-400 hover:bg-amber-300 border border-amber-500 whitespace-nowrap"
        >
          <span>Launch OAUMods App</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
