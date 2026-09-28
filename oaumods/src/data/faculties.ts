export interface DepartmentInfo {
  name: string;
  degree: string;
  duration: string;
  tracks?: string[];
}

export interface FacultyData {
  id: string;
  name: string;
  location: string;
  deansOffice: string;
  clearanceFile: string;
  lectureTheatres: string[];
  departments: DepartmentInfo[];
}

export const UNIVERSAL_FILE_JACKET = {
  color: 'Pale Yellow',
  description: 'Standard Pale Yellow flat manila file jacket mandated across all 15 faculties and departments.',
  labeling: 'Full Legal Name, JAMB Reg Number, Matric Number, Faculty, Department, Session, Phone Number.',
  rules: 'Never staple original certificates into your file; use paperclips or transparent sleeves.',
};

export const FACULTIES_DATA: FacultyData[] = [
  {
    id: 'admin',
    name: 'Faculty of Administration',
    location: 'Management & Social Sciences Quadrangle (opp. Hezekiah Library)',
    deansOffice: 'Ground Floor, Administration Building',
    clearanceFile: 'Pale Yellow (Universal)',
    lectureTheatres: ['First Bank LT', 'Admin 1st Bank Annex'],
    departments: [
      { name: 'Management & Accounting', degree: 'B.Sc. Accounting / B.Sc. Business Admin', duration: '4 Years' },
      { name: 'Public Administration', degree: 'B.Sc. Public Administration', duration: '4 Years' },
      { name: 'International Relations', degree: 'B.Sc. International Relations', duration: '4 Years' },
      { name: 'Local Government & Development Studies', degree: 'B.Sc. Local Government Studies', duration: '4 Years' },
    ],
  },
  {
    id: 'agric',
    name: 'Faculty of Agriculture',
    location: 'Agricultural Sciences Complex (Eastern Academic Belt)',
    deansOffice: 'First Floor, Central Agriculture Complex',
    clearanceFile: 'Pale Yellow (Universal)',
    lectureTheatres: ['Agric Lecture Theatres A & B', 'University Commercial Farm'],
    departments: [
      { name: 'Agricultural Economics', degree: '5-Yr Integrated B.Agric', duration: '5 Years (FPY in Year 4)' },
      { name: 'Animal Sciences', degree: '5-Yr Integrated B.Agric', duration: '5 Years' },
      { name: 'Crop Production & Protection', degree: '5-Yr Integrated B.Agric', duration: '5 Years' },
      { name: 'Soil Science & Land Resources Mgt', degree: '5-Yr Integrated B.Agric', duration: '5 Years' },
      { name: 'Agricultural Extension & Rural Sociology', degree: '5-Yr Integrated B.Agric', duration: '5 Years' },
      { name: 'Family, Nutrition & Consumer Sciences', degree: 'B.Sc. Nutrition & Consumer Sciences', duration: '4 Years' },
    ],
  },
  {
    id: 'arts',
    name: 'Faculty of Arts',
    location: 'Humanities Blocks 1–3 (Oduduwa Quadrangle)',
    deansOffice: 'Ground Floor, Block A, Humanities Complex',
    clearanceFile: 'Pale Yellow (Universal)',
    lectureTheatres: ['AUD 1 & 2', 'Humanities 1000-Seater LT', 'Pit Theatre'],
    departments: [
      { name: 'English', degree: 'B.A. English (Language & Literature tracks)', duration: '4 Years' },
      { name: 'Dramatic Arts', degree: 'B.A. Dramatic Arts (Playwriting, Directing, Technical, Media)', duration: '4 Years' },
      { name: 'Foreign Languages', degree: 'B.A. French / German / Portuguese', duration: '4 Years' },
      { name: 'Linguistics & African Languages', degree: 'B.A. Linguistics / Yoruba', duration: '4 Years' },
      { name: 'History', degree: 'B.A. History', duration: '4 Years' },
      { name: 'Philosophy', degree: 'B.A. Philosophy', duration: '4 Years' },
      { name: 'Religious Studies', degree: 'B.A. Religious Studies', duration: '4 Years' },
      { name: 'Music', degree: 'B.A. Music', duration: '4 Years' },
    ],
  },
  {
    id: 'basic-med',
    name: 'Faculty of Basic Medical Sciences (CHS)',
    location: 'College of Health Sciences Complex (Road 2, Academic Core)',
    deansOffice: 'CHS Administrative Block, Road 2',
    clearanceFile: 'Pale Yellow (Universal)',
    lectureTheatres: ['Pre-Clinical Lecture Theatres', 'Anatomy Laboratories'],
    departments: [
      { name: 'Anatomy & Cell Biology', degree: 'B.Sc. Anatomy', duration: '4 Years' },
      { name: 'Physiological Sciences', degree: 'B.Sc. Physiology', duration: '4 Years' },
      { name: 'Medical Biochemistry', degree: 'B.Sc. Medical Biochemistry', duration: '4 Years' },
      { name: 'Medical Rehabilitation', degree: '5-Yr B.MR (Physiotherapy & Occupational Therapy)', duration: '5 Years' },
    ],
  },
  {
    id: 'clinical-sciences',
    name: 'Faculty of Clinical Sciences (CHS)',
    location: 'Pre-clinical: Road 2 on Campus; Clinical: OAUTHC (Ilesa Road)',
    deansOffice: 'Clinical Deanery, OAUTHC Complex',
    clearanceFile: 'Pale Yellow (Universal)',
    lectureTheatres: ['CHS Clinical Auditorium', 'OAUTHC Teaching Wards'],
    departments: [
      { name: 'Medicine & Surgery', degree: '6-Year Professional MBBS', duration: '6 Years' },
      { name: 'Paediatrics & Child Health', degree: 'Clinical Training Component', duration: 'Post-Basic' },
      { name: 'Obstetrics & Gynaecology', degree: 'Clinical Training Component', duration: 'Post-Basic' },
      { name: 'Community Health', degree: 'Clinical Training Component', duration: 'Post-Basic' },
    ],
  },
  {
    id: 'dentistry',
    name: 'Faculty of Dentistry (CHS)',
    location: 'Dental Clinic Complex (Campus Road 2 & OAUTHC)',
    deansOffice: 'Ground Floor, Dental Hospital Building',
    clearanceFile: 'Pale Yellow (Universal)',
    lectureTheatres: ['Dental Phantom Head Lab', 'OAUTHC Dental Auditoriums'],
    departments: [
      { name: 'Child Dental Health', degree: '6-Year Professional B.Ch.D', duration: '6 Years' },
      { name: 'Oral & Maxillofacial Surgery', degree: '6-Year Professional B.Ch.D', duration: '6 Years' },
      { name: 'Preventive & Community Dentistry', degree: '6-Year Professional B.Ch.D', duration: '6 Years' },
      { name: 'Restorative Dentistry', degree: '6-Year Professional B.Ch.D', duration: '6 Years' },
    ],
  },
  {
    id: 'nursing',
    name: 'Faculty of Nursing Science',
    location: 'College of Health Sciences Complex (Road 2 & OAUTHC)',
    deansOffice: 'Nursing Administration Wing, Health Sciences',
    clearanceFile: 'Pale Yellow (Universal)',
    lectureTheatres: ['Health Sciences Lecture Theatres', 'Nursing Clinical Skills Labs'],
    departments: [
      { name: 'Community Health Nursing', degree: '5-Yr B.N.Sc. (RN, RM, RPHN certifications)', duration: '5 Years' },
      { name: 'Maternal & Child Health Nursing', degree: '5-Yr B.N.Sc.', duration: '5 Years' },
      { name: 'Medical-Surgical Nursing', degree: '5-Yr B.N.Sc.', duration: '5 Years' },
      { name: 'Mental Health & Psychiatric Nursing', degree: '5-Yr B.N.Sc.', duration: '5 Years' },
    ],
  },
  {
    id: 'edm',
    name: 'Faculty of Environmental Design & Mgt (EDM)',
    location: 'EDM Studio Quadrangle (Road 2, adjacent to Pharmacy)',
    deansOffice: 'Ground Floor, EDM Complex',
    clearanceFile: 'Pale Yellow (Universal)',
    lectureTheatres: ['Architecture Design Studios', 'EDM Lecture Theatre'],
    departments: [
      { name: 'Architecture', degree: '4-Yr B.Sc. + 2-Yr M.Sc. Professional', duration: '4 + 2 Years' },
      { name: 'Building', degree: '5-Yr B.Sc. Building', duration: '5 Years' },
      { name: 'Estate Management', degree: '5-Yr B.Sc. Estate Management', duration: '5 Years' },
      { name: 'Quantity Surveying', degree: '5-Yr B.Sc. Quantity Surveying', duration: '5 Years' },
      { name: 'Urban & Regional Planning', degree: '5-Yr B.Sc. Urban Planning', duration: '5 Years' },
      { name: 'Fine & Applied Arts', degree: '4-Yr B.A. (Painting, Sculpture, Graphics, Textile)', duration: '4 Years' },
      { name: 'Surveying & Geoinformatics', degree: '5-Yr B.Sc. Geoinformatics', duration: '5 Years' },
    ],
  },
  {
    id: 'law',
    name: 'Faculty of Law',
    location: 'Faculty of Law Complex (Road 1, opp. Hezekiah Library & SUB)',
    deansOffice: 'First Floor, Law Library Building',
    clearanceFile: 'Pale Yellow (Universal)',
    lectureTheatres: ['Law Lecture Theatre', 'Moot Court Auditorium'],
    departments: [
      { name: 'Public Law', degree: '5-Year Professional LL.B', duration: '5 Years' },
      { name: 'International Law', degree: '5-Year Professional LL.B', duration: '5 Years' },
      { name: 'Business Law', degree: '5-Year Professional LL.B', duration: '5 Years' },
      { name: 'Jurisprudence & Private Law', degree: '5-Year Professional LL.B', duration: '5 Years' },
    ],
  },
  {
    id: 'pharmacy',
    name: 'Faculty of Pharmacy',
    location: 'Pharmacy Complex (Road 2, adjacent to EDM & CHS)',
    deansOffice: 'Ground Floor, Faculty of Pharmacy Building',
    clearanceFile: 'Pale Yellow (Universal)',
    lectureTheatres: ['Pharmacy Auditoriums A & B', 'DRPU Research Labs'],
    departments: [
      { name: 'Pharmaceutics & Pharmaceutical Technology', degree: '5-Year B.Pharm / Pharm.D', duration: '5 Years' },
      { name: 'Pharmaceutical Chemistry', degree: '5-Year B.Pharm / Pharm.D', duration: '5 Years' },
      { name: 'Pharmacognosy', degree: '5-Year B.Pharm / Pharm.D', duration: '5 Years' },
      { name: 'Pharmacology', degree: '5-Year B.Pharm / Pharm.D', duration: '5 Years' },
      { name: 'Clinical Pharmacy & Pharmacy Admin', degree: '5-Year B.Pharm / Pharm.D', duration: '5 Years' },
    ],
  },
  {
    id: 'science',
    name: 'Faculty of Science',
    location: 'The iconic "White House" Complex (Central Science Quadrangle)',
    deansOffice: 'Ground Floor, White House Central Wing',
    clearanceFile: 'Pale Yellow (Universal)',
    lectureTheatres: ['BOOC (Biological Sciences LT C)', 'BOOA & BOOB', 'White House LTs', 'Yellow House (Maths)'],
    departments: [
      { name: 'Chemistry', degree: 'B.Sc. Pure Chemistry / Industrial Chemistry', duration: '4 Years' },
      { name: 'Physics & Engineering Physics', degree: 'B.Sc. Physics / Engineering Physics', duration: '4 Years' },
      { name: 'Mathematics', degree: 'B.Sc. Mathematics / Statistics (Yellow House)', duration: '4 Years' },
      { name: 'Microbiology', degree: 'B.Sc. Microbiology', duration: '4 Years' },
      { name: 'Biochemistry & Molecular Biology', degree: 'B.Sc. Biochemistry', duration: '4 Years' },
      { name: 'Botany & Plant Science', degree: 'B.Sc. Botany', duration: '4 Years' },
      { name: 'Zoology', degree: 'B.Sc. Zoology', duration: '4 Years' },
      { name: 'Geology & Applied Geophysics', degree: 'B.Sc. Geology', duration: '4 Years' },
    ],
  },
  {
    id: 'social-sciences',
    name: 'Faculty of Social Sciences',
    location: 'Social Sciences Building / Yellow-Panel Complex (opp. Senate Building)',
    deansOffice: 'Ground Floor, Social Sciences Central Foyer',
    clearanceFile: 'Pale Yellow (Universal)',
    lectureTheatres: ['Social Sciences Lecture Theatre', 'ODLT 1 & 2 Corridor'],
    departments: [
      {
        name: 'Sociology & Anthropology (5-in-1 Unbundled Matrix)',
        degree: 'B.Sc. Sociology / MCM / BCJ / ISMS / FMM',
        duration: '4 Years',
        tracks: [
          'SOC Major: B.Sc. Sociology & Anthropology',
          'MCM: B.Sc. Mass Communication',
          'BCJ: B.Sc. Broadcast Journalism',
          'ISMS: B.Sc. Information Science & Media Studies',
          'FMM: B.Sc. Film Production & Multimedia Studies',
        ],
      },
      { name: 'Economics', degree: 'B.Sc. Economics', duration: '4 Years' },
      { name: 'Political Science', degree: 'B.Sc. Political Science', duration: '4 Years' },
      { name: 'Psychology', degree: 'B.Sc. Psychology', duration: '4 Years' },
      { name: 'Demography & Social Statistics', degree: 'B.Sc. Demography & Social Statistics', duration: '4 Years' },
      { name: 'Geography', degree: 'B.Sc. Geography', duration: '4 Years' },
    ],
  },
  {
    id: 'tech',
    name: 'Faculty of Technology',
    location: 'The iconic "Spider House" Complex',
    deansOffice: 'Ground Floor, Spider House Central Wing',
    clearanceFile: 'Pale Yellow (Universal)',
    lectureTheatres: ['Chemical Engineering LT A & B', 'Mechanical/Civil Workshops', 'Spider House Auditoriums'],
    departments: [
      { name: 'Electronic & Electrical Engineering', degree: '5-Yr B.Sc. (Eng)', duration: '5 Years' },
      { name: 'Mechanical Engineering', degree: '5-Yr B.Sc. (Eng)', duration: '5 Years' },
      { name: 'Chemical Engineering', degree: '5-Yr B.Sc. (Eng)', duration: '5 Years' },
      { name: 'Civil Engineering', degree: '5-Yr B.Sc. (Eng)', duration: '5 Years' },
      { name: 'Materials Science & Engineering', degree: '5-Yr B.Sc. (Eng)', duration: '5 Years' },
      { name: 'Agricultural & Environmental Engineering', degree: '5-Yr B.Sc. (Eng)', duration: '5 Years' },
      { name: 'Food Science & Technology', degree: '5-Yr B.Sc. (Tech)', duration: '5 Years' },
    ],
  },
  {
    id: 'computing',
    name: 'Faculty of Computing',
    location: 'Computing Complex / INTECU ICT Corridor',
    deansOffice: 'Computing Administration Block',
    clearanceFile: 'Pale Yellow (Universal)',
    lectureTheatres: ['Computer Science Laboratories', 'INTECU Tech Auditoriums'],
    departments: [
      { name: 'Computer Engineering', degree: '5-Yr B.Sc. Computer Engineering', duration: '5 Years' },
      { name: 'Information & Communication Technology', degree: '5-Yr B.Sc. ICT', duration: '5 Years' },
      { name: 'Computer Science', degree: '4-Yr B.Sc. Computer Science', duration: '4 Years' },
      { name: 'Cyber Security', degree: '4-Yr B.Sc. Cyber Security', duration: '4 Years' },
      { name: 'Software Engineering', degree: '4-Yr B.Sc. Software Engineering', duration: '4 Years' },
    ],
  },
  {
    id: 'education',
    name: 'Faculty of Education',
    location: 'Faculty of Education Complex (Road 1, adjacent to Fajuyi Hall)',
    deansOffice: 'First Floor, Education Complex Block A',
    clearanceFile: 'Pale Yellow (Universal)',
    lectureTheatres: ['Education Lecture Theatres', 'Language Laboratories'],
    departments: [
      { name: 'Arts & Social Sciences Education', degree: 'B.A. (Ed) / B.Sc. (Ed)', duration: '4 Years' },
      { name: 'Science & Technology Education', degree: 'B.Sc. (Ed) Mathematics, Physics, Chemistry', duration: '4 Years' },
      { name: 'Educational Foundations & Counselling', degree: 'B.Ed Guidance & Counselling', duration: '4 Years' },
      { name: 'Educational Management', degree: 'B.Ed Educational Management', duration: '4 Years' },
      { name: 'Educational Technology & Library Science', degree: 'B.Ed / B.LIS', duration: '4 Years' },
      { name: 'Physical & Health Education (PHE)', degree: 'B.Sc. (Ed) Physical Education', duration: '4 Years' },
    ],
  },
];
