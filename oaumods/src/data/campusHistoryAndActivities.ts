export interface HistoricalMilestone {
  year: string;
  title: string;
  description: string;
}

export interface StudentLifecycleStage {
  stage: string;
  level: string;
  summary: string;
  traditions: Array<{
    title: string;
    details: string;
  }>;
}

export interface SpatialNickname {
  nickname: string;
  officialName: string;
  meaning: string;
  category: 'Landmark' | 'Tradition' | 'Food';
}

export interface CampusMythBuster {
  myth: string;
  truth: string;
}

export const SCHOOL_IDENTITY = {
  founded: '1961 (as University of Ife)',
  classesStarted: 'October 1962 (Temporary Site at Ibadan with 244 students)',
  movedToIfe: 'January 1967 (Permanent 13,000-acre site in Ile-Ife)',
  renamed: 'May 12, 1987 (in honor of Chief Obafemi Awolowo, 1909–1987)',
  mottoEnglish: 'For Learning and Culture',
  mottoYoruba: 'Fun Èkó àti Àsà',
  colors: [
    { name: 'Royal Cobalt Blue', hex: '#0B1B3D', meaning: 'Truth, Honor & Intellectual Depth' },
    { name: 'Great Ife Gold', hex: '#EAA812', meaning: 'Rich Heritage, Culture & Excellence' },
  ],
  architects: 'Arieh Sharon, Eldar Sharon, and A.A. Egbor (Tropical Modernist Master Plan)',
  anthemLyrics: [
    'Great Ife! Great Ife!',
    "Africa's most beautiful campus.",
    'Conscious, vigilant, progressive.',
    'Aluta against all oppression.',
    'Forward ever, backward never.',
    'For learning and culture, sports and struggle.',
    'Great Ife! I love you.',
    "There's only one Great Ife in the universe.",
    'Another Great Ife is a counterfeit.',
    'Great! Great! Great! Great! Great!',
  ],
};

export const HISTORICAL_MILESTONES: HistoricalMilestone[] = [
  {
    year: '1960',
    title: 'Ashby Commission Protest & Regional Resolution',
    description:
      'The Western Regional Government under Premier Chief Ladoke Akintola and Chief Obafemi Awolowo formally rejected the Ashby Commission recommendations (which failed to recommend a university for the Western Region) and resolved to establish a world-class regional university.',
  },
  {
    year: '1961',
    title: 'Statutory Enactment & Foundation',
    description:
      'The University of Ife Edict was passed. A 13,000-acre (~11,861-hectare) land grant was allocated in the historic city of Ile-Ife by the Ooni of Ife, Sir Adesoji Aderemi.',
  },
  {
    year: '1962',
    title: 'Opening at Temporary Site (Ibadan)',
    description:
      'Classes officially commenced in October 1962 with 244 pioneer students and 80 academic staff at the temporary Ibadan campus (the present site of The Polytechnic, Ibadan) under pioneer Vice-Chancellor Prof. Oladele Ajose.',
  },
  {
    year: '1966–1975',
    title: 'The Golden Building Era (Prof. Hezekiah Oluwasanmi)',
    description:
      'Under Vice-Chancellor Prof. Hezekiah Oluwasanmi, the university relocated to Ile-Ife in 1967. Bauhaus master Arieh Sharon and Nigerian architect A.A. Egbor constructed the iconic central core: Hezekiah Library, Oduduwa Hall, Secretariat, and the Inverted Pyramid complexes.',
  },
  {
    year: '1970, 1973, 1984 & 2014',
    title: 'NUGA Hosting Heritage',
    description:
      'Great Ife hosted four legendary Nigerian Universities Games Association (NUGA) festivals, cementing its reputation as a collegiate athletic powerhouse.',
  },
  {
    year: '1987',
    title: 'Renaming to Obafemi Awolowo University',
    description:
      'On May 12, 1987, the Federal Government officially renamed the university in honor of Chief Obafemi Awolowo following his passing, recognizing his visionary contributions to Nigerian education.',
  },
  {
    year: 'July 10, 1999',
    title: 'Anti-Cultism Martyrdom of George Iwilade ("Afrika")',
    description:
      'SUG Secretary-General George Iwilade ("Afrika") and four other student leaders were martyred in Awolowo Hall during an attack by masked cultists. Great Ife eradicated campus cultism forever, making it Nigeria’s most secure university campus. The open-air amphitheatre was renamed Afrika Amphitheatre in his honor.',
  },
  {
    year: '2020',
    title: 'Getty Foundation Modern Architecture Grant',
    description:
      'The international Getty Foundation awarded OAU its prestigious "Keeping It Modern" conservation grant to protect and preserve Arieh Sharon’s tropical modernist architectural masterwork for future generations.',
  },
];

