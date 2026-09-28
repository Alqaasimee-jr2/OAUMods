'use client';

import React, { useState, useEffect } from 'react';
import {
  Calculator,
  BookOpen,
  Plus,
  Trash2,
  RotateCcw,
  AlertCircle,
  GraduationCap,
} from 'lucide-react';
import { GeometricShape, WordAccent } from '@/components/GeometricShapes';
import { FACULTY_COURSE_TEMPLATES } from '@/data/courseTemplates';

interface CourseRow {
  id: string;
  code: string;
  title: string;
  units: number;
  grade: string;
}

const DEFAULT_COURSES: CourseRow[] = [
  { id: '1', code: 'GST 111', title: 'Communication in English', units: 2, grade: 'A' },
  { id: '2', code: 'GST 112', title: 'Logic, Philosophy and Human Existence', units: 2, grade: 'A' },
  { id: '3', code: 'LIB 101', title: 'Use of Library, Study Skills and ICT', units: 1, grade: 'A' },
  { id: '4', code: 'CHM 101', title: 'General Chemistry I', units: 3, grade: 'A' },
  { id: '5', code: 'MTH 101', title: 'Elementary Mathematics I', units: 4, grade: 'B' },
  { id: '6', code: 'PHY 101', title: 'General Physics I', units: 4, grade: 'B' },
];

const GRADE_POINTS: Record<string, number> = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  E: 1,
  F: 0,
};

const GRADE_RANGES = [
  { grade: 'A', points: 5, score: '70% – 100%', remark: 'Excellent' },
  { grade: 'B', points: 4, score: '60% – 69%', remark: 'Very Good' },
  { grade: 'C', points: 3, score: '50% – 59%', remark: 'Good' },
  { grade: 'D', points: 2, score: '45% – 49%', remark: 'Fair' },
  { grade: 'E', points: 1, score: '40% – 44%', remark: 'Pass' },
  { grade: 'F', points: 0, score: '0% – 39%', remark: 'Fail' },
];

interface StarterCourse {
  code: string;
  title: string;
  units: number;
  category: 'campus-wide' | 'social-admin-law' | 'arts' | 'stem' | 'health-agric';
  faculty: string;
  format: string;
  tips: string;
}

