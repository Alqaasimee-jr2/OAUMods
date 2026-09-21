export type GradeLetter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export interface CourseEntry {
  id: string;
  code: string;
  title: string;
  units: number;
  grade: GradeLetter;
}

export interface DegreeClassification {
  classTitle: string;
  badgeColor: string;
  textColor: string;
  bgGradient: string;
  strokeColor: string;
  icon: string;
  description: string;
}

export const OAU_GRADE_POINTS: Record<GradeLetter, number> = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  E: 1,
  F: 0,
};

export const OAU_GRADE_RANGES: Record<GradeLetter, { range: string; desc: string }> = {
  A: { range: '70% – 100%', desc: 'Excellent' },
  B: { range: '60% – 69%', desc: 'Very Good' },
  C: { range: '50% – 59%', desc: 'Good' },
  D: { range: '45% – 49%', desc: 'Fair' },
  E: { range: '40% – 44%', desc: 'Pass' },
  F: { range: '0% – 39%', desc: 'Fail' },
};

export const MIN_CREDIT_LOAD = 15;
export const MAX_CREDIT_LOAD = 24;

export function calculateSemesterGPA(courses: CourseEntry[]): {
  totalCreditUnits: number;
  totalQualityPoints: number;
  gpa: number;
  isOverload: boolean;
  isUnderload: boolean;
} {
  let totalCreditUnits = 0;
  let totalQualityPoints = 0;

  for (const course of courses) {
    const units = Math.max(0, Number(course.units) || 0);
    const points = OAU_GRADE_POINTS[course.grade] ?? 0;
    totalCreditUnits += units;
    totalQualityPoints += units * points;
  }

  const gpa = totalCreditUnits > 0 ? Number((totalQualityPoints / totalCreditUnits).toFixed(2)) : 0.0;

  return {
    totalCreditUnits,
    totalQualityPoints,
    gpa,
    isOverload: totalCreditUnits > MAX_CREDIT_LOAD,
    isUnderload: totalCreditUnits > 0 && totalCreditUnits < MIN_CREDIT_LOAD,
  };
}

export function getDegreeClassification(gpa: number): DegreeClassification {
  if (gpa >= 4.5) {
    return {
      classTitle: 'First Class Honours',
      badgeColor: 'bg-fresh-green/15 text-fresh-green border-fresh-green/30 dark:bg-fresh-green/25 dark:text-emerald-300',
      textColor: 'text-fresh-green dark:text-emerald-300',
      bgGradient: 'from-oau-navy via-campus-blue to-[#0D2440]',
      strokeColor: '#25855A',
      icon: '🌟',
      description: 'Outstanding academic distinction. Keep this trajectory for university commendations.',
    };
  }
  if (gpa >= 3.5) {
    return {
      classTitle: 'Second Class Honours (Upper Division)',
      badgeColor: 'bg-campus-blue/15 text-campus-blue border-campus-blue/30 dark:bg-campus-blue/25 dark:text-sky-300',
      textColor: 'text-campus-blue dark:text-sky-300',
      bgGradient: 'from-oau-navy via-[#164e7c] to-[#0E2845]',
      strokeColor: '#1769AA',
      icon: '🎖️',
      description: 'Strong academic performance (2:1). Competitive for scholarships and postgraduate studies.',
    };
  }
  if (gpa >= 2.4) {
    return {
      classTitle: 'Second Class Honours (Lower Division)',
      badgeColor: 'bg-student-gold/20 text-amber-800 dark:text-student-gold border-student-gold/40',
      textColor: 'text-amber-800 dark:text-student-gold',
      bgGradient: 'from-[#192E48] via-[#214366] to-[#122338]',
      strokeColor: '#E6AD3C',
      icon: '📘',
      description: 'Good standing (2:2). Focus on prerequisite courses to push your cumulative average into 2:1.',
    };
  }
  if (gpa >= 1.5) {
    return {
      classTitle: 'Third Class Honours',
      badgeColor: 'bg-amber-warn/20 text-amber-warn border-amber-warn/40',
      textColor: 'text-amber-warn',
      bgGradient: 'from-[#2A231C] via-[#3D2F1E] to-[#1B1612]',
      strokeColor: '#C88719',
      icon: '📙',
      description: 'Marginal standing. Consult your 100-Level Course Advisor to optimize elective selections.',
    };
  }
  if (gpa >= 1.0) {
    return {
      classTitle: 'Pass Degree',
      badgeColor: 'bg-soft-red/20 text-soft-red border-soft-red/40',
      textColor: 'text-soft-red',
      bgGradient: 'from-[#351B20] via-[#482028] to-[#1F1216]',
      strokeColor: '#C94B4B',
      icon: '⚠️',
      description: 'Critical warning zone. Minimum passing grade threshold to avoid academic dismissal.',
    };
  }
  return {
    classTitle: 'Academic Probation / Advisory',
    badgeColor: 'bg-soft-red/30 text-soft-red border-soft-red/60 animate-pulse',
    textColor: 'text-soft-red',
    bgGradient: 'from-[#3F1418] via-[#521820] to-[#250C10]',
    strokeColor: '#C94B4B',
    icon: '🚨',
    description: 'CGPA below 1.00 triggers statutory academic probation under OAU Senate examination rules.',
  };
}

export function forecastRequiredGPA(
  sem1GPA: number,
  sem1Units: number,
  sem2Units: number,
  targetCGPA: number
): {
  requiredSem2GPA: number;
  isAchievable: boolean;
  message: string;
} {
  if (sem1Units <= 0 || sem2Units <= 0) {
    return {
      requiredSem2GPA: 0,
      isAchievable: false,
      message: 'Both semester units must be greater than zero.',
    };
  }

  const totalUnits = sem1Units + sem2Units;
  const targetTotalQualityPoints = totalUnits * targetCGPA;
  const sem1QualityPoints = sem1Units * sem1GPA;
  const neededSem2QualityPoints = targetTotalQualityPoints - sem1QualityPoints;
  const requiredSem2GPA = Number((neededSem2QualityPoints / sem2Units).toFixed(2));

  if (requiredSem2GPA > 5.0) {
    return {
      requiredSem2GPA,
      isAchievable: false,
      message: `Mathematically unattainable in 2 semesters: You would need a Rain Semester GPA of ${requiredSem2GPA.toFixed(2)}, which exceeds the maximum possible 5.00. Focus on maintaining a strong cumulative baseline.`,
    };
  }

  if (requiredSem2GPA <= 0.0) {
    return {
      requiredSem2GPA: 0.0,
      isAchievable: true,
      message: `Your current Harmattan GPA (${sem1GPA.toFixed(2)}) has already banked sufficient points! Even with minimal passing grades in Rain Semester, you will meet or exceed your target CGPA of ${targetCGPA.toFixed(2)}.`,
    };
  }

  return {
    requiredSem2GPA,
    isAchievable: true,
    message: `To graduate 100-Level with a target CGPA of ${targetCGPA.toFixed(2)}, you must achieve at least a ${requiredSem2GPA.toFixed(2)} GPA across your ${sem2Units} Rain Semester units.`,
  };
}
