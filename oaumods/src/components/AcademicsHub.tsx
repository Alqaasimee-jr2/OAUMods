'use client';

import React, { useState, useMemo } from 'react';
import {
  FACULTIES_DATA,
  UNIVERSAL_FILE_JACKET,
  FacultyData,
  DepartmentInfo,
} from '@/data/faculties';
import {
  Search,
  BookOpen,
  MapPin,
  Building,
  GraduationCap,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Layers,
  Sparkles,
  Compass,
} from 'lucide-react';

const NOTABLE_LECTURE_CENTRES = [
  {
    name: 'BOOC (Biological Sciences)',
    nick: 'Oduduwa Complex Ground Zero',
    location: 'Lower Ground Floor, Faculty of Science Quadrangle',
    primaryUse: 'CHM 101, BOT 101, ZOO 101, BIO 101 Mega Lectures',
  },
  {
    name: 'White House Auditorium & Labs',
    nick: 'Faculty of Science Flagship',
    location: 'Central Science Hill (White House building)',
    primaryUse: 'MTH 101, PHY 101, CHM practical sessions',
  },
  {
    name: 'ODLT 1 & 2 (Oduduwa Lecture Theatres)',
    nick: 'Amphitheatre Ring',
    location: 'Facing Afrika Amphitheatre & Library Circle',
    primaryUse: 'SER 001/002, General Faculty of Arts/Social Science lectures',
  },
  {
    name: 'First Bank Lecture Theatre',
    nick: 'Admin Giant',
    location: 'Faculty of Administration Quadrangle',
    primaryUse: 'ECN 101, ACC 101, Management Science classes',
  },
  {
    name: 'HSLT A, B & C (Health Sciences LTs)',
    nick: 'Medics Hive',
    location: 'Faculty of Basic Medical Sciences Enclave',
    primaryUse: 'Pre-clinical anatomy, physiology & nursing lectures',
  },
  {
    name: 'Civil & Mech Lecture Theatres',
    nick: 'Tech Workshop Corridor',
    location: 'Faculty of Technology Engineering Complex',
    primaryUse: 'MEC 101, ENR 101, Engineering Foundation courses',
  },
];