export const ACADEMIC_CALENDAR_STRUCTURE = {
  harmattanSemester: {
    name: 'Harmattan Semester (First Semester)',
    timing: 'Typically October/November to March',
    milestones: [
      'Resumption & 2-Week Course Registration Window.',
      'Freshman Orientation Week at Afrika Amphitheatre & INTECU ICT Certification.',
      'Official Matriculation Ceremony & Matriculation Oath.',
      'Mid-Semester Continuous Assessment (CA Tests - 30% to 40%).',
      'Revision / Reading Week (Strict lecture ban).',
      'Harmattan Semester Comprehensive Examinations.',
    ],
  },
  rainSemester: {
    name: 'Rain Semester (Second Semester)',
    timing: 'Typically April to July/August',
    milestones: [
      'Resumption & Course Add/Drop adjustments.',
      'Departmental Weeks & 5-Day Thematic Dress Parades.',
      'Students’ Union & Hall Week Carnivals (Awo Aro Carnival, Fajuyi Tug of Words).',
      'Revision Week.',
      'Rain Semester Examinations.',
      'Final Year Sign-Out Day on Motion Ground.',
      'Annual December Graduation Convocation in Oduduwa Hall.',
    ],
  },
  coreRules: [
    {
      title: 'Credit Unit Range (15 – 24 Units)',
      rule: 'Every student must register between 15 and 24 credit units per semester. Freshmen are recommended to take 18–21 units. Registering below 15 requires a Senate waiver; exceeding 24 requires Faculty Board approval.',
    },
    {
      title: 'The Strict 48-Hour Exam Illness Rule',
      rule: 'If sudden severe illness prevents you from sitting an official exam, you MUST report to the University Health Centre (JAC) within 48 hours for medical certification by an OAU doctor. Uncertified missed exams receive an automatic ‘F’ grade (0.0 Quality Points).',
    },
    {
      title: 'Continuous Assessment (CA) Weight (30% – 40%)',
      rule: 'Semester examinations account for 60%–70% of your grade; continuous assessment tests, assignments, and laboratory practicals contribute 30%–40%. Never miss CA tests.',
    },
    {
      title: 'Academic Probation Threshold (< 1.00 CGPA)',
      rule: 'A student whose Cumulative Grade Point Average falls below 1.00 at the end of a session is placed on academic probation. Failure to raise the CGPA above 1.00 after the probationary session results in withdrawal.',
    },
  ],
};

