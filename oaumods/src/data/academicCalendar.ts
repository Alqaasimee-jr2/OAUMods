export type CalendarCategory =
  | 'resumption'
  | 'registration'
  | 'orientation'
  | 'training'
  | 'lectures'
  | 'ceremony'
  | 'break'
  | 'exam';

export interface CalendarEvent {
  id: string;
  title: string;
  shortTitle: string;
  category: CalendarCategory;
  categoryLabel: string;
  categoryColor: {
    bg: string;
    text: string;
    border: string;
    badge: string;
  };
  startDate: string; // ISO date string 'YYYY-MM-DD'
  endDate?: string;   // ISO date string 'YYYY-MM-DD' (optional)
  displayDate: string;
  targetAudience: 'Freshmen' | 'All Students' | 'Returning Students';
  isFreshmanMilestone: boolean;
  venue?: string;
  description: string;
  freshmanActionGuide: string[];
  actionLink?: {
    href: string;
    label: string;
  };
}

export interface SemesterMetadata {
  title: string;
  session: string;
  semester: string;
  totalTeachingWeeks: number;
  teachingPhases: Array<{
    name: string;
    dates: string;
    weeks: number;
    description: string;
  }>;
  revisionWeek: string;
  examinationPeriod: string;
  semesterBreak: string;
  officialNote: string;
}

export const SEMESTER_METADATA: SemesterMetadata = {
  title: 'OAU 2026/2027 Harmattan Semester Calendar',
  session: '2026/2027',
  semester: 'Harmattan',
  totalTeachingWeeks: 13,
  teachingPhases: [
    {
      name: 'Teaching Phase 1',
      dates: '16 November – 18 December 2026',
      weeks: 5,
      description: 'First 5 weeks of Harmattan teaching prior to the Christmas & New Year break.',
    },
    {
      name: 'Christmas / New Year Break',
      dates: '25 December 2026 – 1 January 2027',
      weeks: 1,
      description: 'One-week holiday vacation across the university.',
    },
    {
      name: 'Teaching Phase 2',
      dates: '4 January – 26 February 2027',
      weeks: 8,
      description: 'Second 8 weeks of Harmattan teaching concluding the 13-week curriculum.',
    },
  ],
  revisionWeek: '1–5 March 2027',
  examinationPeriod: 'Monday, 8 – Saturday, 27 March 2027',
  semesterBreak: '5–17 April 2027',
  officialNote:
    'This is the official proposed calendar approved by the University Senate; Obafemi Awolowo University may adjust dates during the academic session.',
};