export default function AcademicsHub() {
  const [searchQuery, setSearchQuery] = useState('');
  const [durationFilter, setDurationFilter] = useState<string>('all');
  const [expandedFacultyId, setExpandedFacultyId] = useState<string | null>('science');
  const [activeTab, setActiveTab] = useState<'faculties' | 'theatres' | 'file-jacket'>('faculties');

  // Filter faculties and departments based on search query
  const filteredFaculties = useMemo(() => {
    return FACULTIES_DATA.filter((faculty) => {
      const matchesSearch =
        faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faculty.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faculty.departments.some((dept) =>
          dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dept.degree.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesDuration =
        durationFilter === 'all'
          ? true
          : faculty.departments.some((d) => d.duration.includes(durationFilter));

      return matchesSearch && matchesDuration;
    });
  }, [searchQuery, durationFilter]);

  const totalDepts = useMemo(() => {
    return FACULTIES_DATA.reduce((acc, f) => acc + f.departments.length, 0);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Universal Pale Yellow Alert Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#FEF9C3] dark:bg-[#2A2312] border-2 border-student-gold/60 p-4 sm:p-5 shadow-xs">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-amber-warn/15 text-amber-warn shrink-0">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-student-gold/30 text-amber-950 dark:text-student-gold">
                Official Great Ife Rule
              </span>
              <h2 className="text-sm sm:text-base font-bold text-amber-950 dark:text-amber-200">
                Universal File Jacket Mandate: Pale Yellow
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200/90 leading-relaxed">
              Every freshman across <strong>all 13 faculties</strong> must submit documents in a standard{' '}
              <span className="underline decoration-student-gold font-semibold">Pale Yellow flat manila file</span>.
              Do not buy blue, green, or red files—they will be rejected by faculty desk officers.
            </p>
          </div>
        </div>
      </div>

      {/* Segmented Sub-Nav */}
      <div className="flex rounded-xl bg-pale-blue/60 dark:bg-[#122033] p-1.5 border border-soft-blue-gray dark:border-[#1C2D44] text-xs sm:text-sm font-medium">
        <button
          onClick={() => setActiveTab('faculties')}
          className={`flex-1 py-2 sm:py-2.5 px-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
            activeTab === 'faculties'
              ? 'bg-pure-white dark:bg-[#0E1827] text-campus-blue dark:text-sky-blue font-bold shadow-xs'
              : 'text-muted-slate dark:text-slate-400 hover:text-deep-slate dark:hover:text-slate-200'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Faculties & Departments</span>
        </button>
        <button
          onClick={() => setActiveTab('theatres')}
          className={`flex-1 py-2 sm:py-2.5 px-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
            activeTab === 'theatres'
              ? 'bg-pure-white dark:bg-[#0E1827] text-campus-blue dark:text-sky-blue font-bold shadow-xs'
              : 'text-muted-slate dark:text-slate-400 hover:text-deep-slate dark:hover:text-slate-200'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Major Lecture Halls</span>
        </button>
        <button
          onClick={() => setActiveTab('file-jacket')}
          className={`flex-1 py-2 sm:py-2.5 px-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
            activeTab === 'file-jacket'
              ? 'bg-pure-white dark:bg-[#0E1827] text-amber-warn dark:text-student-gold font-bold shadow-xs'
              : 'text-muted-slate dark:text-slate-400 hover:text-deep-slate dark:hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>File Jacket Specs</span>
        </button>
      </div>

      {activeTab === 'faculties' && (
        <div className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-slate" />
              <input
                type="text"
                placeholder="Search faculty, department (e.g. Computer Science, Law, BOOC)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-soft-blue-gray dark:border-[#1C2D44] bg-pure-white dark:bg-[#0E1827] text-sm text-deep-slate dark:text-white focus:outline-hidden focus:ring-2 focus:ring-campus-blue/50"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={durationFilter}
                onChange={(e) => setDurationFilter(e.target.value)}
                aria-label="Filter by degree duration"
                className="px-3 py-2.5 rounded-xl border border-soft-blue-gray dark:border-[#1C2D44] bg-pure-white dark:bg-[#0E1827] text-xs sm:text-sm font-medium text-deep-slate dark:text-white focus:outline-hidden"
              >
                <option value="all">All Durations</option>
                <option value="4">4-Year Degrees</option>
                <option value="5">5-Year Degrees</option>
                <option value="6">6-Year Degrees</option>
              </select>
            </div>
          </div>

          {/* Quick Counter */}
          <div className="flex items-center justify-between text-xs text-muted-slate dark:text-slate-400 px-1">
            <span>
              Showing {filteredFaculties.length} faculties ({totalDepts} mapped departments)
            </span>
            <span className="flex items-center gap-1 text-campus-blue dark:text-sky-blue font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> Great Ife Academic Belt
            </span>
          </div>

          {/* Faculties Accordion List */}
          <div className="space-y-3">
            {filteredFaculties.map((faculty) => {
              const isExpanded = expandedFacultyId === faculty.id;
              return (
                <div
                  key={faculty.id}
                  className="rounded-2xl border border-soft-blue-gray dark:border-[#1C2D44] bg-pure-white dark:bg-[#0E1827] shadow-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setExpandedFacultyId(isExpanded ? null : faculty.id)}
                    className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 hover:bg-pale-blue/30 dark:hover:bg-[#122033]/50 transition-colors"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold text-oau-navy dark:text-white">
                          {faculty.name}
                        </h3>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-pale-blue dark:bg-campus-blue/20 text-campus-blue dark:text-sky-300 border border-soft-blue-gray dark:border-campus-blue/30">
                          {faculty.departments.length} Departments
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-muted-slate dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-campus-blue" />
                          {faculty.location}
                        </span>
                      </div>
                    </div>

                    <div className="p-1.5 rounded-lg bg-pale-blue dark:bg-white/5 text-muted-slate dark:text-slate-400 shrink-0">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-soft-blue-gray/50 dark:border-white/5 bg-pale-blue/20 dark:bg-[#09101A] p-4 sm:p-5 space-y-4">
                      {/* Dean's Office & Major Theatres */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-pure-white dark:bg-[#0E1827] border border-soft-blue-gray dark:border-[#1C2D44]">
                          <span className="text-muted-slate font-semibold block uppercase tracking-wider text-[10px]">
                            Dean's Office Location
                          </span>
                          <span className="font-medium text-deep-slate dark:text-white mt-0.5 block">
                            {faculty.deansOffice}
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-pure-white dark:bg-[#0E1827] border border-soft-blue-gray dark:border-[#1C2D44]">
                          <span className="text-muted-slate font-semibold block uppercase tracking-wider text-[10px]">
                            Primary Lecture Theatres
                          </span>
                          <span className="font-medium text-deep-slate dark:text-white mt-0.5 block">
                            {faculty.lectureTheatres.join(', ')}
                          </span>
                        </div>
                      </div>

                      {/* Department Cards */}
                      <div>
                        <span className="text-xs font-bold text-oau-navy dark:text-sky-blue block mb-2.5">
                          Department List & Degree Duration
                        </span>
                        <div className="grid grid-cols-1 gap-2">
                          {faculty.departments.map((dept, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-xl bg-pure-white dark:bg-[#0E1827] border border-soft-blue-gray dark:border-[#1C2D44] flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs"
                            >
                              <div>
                                <span className="text-sm font-semibold text-deep-slate dark:text-white block">
                                  {dept.name}
                                </span>
                                <span className="text-xs text-muted-slate dark:text-slate-400">
                                  {dept.degree}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 self-start sm:self-auto">
                                <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-pale-blue dark:bg-white/5 text-campus-blue dark:text-sky-300 border border-soft-blue-gray/60 dark:border-transparent">
                                  {dept.duration}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {filteredFaculties.length === 0 && (
              <div className="text-center py-12 p-6 rounded-2xl border border-dashed border-soft-blue-gray dark:border-zinc-700">
                <BookOpen className="w-10 h-10 text-muted-slate mx-auto mb-2" />
                <h4 className="text-sm font-semibold text-deep-slate dark:text-white">
                  No faculty or department found
                </h4>
                <p className="text-xs text-muted-slate mt-1">
                  Try adjusting your search terms or clearing the duration filter.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'theatres' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-pale-blue dark:bg-campus-blue/15 border border-campus-blue/30 text-xs sm:text-sm text-deep-slate dark:text-slate-200">
            <strong>Freshman Navigation Tip:</strong> Great Ife lecture halls have distinctive campus nicknames. Arrive early before morning lectures to secure a comfortable seat.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {NOTABLE_LECTURE_CENTRES.map((theatre, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-soft-blue-gray dark:border-[#1C2D44] bg-pure-white dark:bg-[#0E1827] space-y-2.5 shadow-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-oau-navy dark:text-white">
                      {theatre.name}
                    </h4>
                    <span className="text-xs font-semibold text-campus-blue dark:text-sky-300">
                      "{theatre.nick}"
                    </span>
                  </div>
                </div>

                <div className="text-xs space-y-1 text-muted-slate dark:text-slate-300">
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-campus-blue shrink-0 mt-0.5" />
                    <span>{theatre.location}</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-muted-slate/80 dark:text-slate-400">
                    <GraduationCap className="w-3.5 h-3.5 text-student-gold shrink-0 mt-0.5" />
                    <span>{theatre.primaryUse}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'file-jacket' && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl border-2 border-student-gold/60 bg-[#FEF9C3] dark:bg-[#2A2312] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-16 rounded-lg bg-amber-200 border-2 border-amber-400 flex items-center justify-center font-bold text-amber-950 text-xs shadow-xs">
                FILE
              </div>
              <div>
                <h4 className="text-base font-bold text-amber-950 dark:text-amber-200">
                  Standard Flat Manila File (Pale Yellow)
                </h4>
                <p className="text-xs text-amber-900 dark:text-student-gold">
                  Obtainable at the SUB market, campus bookshops, or student stationery centers.
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-amber-950 dark:text-slate-200">
              <p className="font-semibold text-amber-950 dark:text-amber-200">
                Front Cover Inscription Template (Write neatly in black permanent marker):
              </p>
              <div className="p-3.5 rounded-xl bg-pure-white dark:bg-[#0E1827] border border-student-gold/40 font-mono text-xs space-y-1 text-deep-slate dark:text-zinc-100">
                <div>NAME: [SURNAME, First Name Middle Name]</div>
                <div>JAMB REG NO: [e.g. 202612345678AB]</div>
                <div>MATRIC NO: [Leave blank if pending or fill when assigned]</div>
                <div>FACULTY: [e.g. Faculty of Technology]</div>
                <div>DEPARTMENT: [e.g. Computer Science & Engineering]</div>
                <div>SESSION: [2025/2026 Academic Session]</div>
                <div>PHONE NO: [080XXXXXXXX]</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-200/50 dark:bg-amber-900/40 text-xs text-amber-950 dark:text-amber-200 space-y-1">
              <strong>Crucial Rules from Academic Affairs:</strong>
              <ul className="list-disc list-inside space-y-0.5 pl-1">
                <li>Never laminate your original certificates (WAEC, JAMB Admission Letter).</li>
                <li>Fasten photocopies inside using paper fasteners or plastic tags; avoid destructive stapling.</li>
                <li>Always prepare 3 identical file sets: 1 for Faculty Officer, 1 for Dept Officer, 1 for your personal record.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
