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
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
      textColor: 'text-emerald-400',
      bgGradient: 'from-emerald-500/10 via-emerald-600/5 to-transparent',
      icon: '🌟',
      description: 'Outstanding academic distinction. Keep this trajectory for university commendations.',
    };
  }
  if (gpa >= 3.5) {
    return {
      classTitle: 'Second Class Honours (Upper Division)',
      badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
      textColor: 'text-blue-400',
      bgGradient: 'from-blue-500/10 via-blue-600/5 to-transparent',
      icon: '🎖️',
      description: 'Strong academic performance (2:1). Competitive for scholarships and postgraduate studies.',
    };
  }
  if (gpa >= 2.4) {
    return {
      classTitle: 'Second Class Honours (Lower Division)',
      badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
      textColor: 'text-amber-400',
      bgGradient: 'from-amber-500/10 via-amber-600/5 to-transparent',
      icon: '📘',
      description: 'Good standing (2:2). Focus on prerequisite courses to push your cumulative average into 2:1.',
    };
  }
  if (gpa >= 1.5) {
    return {
      classTitle: 'Third Class Honours',
      badgeColor: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
      textColor: 'text-orange-400',
      bgGradient: 'from-orange-500/10 via-orange-600/5 to-transparent',
      icon: '📙',
      description: 'Marginal standing. Consult your 100-Level Course Advisor to optimize elective selections.',
    };
  }
  if (gpa >= 1.0) {
    return {
      classTitle: 'Pass Degree',
      badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
      textColor: 'text-rose-400',
      bgGradient: 'from-rose-500/10 via-rose-600/5 to-transparent',
      icon: '⚠️',
      description: 'Critical warning zone. Minimum passing grade threshold to avoid academic dismissal.',
    };
  }
  return {
    classTitle: 'Academic Probation / Advisory',
    badgeColor: 'bg-red-600/30 text-red-400 border-red-500/50 animate-pulse',
    textColor: 'text-red-400',
    bgGradient: 'from-red-600/20 via-red-900/10 to-transparent',
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
      isAchievable: true,
      message: 'Enter credit units for both semesters to calculate projection.',
    };
  }

  const totalUnits = sem1Units + sem2Units;
  const targetTotalQP = targetCGPA * totalUnits;
  const sem1QP = sem1GPA * sem1Units;
  const requiredSem2QP = targetTotalQP - sem1QP;
  const requiredSem2GPA = Number((requiredSem2QP / sem2Units).toFixed(2));

  if (requiredSem2GPA > 5.0) {
    return {
      requiredSem2GPA,
      isAchievable: false,
      message: `Mathematically unattainable this session (requires ${requiredSem2GPA} GPA, maximum possible is 5.00). Aim for a ${((sem1QP + sem2Units * 5.0) / totalUnits).toFixed(2)} maximum cap.`,
    };
  }

  if (requiredSem2GPA <= 0) {
    return {
      requiredSem2GPA: 0.0,
      isAchievable: true,
      message: 'Your current semester score already locks in your target degree classification!',
    };
  }

  return {
    requiredSem2GPA,
    isAchievable: true,
    message: `You need a minimum GPA of ${requiredSem2GPA} in the next semester (${sem2Units} units) to secure a ${targetCGPA.toFixed(2)} CGPA.`,
  };
}