export const HARMATTAN_2026_CALENDAR: CalendarEvent[] = [
  {
    id: 'freshmen-resumption',
    title: 'Fresh Students Resumption & Hostel Check-In',
    shortTitle: 'Freshmen Resumption',
    category: 'resumption',
    categoryLabel: 'Resumption & Housing',
    categoryColor: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-900',
      border: 'border-emerald-200',
      badge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    },
    startDate: '2026-10-31',
    endDate: '2026-10-31',
    displayDate: 'Saturday, 31 October 2026',
    targetAudience: 'Freshmen',
    isFreshmanMilestone: true,
    venue: 'Angola Hall (Male Freshmen) & Mozambique Hall (Female Freshmen)',
    description:
      'Official campus arrival and hall check-in date for all newly admitted 100-level undergraduate students at Great Ife.',
    freshmanActionGuide: [
      'Report to Angola Hall (males) or Mozambique Hall (females) porter lodge with your printed ePortal bed space allocation slip.',
      'Bring original and duplicate copies of your JAMB Admission Letter and verified school fees receipt.',
      'Collect your room keys, inspect your allocated bed space, and locate the nearest water points and dining buttery.',
    ],
    actionLink: {
      href: '/app/guide',
      label: 'Read Angola & Moz Guide',
    },
  },
  {
    id: 'online-course-registration-begins',
    title: 'Online Course Registration Opens on ePortal',
    shortTitle: 'Course Registration Begins',
    category: 'registration',
    categoryLabel: 'Portal & Registration',
    categoryColor: {
      bg: 'bg-blue-50',
      text: 'text-blue-900',
      border: 'border-blue-200',
      badge: 'bg-blue-100 text-blue-900 border-blue-300',
    },
    startDate: '2026-11-02',
    displayDate: 'Monday, 2 November 2026',
    targetAudience: 'All Students',
    isFreshmanMilestone: true,
    venue: 'Online (eportal.oauife.edu.ng)',
    description:
      'ePortal opens for Harmattan semester course enrolment. 100L freshmen select campus-wide general courses and foundational departmental requirements.',
    freshmanActionGuide: [
      'Ensure tuition payment is verified on ePortal to unlock the course registration tab.',
      'Register compulsory campus-wide courses: GST 111 (2 units), GST 112 (2 units), and LIB 101 (1 unit).',
      'Check your department handbook and keep total semester workload between 15 and 24 credit units.',
    ],
    actionLink: {
      href: '/app/academics',
      label: 'View 100L Course Bundles',
    },
  },
  {
    id: 'freshman-orientation',
    title: 'University Fresh-Student Orientation Program',
    shortTitle: 'Orientation Week',
    category: 'orientation',
    categoryLabel: 'Orientation & Induction',
    categoryColor: {
      bg: 'bg-amber-50',
      text: 'text-amber-900',
      border: 'border-amber-200',
      badge: 'bg-amber-100 text-amber-900 border-amber-300',
    },
    startDate: '2026-11-02',
    endDate: '2026-11-06',
    displayDate: 'Monday, 2 November – Friday, 6 November 2026',
    targetAudience: 'Freshmen',
    isFreshmanMilestone: true,
    venue: 'Oduduwa Hall & Amphitheatre Precinct',
    description:
      'Official orientation program organized by the Division of Student Affairs (DSA) to introduce freshmen to university life, academic integrity, and campus safety.',
    freshmanActionGuide: [
      'Attend daily plenary sessions at Oduduwa Hall and the Amphitheatre.',
      'Receive official orientation briefings from the Vice-Chancellor, Registrar, Dean of Student Affairs, and Chief Security Officer.',
      'Pick up your freshman survival handbook and meet your Faculty Student Association executives.',
    ],
    actionLink: {
      href: '/app/venues',
      label: 'Locate Oduduwa Hall & Amphitheatre',
    },
  },
  {
    id: 'ict-training',
    title: 'Freshman ICT Skills & ePortal Training',
    shortTitle: 'ICT Training',
    category: 'training',
    categoryLabel: 'Technology & Training',
    categoryColor: {
      bg: 'bg-indigo-50',
      text: 'text-indigo-900',
      border: 'border-indigo-200',
      badge: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    },
    startDate: '2026-11-09',
    endDate: '2026-11-13',
    displayDate: 'Monday, 9 November – Friday, 13 November 2026',
    targetAudience: 'Freshmen',
    isFreshmanMilestone: true,
    venue: 'OAU ICT Centre (INTECU) & Computer Centre Laboratories',
    description:
      'Hands-on digital training covering institutional student email activation (@oauife.edu.ng), ePortal management, CBT exam simulation, and digital library databases.',
    freshmanActionGuide: [
      'Activate your official student institutional email (@oauife.edu.ng).',
      'Test your login credentials on the university CBT examination platform for upcoming GST tests.',
      'Familiarize yourself with Hezekiah Oluwasanmi Library e-resource portals and campus Wi-Fi access.',
    ],
    actionLink: {
      href: '/facilities',
      label: 'Explore Campus Tech Facilities',
    },
  },
  {
    id: 'returning-students-resumption',
    title: 'Returning Students (Stalites) Resumption',
    shortTitle: 'Returning Students Resume',
    category: 'resumption',
    categoryLabel: 'Campus Resumption',
    categoryColor: {
      bg: 'bg-slate-50',
      text: 'text-slate-900',
      border: 'border-slate-200',
      badge: 'bg-slate-100 text-slate-800 border-slate-300',
    },
    startDate: '2026-11-15',
    displayDate: 'Sunday, 15 November 2026',
    targetAudience: 'Returning Students',
    isFreshmanMilestone: false,
    venue: 'Upperclassmen Halls (Awo, Fajuyi, Moremi, ETF, Alumni)',
    description:
      'Returning undergraduate students (200L to 500L) resume campus residence. Campus shuttle buses, Kekes, and dining joints reach maximum operational volume.',
    freshmanActionGuide: [
      'Anticipate higher traffic at Main Gate bus parks and campus food spots.',
      'Connect with departmental senior colleagues for academic guidance and past examination tips.',
    ],
  },
  {
    id: 'harmattan-lectures-begin',
    title: 'Harmattan Semester Lectures Kick Off (13 Weeks Total)',
    shortTitle: 'Harmattan Lectures Begin',
    category: 'lectures',
    categoryLabel: 'Academic Teaching',
    categoryColor: {
      bg: 'bg-purple-50',
      text: 'text-purple-900',
      border: 'border-purple-200',
      badge: 'bg-purple-100 text-purple-900 border-purple-300',
    },
    startDate: '2026-11-16',
    displayDate: 'Monday, 16 November 2026',
    targetAudience: 'All Students',
    isFreshmanMilestone: true,
    venue: 'Faculty Theatres (BOOC, White House, AUD, ODLT 1 & 2, PGLT)',
    description:
      'Commencement of academic teaching across all 15 faculties. Lecture period spans 13 weeks (16 Nov – 18 Dec 2026, then 4 Jan – 26 Feb 2027).',
    freshmanActionGuide: [
      'Check your departmental notice boards and course WhatsApp groups for verified lecture timetables.',
      'Arrive at least 15–20 minutes early for high-capacity general lectures at BOOC, White House, or AUD.',
      'Verify the location of your lecture rooms using the OAUMods Campus Venue Navigator.',
    ],
    actionLink: {
      href: '/app/venues',
      label: 'Open Venue Navigator',
    },
  },
  {
    id: 'normal-registration-ends',
    title: 'Normal Course Registration Closes (Statutory Deadline)',
    shortTitle: 'Normal Registration Deadline',
    category: 'registration',
    categoryLabel: 'Strict Deadline',
    categoryColor: {
      bg: 'bg-red-50',
      text: 'text-red-900',
      border: 'border-red-200',
      badge: 'bg-red-100 text-red-900 border-red-300',
    },
    startDate: '2026-11-20',
    displayDate: 'Friday, 20 November 2026',
    targetAudience: 'All Students',
    isFreshmanMilestone: true,
    venue: 'Online (eportal.oauife.edu.ng)',
    description:
      'Normal online registration closes at 11:59 PM. Course registrations attempted after this date are subjected to late registration fees and formal approvals.',
    freshmanActionGuide: [
      'CRITICAL: Finalize and submit your course selections on ePortal before midnight.',
      'Print at least 4 copies of your Course Registration Form (CRF) for Faculty Officer and Course Adviser endorsement.',
      'Ensure no registered course conflicts with your faculty graduation requirements.',
    ],
    actionLink: {
      href: '/app/clearance',
      label: 'Check Clearance Status',
    },
  },
  {
    id: 'matriculation-ceremony',
    title: 'Freshman Matriculation Ceremony',
    shortTitle: 'Matriculation Day',
    category: 'ceremony',
    categoryLabel: 'Official Swearing-In',
    categoryColor: {
      bg: 'bg-amber-50',
      text: 'text-amber-900',
      border: 'border-amber-200',
      badge: 'bg-amber-100 text-amber-900 border-amber-300',
    },
    startDate: '2026-12-03',
    displayDate: 'Thursday, 3 December 2026',
    targetAudience: 'Freshmen',
    isFreshmanMilestone: true,
    venue: 'OAU Amphitheatre, Central Campus',
    description:
      'The definitive institutional induction where all 100-level freshmen swear the statutory matriculation oath to become formal junior members of Obafemi Awolowo University.',
    freshmanActionGuide: [
      'Collect your official academic matriculation gown from your Faculty Officer 1–2 days before the ceremony.',
      'Assemble at the Amphitheatre promptly by 8:30 AM in formal attire under your faculty academic gown.',
      'Sign the statutory University Matriculation Register to legally secure your matriculation number.',
      'Celebrate with family and friends at Motion Ground, SUB grounds, and Oduduwa Hall!',
    ],
    actionLink: {
      href: '/app/venues',
      label: 'Find Amphitheatre on Map',
    },
  },
  {
    id: 'convocation-activities',
    title: 'University Convocation Ceremonies',
    shortTitle: 'Convocation Week',
    category: 'ceremony',
    categoryLabel: 'University Ceremony',
    categoryColor: {
      bg: 'bg-slate-50',
      text: 'text-slate-900',
      border: 'border-slate-200',
      badge: 'bg-slate-100 text-slate-800 border-slate-300',
    },
    startDate: '2026-12-09',
    endDate: '2026-12-12',
    displayDate: 'Wednesday, 9 December – Saturday, 12 December 2026',
    targetAudience: 'All Students',
    isFreshmanMilestone: false,
    venue: 'Oduduwa Hall & Amphitheatre Complex',
    description:
      'Annual university convocation conferring undergraduate and postgraduate degrees. Campus experiences heavy visitor traffic and celebratory atmosphere.',
    freshmanActionGuide: [
      'Plan travel routes early; Road 1 and the Senate precinct experience strict vehicular security checks.',
      'Enjoy the lively atmosphere and witness the proud tradition of Great Ife graduates.',
    ],
  },
  {
    id: 'christmas-new-year-break',
    title: 'Christmas & New Year Holiday Vacation',
    shortTitle: 'Christmas & New Year Break',
    category: 'break',
    categoryLabel: 'Holiday Break',
    categoryColor: {
      bg: 'bg-sky-50',
      text: 'text-sky-900',
      border: 'border-sky-200',
      badge: 'bg-sky-100 text-sky-900 border-sky-300',
    },
    startDate: '2026-12-25',
    endDate: '2027-01-01',
    displayDate: 'Friday, 25 December 2026 – Friday, 1 January 2027',
    targetAudience: 'All Students',
    isFreshmanMilestone: false,
    venue: 'Campus-Wide Vacation',
    description:
      'Official end-of-year holiday break. Teaching pauses and resumes with mid-semester examinations on Monday, 4 January 2027.',
    freshmanActionGuide: [
      'If traveling home, securely lock all belongings in your room locker and turn off all electrical switches.',
      'Pack your lecture notes and revision materials to prepare for mid-semester assessments right after resumption.',
    ],
  },
  {
    id: 'mid-semester-examinations',
    title: 'Mid-Semester Examinations / Continuous Assessment (CA) Tests',
    shortTitle: 'Mid-Semester CA Tests',
    category: 'exam',
    categoryLabel: 'Continuous Assessment',
    categoryColor: {
      bg: 'bg-rose-50',
      text: 'text-rose-900',
      border: 'border-rose-200',
      badge: 'bg-rose-100 text-rose-900 border-rose-300',
    },
    startDate: '2027-01-04',
    endDate: '2027-01-09',
    displayDate: 'Monday, 4 January – Saturday, 9 January 2027',
    targetAudience: 'All Students',
    isFreshmanMilestone: true,
    venue: 'Faculty Theatres & Computer Centre CBT Laboratories',
    description:
      'Mid-semester continuous assessments and tests across faculties. CA scores contribute 30% to 40% of the overall course grade alongside the final examination.',
    freshmanActionGuide: [
      'Confirm test venue allocations with your class representative early.',
      'Bring your student ID card or printed ePortal screening slip to all examination venues.',
      'Aim for maximum marks in CA tests to build a strong buffer toward a First Class (5.0 GPA).',
    ],
    actionLink: {
      href: '/app/academics',
      label: 'Calculate 5.0 GPA Target',
    },
  },
  {
    id: 'course-registration-amendments-close',
    title: 'Course-Registration Amendments (Add/Drop) Close',
    shortTitle: 'Add/Drop Deadline',
    category: 'registration',
    categoryLabel: 'Strict Deadline',
    categoryColor: {
      bg: 'bg-red-50',
      text: 'text-red-900',
      border: 'border-red-200',
      badge: 'bg-red-100 text-red-900 border-red-300',
    },
    startDate: '2027-01-04',
    displayDate: 'Monday, 4 January 2027',
    targetAudience: 'All Students',
    isFreshmanMilestone: true,
    venue: 'Online (eportal.oauife.edu.ng)',
    description:
      'Final deadline for course registration amendments, including adding or dropping courses on ePortal. No course adjustments are allowed after this date.',
    freshmanActionGuide: [
      'Consult with your Staff Course Adviser if you need to drop an overwhelming elective or add a missing prerequisite.',
      'Verify that your final registered course list matches your physical attendance in classes.',
    ],
  },
  {
    id: 'lectures-end',
    title: 'Harmattan Semester Lectures Conclude',
    shortTitle: 'Lectures End',
    category: 'lectures',
    categoryLabel: 'Curriculum Completion',
    categoryColor: {
      bg: 'bg-purple-50',
      text: 'text-purple-900',
      border: 'border-purple-200',
      badge: 'bg-purple-100 text-purple-900 border-purple-300',
    },
    startDate: '2027-02-26',
    displayDate: 'Friday, 26 February 2027',
    targetAudience: 'All Students',
    isFreshmanMilestone: true,
    venue: 'All Faculty Lecture Theatres',
    description:
      'Official conclusion of the 13-week teaching period. Course lecturers wrap up syllabi and submit CA scores to departmental boards.',
    freshmanActionGuide: [
      'Ensure all term papers, laboratory practical notebooks, and group assignments are submitted.',
      'Check course notice boards for published CA test results and report any score discrepancies immediately.',
    ],
  },
  {
    id: 'revision-week',
    title: 'Revision / Lecture-Free Week ("Reading Week")',
    shortTitle: 'Revision Week',
    category: 'break',
    categoryLabel: 'Intensive Revision',
    categoryColor: {
      bg: 'bg-amber-50',
      text: 'text-amber-900',
      border: 'border-amber-200',
      badge: 'bg-amber-100 text-amber-900 border-amber-300',
    },
    startDate: '2027-03-01',
    endDate: '2027-03-05',
    displayDate: 'Monday, 1 March – Friday, 5 March 2027',
    targetAudience: 'All Students',
    isFreshmanMilestone: true,
    venue: 'Hezekiah Oluwasanmi Library & Campus Reading Rooms',
    description:
      'Strictly enforced university-wide lecture-free week dedicated to uninterrupted revision and exam prep. Official lectures and tests are prohibited.',
    freshmanActionGuide: [
      'Take advantage of Hezekiah Oluwasanmi Library reading rooms and quiet faculty study lounges.',
      'Print your official Examination Docket from ePortal and laminate or keep it in a transparent folder.',
      'Work through at least 3–5 years of past examination questions with your study group.',
    ],
    actionLink: {
      href: '/facilities',
      label: 'Find Library Reading Rooms',
    },
  },
  {
    id: 'harmattan-examinations',
    title: 'Harmattan Semester Final Examinations (3 Weeks)',
    shortTitle: 'Harmattan Final Exams',
    category: 'exam',
    categoryLabel: 'Final Examinations',
    categoryColor: {
      bg: 'bg-red-50',
      text: 'text-red-900',
      border: 'border-red-200',
      badge: 'bg-red-100 text-red-900 border-red-300',
    },
    startDate: '2027-03-08',
    endDate: '2027-03-27',
    displayDate: 'Monday, 8 March – Saturday, 27 March 2027',
    targetAudience: 'All Students',
    isFreshmanMilestone: true,
    venue: 'Central Examination Centres (BOOC, White House, AUD, ODLT, CBT Labs)',
    description:
      'Three weeks of comprehensive final degree examinations across all 15 faculties of Obafemi Awolowo University.',
    freshmanActionGuide: [
      'Carry your printed Examination Docket and Student ID to every examination hall.',
      'Strict 48-Hour Exam Illness Rule: If taken ill, report to University Health Centre (JAC) within 48 hours for medical certification to avoid an automatic F grade.',
      'Mobile phones, programmable watches, and unauthorized notes are strictly prohibited inside examination halls.',
    ],
    actionLink: {
      href: '/app/venues',
      label: 'Locate Exam Theatres',
    },
  },
  {
    id: 'harmattan-semester-break',
    title: 'Harmattan Semester Vacation (Inter-Semester Break)',
    shortTitle: 'Harmattan Semester Break',
    category: 'break',
    categoryLabel: 'Semester Vacation',
    categoryColor: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-900',
      border: 'border-emerald-200',
      badge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    },
    startDate: '2027-04-05',
    endDate: '2027-04-17',
    displayDate: 'Monday, 5 April – Saturday, 17 April 2027',
    targetAudience: 'All Students',
    isFreshmanMilestone: false,
    venue: 'Campus-Wide Vacation',
    description:
      'Inter-semester vacation for undergraduate students prior to the resumption of Rain Semester.',
    freshmanActionGuide: [
      'Check ePortal periodically for released Harmattan semester grades and GPA computation.',
      'Recharge, review your 100L academic standing, and prepare for Rain Semester.',
    ],
  },
];

