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

export const CAMPUS_WIDE_COURSES: PreloadedCourse[] = [
  { code: 'GST 111', title: 'Communication in English', units: 2, defaultGrade: 'A' },
  { code: 'GST 112', title: 'Logic, Philosophy and Human Existence', units: 2, defaultGrade: 'A' },
  { code: 'LIB 101', title: 'Use of Library, Study Skills and ICT', units: 1, defaultGrade: 'A' },
];

export const FACULTY_COURSE_TEMPLATES: FacultyBundle[] = [
  {
    facultyId: 'campus-wide',
    facultyName: 'Campus-Wide Compulsory Courses (All Faculties)',
    badge: 'Compulsory for Every Fresher',
    courses: [
      { code: 'GST 111', title: 'Communication in English', units: 2, defaultGrade: 'A' },
      { code: 'GST 112', title: 'Logic, Philosophy and Human Existence', units: 2, defaultGrade: 'A' },
      { code: 'LIB 101', title: 'Use of Library, Study Skills and ICT', units: 1, defaultGrade: 'A' },
    ],
  },
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
      { code: 'GST 111', title: 'Communication in English', units: 2, defaultGrade: 'A' },
      { code: 'GST 112', title: 'Logic, Philosophy and Human Existence', units: 2, defaultGrade: 'A' },
      { code: 'LIB 101', title: 'Use of Library, Study Skills and ICT', units: 1, defaultGrade: 'A' },
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
      { code: 'MEG 101', title: 'Engineering Graphics I', units: 2, defaultGrade: 'A' },
      { code: 'TPD 101', title: 'Engineer in Society', units: 1, defaultGrade: 'A' },
      { code: 'PHY 107', title: 'Practical Physics I', units: 1, defaultGrade: 'A' },
      { code: 'CHM 107', title: 'Practical Chemistry I', units: 1, defaultGrade: 'A' },
      { code: 'GST 111', title: 'Communication in English', units: 2, defaultGrade: 'A' },
      { code: 'GST 112', title: 'Logic, Philosophy and Human Existence', units: 2, defaultGrade: 'A' },
      { code: 'LIB 101', title: 'Use of Library, Study Skills and ICT', units: 1, defaultGrade: 'A' },
    ],
  },
  {
    facultyId: 'computing',
    facultyName: 'Faculty of Computing',
    badge: 'Computing Complex / INTECU',
    courses: [
      { code: 'CSC 101', title: 'Introduction to Computer Science', units: 3, defaultGrade: 'A' },
      { code: 'MTH 101', title: 'Elementary Mathematics I', units: 4, defaultGrade: 'A' },
      { code: 'PHY 101', title: 'General Physics I', units: 4, defaultGrade: 'B' },
      { code: 'CHM 101', title: 'General Chemistry I', units: 3, defaultGrade: 'B' },
      { code: 'PHY 107', title: 'Practical Physics I', units: 1, defaultGrade: 'A' },
      { code: 'GST 111', title: 'Communication in English', units: 2, defaultGrade: 'A' },
      { code: 'GST 112', title: 'Logic, Philosophy and Human Existence', units: 2, defaultGrade: 'A' },
      { code: 'LIB 101', title: 'Use of Library, Study Skills and ICT', units: 1, defaultGrade: 'A' },
    ],
  },
  {
    facultyId: 'administration',
    facultyName: 'Faculty of Administration',
    badge: 'Admin Quad / Pit Theatre Axis',
    courses: [
      { code: 'ACC 101', title: 'Principles of Accounting I', units: 3, defaultGrade: 'A' },
      { code: 'BUS 101', title: 'Introduction to Business I', units: 3, defaultGrade: 'A' },
      { code: 'ECN 101', title: 'Principles of Economics I', units: 3, defaultGrade: 'B' },
      { code: 'MTH 105', title: 'Mathematics for Management I', units: 3, defaultGrade: 'B' },
      { code: 'PAD 101', title: 'Elements of Public Administration', units: 3, defaultGrade: 'A' },
      { code: 'GST 111', title: 'Communication in English', units: 2, defaultGrade: 'A' },
      { code: 'GST 112', title: 'Logic, Philosophy and Human Existence', units: 2, defaultGrade: 'A' },
      { code: 'LIB 101', title: 'Use of Library, Study Skills and ICT', units: 1, defaultGrade: 'A' },
    ],
  },
  {
    facultyId: 'social-sciences',
    facultyName: 'Faculty of Social Sciences',
    badge: 'Social Sciences Complex / 1000-Seater',
    courses: [
      { code: 'SSC 105', title: 'Mathematics for Social Scientists', units: 3, defaultGrade: 'A' },
      { code: 'ECN 101', title: 'Principles of Economics I', units: 3, defaultGrade: 'A' },
      { code: 'POL 101', title: 'Introduction to Political Science', units: 3, defaultGrade: 'B' },
      { code: 'SOC 101', title: 'Introduction to Sociology I', units: 3, defaultGrade: 'A' },
      { code: 'PSY 101', title: 'Introduction to Psychology', units: 3, defaultGrade: 'B' },
      { code: 'GST 111', title: 'Communication in English', units: 2, defaultGrade: 'A' },
      { code: 'GST 112', title: 'Logic, Philosophy and Human Existence', units: 2, defaultGrade: 'A' },
      { code: 'LIB 101', title: 'Use of Library, Study Skills and ICT', units: 1, defaultGrade: 'A' },
    ],
  },
  {
    facultyId: 'law',
    facultyName: 'Faculty of Law',
    badge: 'Law Complex (opp. Hezekiah Library)',
    courses: [
      { code: 'PUL 101', title: 'Nigerian Legal System I', units: 4, defaultGrade: 'A' },
      { code: 'JIL 101', title: 'Legal Methods I', units: 4, defaultGrade: 'A' },
      { code: 'SSC 105', title: 'Foundations of Social Sciences', units: 3, defaultGrade: 'A' },
      { code: 'PHL 101', title: 'Introduction to Logic & Philosophy', units: 3, defaultGrade: 'B' },
      { code: 'GST 111', title: 'Communication in English', units: 2, defaultGrade: 'A' },
      { code: 'GST 112', title: 'Logic, Philosophy and Human Existence', units: 2, defaultGrade: 'A' },
      { code: 'LIB 101', title: 'Use of Library, Study Skills and ICT', units: 1, defaultGrade: 'A' },
    ],
  },
  {
    facultyId: 'arts',
    facultyName: 'Faculty of Arts',
    badge: 'Humanities Blocks 1–3 / HLT',
    courses: [
      { code: 'ENG 101', title: 'Basic English Grammar and Composition', units: 3, defaultGrade: 'A' },
      { code: 'LIT 101', title: 'Introduction to Literature in English', units: 3, defaultGrade: 'A' },
      { code: 'HIS 101', title: 'History of Africa to 1800', units: 3, defaultGrade: 'B' },
      { code: 'PHL 101', title: 'Introduction to Philosophy and Logic', units: 3, defaultGrade: 'B' },
      { code: 'GST 111', title: 'Communication in English', units: 2, defaultGrade: 'A' },
      { code: 'GST 112', title: 'Logic, Philosophy and Human Existence', units: 2, defaultGrade: 'A' },
      { code: 'LIB 101', title: 'Use of Library, Study Skills and ICT', units: 1, defaultGrade: 'A' },
    ],
  },
  {
    facultyId: 'basic-medical-sciences',
    facultyName: 'Faculty of Basic Medical Sciences',
    badge: 'Health Sciences Complex (Road 2)',
    courses: [
      { code: 'BIO 101', title: 'General Biology I', units: 3, defaultGrade: 'A' },
      { code: 'CHM 101', title: 'General Chemistry I', units: 3, defaultGrade: 'A' },
      { code: 'PHY 101', title: 'General Physics I', units: 4, defaultGrade: 'B' },
      { code: 'MTH 101', title: 'Elementary Mathematics I', units: 4, defaultGrade: 'B' },
      { code: 'CHM 107', title: 'Practical Chemistry I', units: 1, defaultGrade: 'A' },
      { code: 'PHY 107', title: 'Practical Physics I', units: 1, defaultGrade: 'A' },
      { code: 'GST 111', title: 'Communication in English', units: 2, defaultGrade: 'A' },
      { code: 'GST 112', title: 'Logic, Philosophy and Human Existence', units: 2, defaultGrade: 'A' },
      { code: 'LIB 101', title: 'Use of Library, Study Skills and ICT', units: 1, defaultGrade: 'A' },
    ],
  },
  {
    facultyId: 'clinical-sciences',
    facultyName: 'Faculty of Clinical Sciences',
    badge: 'Teaching Hospital (OAUTHC) Axis',
    courses: [
      { code: 'BIO 101', title: 'General Biology I', units: 3, defaultGrade: 'A' },
      { code: 'CHM 101', title: 'General Chemistry I', units: 3, defaultGrade: 'A' },
      { code: 'PHY 101', title: 'General Physics I', units: 4, defaultGrade: 'B' },
      { code: 'MTH 101', title: 'Elementary Mathematics I', units: 4, defaultGrade: 'B' },
      { code: 'CHM 107', title: 'Practical Chemistry I', units: 1, defaultGrade: 'A' },
      { code: 'PHY 107', title: 'Practical Physics I', units: 1, defaultGrade: 'A' },
      { code: 'GST 111', title: 'Communication in English', units: 2, defaultGrade: 'A' },
      { code: 'GST 112', title: 'Logic, Philosophy and Human Existence', units: 2, defaultGrade: 'A' },
      { code: 'LIB 101', title: 'Use of Library, Study Skills and ICT', units: 1, defaultGrade: 'A' },
    ],
  },
  {
    facultyId: 'dentistry',
    facultyName: 'Faculty of Dentistry',
    badge: 'Dental Hospital Complex',
    courses: [
      { code: 'BIO 101', title: 'General Biology I', units: 3, defaultGrade: 'A' },
      { code: 'CHM 101', title: 'General Chemistry I', units: 3, defaultGrade: 'A' },
      { code: 'PHY 101', title: 'General Physics I', units: 4, defaultGrade: 'B' },
      { code: 'MTH 101', title: 'Elementary Mathematics I', units: 4, defaultGrade: 'B' },
      { code: 'CHM 107', title: 'Practical Chemistry I', units: 1, defaultGrade: 'A' },
      { code: 'PHY 107', title: 'Practical Physics I', units: 1, defaultGrade: 'A' },
      { code: 'GST 111', title: 'Communication in English', units: 2, defaultGrade: 'A' },
      { code: 'GST 112', title: 'Logic, Philosophy and Human Existence', units: 2, defaultGrade: 'A' },
      { code: 'LIB 101', title: 'Use of Library, Study Skills and ICT', units: 1, defaultGrade: 'A' },
    ],
  },
  {
    facultyId: 'nursing',
    facultyName: 'Faculty of Nursing Science',
    badge: 'Health Sciences Corridor',
    courses: [
      { code: 'BIO 101', title: 'General Biology I', units: 3, defaultGrade: 'A' },
      { code: 'CHM 101', title: 'General Chemistry I', units: 3, defaultGrade: 'A' },
      { code: 'PHY 101', title: 'General Physics I', units: 4, defaultGrade: 'B' },
      { code: 'MTH 101', title: 'Elementary Mathematics I', units: 4, defaultGrade: 'B' },
      { code: 'CHM 107', title: 'Practical Chemistry I', units: 1, defaultGrade: 'A' },
      { code: 'PHY 107', title: 'Practical Physics I', units: 1, defaultGrade: 'A' },
      { code: 'GST 111', title: 'Communication in English', units: 2, defaultGrade: 'A' },
      { code: 'GST 112', title: 'Logic, Philosophy and Human Existence', units: 2, defaultGrade: 'A' },
      { code: 'LIB 101', title: 'Use of Library, Study Skills and ICT', units: 1, defaultGrade: 'A' },
    ],
  },
  {
    facultyId: 'pharmacy',
    facultyName: 'Faculty of Pharmacy',
    badge: 'Pharmacy Complex along Road 2',
    courses: [
      { code: 'BIO 101', title: 'General Biology I', units: 3, defaultGrade: 'A' },
      { code: 'CHM 101', title: 'General Chemistry I', units: 3, defaultGrade: 'A' },
      { code: 'PHY 101', title: 'General Physics I', units: 4, defaultGrade: 'B' },
      { code: 'MTH 101', title: 'Elementary Mathematics I', units: 4, defaultGrade: 'B' },
      { code: 'CHM 107', title: 'Practical Chemistry I', units: 1, defaultGrade: 'A' },
      { code: 'PHY 107', title: 'Practical Physics I', units: 1, defaultGrade: 'A' },
      { code: 'PHM 101', title: 'Introduction to Pharmacy', units: 1, defaultGrade: 'A' },
      { code: 'GST 111', title: 'Communication in English', units: 2, defaultGrade: 'A' },
      { code: 'GST 112', title: 'Logic, Philosophy and Human Existence', units: 2, defaultGrade: 'A' },
      { code: 'LIB 101', title: 'Use of Library, Study Skills and ICT', units: 1, defaultGrade: 'A' },
    ],
  },
  {
    facultyId: 'agriculture',
    facultyName: 'Faculty of Agriculture',
    badge: 'Agric Complex & Teaching Farm',
    courses: [
      { code: 'AGR 101', title: 'Introduction to Agriculture', units: 2, defaultGrade: 'A' },
      { code: 'BIO 101', title: 'General Biology I', units: 3, defaultGrade: 'A' },
      { code: 'CHM 101', title: 'General Chemistry I', units: 3, defaultGrade: 'A' },
      { code: 'PHY 101', title: 'General Physics I', units: 3, defaultGrade: 'B' },
      { code: 'MTH 101', title: 'Elementary Mathematics I', units: 3, defaultGrade: 'B' },
      { code: 'CHM 107', title: 'Practical Chemistry I', units: 1, defaultGrade: 'A' },
      { code: 'GST 111', title: 'Communication in English', units: 2, defaultGrade: 'A' },
      { code: 'GST 112', title: 'Logic, Philosophy and Human Existence', units: 2, defaultGrade: 'A' },
      { code: 'LIB 101', title: 'Use of Library, Study Skills and ICT', units: 1, defaultGrade: 'A' },
    ],
  },
  {
    facultyId: 'edm',
    facultyName: 'Faculty of Environmental Design & Management',
    badge: 'EDM Studio Quad',
    courses: [
      { code: 'ARC 101', title: 'Introductory Architectural Graphics', units: 3, defaultGrade: 'A' },
      { code: 'BLD 101', title: 'Building Science & Technology I', units: 3, defaultGrade: 'A' },
      { code: 'ESM 101', title: 'Principles of Estate Management', units: 2, defaultGrade: 'A' },
      { code: 'MTH 101', title: 'Elementary Mathematics I', units: 4, defaultGrade: 'B' },
      { code: 'PHY 101', title: 'General Physics I', units: 4, defaultGrade: 'B' },
      { code: 'GST 111', title: 'Communication in English', units: 2, defaultGrade: 'A' },
      { code: 'GST 112', title: 'Logic, Philosophy and Human Existence', units: 2, defaultGrade: 'A' },
      { code: 'LIB 101', title: 'Use of Library, Study Skills and ICT', units: 1, defaultGrade: 'A' },
    ],
  },
  {
    facultyId: 'education',
    facultyName: 'Faculty of Education',
    badge: 'Education Complex near Social Sciences',
    courses: [
      { code: 'EDU 101', title: 'Foundations of Education', units: 2, defaultGrade: 'A' },
      { code: 'EDU 103', title: 'Philosophy of Nigerian Education', units: 2, defaultGrade: 'A' },
      { code: 'GST 111', title: 'Communication in English', units: 2, defaultGrade: 'A' },
      { code: 'GST 112', title: 'Logic, Philosophy and Human Existence', units: 2, defaultGrade: 'A' },
      { code: 'LIB 101', title: 'Use of Library, Study Skills and ICT', units: 1, defaultGrade: 'A' },
    ],
  },
];