export const STUDENT_LIFECYCLE_STAGES: StudentLifecycleStage[] = [
  {
    stage: 'Stage 1: Freshmen Arrival & Initiation',
    level: 'Part 1 / 100-Level',
    summary:
      'From arrival in Angola and Mozambique Halls to the solemn matriculation oath in the Amphitheatre, freshers undergo rapid cultural and intellectual assimilation.',
    traditions: [
      {
        title: 'Hall Arrival & Room Rep Elections',
        details:
          'Within 48 hours of move-in, rooms in Angola and Mozambique elect a Room Leader (Room Rep) to coordinate cleaning rosters, security, and porter communications.',
      },
      {
        title: 'The Great Ife Orientation Week',
        details:
          'Mandatory orientation spanning Central University Induction in Afrika Amphitheatre, 1-week INTECU ICT digital certification, and departmental course briefings.',
      },
      {
        title: 'The Matriculation Ceremony & "Matric Rice"',
        details:
          'Freshmen don blue-and-gold academic gowns in Afrika Amphitheatre to take the formal Matriculation Oath. Families gather for communal feasts ("Matric Rice") in hall courtyards and photo sessions at the Oduduwa fountain.',
      },
      {
        title: 'Anglomoz & "Moz 101"',
        details:
          'The pedestrian strip and car park between Angola and Mozambique Halls is the evening social center. "Moz 101" jokingly describes male freshers standing outside Mozambique gate courting female colleagues.',
      },
      {
        title: 'Freshers’ Cup & Health Screening Queues',
        details:
          'Pre-dawn queues outside the Health Centre ("JAC") forge friendships across faculties; the Freshers’ Cup soccer tournament identifies new varsity sports talents.',
      },
    ],
  },
  {
    stage: 'Stage 2: Stalite Identity & Campus Politics',
    level: 'Parts 2, 3 & 4 (200L–400L)',
    summary:
      'Students move to stalite halls (Awo, Fajuyi, Moremi, ETF), lead departmental associations, and participate in legendary Great Ife campus politics and hall weeks.',
    traditions: [
      {
        title: 'Awolowo Hall Week & The Aro Carnival',
        details:
          'The pinnacle of Great Ife satire. Awoites dress in theatrical, comical costumes, parading peacefully across campus singing satirical chants, culminating in the free communal "Common Pot" (Asepo) cooked over open firewood.',
      },
      {
        title: 'Fajuyi Hall Week & "Tug of Words"',
        details:
          'Fajuyians host elite inter-block and inter-hall intellectual debates, table tennis tournaments, and gaming championships in the common room.',
      },
      {
        title: 'Mozambique & Moremi Hall Weeks',
        details:
          'Pageants (Miss Moz and Miss Moremi), ethnic food fairs, and women’s leadership/technology empowerment symposia.',
      },
      {
        title: 'Departmental Weeks (5-Day Dress Parade)',
        details:
          'A week-long celebration across faculties: Corporate Monday, Jersey Tuesday, Denim Wednesday, Retro/Costume Thursday, and Cultural Royalty Friday, ending with the Saturday Annual Gala Dinner.',
      },
      {
        title: 'Campus Politics: Manifesto & ACJ Press Night',
        details:
          'Elections feature room-to-room trekking, intense interrogation during the Association of Campus Journalists (ACJ) Press Grilling Night, and speeches at Afrika Amphitheatre Manifesto Night.',
      },
    ],
  },
  {
    stage: 'Stage 3: Finalists (Final Year Brethren)',
    level: 'Graduating Cohorts (400L / 500L / 600L)',
    summary:
      'The transition from student to professional alumni marked by creative celebration, white shirt signatures on Motion Ground, and statutory oaths.',
    traditions: [
      {
        title: 'FYB Week: Costume Day & Primary School Day',
        details:
          'Finalists dress up in hilarious costumes—impersonating Nollywood characters, professions, or donning elementary school uniforms complete with lunchboxes.',
      },
      {
        title: 'Sign-Out Day on Motion Ground',
        details:
          'Exiting the final degree exam in plain white T-shirts, students gather on Motion Ground where classmates, stalites, and lecturers sign heartfelt messages with Sharpies, followed by wild car motorcades along Road 1.',
      },
      {
        title: 'Professional Statutory Inductions',
        details:
          'Graduates take formal statutory oaths: Hippocratic Oath at OAUTHC (Medicine), Pharmacists Council induction (Pharmacy), Nursing Council induction (Nursing), and COREN/NSE oath (Engineering).',
      },
      {
        title: 'December Convocation & "Convo Rice Hunt"',
        details:
          'Oduduwa Hall hosts multi-day graduation convocations with thousands of families in attendance; students celebrate the traditional "Convo Rice Hunt" across alumni parties.',
      },
    ],
  },
];

