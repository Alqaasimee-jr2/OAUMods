'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  Clock,
  Download,
  Search,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Sparkles,
  ArrowRight,
  Info,
} from 'lucide-react';
import { GeometricShape, WordAccent } from '@/components/GeometricShapes';
import {
  HARMATTAN_2026_CALENDAR,
  RAIN_2027_CALENDAR,
  FULL_2026_2027_CALENDAR,
  SEMESTER_METADATA,
  RAIN_2027_METADATA,
  ANNUAL_INSTITUTIONAL_EVENTS,
  CalendarEvent,
  getDaysUntil,
  getEventStatus,
  getNextUpcomingEvent,
  generateSingleEventIcs,
  generateFullSemesterIcs,
} from '@/data/academicCalendar';

type SemesterTab = 'all' | 'Harmattan' | 'Rain';
type FilterTab = 'all' | 'freshmen' | 'registration' | 'lectures' | 'ceremony' | 'exam' | 'break';

export default function CalendarClient() {
  const [selectedSemester, setSelectedSemester] = useState<SemesterTab>('all');
  const [selectedFilter, setSelectedFilter] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [expandedEventId, setExpandedEventId] = useState<string | null>('freshmen-resumption');
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());

  // Keep date updated
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const semesterEvents = useMemo(() => {
    if (selectedSemester === 'Harmattan') return HARMATTAN_2026_CALENDAR;
    if (selectedSemester === 'Rain') return RAIN_2027_CALENDAR;
    return FULL_2026_2027_CALENDAR;
  }, [selectedSemester]);

  const activeMetadata = selectedSemester === 'Rain' ? RAIN_2027_METADATA : SEMESTER_METADATA;

  const nextMilestone = useMemo(() => {
    return getNextUpcomingEvent(FULL_2026_2027_CALENDAR, currentDate);
  }, [currentDate]);

  const daysToNextMilestone = useMemo(() => {
    if (!nextMilestone) return null;
    return getDaysUntil(nextMilestone.startDate, currentDate);
  }, [nextMilestone, currentDate]);

  const filteredEvents = useMemo(() => {
    return semesterEvents.filter((event) => {
      // Filter tab
      if (selectedFilter === 'freshmen' && !event.isFreshmanMilestone) return false;
      if (selectedFilter === 'registration' && event.category !== 'registration') return false;
      if (selectedFilter === 'lectures' && event.category !== 'lectures') return false;
      if (selectedFilter === 'ceremony' && event.category !== 'ceremony') return false;
      if (selectedFilter === 'exam' && event.category !== 'exam') return false;
      if (selectedFilter === 'break' && event.category !== 'break') return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = event.title.toLowerCase().includes(q);
        const matchesDesc = event.description.toLowerCase().includes(q);
        const matchesVenue = event.venue?.toLowerCase().includes(q) || false;
        const matchesDate = event.displayDate.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesVenue && !matchesDate) {
          return false;
        }
      }

      return true;
    });
  }, [semesterEvents, selectedFilter, searchQuery]);

  const handleDownloadIcs = (event: CalendarEvent) => {
    try {
      const icsData = generateSingleEventIcs(event);
      const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `oau-${event.id}.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setDownloadSuccess(`Added "${event.shortTitle}" to download queue!`);
      setTimeout(() => setDownloadSuccess(null), 3500);
    } catch {
      // Fallback
    }
  };

  const handleDownloadFullCalendar = () => {
    try {
      const icsData = generateFullSemesterIcs(semesterEvents);
      const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const suffix =
        selectedSemester === 'all' ? 'full-session' : `${selectedSemester.toLowerCase()}-semester`;
      link.setAttribute('download', `oau-2026-2027-${suffix}.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      const label =
        selectedSemester === 'all'
          ? 'Full 2026/2027 Session Calendar'
          : `${selectedSemester} Semester Calendar`;
      setDownloadSuccess(`${label} exported (.ics)!`);
      setTimeout(() => setDownloadSuccess(null), 4000);
    } catch {
      // Fallback
    }
  };

  const filterTabs: Array<{ id: FilterTab; label: string; count: number }> = [
    { id: 'all', label: 'All Milestones', count: semesterEvents.length },
    {
      id: 'freshmen',
      label: 'Freshmen Critical',
      count: semesterEvents.filter((e) => e.isFreshmanMilestone).length,
    },
    {
      id: 'registration',
      label: 'Registration',
      count: semesterEvents.filter((e) => e.category === 'registration').length,
    },
    {
      id: 'lectures',
      label: 'Teaching & Lectures',
      count: semesterEvents.filter((e) => e.category === 'lectures').length,
    },
    {
      id: 'ceremony',
      label: 'Ceremonies & Events',
      count: semesterEvents.filter((e) => e.category === 'ceremony').length,
    },
    {
      id: 'exam',
      label: 'Tests & Exams',
      count: semesterEvents.filter((e) => e.category === 'exam').length,
    },
    {
      id: 'break',
      label: 'Breaks & Holidays',
      count: semesterEvents.filter((e) => e.category === 'break').length,
    },
  ];

  return (
    <div className="space-y-6 text-left">
      {/* ========================================================= */}
      {/* PAGE HEADER BANNER                                        */}
      {/* ========================================================= */}
      <div className="relative border border-slate-200 bg-white p-5 sm:p-6 space-y-3 overflow-hidden shadow-xs">
        <div className="absolute top-2 right-4 pointer-events-none opacity-20 hidden sm:block">
          <GeometricShape type="hexagon" color="gold" size="lg" />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-400 text-oau-navy text-xs font-black uppercase tracking-wide">
            <GeometricShape type="square" color="navy" size="sm" />
            <span>2026/2027 ACADEMIC SESSION</span>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 border border-slate-200">
            Harmattan &amp; Rain Semesters • 13 Weeks Each
          </span>
        </div>

        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-black text-oau-navy">
            Academic <WordAccent shape="circle" color="gold">Calendar</WordAccent> & Key Dates
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-2xl">
            Official Senate schedule for the 2026/2027 Harmattan and Rain Semesters. Track
            countdown dates for phased freshman resumption, course registration, matriculation,
            convocation, Students’ Week, exams, and SWEP/SIWES.
          </p>
        </div>

        {/* Global Action Bar */}
        <div className="pt-2 flex flex-wrap items-center gap-2">
          <button
            onClick={handleDownloadFullCalendar}
            type="button"
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-black text-white bg-oau-navy hover:bg-slate-800 border border-oau-navy transition-colors active:scale-98"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>
              Export {selectedSemester === 'all' ? 'Full Session' : `${selectedSemester} Semester`} (.ics)
            </span>
          </button>
          <Link
            href="/app/academics"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-oau-navy bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-slate-600" />
            <span>View 100L Courses & GPA Hub</span>
          </Link>
        </div>

        {/* Toast Alert */}
        {downloadSuccess && (
          <div className="p-2.5 bg-emerald-50 border border-emerald-300 text-xs font-bold text-emerald-900 flex items-center gap-2 transition-all">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{downloadSuccess}</span>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* LIVE COUNTDOWN HERO WIDGET                                 */}
      {/* ========================================================= */}
      {nextMilestone && (
        <div className="relative border-2 border-oau-navy bg-gradient-to-r from-oau-navy to-slate-900 text-white p-5 sm:p-6 overflow-hidden shadow-md">
          <div className="absolute top-0 right-0 w-36 h-36 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-[11px] font-black tracking-wider uppercase text-amber-400">
                <Clock className="w-3.5 h-3.5" />
                <span>Next Institutional Milestone</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white">
                {nextMilestone.title}
              </h2>
              <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-300">
                <span className="font-bold text-amber-300">📅 {nextMilestone.displayDate}</span>
                {nextMilestone.venue && (
                  <span className="flex items-center gap-1 text-slate-300">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>{nextMilestone.venue}</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                {nextMilestone.description}
              </p>
            </div>

            {/* Countdown Badge */}
            <div className="shrink-0 bg-white/10 backdrop-blur-xs border border-white/20 p-4 text-center min-w-[140px] flex flex-col justify-center items-center">
              <span className="text-3xl sm:text-4xl font-black text-amber-400 leading-none">
                {daysToNextMilestone !== null ? (
                  daysToNextMilestone > 0 ? (
                    daysToNextMilestone
                  ) : daysToNextMilestone === 0 ? (
                    'TODAY'
                  ) : (
                    'NOW'
                  )
                ) : (
                  '--'
                )}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-200 mt-1">
                {daysToNextMilestone !== null && daysToNextMilestone > 0
                  ? daysToNextMilestone === 1
                    ? 'Day Remaining'
                    : 'Days Remaining'
                  : 'Milestone Active'}
              </span>
              <button
                onClick={() => handleDownloadIcs(nextMilestone)}
                type="button"
                className="mt-2.5 w-full inline-flex items-center justify-center gap-1 px-2.5 py-1 text-[11px] font-bold text-oau-navy bg-amber-400 hover:bg-amber-300 transition-colors"
              >
                <Download className="w-3 h-3" />
                <span>Add to Phone</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SEMESTER SWITCHER BAR                                     */}
      {/* ========================================================= */}
      <div className="flex flex-wrap items-center gap-2 bg-white border border-slate-200 p-2 shadow-xs">
        <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 px-2">
          Semester View:
        </span>
        {(
          [
            { id: 'all', label: `Full 2026/2027 Session (${FULL_2026_2027_CALENDAR.length})` },
            { id: 'Harmattan', label: `Harmattan Semester (1st • ${HARMATTAN_2026_CALENDAR.length})` },
            { id: 'Rain', label: `Rain Semester (2nd • ${RAIN_2027_CALENDAR.length})` },
          ] as const
        ).map((sem) => {
          const isActive = selectedSemester === sem.id;
          return (
            <button
              key={sem.id}
              type="button"
              onClick={() => setSelectedSemester(sem.id)}
              className={`px-3 py-1.5 text-xs font-bold border transition-colors ${
                isActive
                  ? 'bg-oau-navy text-white border-oau-navy shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              {sem.label}
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* 13-WEEK TEACHING PERIOD BREAKDOWN                          */}
      {/* ========================================================= */}
      <div className="border border-slate-200 bg-white p-5 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            <GeometricShape type="square" color="navy" size="sm" />
            <h2 className="text-sm font-black text-oau-navy uppercase tracking-wide">
              {activeMetadata.semester} 13-Week Teaching Structure
            </h2>
          </div>
          <span className="text-xs font-bold text-slate-500">Senate Approved</span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          {selectedSemester === 'Rain'
            ? 'The Rain Semester features a continuous 13-week academic lecture block, mid-semester tests, Students’ Union Week, final exams, and SWEP/SIWES training:'
            : 'The Harmattan Semester comprises a statutory 13-week academic lecture period split around the Christmas break, followed by continuous assessment and comprehensive exams:'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {activeMetadata.teachingPhases.map((phase, idx) => (
            <div
              key={idx}
              className="p-3 bg-slate-50 border border-slate-200 space-y-1"
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-oau-navy">{phase.name}</span>
                <span className="font-black px-1.5 py-0.2 bg-amber-100 text-amber-900 border border-amber-300 text-[10px]">
                  {phase.weeks} {phase.weeks === 1 ? 'Week' : 'Weeks'}
                </span>
              </div>
              <p className="text-xs font-bold text-campus-blue">{phase.dates}</p>
              <p className="text-[11px] text-slate-600">{phase.description}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-slate-600">
          <span className="font-bold text-oau-navy">Post-Lecture Milestones:</span>
          <span className="bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 font-medium">
            Revision Week: {activeMetadata.revisionWeek}
          </span>
          <span className="bg-rose-50 text-rose-900 border border-rose-200 px-2 py-0.5 font-medium">
            Exams: {activeMetadata.examinationPeriod}
          </span>
          <span className="bg-emerald-50 text-emerald-900 border border-emerald-200 px-2 py-0.5 font-medium">
            Vacation: {activeMetadata.semesterBreak}
          </span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SEARCH & CATEGORY FILTERS                                  */}
      {/* ========================================================= */}
      <div className="space-y-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dates, milestones (e.g. matriculation, registration, exams)..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-oau-navy focus:ring-1 focus:ring-oau-navy"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {filterTabs.map((tab) => {
            const isSelected = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                type="button"
                className={`px-3 py-1.5 text-xs font-bold whitespace-nowrap border transition-colors shrink-0 ${
                  isSelected
                    ? 'bg-oau-navy text-white border-oau-navy shadow-xs'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`ml-1.5 px-1.5 py-0.2 text-[10px] font-black rounded-full ${
                    isSelected ? 'bg-amber-400 text-oau-navy' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* TIMELINE LIST OF EVENTS                                    */}
      {/* ========================================================= */}
      <div className="space-y-4">
        {filteredEvents.length === 0 ? (
          <div className="p-8 text-center bg-white border border-slate-200 space-y-2">
            <Info className="w-6 h-6 text-slate-400 mx-auto" />
            <p className="text-sm font-bold text-slate-700">No calendar events matched your filter</p>
            <p className="text-xs text-slate-500">
              Try selecting a different filter pill or clear your search query.
            </p>
            <button
              onClick={() => {
                setSelectedFilter('all');
                setSearchQuery('');
              }}
              type="button"
              className="mt-2 px-3 py-1.5 bg-slate-100 text-xs font-bold text-oau-navy border border-slate-300 hover:bg-slate-200"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredEvents.map((event, idx) => {
            const status = getEventStatus(event, currentDate);
            const daysLeft = getDaysUntil(event.startDate, currentDate);
            const isExpanded = expandedEventId === event.id;

            return (
              <div
                key={event.id}
                className={`relative border bg-white transition-all ${
                  status === 'active'
                    ? 'border-emerald-500 ring-2 ring-emerald-200'
                    : event.isFreshmanMilestone
                    ? 'border-slate-300 shadow-xs'
                    : 'border-slate-200'
                }`}
              >
                {/* Event Header Banner */}
                <div className="p-4 sm:p-5 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {event.semester && (
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 border ${
                            event.semester === 'Harmattan'
                              ? 'bg-slate-800 text-white border-slate-800'
                              : 'bg-sky-700 text-white border-sky-700'
                          }`}
                        >
                          {event.semester}
                        </span>
                      )}
                      <span className={`text-[10px] font-black px-2 py-0.5 border ${event.categoryColor.badge}`}>
                        {event.categoryLabel}
                      </span>
                      {event.isFreshmanMilestone && (
                        <span className="text-[10px] font-black px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-300">
                          Freshmen Critical
                        </span>
                      )}
                      <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 border border-slate-200">
                        {event.targetAudience}
                      </span>
                    </div>

                    {/* Status Pill */}
                    <div>
                      {status === 'active' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                          <span>HAPPENING NOW</span>
                        </span>
                      ) : status === 'upcoming' ? (
                        <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 border border-slate-200">
                          {daysLeft > 0 ? `In ${daysLeft} ${daysLeft === 1 ? 'day' : 'days'}` : 'Tomorrow'}
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 border border-slate-200">
                          Concluded
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Date */}
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base sm:text-lg font-black text-oau-navy leading-snug">
                        {idx + 1}. {event.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold text-slate-700">
                      <span className="text-campus-blue">📅 {event.displayDate}</span>
                      {event.venue && (
                        <span className="flex items-center gap-1 text-slate-600">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{event.venue}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    {event.description}
                  </p>

                  {/* Freshman Action Guide Accordion */}
                  {event.freshmanActionGuide.length > 0 && (
                    <div className="pt-2">
                      <button
                        onClick={() => setExpandedEventId(isExpanded ? null : event.id)}
                        type="button"
                        className="text-xs font-black text-oau-navy hover:text-campus-blue flex items-center gap-1 focus:outline-hidden"
                      >
                        <span>{isExpanded ? 'Hide Freshman Action Steps' : 'View What to Do (Freshman Survival Steps)'}</span>
                        <span className="text-[10px] text-slate-500 font-normal">
                          ({isExpanded ? 'Collapse' : 'Expand'})
                        </span>
                      </button>

                      {isExpanded && (
                        <div className="mt-2.5 p-3 bg-amber-50/60 border border-amber-200 space-y-1.5 transition-all">
                          <div className="flex items-center gap-1.5 text-xs font-black text-amber-900">
                            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                            <span>Actionable Steps for 100-Level Students:</span>
                          </div>
                          <ul className="space-y-1.5 pt-1">
                            {event.freshmanActionGuide.map((step, sIdx) => (
                              <li
                                key={sIdx}
                                className="text-xs text-slate-800 flex items-start gap-2"
                              >
                                <span className="font-black text-amber-800 shrink-0 text-[11px]">
                                  {sIdx + 1}.
                                </span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Card Actions Footer */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                    <button
                      onClick={() => handleDownloadIcs(event)}
                      type="button"
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors"
                    >
                      <Download className="w-3 h-3 text-slate-500" />
                      <span>Add to Device Calendar</span>
                    </button>

                    {event.actionLink && (
                      <Link
                        href={event.actionLink.href}
                        className="inline-flex items-center gap-1 text-xs font-black text-campus-blue hover:underline"
                      >
                        <span>{event.actionLink.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ========================================================= */}
      {/* ANNUAL UNIVERSITY EVENTS & ACADEMIC TRADITIONS             */}
      {/* ========================================================= */}
      <div className="border border-slate-200 bg-white p-5 space-y-4">
        <div className="border-b border-slate-200 pb-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <GeometricShape type="hexagon" color="gold" size="sm" />
            <h2 className="text-sm font-black text-oau-navy uppercase tracking-wide">
              Annual University Events &amp; Academic Traditions
            </h2>
          </div>
          <span className="text-[11px] font-bold text-slate-500">Institutional Cycles</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ANNUAL_INSTITUTIONAL_EVENTS.map((ev) => (
            <div key={ev.id} className="border border-slate-200 bg-slate-50 p-4 space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <span className="inline-block text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-300">
                  {ev.typicalWindow}
                </span>
                <h3 className="text-sm font-black text-oau-navy leading-snug">{ev.title}</h3>
                <p className="text-[11px] font-semibold text-slate-600 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>{ev.venue}</span>
                </p>
                <p className="text-xs text-slate-700 leading-relaxed pt-1">{ev.summary}</p>
              </div>
              <ul className="space-y-1 pt-2 border-t border-slate-200 text-[11px] text-slate-600 list-disc pl-4">
                {ev.highlights.map((h, i) => (
                  <li key={i} className="leading-relaxed">
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* OFFICIAL INSTITUTIONAL NOTE & DISCLAIMER                  */}
      {/* ========================================================= */}
      <div className="border border-slate-300 bg-slate-100 p-4 sm:p-5 space-y-2 text-xs text-slate-700">
        <div className="flex items-center gap-2 font-bold text-oau-navy">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span className="uppercase tracking-wide">Institutional Ground-Truth Policy</span>
        </div>
        <p className="leading-relaxed">
          <strong>Note from Project Governance:</strong> {activeMetadata.officialNote}
        </p>
        <p className="text-[11px] text-slate-500">
          Source: Official 2026/2027 Senate Academic Calendar for Obafemi Awolowo University, Ile-Ife.
          All calendar dates are cached locally via OAUMods PWA service worker for 100% offline access.
        </p>
      </div>
    </div>
  );
}