/**
 * Calculates days remaining until a given date (relative to a reference date).
 * Positive = future, 0 = today, Negative = past.
 */
export function getDaysUntil(targetDateStr: string, referenceDate: Date = new Date()): number {
  const target = new Date(`${targetDateStr}T00:00:00`);
  const ref = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate());
  const diffTime = target.getTime() - ref.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Determines current status of an event: 'upcoming' | 'active' | 'completed'
 */
export function getEventStatus(
  event: CalendarEvent,
  referenceDate: Date = new Date()
): 'upcoming' | 'active' | 'completed' {
  const ref = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate());
  const start = new Date(`${event.startDate}T00:00:00`);
  const end = event.endDate
    ? new Date(`${event.endDate}T23:59:59`)
    : new Date(`${event.startDate}T23:59:59`);

  if (ref > end) {
    return 'completed';
  }
  if (ref >= start && ref <= end) {
    return 'active';
  }
  return 'upcoming';
}

/**
 * Retrieves the immediate next milestone event from the calendar.
 */
export function getNextUpcomingEvent(
  events: CalendarEvent[] = HARMATTAN_2026_CALENDAR,
  referenceDate: Date = new Date()
): CalendarEvent | null {
  const ref = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate());

  // Filter events that haven't ended yet
  const pending = events.filter((e) => {
    const end = e.endDate
      ? new Date(`${e.endDate}T23:59:59`)
      : new Date(`${e.startDate}T23:59:59`);
    return end >= ref;
  });

  if (pending.length === 0) return null;

  // Sort by start date ascending
  pending.sort((a, b) => {
    return new Date(`${a.startDate}T00:00:00`).getTime() - new Date(`${b.startDate}T00:00:00`).getTime();
  });

  return pending[0];
}