export const SPATIAL_NICKNAMES: SpatialNickname[] = [
  {
    nickname: 'White House',
    officialName: 'Faculty of Science Central Complex',
    meaning:
      'The sprawling white-painted tropical modernist complex housing the Science Deanship, Chemistry & Physics departments, and lecture halls.',
    category: 'Landmark',
  },
  {
    nickname: 'Yellow House',
    officialName: 'Department of Mathematics Building',
    meaning:
      'Painted in bright yellow masonry adjacent to White House and Moremi Hall; venue for mathematics lectures and calculus tutorials. (Note: NOT the Faculty of Social Sciences).',
    category: 'Landmark',
  },
  {
    nickname: 'Spider House',
    officialName: 'Faculty of Technology Engineering Complex',
    meaning:
      'The Civil and Mechanical Engineering building, named for its bold cantilevered steel trusses jutting outward like giant spider legs.',
    category: 'Landmark',
  },
  {
    nickname: 'BOOC',
    officialName: 'Biological Sciences Lecture Theatre C',
    meaning:
      'Pronounced "Bee-Oh-Oh-See"; the high-capacity central lecture hall where 100-level STEM students take biology and foundational science courses.',
    category: 'Landmark',
  },
  {
    nickname: 'ODLT 1 & 2',
    officialName: 'Oduduwa Lecture Theatres 1 & 2',
    meaning:
      'Massive stepped auditoriums situated behind Oduduwa Hall, host to university-wide General Studies (GST) lectures and large exams.',
    category: 'Landmark',
  },
  {
    nickname: 'Afrika Amphitheatre',
    officialName: 'Open-Air Amphitheatre (Oduduwa Hall Complex)',
    meaning:
      'A 5,000-seat stepped open-air bowl named in eternal memory of George Akinyemi Iwilade ("Afrika"), SUG Secretary-General martyred on July 10, 1999.',
    category: 'Landmark',
  },
  {
    nickname: 'Motion Ground',
    officialName: 'Central Concourse (Between Library, Oduduwa Hall & SUB)',
    meaning:
      'The historic central crossroads of Great Ife where student union motions are moved and ratified, and peaceful assemblies converge.',
    category: 'Landmark',
  },
  {
    nickname: 'Pit Theatre',
    officialName: 'Department of Dramatic Arts Arena',
    meaning:
      'Sunken arena-style theatre designed by Arieh Sharon; historic home to legendary stage performances by Wole Soyinka and Ola Rotimi.',
    category: 'Landmark',
  },
  {
    nickname: 'Risky (or Risky Burger)',
    officialName: 'Campus Midnight Fuel Snack',
    meaning:
      'Spicy fried eggs folded inside a warm loaf of miniature Agege bread; the quintessential student fuel during all-night study sessions ("TDB").',
    category: 'Food',
  },
  {
    nickname: 'Aro / Aroism',
    officialName: 'Great Ife Satirical Banter Culture',
    meaning:
      'The culture of witty, spontaneous, theatrical public teasing practiced in Awolowo and Fajuyi Halls; an egalitarian social leveler and stress reliever.',
    category: 'Tradition',
  },
];

export const CAMPUS_MYTHBUSTERS: CampusMythBuster[] = [
  {
    myth: 'OAU charges an "Acceptance Fee" for newly admitted students.',
    truth:
      'OAU has NEVER charged an acceptance fee. Any agent, group, or portal demanding an acceptance fee is 100% fraudulent. Only official school charges generated via your personal ePortal profile are legitimate.',
  },
  {
    myth: 'There is a building called "Glass House" on the OAU campus.',
    truth:
      'OAU has no building called "Glass House." That name belongs to other institutions. The central administrative tower at OAU is strictly the Senate Building (Secretariat).',
  },
  {
    myth: 'The clinic is called "JAC".',
    truth:
      'The clinic is the University Health Centre. "JAC" stands for the Joint Action Committee, the coalition of university non-teaching staff trade unions (NASU, SSANU, NAAT).',
  },
  {
    myth: 'The ancient Staff of Oranmiyan (Opa Oranmiyan) is inside the university.',
    truth:
      'The ancient granite monolith of Oranmiyan is located in historic Ile-Ife town (Arubidi/Mopa quarter), approximately 6 kilometers from the university campus.',
  },
  {
    myth: 'Yellow House is the Faculty of Social Sciences.',
    truth:
      'Yellow House is strictly the Department of Mathematics building in the Faculty of Science. The Faculty of Social Sciences is located in the Social Sciences quadrangle near the 1000-Seater Lecture Theatre.',
  },
  {
    myth: 'You can pay a tout to secure or fast-track an official bed space.',
    truth:
      'Hostel bed spaces are allocated cryptographically through the central ePortal database. Any manual paper allocation or paid reservation is counterfeit and results in immediate eviction and disciplinary referral.',
  },
];
