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
    capacity: '700+ seats',
    primaryUse: 'CHM 101, BOT 101, ZOO 101, BIO 101 Mega Lectures',
  },
  {
    name: 'White House Auditorium & Labs',
    nick: 'Faculty of Science Flagship',
    location: 'Central Science Hill (White House building)',
    capacity: '800+ seats + 4 Chemistry/Physics Labs',
    primaryUse: 'MTH 101, PHY 101, CHM practical sessions',
  },
  {
    name: 'ODLT 1 & 2 (Oduduwa Lecture Theatres)',
    nick: 'Amphitheatre Ring',
    location: 'Facing Afrika Amphitheatre & Library Circle',
    capacity: '600 seats each',
    primaryUse: 'SER 001/002, General Faculty of Arts/Social Science lectures',
  },
  {
    name: 'First Bank Lecture Theatre',
    nick: 'Admin Giant',
    location: 'Faculty of Administration Quadrangle',
    capacity: '550 seats',
    primaryUse: 'ECN 101, ACC 101, Management Science classes',
  },
  {
    name: 'HSLT A, B & C (Health Sciences LTs)',
    nick: 'Medics Hive',
    location: 'Faculty of Basic Medical Sciences Enclave',
    capacity: '350 seats each',
    primaryUse: 'Pre-clinical anatomy, physiology & nursing lectures',
  },
  {
    name: 'Civil & Mech Lecture Theatres',
    nick: 'Tech Workshop Corridor',
    location: 'Faculty of Technology Engineering Complex',
    capacity: '400 seats each',
    primaryUse: 'MEC 101, ENR 101, Engineering Foundation courses',
  },
];