/**
 * Generates an iCalendar (.ics) string for a single calendar event.
 */
export function generateSingleEventIcs(event: CalendarEvent): string {
  const formatIcsDate = (dateStr: string) => dateStr.replace(/-/g, '');
  const start = formatIcsDate(event.startDate);
  
  // If endDate is provided, next day for exclusive end in all-day events
  let end = start;
  if (event.endDate) {
    const endDateObj = new Date(`${event.endDate}T00:00:00`);
    endDateObj.setDate(endDateObj.getDate() + 1);
    const y = endDateObj.getFullYear();
    const m = String(endDateObj.getMonth() + 1).padStart(2, '0');
    const d = String(endDateObj.getDate()).padStart(2, '0');
    end = `${y}${m}${d}`;
  } else {
    const nextDay = new Date(`${event.startDate}T00:00:00`);
    nextDay.setDate(nextDay.getDate() + 1);
    const y = nextDay.getFullYear();
    const m = String(nextDay.getMonth() + 1).padStart(2, '0');
    const d = String(nextDay.getDate()).padStart(2, '0');
    end = `${y}${m}${d}`;
  }

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//OAUMods//OAU Harmattan Calendar 2026-2027//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event.id}-2026@oaumods.vercel.app`,
    `DTSTAMP:${formatIcsDate(new Date().toISOString().split('T')[0])}T000000Z`,
    `DTSTART;VALUE=DATE:${start}`,
    `DTEND;VALUE=DATE:${end}`,
    `SUMMARY:OAU: ${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, ' ')}`,
    event.venue ? `LOCATION:${event.venue}` : 'LOCATION:Obafemi Awolowo University, Ile-Ife',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return lines.join('\r\n');
}

