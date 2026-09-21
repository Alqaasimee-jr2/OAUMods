import { GradeLetter } from '../lib/gpaCalculator';

export interface PreloadedCourse {
  code: string;
  title: string;
  units: number;
  defaultGrade: GradeLetter;
}

export interface FacultyBundle {
  facultyId: string;
  facultyName: string;
  badge: string;
  courses: PreloadedCourse[];
}

export const FACULTY_COURSE_TEMPLATES: FacultyBundle[] = [
  {
    facultyId: 'science',
    facultyName: 'Faculty of Science',
    badge: 'BOOC / White House',
    courses: [
      { code: 'CHM 101', title: 'General Chemistry I', units: 3, defaultGrade: 'A' },
      { code: 'BIO 101', title: 'General Biology I', units: 3, defaultGrade: 'A' },
      { code: 'MTH 101', title: 'Elementary Mathematics I', units: 4, defaultGrade: 'B' },
      { code: 'PHY 101', title: 'General Physics I', units: 4, defaultGrade: 'B' },
      { code: 'CHM 107', title: 'Practical Chemistry I', units: 1, defaultGrade: 'A' },
      { code: 'PHY 107', title: 'Practical Physics I', units: 1, defaultGrade: 'A' },
      { code: 'GST 101', title: 'Use of English I', units: 2, defaultGrade: 'A' },
      { code: 'SER 001', title: 'Use of Library', units: 1, defaultGrade: 'A' },
    ],
  },
  {
    facultyId: 'tech',
    facultyName: 'Faculty of Technology',
    badge: 'Spider House',
    courses: [
      { code: 'MTH 101', title: 'Elementary Mathematics I', units: 4, defaultGrade: 'A' },
      { code: 'PHY 101', title: 'General Physics I', units: 4, defaultGrade: 'B' },
      { code: 'CHM 101', title: 'General Chemistry I', units: 3, defaultGrade: 'B' },
      { code: 'ME 101', title: 'Engineering Graphics I', units: 2, defaultGrade: 'A' },
      { code: 'TPD 101', title: 'Engineer in Society', units: 1, defaultGrade: 'A' },
      { code: 'PHY 107', title: 'Practical Physics I', units: 1, defaultGrade: 'A' },
      { code: 'CHM 107', title: 'Practical Chemistry I', units: 1, defaultGrade: 'A' },
      { code: 'GST 101', title: 'Use of English I', units: 2, defaultGrade: 'A' },
      { code: 'SER 001', title: 'Use of Library', units: 1, defaultGrade: 'A' },
    ],
  },
  {
    facultyId: 'health-sciences',
    facultyName: 'College of Health Sciences & Pharmacy',
    badge: 'Road 2 Academic Complex',
    courses: [
      { code: 'BIO 101', title: 'General Biology I', units: 3, defaultGrade: 'A' },
      { code: 'CHM 101', title: 'General Chemistry I', units: 3, defaultGrade: 'A' },
      { code: 'PHY 101', title: 'General Physics I', units: 4, defaultGrade: 'B' },
      { code: 'MTH 101', title: 'Elementary Mathematics I', units: 4, defaultGrade: 'B' },
      { code: 'CHM 107', title: 'Practical Chemistry I', units: 1, defaultGrade: 'A' },
      { code: 'PHY 107', title: 'Practical Physics I', units: 1, defaultGrade: 'A' },
      { code: 'GST 101', title: 'Use of English I', units: 2, defaultGrade: 'A' },
      { code: 'SER 001', title: 'Use of Library', units: 1, defaultGrade: 'A' },
    ],
  },
  {
    facultyId: 'social-sciences',
    facultyName: 'Faculty of Social Sciences',
    badge: 'Social Sciences Building',
    courses: [
      { code: 'SSC 105', title: 'Mathematics for Social Scientists', units: 3, defaultGrade: 'A' },
      { code: 'ECN 101', title: 'Principles of Economics I', units: 3, defaultGrade: 'A' },
      { code: 'POL 101', title: 'Introduction to Political Science', units: 3, defaultGrade: 'B' },
      { code: 'SOC 101', title: 'Introduction to Sociology I', units: 3, defaultGrade: 'A' },
      { code: 'PSY 101', title: 'Introduction to Psychology', units: 3, defaultGrade: 'B' },
      { code: 'GST 101', title: 'Use of English I', units: 2, defaultGrade: 'A' },
      { code: 'SER 001', title: 'Use of Library', units: 1, defaultGrade: 'A' },
    ],
  },
  {
    facultyId: 'computing',
    facultyName: 'Computing Science & Engineering',
    badge: 'INTECU Corridor',
    courses: [
      { code: 'CSC 101', title: 'Introduction to Computer Science', units: 3, defaultGrade: 'A' },
      { code: 'MTH 101', title: 'Elementary Mathematics I', units: 4, defaultGrade: 'A' },
      { code: 'PHY 101', title: 'General Physics I', units: 4, defaultGrade: 'B' },
      { code: 'CHM 101', title: 'General Chemistry I', units: 3, defaultGrade: 'B' },
      { code: 'PHY 107', title: 'Practical Physics I', units: 1, defaultGrade: 'A' },
      { code: 'GST 101', title: 'Use of English I', units: 2, defaultGrade: 'A' },
      { code: 'SER 001', title: 'Use of Library', units: 1, defaultGrade: 'A' },
    ],
  },
  {
    facultyId: 'law',
    facultyName: 'Faculty of Law',
    badge: 'Law Complex (opp. Library)',
    courses: [
      { code: 'PUL 101', title: 'Nigerian Legal System I', units: 4, defaultGrade: 'A' },
      { code: 'JIL 101', title: 'Legal Methods I', units: 4, defaultGrade: 'A' },
      { code: 'SSC 105', title: 'Foundations of Social Sciences', units: 3, defaultGrade: 'A' },
      { code: 'PHL 101', title: 'Introduction to Logic', units: 3, defaultGrade: 'B' },
      { code: 'GST 101', title: 'Use of English I', units: 2, defaultGrade: 'A' },
      { code: 'SER 001', title: 'Use of Library', units: 1, defaultGrade: 'A' },
    ],
  },
  {
    facultyId: 'administration',
    facultyName: 'Faculty of Administration',
    badge: 'Admin Quad (opp. Senate)',
    courses: [
      { code: 'ACC 101', title: 'Principles of Accounting I', units: 3, defaultGrade: 'A' },
      { code: 'BUS 101', title: 'Introduction to Business I', units: 3, defaultGrade: 'A' },
      { code: 'ECN 101', title: 'Basic Economics I', units: 3, defaultGrade: 'B' },
      { code: 'MTH 105', title: 'Mathematics for Management I', units: 3, defaultGrade: 'B' },
      { code: 'PAD 101', title: 'Elements of Public Administration', units: 3, defaultGrade: 'A' },
      { code: 'GST 101', title: 'Use of English I', units: 2, defaultGrade: 'A' },
      { code: 'SER 001', title: 'Use of Library', units: 1, defaultGrade: 'A' },
    ],
  },
  {
    facultyId: 'arts',
    facultyName: 'Faculty of Arts',
    badge: 'Humanities Blocks 1–3',
    courses: [
      { code: 'ENG 101', title: 'English Language I (Grammar)', units: 3, defaultGrade: 'A' },
      { code: 'ENG 102', title: 'English Composition', units: 3, defaultGrade: 'A' },
      { code: 'LIT 101', title: 'Introduction to Literature', units: 3, defaultGrade: 'A' },
      { code: 'HIS 101', title: 'History of Africa to 1800', units: 3, defaultGrade: 'B' },
      { code: 'PHL 101', title: 'Philosophy & Logic', units: 3, defaultGrade: 'B' },
      { code: 'GST 101', title: 'Use of English I', units: 2, defaultGrade: 'A' },
      { code: 'SER 001', title: 'Use of Library', units: 1, defaultGrade: 'A' },
    ],
  },
  {
    facultyId: 'edm',
    facultyName: 'Environmental Design & Management',
    badge: 'EDM Studio Quad',
    courses: [
      { code: 'ARC 101', title: 'Introductory Architectural Graphics', units: 3, defaultGrade: 'A' },
      { code: 'BLD 101', title: 'Building Science & Technology I', units: 3, defaultGrade: 'A' },
      { code: 'MTH 101', title: 'Elementary Mathematics I', units: 4, defaultGrade: 'B' },
      { code: 'PHY 101', title: 'General Physics I', units: 4, defaultGrade: 'B' },
      { code: 'GST 101', title: 'Use of English I', units: 2, defaultGrade: 'A' },
      { code: 'SER 001', title: 'Use of Library', units: 1, defaultGrade: 'A' },
    ],
  },
];