const STARTER_COURSES: StarterCourse[] = [
  // Campus-Wide Compulsory General Courses
  {
    code: 'GST 111',
    title: 'Communication in English',
    units: 2,
    category: 'campus-wide',
    faculty: 'General University Requirement (All 15 Faculties)',
    format: 'Large lecture streams in Oduduwa Hall, Amphitheatre, AUD, and Faculty Lecture Theatres.',
    tips: 'Covers logical grammar, lexical structures, reading comprehension, note-taking, and formal essay composition. Mandatory for all 100-level students in every faculty.',
  },
  {
    code: 'GST 112',
    title: 'Logic, Philosophy and Human Existence',
    units: 2,
    category: 'campus-wide',
    faculty: 'General University Requirement (All 15 Faculties)',
    format: 'Coordinated by Department of Philosophy. Held across centralized campus theatres.',
    tips: 'Examines propositional logic, informal fallacies, deductive vs. inductive arguments, and ethical foundations of human society. Practice identifying fallacies in tutorial questions.',
  },
  {
    code: 'LIB 101',
    title: 'Use of Library, Study Skills and ICT',
    units: 1,
    category: 'campus-wide',
    faculty: 'General University Requirement (All 15 Faculties)',
    format: 'Conducted under Hezekiah Oluwasanmi Library instruction team with online test / practical modules.',
    tips: 'Covers bibliographic cataloging (Library of Congress classification), reference citation styles (APA, MLA), database searches, and academic integrity. Compulsory prerequisite.',
  },

  // Social Sciences, Administration & Law
  {
    code: 'ECN 101',
    title: 'Principles of Economics I (Microeconomics)',
    units: 3,
    category: 'social-admin-law',
    faculty: 'Social Sciences, Administration, Education, Agriculture',
    format: '1000-Seater Lecture Theatre & Social Sciences Lecture Theatres.',
    tips: 'Consumer choice theory, price determination, elasticity, and production functions. Solve numerical supply-and-demand equations weekly.',
  },
  {
    code: 'ACC 101',
    title: 'Principles of Accounting I',
    units: 3,
    category: 'social-admin-law',
    faculty: 'Faculty of Administration (Accounting, Management, Public Admin)',
    format: 'First Bank LT and Pit Theatre / Admin Complex.',
    tips: 'Double entry bookkeeping rules, ledger posting, trial balance reconciliation, and final accounts for sole proprietorships.',
  },
  {
    code: 'PUL 101',
    title: 'Nigerian Legal System I',
    units: 4,
    category: 'social-admin-law',
    faculty: 'Faculty of Law',
    format: 'Faculty of Law Lecture Rooms & Moot Court Axis.',
    tips: 'Sources of Nigerian Law, reception of English law, customary and Islamic law hierarchy, and judicial precedent principles. Case citations and case law ratio decidendi are vital.',
  },
  {
    code: 'POL 101',
    title: 'Introduction to Political Science',
    units: 3,
    category: 'social-admin-law',
    faculty: 'Faculty of Social Sciences & Administration',
    format: 'Social Sciences Quadrangle & 1000-Seater.',
    tips: 'The nature and scope of politics, state sovereignty, systems of governance, and political ideologies (democracy, socialism, authoritarianism).',
  },
  {
    code: 'SSC 105',
    title: 'Mathematics for Social Scientists',
    units: 3,
    category: 'social-admin-law',
    faculty: 'Social Sciences, Administration, Law',
    format: '1000-Seater and First Bank LT.',
    tips: 'Set theory, matrix algebra, functions, and differentiation applied to economic and behavioral modeling.',
  },

  // Arts & Humanities
  {
    code: 'LIT 101',
    title: 'Introduction to Literature in English',
    units: 3,
    category: 'arts',
    faculty: 'Faculty of Arts (English, Foreign Languages, Dramatic Arts, Education)',
    format: 'Humanities Lecture Theatres (HLT 1 & 2) and Pit Theatre.',
    tips: 'Elements of prose, poetry, and dramatic composition. Close textual reading and critical analysis of African and Western set texts.',
  },
  {
    code: 'ENG 101',
    title: 'Basic English Grammar and Composition',
    units: 3,
    category: 'arts',
    faculty: 'Faculty of Arts & Education (English majors)',
    format: 'Humanities Blocks 1–3.',
    tips: 'Syntax, phrase structures, clauses, and stylistic variation. Emphasize grammatical parsing.',
  },
  {
    code: 'HIS 101',
    title: 'History of Africa to 1800',
    units: 3,
    category: 'arts',
    faculty: 'Faculty of Arts & Social Sciences',
    format: 'Humanities Lecture Theatres.',
    tips: 'Early African empires (Mali, Songhai, Oyo, Benin), trade routes, and state formation. Focus on historiography and chronology.',
  },

  // STEM & Computing
  {
    code: 'CHM 101',
    title: 'General Chemistry I',
    units: 3,
    category: 'stem',
    faculty: 'Science, Technology, Health Sciences, Pharmacy, Agriculture',
    format: 'Lectures in BOOC / AUD. Practical sessions in White House Chemistry labs.',
    tips: 'Stoichiometry, atomic structure, gas laws, and chemical equilibria. Continuous assessment (tests + labs) carries 40 marks.',
  },
  {
    code: 'MTH 101',
    title: 'Elementary Mathematics I (Algebra & Trigonometry)',
    units: 4,
    category: 'stem',
    faculty: 'Science, Technology, Computing, EDM, Social Sciences (Economics)',
    format: 'Lectures hold in White House, BOOC, and AUD. Weekly department tutorial sheets.',
    tips: 'Quadratic equations, polynomials, mathematical induction, binomial theorem, and circular functions. Solve all tutorial questions independently.',
  },
  {
    code: 'PHY 101',
    title: 'General Physics I (Mechanics, Properties of Matter & Heat)',
    units: 4,
    category: 'stem',
    faculty: 'Science, Technology, Computing, Pharmacy, Health Sciences, EDM',
    format: 'Large lecture classes in BOOC and AUD. Physics labs hold in White House Physics wing.',
    tips: 'Calculus fundamentals for kinematics, Newton’s laws, work-energy theorem, and thermal expansions. Practice past questions diligently.',
  },
  {
    code: 'CSC 101',
    title: 'Introduction to Computer Science',
    units: 3,
    category: 'stem',
    faculty: 'Faculty of Computing & Faculty of Science',
    format: 'Computer Science Building & INTECU Axis.',
    tips: 'History of computing, number systems (binary, octal, hex), computer architecture, algorithm development, and pseudocode logic.',
  },
  {
    code: 'MEG 101',
    title: 'Engineering Graphics I',
    units: 2,
    category: 'stem',
    faculty: 'Faculty of Technology (Civil, Mech, Electrical, Chem, Agric Engineering)',
    format: 'Technology Drawing Studio (Spider House / Tech Quadrangle).',
    tips: 'Drafting instruments, geometric constructions, orthographic projection, and isometric views. Accurate dimensioning and neat lettering are critical.',
  },
  {
    code: 'ARC 101',
    title: 'Introductory Architectural Graphics',
    units: 3,
    category: 'stem',
    faculty: 'Faculty of Environmental Design & Management',
    format: 'Architecture Studio (EDM Quadrangle).',
    tips: 'Freehand sketching, line weight control, plans, elevations, and 3D architectural representations.',
  },

  // Health Sciences, Pharmacy & Agriculture
  {
    code: 'BIO 101',
    title: 'General Biology I',
    units: 3,
    category: 'health-agric',
    faculty: 'Science, Health Sciences, Pharmacy, Agriculture',
    format: 'Held in BOOC / Biological Sciences Lecture Halls.',
    tips: 'Covers cell biology, microscopy, genetics, and plant/animal morphology. Memorize biological diagrams and diagnostic features.',
  },
  {
    code: 'CHM 107',
    title: 'Practical Chemistry I',
    units: 1,
    category: 'health-agric',
    faculty: 'Science, Health Sciences, Pharmacy, Technology, Agriculture',
    format: 'Chemistry Laboratories, White House.',
    tips: 'Volumetric qualitative analysis (acid-base titrations) and chemical tests. Maintain neat, accurate lab reports.',
  },
  {
    code: 'PHY 107',
    title: 'Practical Physics I',
    units: 1,
    category: 'health-agric',
    faculty: 'Science, Health Sciences, Pharmacy, Technology',
    format: 'Physics Laboratories, White House.',
    tips: 'Error analysis, graphing techniques, pendulum experiments, and optical measurements.',
  },
  {
    code: 'PHM 101',
    title: 'Introduction to Pharmacy',
    units: 1,
    category: 'health-agric',
    faculty: 'Faculty of Pharmacy',
    format: 'Faculty of Pharmacy Complex along Road 2.',
    tips: 'Orientation to pharmaceutical sciences, pharmacopoeias, ethical dispensing, and health team dynamics.',
  },
  {
    code: 'AGR 101',
    title: 'Introduction to Agriculture',
    units: 2,
    category: 'health-agric',
    faculty: 'Faculty of Agriculture',
    format: 'Faculty of Agriculture Complex & Teaching Farm Axis.',
    tips: 'Agricultural ecology, crop production, livestock management, and rural agrarian economics in Nigeria.',
  },
  {
    code: 'EDU 101',
    title: 'Foundations of Education',
    units: 2,
    category: 'social-admin-law',
    faculty: 'Faculty of Education',
    format: 'Faculty of Education Building near Social Sciences.',
    tips: 'Historical, sociological, and philosophical roots of the Nigerian educational system.',
  },
];

