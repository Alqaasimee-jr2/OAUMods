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
const FORECAST_KEY = 'oaumods_gpa_forecast_v1';

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
          colors: ['#d4af37', '#10b981', '#3b82f6', '#fbbf24'],
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
      <div className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${classification.bgGradient} p-6 shadow-2xl backdrop-blur-xl transition-all duration-500`}>
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
                className={`transition-all duration-1000 ease-out ${
                  gpa >= 4.5
                    ? 'stroke-emerald-400'
                    : gpa >= 3.5
                    ? 'stroke-blue-400'
                    : gpa >= 2.4
                    ? 'stroke-amber-400'
                    : gpa >= 1.0
                    ? 'stroke-orange-400'
                    : 'stroke-red-500'
                }`}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-black tracking-tight text-white">{gpa.toFixed(2)}</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-white/60">GPA / 5.00</span>
            </div>
          </div>

          {/* Classification & Quick Metrics */}
          <div className="flex-1 text-center sm:text-left space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold tracking-wide shadow-sm backdrop-blur-md">
              <span className="text-base">{classification.icon}</span>
              <span className={classification.textColor}>{classification.classTitle}</span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed max-w-md">{classification.description}</p>

            {/* Quality Points & Credit Units Badges */}
            <div className="grid grid-cols-2 gap-2.5 pt-1 max-w-xs mx-auto sm:mx-0">
              <div className="rounded-xl border border-white/5 bg-white/5 p-2.5 text-center">
                <div className="text-xs text-white/50 font-medium">Total Units (TCU)</div>
                <div className={`text-base font-bold ${isOverload || isUnderload ? 'text-amber-400' : 'text-white'}`}>
                  {totalCreditUnits} <span className="text-xs font-normal text-white/40">Units</span>
                </div>
              </div>
              <div className="rounded-xl border border-white/5 bg-white/5 p-2.5 text-center">
                <div className="text-xs text-white/50 font-medium">Quality Points (TQP)</div>
                <div className="text-base font-bold text-amber-300">
                  {totalQualityPoints} <span className="text-xs font-normal text-white/40">Points</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Credit Load Warnings */}
        {isOverload && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-xs text-red-300">
            <AlertTriangle className="h-4 w-4 shrink-0 text-red-400" />
            <span><strong>Credit Overload Alert:</strong> Registered units ({totalCreditUnits}) exceed the statutory OAU maximum of 24 units without a Special Senate Waiver.</span>
          </div>
        )}
        {isUnderload && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-2.5 text-xs text-amber-300">
            <Info className="h-4 w-4 shrink-0 text-amber-400" />
            <span><strong>Credit Underload Notice:</strong> Total units ({totalCreditUnits}) are below the statutory OAU minimum of 15 units. Please check your core curriculum.</span>
          </div>
        )}
      </div>

      {/* Faculty Template Quick Loader & Actions Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-amber-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-white/70">1-Tap 100L Bundle:</span>
          <select
            value={selectedFaculty}
            onChange={(e) => loadFacultyTemplate(e.target.value)}
            className="flex-1 rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md focus:border-amber-400 focus:outline-none"
          >
            <option value="" disabled>Select Your Faculty Template</option>
            {FACULTY_COURSE_TEMPLATES.map((f) => (
              <option key={f.facultyId} value={f.facultyId} className="bg-slate-900 text-white">
                {f.facultyName} ({f.badge})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={addCustomCourse}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl border border-amber-400/30 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-2 text-xs font-bold text-amber-300 transition-all active:scale-95"
          >
            <Plus className="h-3.5 w-3.5" /> Add Course
          </button>
          <button
            onClick={() => setShowForecaster(!showForecaster)}
            className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition-all active:scale-95 ${
              showForecaster
                ? 'border-blue-400 bg-blue-500/20 text-blue-300'
                : 'border-white/10 bg-slate-900/60 hover:bg-slate-800 text-white/80'
            }`}
          >
            <TrendingUp className="h-3.5 w-3.5 text-blue-400" /> What If? Forecaster
          </button>
          <button
            onClick={resetToEmpty}
            title="Reset courses"
            className="rounded-xl border border-white/10 bg-slate-900/60 p-2 text-white/50 hover:text-red-400 hover:border-red-500/30 transition-all active:scale-95"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Target Forecaster Panel */}
      {showForecaster && (
        <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-950/40 via-slate-900/70 to-slate-950 p-5 shadow-xl backdrop-blur-xl space-y-4 animate-in fade-in slide-in-from-top-3 duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-400" />
              <h3 className="text-sm font-bold text-white tracking-tight">Great Ife Target Degree Forecaster</h3>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-300/70 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
              Harmattan ➔ Rain Simulator
            </span>
          </div>
          <p className="text-xs text-white/70 leading-relaxed">
            Project what GPA you must score in Rain Semester to finish your session with your target Honours degree classification.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="text-[11px] font-medium text-white/60 block mb-1">Harmattan GPA</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="5"
                value={harmattanGPA}
                onChange={(e) => setHarmattanGPA(Number(e.target.value) || 0)}
                className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-xs font-bold text-white focus:border-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-white/60 block mb-1">Harmattan Units</label>
              <input
                type="number"
                min="10"
                max="26"
                value={harmattanUnits}
                onChange={(e) => setHarmattanUnits(Number(e.target.value) || 0)}
                className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-xs font-bold text-white focus:border-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-white/60 block mb-1">Rain Units</label>
              <input
                type="number"
                min="10"
                max="26"
                value={rainUnits}
                onChange={(e) => setRainUnits(Number(e.target.value) || 0)}
                className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-xs font-bold text-white focus:border-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-white/60 block mb-1">Target CGPA</label>
              <select
                value={targetCGPA}
                onChange={(e) => setTargetCGPA(Number(e.target.value))}
                className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-2 py-2 text-xs font-bold text-amber-300 focus:border-blue-400 focus:outline-none"
              >
                <option value={4.5} className="bg-slate-900">4.50 (First Class 🌟)</option>
                <option value={4.0} className="bg-slate-900">4.00 (Strong 2:1 🎖️)</option>
                <option value={3.5} className="bg-slate-900">3.50 (Min. 2:1 🎖️)</option>
                <option value={3.0} className="bg-slate-900">3.00 (2:2 📘)</option>
                <option value={2.4} className="bg-slate-900">2.40 (Min. 2:2 📘)</option>
              </select>
            </div>
          </div>

          <div className={`rounded-xl border p-3 text-xs leading-relaxed ${
            forecast.isAchievable
              ? 'border-emerald-500/30 bg-emerald-950/20 text-emerald-300'
              : 'border-red-500/30 bg-red-950/20 text-red-300'
          }`}>
            <div className="font-bold flex items-center gap-1.5 mb-1">
              {forecast.isAchievable ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <AlertTriangle className="h-4 w-4 text-red-400" />}
              <span>{forecast.isAchievable ? 'Projection Achievable' : 'Mathematical Limitation'}</span>
            </div>
            <p>{forecast.message}</p>
          </div>
        </div>
      )}

      {/* Course List Rows */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-white/50 px-1">
          <span>Enrolled Courses ({courses.length})</span>
          <span>Grading Matrix: A=5 • B=4 • C=3 • D=2 • E=1 • F=0</span>
        </div>

        {courses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-white/50">
            <BookOpen className="h-8 w-8 mx-auto mb-2 text-white/30" />
            <p className="text-sm font-medium">No courses added yet.</p>
            <p className="text-xs text-white/40 mt-1">Select a faculty template above or click &ldquo;Add Course&rdquo; to begin.</p>
          </div>
        ) : (
          courses.map((course, idx) => {
            const qualityPoints = (Number(course.units) || 0) * (OAU_GRADE_POINTS[course.grade] ?? 0);
            return (
              <div
                key={course.id}
                className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-white/5 bg-slate-900/60 p-3.5 backdrop-blur-md hover:border-white/15 transition-all"
              >
                {/* Index, Code & Title */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/5 text-xs font-bold text-white/40 group-hover:bg-amber-500/20 group-hover:text-amber-300 transition-all">
                    {idx + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <input
                      type="text"
                      value={course.code}
                      onChange={(e) => updateCourse(course.id, 'code', e.target.value.toUpperCase())}
                      className="w-24 font-mono text-xs font-bold text-white bg-transparent border-b border-transparent hover:border-white/20 focus:border-amber-400 focus:outline-none uppercase"
                    />
                    <input
                      type="text"
                      value={course.title}
                      onChange={(e) => updateCourse(course.id, 'title', e.target.value)}
                      className="w-full text-xs text-white/60 bg-transparent border-b border-transparent hover:border-white/20 focus:border-amber-400 focus:outline-none truncate block"
                    />
                  </div>
                </div>

                {/* Units, Grade & QP */}
                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                  {/* Units selector */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] uppercase font-semibold text-white/40">Units:</span>
                    <select
                      value={course.units}
                      onChange={(e) => updateCourse(course.id, 'units', e.target.value)}
                      className="rounded-lg border border-white/10 bg-slate-950 px-2 py-1 text-xs font-bold text-white focus:border-amber-400 focus:outline-none"
                    >
                      {[1, 2, 3, 4, 5, 6].map((u) => (
                        <option key={u} value={u} className="bg-slate-900 text-white">
                          {u}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Grade selector */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] uppercase font-semibold text-white/40">Grade:</span>
                    <select
                      value={course.grade}
                      onChange={(e) => updateCourse(course.id, 'grade', e.target.value as GradeLetter)}
                      className={`rounded-lg border px-2.5 py-1 text-xs font-black transition-all focus:outline-none ${
                        course.grade === 'A'
                          ? 'border-emerald-500/50 bg-emerald-950/50 text-emerald-300'
                          : course.grade === 'B'
                          ? 'border-blue-500/50 bg-blue-950/50 text-blue-300'
                          : course.grade === 'C'
                          ? 'border-amber-500/50 bg-amber-950/50 text-amber-300'
                          : course.grade === 'D'
                          ? 'border-orange-500/50 bg-orange-950/50 text-orange-300'
                          : course.grade === 'E'
                          ? 'border-rose-500/50 bg-rose-950/50 text-rose-300'
                          : 'border-red-600/50 bg-red-950/50 text-red-400'
                      }`}
                    >
                      {(['A', 'B', 'C', 'D', 'E', 'F'] as GradeLetter[]).map((g) => (
                        <option key={g} value={g} className="bg-slate-900 text-white">
                          {g} ({OAU_GRADE_RANGES[g].range})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Quality Points Badge */}
                  <div className="min-w-[50px] text-right">
                    <span className="text-xs font-mono font-bold text-amber-300">{qualityPoints} QP</span>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => removeCourse(course.id)}
                    className="rounded-lg p-1.5 text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all active:scale-95"
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
      <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-4 space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-white/50">OAU Statutory Honours Classifications</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
          <div className="p-2 rounded-xl bg-white/5 border border-white/5">
            <span className="font-bold text-emerald-400">4.50 – 5.00</span>
            <div className="text-[11px] text-white/60">First Class Honours 🌟</div>
          </div>
          <div className="p-2 rounded-xl bg-white/5 border border-white/5">
            <span className="font-bold text-blue-400">3.50 – 4.49</span>
            <div className="text-[11px] text-white/60">Second Class Upper (2:1) 🎖️</div>
          </div>
          <div className="p-2 rounded-xl bg-white/5 border border-white/5">
            <span className="font-bold text-amber-400">2.40 – 3.49</span>
            <div className="text-[11px] text-white/60">Second Class Lower (2:2) 📘</div>
          </div>
          <div className="p-2 rounded-xl bg-white/5 border border-white/5">
            <span className="font-bold text-orange-400">1.50 – 2.39</span>
            <div className="text-[11px] text-white/60">Third Class Honours 📙</div>
          </div>
          <div className="p-2 rounded-xl bg-white/5 border border-white/5">
            <span className="font-bold text-rose-400">1.00 – 1.49</span>
            <div className="text-[11px] text-white/60">Pass Degree ⚠️</div>
          </div>
          <div className="p-2 rounded-xl bg-red-950/30 border border-red-500/20">
            <span className="font-bold text-red-400">&lt; 1.00</span>
            <div className="text-[11px] text-red-300/70">Academic Probation 🚨</div>
          </div>
        </div>
      </div>
    </div>
  );
}