/**
 * Generates a full semester iCalendar (.ics) export containing all events.
 */
export function generateFullSemesterIcs(events: CalendarEvent[] = HARMATTAN_2026_CALENDAR): string {
  const formatIcsDate = (dateStr: string) => dateStr.replace(/-/g, '');
  const nowStamp = `${formatIcsDate(new Date().toISOString().split('T')[0])}T000000Z`;

  const eventBlocks = events.map((event) => {
    const start = formatIcsDate(event.startDate);
    let end = start;
    if (event.endDate) {
      const endDateObj = new Date(`${event.endDate}T00:00:00`);
      endDateObj.setDate(endDateObj.getDate() + 1);
      const y = endDateObj.getFullYear();
      const m = String(endDateObj.getMonth() + 1).padStart(2, '0');
      const d = String(endDateObj.getDate()).padStart(2, '0');
      end = `${y}${m}${d}`;
    } else {
      const nextDay = new Date(`${event.startDate}T00:00:00`);
      nextDay.setDate(nextDay.getDate() + 1);
      const y = nextDay.getFullYear();
      const m = String(nextDay.getMonth() + 1).padStart(2, '0');
      const d = String(nextDay.getDate()).padStart(2, '0');
      end = `${y}${m}${d}`;
    }

    return [
      'BEGIN:VEVENT',
      `UID:${event.id}-2026@oaumods.vercel.app`,
      `DTSTAMP:${nowStamp}`,
      `DTSTART;VALUE=DATE:${start}`,
      `DTEND;VALUE=DATE:${end}`,
      `SUMMARY:OAU: ${event.title}`,
      `DESCRIPTION:${event.description.replace(/\n/g, ' ')}`,
      event.venue ? `LOCATION:${event.venue}` : 'LOCATION:Obafemi Awolowo University, Ile-Ife',
      'STATUS:CONFIRMED',
      'END:VEVENT',
    ].join('\r\n');
  });

  const header = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//OAUMods//OAU Harmattan Calendar 2026-2027//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:OAU 2026/2027 Harmattan Calendar',
    'X-WR-TIMEZONE:Africa/Lagos',
  ].join('\r\n');

  const footer = 'END:VCALENDAR';

  return `${header}\r\n${eventBlocks.join('\r\n')}\r\n${footer}`;
}