export default function AcademicsPage() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'courses'>('calculator');
  const [courses, setCourses] = useState<CourseRow[]>([]);
  const [newCode, setNewCode] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newUnits, setNewUnits] = useState('3');
  const [newGrade, setNewGrade] = useState('A');
  const [selectedFacultyId, setSelectedFacultyId] = useState<string>('campus-wide');
  const [courseFilter, setCourseFilter] = useState<'all' | 'campus-wide' | 'social-admin-law' | 'arts' | 'stem' | 'health-agric'>('all');

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const saved = localStorage.getItem('oau_saved_gpa_courses');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCourses(parsed);
            return;
          }
        }
      } catch {
        // fallback
      }
      setCourses(DEFAULT_COURSES);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  function saveCourses(updated: CourseRow[]) {
    setCourses(updated);
    try {
      localStorage.setItem('oau_saved_gpa_courses', JSON.stringify(updated));
    } catch {
      // ignore
    }
  }

  function handleLoadFacultyBundle(facultyId: string) {
    const bundle = FACULTY_COURSE_TEMPLATES.find((b) => b.facultyId === facultyId);
    if (!bundle) return;
    const mapped: CourseRow[] = bundle.courses.map((c, i) => ({
      id: `${Date.now()}-${i}`,
      code: c.code,
      title: c.title,
      units: c.units,
      grade: c.defaultGrade,
    }));
    saveCourses(mapped);
  }

  function handleAddCourse(e: React.FormEvent) {
    e.preventDefault();
    if (!newCode.trim()) return;

    const added: CourseRow = {
      id: Date.now().toString(),
      code: newCode.trim().toUpperCase(),
      title: newTitle.trim() || 'Custom Course',
      units: parseInt(newUnits) || 3,
      grade: newGrade,
    };

    saveCourses([...courses, added]);
    setNewCode('');
    setNewTitle('');
    setNewUnits('3');
    setNewGrade('A');
  }

  function handleRemove(id: string) {
    saveCourses(courses.filter((c) => c.id !== id));
  }

  function handleGradeChange(id: string, grade: string) {
    saveCourses(
      courses.map((c) => (c.id === id ? { ...c, grade } : c))
    );
  }

  function handleUnitsChange(id: string, units: number) {
    saveCourses(
      courses.map((c) => (c.id === id ? { ...c, units } : c))
    );
  }

  function handleReset() {
    saveCourses(DEFAULT_COURSES);
  }

  // GPA Calculation
  const totalUnits = courses.reduce((sum, c) => sum + c.units, 0);
  const totalPoints = courses.reduce(
    (sum, c) => sum + c.units * (GRADE_POINTS[c.grade] || 0),
    0
  );
  const gpa = totalUnits > 0 ? (totalPoints / totalUnits).toFixed(2) : '0.00';
  const gpaNum = parseFloat(gpa);

  let classLabel = 'Pass';
  let classColor = 'bg-slate-100 text-slate-800 border-slate-300';
  if (gpaNum >= 4.5) {
    classLabel = 'First Class Honours';
    classColor = 'bg-emerald-100 text-emerald-900 border-emerald-400';
  } else if (gpaNum >= 3.5) {
    classLabel = 'Second Class Honours (Upper Division)';
    classColor = 'bg-blue-100 text-blue-900 border-blue-400';
  } else if (gpaNum >= 2.4) {
    classLabel = 'Second Class Honours (Lower Division)';
    classColor = 'bg-amber-100 text-amber-900 border-amber-400';
  } else if (gpaNum >= 1.5) {
    classLabel = 'Third Class Honours';
    classColor = 'bg-orange-100 text-orange-900 border-orange-400';
  }

  const filteredCourses = STARTER_COURSES.filter((c) => {
    if (courseFilter === 'all') return true;
    return c.category === courseFilter;
  });

  return (
    <div className="space-y-6 text-left">
      {/* Header Banner */}
      <div className="relative border border-slate-200 bg-white p-6 space-y-2 overflow-hidden">
        <div className="absolute top-2 right-4 pointer-events-none opacity-20 hidden sm:block">
          <GeometricShape type="hexagon" color="emerald" size="lg" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-100 text-emerald-900 text-xs font-black uppercase tracking-wide border border-emerald-300">
          <GeometricShape type="square" color="emerald" size="sm" />
          <span>100-LEVEL ACADEMIC TOOLKIT</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-oau-navy">
          <WordAccent shape="triangle" color="emerald">100L Courses</WordAccent> &amp; 5.0 CGPA Simulator
        </h1>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-2xl">
          Understand credit units for campus-wide general courses (GST 111, GST 112, LIB 101) and faculty core
          courses across all 15 faculties. Simulate your target semester GPA using the official Senate 5.0 scale.
        </p>
      </div>

      {/* Mode Tabs */}
      <div className="flex border-b border-slate-300 gap-2">
        <button
          onClick={() => setActiveTab('calculator')}
          className={`px-4 py-2.5 text-xs font-bold border-t-2 border-l border-r -mb-px flex items-center gap-1.5 transition-colors ${
            activeTab === 'calculator'
              ? 'border-t-oau-navy border-slate-300 bg-white text-oau-navy'
              : 'border-transparent text-slate-600 hover:text-oau-navy bg-slate-100'
          }`}
        >
          <Calculator className="w-4 h-4 text-emerald-700" />
          <span>5.0 CGPA Simulator</span>
        </button>
        <button
          onClick={() => setActiveTab('courses')}
          className={`px-4 py-2.5 text-xs font-bold border-t-2 border-l border-r -mb-px flex items-center gap-1.5 transition-colors ${
            activeTab === 'courses'
              ? 'border-t-oau-navy border-slate-300 bg-white text-oau-navy'
              : 'border-transparent text-slate-600 hover:text-oau-navy bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4 text-campus-blue" />
          <span>Core &amp; Campus-Wide Courses</span>
        </button>
      </div>

      {/* Tab 1: 5.0 CGPA Simulator */}
      {activeTab === 'calculator' && (
        <div className="space-y-6">
          {/* Summary Scorecard */}
          <div className="border border-slate-200 bg-white p-5">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
              <div className="p-3 bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase text-slate-500">Calculated GPA</span>
                  <GeometricShape type="hexagon" color="navy" size="sm" />
                </div>
                <p className="text-3xl font-black text-oau-navy mt-0.5">{gpa}</p>
                <p className="text-[11px] text-slate-500">Out of 5.00 Maximum</p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 sm:col-span-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase text-slate-500">Projected Degree Class</span>
                  <GeometricShape type="square" color="emerald" size="sm" />
                </div>
                <p className={`text-sm font-black mt-1 px-2.5 py-1 border inline-block ${classColor}`}>
                  {classLabel}
                </p>
                <p className="text-[11px] text-slate-600 mt-1">Based on OAU Senate Degree Classification</p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase text-slate-500">Total Credit Units</span>
                  <GeometricShape type="circle" color="blue" size="sm" />
                </div>
                <p className="text-2xl font-black text-slate-900 mt-0.5">{totalUnits} Units</p>
                <p className="text-[11px] text-slate-500">{totalPoints} Grade Points</p>
              </div>
            </div>
          </div>

          {/* Quick-Load Faculty Course Template */}
          <div className="border border-blue-200 bg-blue-50/70 p-4 space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wide text-oau-navy flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-campus-blue" />
                  Load Faculty Course Bundle:
                </span>
                <p className="text-xs text-slate-700 mt-0.5">
                  Choose your faculty to auto-fill the simulator with verified 100L courses, including <strong>GST 111, 112, and LIB 101</strong>.
                </p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <select
                  value={selectedFacultyId}
                  onChange={(e) => setSelectedFacultyId(e.target.value)}
                  className="text-xs bg-white border border-slate-300 p-2 font-bold text-slate-800"
                  aria-label="Select faculty course template"
                >
                  {FACULTY_COURSE_TEMPLATES.map((b) => (
                    <option key={b.facultyId} value={b.facultyId}>
                      {b.facultyName}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => handleLoadFacultyBundle(selectedFacultyId)}
                  className="px-3 py-2 bg-oau-navy text-white text-xs font-bold hover:bg-slate-800 shrink-0"
                >
                  Load Bundle
                </button>
              </div>
            </div>
          </div>

          {/* Courses Table */}
          <div className="border border-slate-200 bg-white p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h2 className="text-sm font-bold text-oau-navy uppercase tracking-wide">
                Semester Course List &amp; Grades
              </h2>
              <button
                onClick={handleReset}
                className="text-xs font-semibold text-slate-600 hover:text-oau-navy flex items-center gap-1 border border-slate-200 px-2 py-1 bg-slate-50"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Starter List</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <th className="p-2.5 border-r border-slate-200">Course Code</th>
                    <th className="p-2.5 border-r border-slate-200">Course Title</th>
                    <th className="p-2.5 border-r border-slate-200 text-center">Units</th>
                    <th className="p-2.5 border-r border-slate-200 text-center">Grade</th>
                    <th className="p-2.5 border-r border-slate-200 text-center">Points</th>
                    <th className="p-2.5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((c) => (
                    <tr key={c.id} className="border-b border-slate-200 hover:bg-slate-50">
                      <td className="p-2.5 border-r border-slate-200 font-black text-oau-navy">{c.code}</td>
                      <td className="p-2.5 border-r border-slate-200 text-slate-700">{c.title}</td>
                      <td className="p-2.5 border-r border-slate-200 text-center">
                        <select
                          value={c.units}
                          onChange={(e) => handleUnitsChange(c.id, parseInt(e.target.value))}
                          aria-label={`Credit units for ${c.code}`}
                          className="bg-white border border-slate-300 px-2 py-1 font-bold text-slate-800"
                        >
                          {[1, 2, 3, 4, 5, 6].map((u) => (
                            <option key={u} value={u}>
                              {u}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-2.5 border-r border-slate-200 text-center">
                        <select
                          value={c.grade}
                          onChange={(e) => handleGradeChange(c.id, e.target.value)}
                          aria-label={`Grade for ${c.code}`}
                          className="bg-white border border-slate-300 px-2 py-1 font-bold text-oau-navy"
                        >
                          {['A', 'B', 'C', 'D', 'E', 'F'].map((g) => (
                            <option key={g} value={g}>
                              {g} ({GRADE_POINTS[g]} pts)
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-2.5 border-r border-slate-200 text-center font-bold text-slate-900">
                        {c.units * (GRADE_POINTS[c.grade] || 0)}
                      </td>
                      <td className="p-2.5 text-center">
                        <button
                          onClick={() => handleRemove(c.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Delete course"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add New Course Form */}
            <form onSubmit={handleAddCourse} className="p-3 bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-800 block">Add Custom Course to Simulator:</span>
              <div className="grid grid-cols-1 sm:grid-cols-6 gap-2 text-xs">
                <input
                  type="text"
                  placeholder="Code (e.g. MTH 102)"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className="p-2 border border-slate-300 bg-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Title (e.g. Calculus)"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="p-2 border border-slate-300 bg-white sm:col-span-2"
                />
                <select
                  value={newUnits}
                  onChange={(e) => setNewUnits(e.target.value)}
                  className="p-2 border border-slate-300 bg-white font-semibold"
                >
                  <option value="1">1 Unit</option>
                  <option value="2">2 Units</option>
                  <option value="3">3 Units</option>
                  <option value="4">4 Units</option>
                  <option value="5">5 Units</option>
                </select>
                <select
                  value={newGrade}
                  onChange={(e) => setNewGrade(e.target.value)}
                  className="p-2 border border-slate-300 bg-white font-semibold"
                >
                  {['A', 'B', 'C', 'D', 'E', 'F'].map((g) => (
                    <option key={g} value={g}>
                      Grade {g}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="px-3 py-2 bg-oau-navy text-white font-bold hover:bg-slate-800 flex items-center justify-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </form>
          </div>

          {/* Official 5.0 Scale Breakdown */}
          <div className="border border-slate-200 bg-white p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-oau-navy">
                Official Great Ife 5.0 Grading Standard
              </h3>
              <span className="text-[11px] text-slate-500 font-semibold">Senate Approved</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs">
              {GRADE_RANGES.map((r) => {
                const shapeMap: Record<string, { type: 'circle' | 'square' | 'triangle' | 'hexagon'; color: 'emerald' | 'blue' | 'amber' | 'gold' | 'slate' | 'navy' }> = {
                  A: { type: 'hexagon', color: 'emerald' },
                  B: { type: 'triangle', color: 'blue' },
                  C: { type: 'square', color: 'amber' },
                  D: { type: 'circle', color: 'gold' },
                  E: { type: 'square', color: 'slate' },
                  F: { type: 'triangle', color: 'navy' },
                };
                const shape = shapeMap[r.grade] || { type: 'square', color: 'slate' };
                return (
                  <div key={r.grade} className="p-2.5 bg-slate-50 border border-slate-200 relative">
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      <GeometricShape type={shape.type} color={shape.color} size="sm" />
                      <p className="font-black text-base text-oau-navy">{r.grade}</p>
                    </div>
                    <p className="font-bold text-slate-700">{r.points} Points</p>
                    <p className="text-[11px] text-slate-500 mt-1">{r.score}</p>
                    <p className="text-[10px] text-slate-600 font-semibold">{r.remark}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Core & Campus-Wide Courses */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-oau-navy uppercase tracking-wide">
                Foundational 100-Level Courses &amp; Campus-Wide Requirements
              </h2>
              <p className="text-xs text-slate-600">
                Compulsory general studies (GST 111, 112, LIB 101) and introductory faculty core courses.
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-500 self-start sm:self-auto">
              Showing {filteredCourses.length} of {STARTER_COURSES.length} courses
            </span>
          </div>

          {/* Campus-Wide Compulsory Highlight Banner */}
          <div className="border border-blue-200 bg-blue-50/70 p-4 space-y-1.5 text-xs text-slate-800">
            <span className="font-bold text-blue-950 flex items-center gap-1.5 uppercase tracking-wide">
              <BookOpen className="w-3.5 h-3.5 text-oau-navy" />
              Compulsory Campus-Wide Courses (Every Fresher Takes These):
            </span>
            <p className="leading-relaxed">
              No matter what faculty you belong to (Law, Science, Technology, Arts, Administration, Social Sciences, Health Sciences, etc.),
              <strong> GST 111</strong> (Communication in English), <strong>GST 112</strong> (Logic, Philosophy and Human Existence), and{' '}
              <strong>LIB 101</strong> (Use of Library, Study Skills and ICT) are compulsory general university requirements. You cannot graduate without passing them.
            </p>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={() => setCourseFilter('all')}
              className={`px-3 py-1.5 text-xs font-bold transition-colors ${
                courseFilter === 'all'
                  ? 'bg-oau-navy text-white'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              All Courses ({STARTER_COURSES.length})
            </button>
            <button
              onClick={() => setCourseFilter('campus-wide')}
              className={`px-3 py-1.5 text-xs font-bold transition-colors ${
                courseFilter === 'campus-wide'
                  ? 'bg-oau-navy text-white'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Campus-Wide (GST 111, 112, LIB 101)
            </button>
            <button
              onClick={() => setCourseFilter('social-admin-law')}
              className={`px-3 py-1.5 text-xs font-bold transition-colors ${
                courseFilter === 'social-admin-law'
                  ? 'bg-oau-navy text-white'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Admin, Law &amp; Social Sciences
            </button>
            <button
              onClick={() => setCourseFilter('arts')}
              className={`px-3 py-1.5 text-xs font-bold transition-colors ${
                courseFilter === 'arts'
                  ? 'bg-oau-navy text-white'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Arts &amp; Humanities
            </button>
            <button
              onClick={() => setCourseFilter('stem')}
              className={`px-3 py-1.5 text-xs font-bold transition-colors ${
                courseFilter === 'stem'
                  ? 'bg-oau-navy text-white'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              STEM, Tech &amp; Computing
            </button>
            <button
              onClick={() => setCourseFilter('health-agric')}
              className={`px-3 py-1.5 text-xs font-bold transition-colors ${
                courseFilter === 'health-agric'
                  ? 'bg-oau-navy text-white'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Health Sciences, Pharmacy &amp; Agric
            </button>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCourses.map((course, idx) => {
              const shapes: Array<{ type: 'circle' | 'square' | 'triangle' | 'hexagon'; color: 'emerald' | 'blue' | 'amber' | 'gold' | 'navy' }> = [
                { type: 'triangle', color: 'blue' },
                { type: 'hexagon', color: 'gold' },
                { type: 'square', color: 'navy' },
                { type: 'circle', color: 'emerald' },
                { type: 'square', color: 'amber' },
                { type: 'hexagon', color: 'blue' },
              ];
              const curShape = shapes[idx % shapes.length];

              return (
                <div key={course.code} className="border border-slate-200 bg-white p-5 space-y-2.5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                      <GeometricShape type={curShape.type} color={curShape.color} size="sm" />
                      <div>
                        <span className="text-xs font-black text-campus-blue uppercase">{course.code}</span>
                        <h3 className="text-base font-black text-oau-navy leading-snug">{course.title}</h3>
                      </div>
                    </div>
                    <span className="text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300 px-2 py-0.5 shrink-0">
                      {course.units} Credit {course.units === 1 ? 'Unit' : 'Units'}
                    </span>
                  </div>

                  {course.category === 'campus-wide' && (
                    <div className="inline-block bg-blue-100 border border-blue-300 px-2 py-0.5 text-[10px] font-black text-blue-900 uppercase tracking-wider">
                      CAMPUS-WIDE COMPULSORY GENERAL COURSE
                    </div>
                  )}

                  <div className="space-y-1 text-xs text-slate-700">
                    <p>
                      <strong className="text-slate-900">Relevant Faculty: </strong>
                      {course.faculty}
                    </p>
                    <p>
                      <strong className="text-slate-900">Lecture Format / Venue: </strong>
                      {course.format}
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 border-l-2 border-oau-navy text-xs text-slate-700 mt-2">
                    <strong className="text-oau-navy font-bold">Passing Strategy: </strong>
                    <span>{course.tips}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border border-amber-400 bg-amber-50 p-4 space-y-1 text-xs text-slate-800">
            <span className="font-bold text-amber-900 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
              General Academic Grading Breakdown:
            </span>
            <p className="leading-relaxed">
              At Obafemi Awolowo University, courses are evaluated on a <strong>100-point total</strong>:
              <strong> 40 Marks</strong> Continuous Assessment (mid-semester tests, assignments, laboratory practicals)
              + <strong>60 Marks</strong> End-of-Semester Examination.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