export default function AcademicsHub() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFacultyId, setSelectedFacultyId] = useState<string | null>(null);
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
      <div className="relative overflow-hidden rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 p-4 sm:p-5 backdrop-blur-md">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 shrink-0">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300">
                Official Great Ife Rule
              </span>
              <h2 className="text-sm sm:text-base font-bold text-amber-900 dark:text-amber-200">
                Universal File Jacket Mandate: Pale Yellow
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-300/90 leading-relaxed">
              Every freshman across <strong>all 13 faculties</strong> must submit documents in a standard{' '}
              <span className="underline decoration-amber-500 font-semibold">Pale Yellow flat manila file</span>.
              Do not buy blue, green, or red files—they will be rejected by faculty desk officers.
            </p>
          </div>
        </div>
      </div>

      {/* Segmented Sub-Nav */}
      <div className="flex rounded-xl bg-zinc-100 dark:bg-zinc-800/80 p-1.5 border border-zinc-200 dark:border-zinc-700/60 text-xs sm:text-sm font-medium">
        <button
          onClick={() => setActiveTab('faculties')}
          className={`flex-1 py-2 sm:py-2.5 px-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
            activeTab === 'faculties'
              ? 'bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 font-bold shadow-xs'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>14 Faculties & 60+ Depts</span>
        </button>
        <button
          onClick={() => setActiveTab('theatres')}
          className={`flex-1 py-2 sm:py-2.5 px-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
            activeTab === 'theatres'
              ? 'bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 font-bold shadow-xs'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Major Lecture Halls</span>
        </button>
        <button
          onClick={() => setActiveTab('file-jacket')}
          className={`flex-1 py-2 sm:py-2.5 px-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
            activeTab === 'file-jacket'
              ? 'bg-white dark:bg-zinc-900 text-amber-600 dark:text-amber-400 font-bold shadow-xs'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
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
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search faculty, department (e.g. Computer Science, Law, BOOC)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={durationFilter}
                onChange={(e) => setDurationFilter(e.target.value)}
                aria-label="Filter by degree duration"
                className="px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs sm:text-sm font-medium focus:outline-hidden"
              >
                <option value="all">All Durations</option>
                <option value="4">4-Year Degrees</option>
                <option value="5">5-Year Degrees</option>
                <option value="6">6-Year Degrees</option>
              </select>
            </div>
          </div>

          {/* Quick Counter */}
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 px-1">
            <span>
              Showing {filteredFaculties.length} faculties • {totalDepts} accredited departments
            </span>
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
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
                  className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setExpandedFacultyId(isExpanded ? null : faculty.id)}
                    className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40 transition-colors"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                          {faculty.name}
                        </h3>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/40">
                          {faculty.departments.length} Departments
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-zinc-500 dark:text-zinc-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                          {faculty.location}
                        </span>
                      </div>
                    </div>

                    <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 shrink-0">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/40 dark:bg-zinc-950/30 p-4 sm:p-5 space-y-4">
                      {/* Dean's Office & Major Theatres */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800">
                          <span className="text-zinc-400 font-semibold block uppercase tracking-wider text-[10px]">
                            Dean's Office Location
                          </span>
                          <span className="font-medium text-zinc-800 dark:text-zinc-200 mt-0.5 block">
                            {faculty.deansOffice}
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800">
                          <span className="text-zinc-400 font-semibold block uppercase tracking-wider text-[10px]">
                            Primary Lecture Theatres
                          </span>
                          <span className="font-medium text-zinc-800 dark:text-zinc-200 mt-0.5 block">
                            {faculty.lectureTheatres.join(', ')}
                          </span>
                        </div>
                      </div>

                      {/* Department Cards */}
                      <div>
                        <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-2.5">
                          Department List & Degree Duration
                        </span>
                        <div className="grid grid-cols-1 gap-2">
                          {faculty.departments.map((dept, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                            >
                              <div>
                                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 block">
                                  {dept.name}
                                </span>
                                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                  {dept.degree}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 self-start sm:self-auto">
                                <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
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
              <div className="text-center py-12 p-6 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700">
                <BookOpen className="w-10 h-10 text-zinc-400 mx-auto mb-2" />
                <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  No faculty or department found
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Try adjusting your search terms or clearing the duration filter.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'theatres' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
            <strong>Freshman Navigation Tip:</strong> Great Ife lecture halls have distinctive campus nicknames. Arrive at least 15 minutes before 8:00 AM lectures to secure a seat with functional desk armrests.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {NOTABLE_LECTURE_CENTRES.map((theatre, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2.5 shadow-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      {theatre.name}
                    </h4>
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      "{theatre.nick}"
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 shrink-0">
                    {theatre.capacity}
                  </span>
                </div>

                <div className="text-xs space-y-1 text-zinc-600 dark:text-zinc-400">
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                    <span>{theatre.location}</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-zinc-500 dark:text-zinc-400">
                    <GraduationCap className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
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
          <div className="p-5 rounded-2xl border border-amber-300 dark:border-amber-800/80 bg-amber-50/50 dark:bg-amber-950/20 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-16 rounded-lg bg-amber-200 border-2 border-amber-400 flex items-center justify-center font-bold text-amber-900 text-xs shadow-xs">
                FILE
              </div>
              <div>
                <h4 className="text-base font-bold text-amber-950 dark:text-amber-200">
                  Standard Flat Manila File (Pale Yellow)
                </h4>
                <p className="text-xs text-amber-800 dark:text-amber-300">
                  Available in bulk at the Sub Market or Library Circle photocopier shops (₦150 – ₦250).
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
              <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                Front Cover Inscription Template (Write neatly in black permanent marker):
              </p>
              <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-amber-200 dark:border-amber-900/60 font-mono text-xs space-y-1 text-zinc-800 dark:text-zinc-200">
                <div>NAME: [SURNAME, First Name Middle Name]</div>
                <div>JAMB REG NO: [e.g. 202612345678AB]</div>
                <div>MATRIC NO: [Leave blank if pending or fill when assigned]</div>
                <div>FACULTY: [e.g. Faculty of Technology]</div>
                <div>DEPARTMENT: [e.g. Computer Science & Engineering]</div>
                <div>SESSION: [2025/2026 Academic Session]</div>
                <div>PHONE NO: [080XXXXXXXX]</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-100/60 dark:bg-amber-900/30 text-xs text-amber-900 dark:text-amber-200 space-y-1">
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
