'use client';

import React, { useState, useEffect } from 'react';
import {
  CourseEntry,
  GradeLetter,
  OAU_GRADE_POINTS,
  OAU_GRADE_RANGES,
  calculateSemesterGPA,
  getDegreeClassification,
  forecastRequiredGPA,
  MIN_CREDIT_LOAD,
  MAX_CREDIT_LOAD,
} from '../lib/gpaCalculator';
import { FACULTY_COURSE_TEMPLATES } from '../data/courseTemplates';
import { Plus, Trash2, RotateCcw, Sparkles, BookOpen, AlertTriangle, CheckCircle2, TrendingUp, Info } from 'lucide-react';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'oaumods_gpa_courses_v1';

export default function GpaCalculator() {
  const [courses, setCourses] = useState<CourseEntry[]>([]);
  const [selectedFaculty, setSelectedFaculty] = useState<string>('');
  const [showForecaster, setShowForecaster] = useState<boolean>(false);

  // Target Forecaster State
  const [harmattanGPA, setHarmattanGPA] = useState<number>(3.8);
  const [harmattanUnits, setHarmattanUnits] = useState<number>(20);
  const [rainUnits, setRainUnits] = useState<number>(20);
  const [targetCGPA, setTargetCGPA] = useState<number>(4.5);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCourses(parsed);
          return;
        }
      }
    } catch {
      // fallback to default template
    }
    // Default to Science template if empty
    loadFacultyTemplate('science');
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (courses.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
      } catch {
        // ignore storage errors
      }
    }
  }, [courses]);

  const { totalCreditUnits, totalQualityPoints, gpa, isOverload, isUnderload } = calculateSemesterGPA(courses);
  const classification = getDegreeClassification(gpa);

  // Trigger celebration confetti on First Class
  useEffect(() => {
    if (gpa >= 4.5 && totalCreditUnits >= MIN_CREDIT_LOAD) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#12345B', '#1769AA', '#4FA3D1', '#E6AD3C', '#25855A'],
        });
      } catch {
        // ignore
      }
    }
  }, [gpa, totalCreditUnits]);

  function loadFacultyTemplate(facultyId: string) {
    const template = FACULTY_COURSE_TEMPLATES.find((f) => f.facultyId === facultyId);
    if (!template) return;
    const newCourses: CourseEntry[] = template.courses.map((c, idx) => ({
      id: `${facultyId}-${idx}-${Date.now()}`,
      code: c.code,
      title: c.title,
      units: c.units,
      grade: c.defaultGrade,
    }));
    setCourses(newCourses);
    setSelectedFaculty(facultyId);
  }

  function addCustomCourse() {
    const newCourse: CourseEntry = {
      id: `custom-${Date.now()}`,
      code: 'NEW 101',
      title: 'General Elective Course',
      units: 3,
      grade: 'A',
    };
    setCourses((prev) => [...prev, newCourse]);
  }

  function updateCourse(id: string, field: keyof CourseEntry, value: string | number) {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        return {
          ...c,
          [field]: field === 'units' ? Math.max(1, Math.min(6, Number(value) || 1)) : value,
        };
      })
    );
  }

  function removeCourse(id: string) {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  }

  function resetToEmpty() {
    if (confirm('Are you sure you want to reset all courses?')) {
      setCourses([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  const forecast = forecastRequiredGPA(harmattanGPA, harmattanUnits, rainUnits, targetCGPA);

  // Calculate circular progress stroke (0 to 100% of 5.0)
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const progressPercent = Math.min(100, Math.max(0, (gpa / 5.0) * 100));
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="space-y-6 pb-12">
      {/* Hero GPA Card with Circular Dial */}
      <div className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${classification.bgGradient} p-6 sm:p-7 shadow-2xl backdrop-blur-xl transition-all duration-500`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Circular Gauge */}
          <div className="relative flex items-center justify-center">
            <svg className="h-36 w-36 -rotate-90 transform">
              <circle
                cx="72"
                cy="72"
                r={radius}
                className="stroke-white/10"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="72"
                cy="72"
                r={radius}
                stroke={classification.strokeColor}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-black tracking-tight text-white">{gpa.toFixed(2)}</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-white/60">GPA / 5.00</span>
            </div>
          </div>

          {/* Classification & Quick Metrics */}
          <div className="flex-1 text-center sm:text-left space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3.5 py-1 text-xs font-bold tracking-wide shadow-xs bg-white/10 backdrop-blur-md">
              <span className="text-base">{classification.icon}</span>
              <span className="text-white font-extrabold">{classification.classTitle}</span>
            </div>
            <p className="text-xs text-white/80 leading-relaxed max-w-md">{classification.description}</p>

            {/* Quality Points & Credit Units Badges */}
            <div className="grid grid-cols-2 gap-2.5 pt-1 max-w-xs mx-auto sm:mx-0">
              <div className="rounded-xl border border-white/10 bg-white/10 p-2.5 text-center">
                <div className="text-[11px] text-white/70 font-medium">Total Units (TCU)</div>
                <div className={`text-base font-bold ${isOverload || isUnderload ? 'text-student-gold' : 'text-white'}`}>
                  {totalCreditUnits} <span className="text-xs font-normal text-white/60">Units</span>
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/10 p-2.5 text-center">
                <div className="text-[11px] text-white/70 font-medium">Quality Points (TQP)</div>
                <div className="text-base font-bold text-student-gold">
                  {totalQualityPoints} <span className="text-xs font-normal text-white/60">Points</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Credit Load Warnings */}
        {isOverload && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-soft-red/40 bg-soft-red/20 px-3.5 py-2.5 text-xs text-white">
            <AlertTriangle className="h-4 w-4 shrink-0 text-white" />
            <span><strong>Credit Overload Alert:</strong> Registered units ({totalCreditUnits}) exceed the statutory OAU maximum of 24 units without a Special Senate Waiver.</span>
          </div>
        )}
        {isUnderload && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-amber-warn/40 bg-amber-warn/20 px-3.5 py-2.5 text-xs text-white">
            <Info className="h-4 w-4 shrink-0 text-white" />
            <span><strong>Credit Underload Notice:</strong> Total units ({totalCreditUnits}) are below the statutory OAU minimum of 15 units. Please check your core curriculum.</span>
          </div>
        )}
      </div>

      {/* Faculty Template Quick Loader & Actions Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <BookOpen className="h-4 w-4 text-student-gold shrink-0" />
          <span className="text-xs font-bold uppercase tracking-wider text-muted-slate dark:text-slate-400 shrink-0">1-Tap 100L:</span>
          <select
            value={selectedFaculty}
            onChange={(e) => loadFacultyTemplate(e.target.value)}
            className="flex-1 rounded-xl border border-soft-blue-gray dark:border-[#1C2D44] bg-pure-white dark:bg-[#0E1827] px-3 py-2 text-xs font-semibold text-deep-slate dark:text-zinc-100 shadow-xs focus:border-campus-blue focus:outline-hidden"
          >
            <option value="" disabled>Select Your Faculty Template</option>
            {FACULTY_COURSE_TEMPLATES.map((f) => (
              <option key={f.facultyId} value={f.facultyId}>
                {f.facultyName} ({f.badge})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={addCustomCourse}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl border border-student-gold/40 bg-student-gold/15 hover:bg-student-gold/25 px-3 py-2 text-xs font-bold text-amber-900 dark:text-student-gold transition-all active:scale-95 shadow-xs"
          >
            <Plus className="h-3.5 w-3.5" /> Add Course
          </button>
          <button
            onClick={() => setShowForecaster(!showForecaster)}
            className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition-all active:scale-95 shadow-xs ${
              showForecaster
                ? 'border-campus-blue bg-campus-blue text-white'
                : 'border-soft-blue-gray dark:border-[#1C2D44] bg-pure-white dark:bg-[#0E1827] text-deep-slate dark:text-slate-200 hover:bg-pale-blue/50 dark:hover:bg-[#122033]'
            }`}
          >
            <TrendingUp className="h-3.5 w-3.5" /> What If? Forecaster
          </button>
          <button
            onClick={resetToEmpty}
            title="Reset courses"
            className="rounded-xl border border-soft-blue-gray dark:border-[#1C2D44] bg-pure-white dark:bg-[#0E1827] p-2 text-muted-slate hover:text-soft-red hover:border-soft-red/40 transition-all active:scale-95 shadow-xs"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Target Forecaster Panel */}
      {showForecaster && (
        <div className="rounded-2xl border border-campus-blue/30 bg-pale-blue/60 dark:bg-[#0E1827] p-5 shadow-lg backdrop-blur-xl space-y-4 animate-in fade-in slide-in-from-top-3 duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-campus-blue dark:text-sky-blue" />
              <h3 className="text-sm font-bold text-oau-navy dark:text-sky-blue tracking-tight">Great Ife Target Degree Forecaster</h3>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-campus-blue dark:text-sky-blue bg-white dark:bg-[#122033] px-2.5 py-0.5 rounded-full border border-campus-blue/20">
              Harmattan ➔ Rain Simulator
            </span>
          </div>
          <p className="text-xs text-muted-slate dark:text-slate-300 leading-relaxed">
            Project what GPA you must score in Rain Semester to finish your session with your target Honours degree classification.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-deep-slate dark:text-slate-300 block mb-1">Harmattan GPA</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="5"
                value={harmattanGPA}
                onChange={(e) => setHarmattanGPA(Number(e.target.value) || 0)}
                className="w-full rounded-xl border border-soft-blue-gray dark:border-[#1C2D44] bg-pure-white dark:bg-[#09101A] px-3 py-2 text-xs font-bold text-deep-slate dark:text-white focus:border-campus-blue focus:outline-hidden"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-deep-slate dark:text-slate-300 block mb-1">Harmattan Units</label>
              <input
                type="number"
                min="10"
                max="26"
                value={harmattanUnits}
                onChange={(e) => setHarmattanUnits(Number(e.target.value) || 0)}
                className="w-full rounded-xl border border-soft-blue-gray dark:border-[#1C2D44] bg-pure-white dark:bg-[#09101A] px-3 py-2 text-xs font-bold text-deep-slate dark:text-white focus:border-campus-blue focus:outline-hidden"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-deep-slate dark:text-slate-300 block mb-1">Rain Units</label>
              <input
                type="number"
                min="10"
                max="26"
                value={rainUnits}
                onChange={(e) => setRainUnits(Number(e.target.value) || 0)}
                className="w-full rounded-xl border border-soft-blue-gray dark:border-[#1C2D44] bg-pure-white dark:bg-[#09101A] px-3 py-2 text-xs font-bold text-deep-slate dark:text-white focus:border-campus-blue focus:outline-hidden"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-deep-slate dark:text-slate-300 block mb-1">Target CGPA</label>
              <select
                value={targetCGPA}
                onChange={(e) => setTargetCGPA(Number(e.target.value))}
                className="w-full rounded-xl border border-soft-blue-gray dark:border-[#1C2D44] bg-pure-white dark:bg-[#09101A] px-2 py-2 text-xs font-bold text-student-gold focus:border-campus-blue focus:outline-hidden"
              >
                <option value={4.5}>4.50 (First Class 🌟)</option>
                <option value={4.0}>4.00 (Strong 2:1 🎖️)</option>
                <option value={3.5}>3.50 (Min. 2:1 🎖️)</option>
                <option value={3.0}>3.00 (2:2 📘)</option>
                <option value={2.4}>2.40 (Min. 2:2 📘)</option>
              </select>
            </div>
          </div>

          <div className={`rounded-xl border p-3 text-xs leading-relaxed ${
            forecast.isAchievable
              ? 'border-fresh-green/30 bg-fresh-green/10 text-fresh-green dark:text-emerald-300'
              : 'border-soft-red/30 bg-soft-red/10 text-soft-red dark:text-red-300'
          }`}>
            <div className="font-bold flex items-center gap-1.5 mb-1">
              {forecast.isAchievable ? <CheckCircle2 className="h-4 w-4 text-fresh-green" /> : <AlertTriangle className="h-4 w-4 text-soft-red" />}
              <span>{forecast.isAchievable ? 'Projection Achievable' : 'Mathematical Limitation'}</span>
            </div>
            <p>{forecast.message}</p>
          </div>
        </div>
      )}

      {/* Course List Rows */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-slate dark:text-slate-400 px-1">
          <span>Enrolled Courses ({courses.length})</span>
          <span>Grading Matrix: A=5 • B=4 • C=3 • D=2 • E=1 • F=0</span>
        </div>

        {courses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-soft-blue-gray dark:border-[#1C2D44] p-8 text-center text-muted-slate">
            <BookOpen className="h-8 w-8 mx-auto mb-2 text-muted-slate/50" />
            <p className="text-sm font-medium">No courses added yet.</p>
            <p className="text-xs text-muted-slate/80 mt-1">Select a faculty template above or click &ldquo;Add Course&rdquo; to begin.</p>
          </div>
        ) : (
          courses.map((course, idx) => {
            const qualityPoints = (Number(course.units) || 0) * (OAU_GRADE_POINTS[course.grade] ?? 0);
            return (
              <div
                key={course.id}
                className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-soft-blue-gray dark:border-[#1C2D44] bg-pure-white dark:bg-[#0E1827] p-3.5 shadow-xs hover:border-campus-blue/40 hover:bg-pale-blue/30 dark:hover:bg-[#122033] transition-all"
              >
                {/* Index, Code & Title */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-pale-blue dark:bg-white/5 text-xs font-bold text-campus-blue dark:text-sky-blue group-hover:bg-student-gold/20 group-hover:text-student-gold transition-all">
                    {idx + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <input
                      type="text"
                      value={course.code}
                      onChange={(e) => updateCourse(course.id, 'code', e.target.value.toUpperCase())}
                      className="w-24 font-mono text-xs font-bold text-deep-slate dark:text-white bg-transparent border-b border-transparent hover:border-soft-blue-gray focus:border-campus-blue focus:outline-hidden uppercase"
                    />
                    <input
                      type="text"
                      value={course.title}
                      onChange={(e) => updateCourse(course.id, 'title', e.target.value)}
                      className="w-full text-xs text-muted-slate dark:text-slate-400 bg-transparent border-b border-transparent hover:border-soft-blue-gray focus:border-campus-blue focus:outline-hidden truncate block"
                    />
                  </div>
                </div>

                {/* Units, Grade & QP */}
                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-soft-blue-gray/50 dark:border-white/5">
                  {/* Units selector */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] uppercase font-semibold text-muted-slate dark:text-slate-400">Units:</span>
                    <select
                      value={course.units}
                      onChange={(e) => updateCourse(course.id, 'units', e.target.value)}
                      className="rounded-lg border border-soft-blue-gray dark:border-[#1C2D44] bg-pure-white dark:bg-[#09101A] px-2 py-1 text-xs font-bold text-deep-slate dark:text-white focus:border-campus-blue focus:outline-hidden"
                    >
                      {[1, 2, 3, 4, 5, 6].map((u) => (
                        <option key={u} value={u}>
                          {u}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Grade selector */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] uppercase font-semibold text-muted-slate dark:text-slate-400">Grade:</span>
                    <select
                      value={course.grade}
                      onChange={(e) => updateCourse(course.id, 'grade', e.target.value as GradeLetter)}
                      className={`rounded-lg border px-2.5 py-1 text-xs font-black transition-all focus:outline-hidden ${
                        course.grade === 'A'
                          ? 'border-fresh-green/40 bg-fresh-green/10 text-fresh-green dark:text-emerald-300'
                          : course.grade === 'B'
                          ? 'border-campus-blue/40 bg-campus-blue/10 text-campus-blue dark:text-sky-300'
                          : course.grade === 'C'
                          ? 'border-student-gold/40 bg-student-gold/15 text-amber-800 dark:text-student-gold'
                          : course.grade === 'D'
                          ? 'border-amber-warn/40 bg-amber-warn/15 text-amber-warn'
                          : course.grade === 'E'
                          ? 'border-soft-red/30 bg-soft-red/10 text-soft-red'
                          : 'border-soft-red/60 bg-soft-red/20 text-soft-red font-extrabold'
                      }`}
                    >
                      {(['A', 'B', 'C', 'D', 'E', 'F'] as GradeLetter[]).map((g) => (
                        <option key={g} value={g}>
                          {g} ({OAU_GRADE_RANGES[g].range})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Quality Points Badge */}
                  <div className="min-w-[50px] text-right">
                    <span className="text-xs font-mono font-bold text-student-gold">{qualityPoints} QP</span>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => removeCourse(course.id)}
                    className="rounded-lg p-1.5 text-muted-slate hover:text-soft-red hover:bg-soft-red/10 transition-all active:scale-95"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Degree Classification Reference Matrix */}
      <div className="rounded-2xl border border-soft-blue-gray dark:border-[#1C2D44] bg-pure-white dark:bg-[#0E1827] p-4 sm:p-5 space-y-2.5 shadow-xs">
        <h4 className="text-xs font-bold uppercase tracking-wider text-oau-navy dark:text-sky-blue">OAU Statutory Honours Classifications</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
          <div className="p-2.5 rounded-xl bg-fresh-green/10 border border-fresh-green/20">
            <span className="font-bold text-fresh-green dark:text-emerald-300">4.50 – 5.00</span>
            <div className="text-[11px] text-deep-slate dark:text-slate-300">First Class Honours 🌟</div>
          </div>
          <div className="p-2.5 rounded-xl bg-campus-blue/10 border border-campus-blue/20">
            <span className="font-bold text-campus-blue dark:text-sky-300">3.50 – 4.49</span>
            <div className="text-[11px] text-deep-slate dark:text-slate-300">Second Class Upper (2:1) 🎖️</div>
          </div>
          <div className="p-2.5 rounded-xl bg-student-gold/15 border border-student-gold/30">
            <span className="font-bold text-amber-800 dark:text-student-gold">2.40 – 3.49</span>
            <div className="text-[11px] text-deep-slate dark:text-slate-300">Second Class Lower (2:2) 📘</div>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-warn/10 border border-amber-warn/20">
            <span className="font-bold text-amber-warn">1.50 – 2.39</span>
            <div className="text-[11px] text-deep-slate dark:text-slate-300">Third Class Honours 📙</div>
          </div>
          <div className="p-2.5 rounded-xl bg-soft-red/10 border border-soft-red/20">
            <span className="font-bold text-soft-red">1.00 – 1.49</span>
            <div className="text-[11px] text-deep-slate dark:text-slate-300">Pass Degree ⚠️</div>
          </div>
          <div className="p-2.5 rounded-xl bg-soft-red/20 border border-soft-red/40">
            <span className="font-bold text-soft-red">&lt; 1.00</span>
            <div className="text-[11px] text-soft-red font-semibold">Academic Probation 🚨</div>
          </div>
        </div>
      </div>
    </div>
  );
}
