export interface FaithCommunity {
  id: string;
  name: string;
  faith: 'Islam' | 'Christianity';
  category: 'Mosque & Islamic Society' | 'Chapel & Chaplaincy' | 'Student Fellowship (UJCM)';
  keyVenues: string[];
  description: string;
  flagshipPrograms: string[];
  academicAndWelfare: string[];
  meetingTimes?: string;
  shape: 'square' | 'triangle' | 'hexagon' | 'circle';
  shapeColor: 'navy' | 'gold' | 'blue' | 'emerald';
}

export interface SportsFacility {
  id: string;
  name: string;
  specs: string;
  activities: string[];
  accessRule: string;
  shape: 'square' | 'triangle' | 'hexagon' | 'circle';
  shapeColor: 'navy' | 'gold' | 'blue' | 'emerald';
}

export interface ExtracurricularClub {
  id: string;
  name: string;
  category: 'Campus Journalism' | 'Debating & Oratory' | 'Student Governance' | 'Cultural Tradition';
  summary: string;
  keyUnitsOrEvents: string[];
  howToJoin: string;
  shape: 'square' | 'triangle' | 'hexagon' | 'circle';
  shapeColor: 'navy' | 'gold' | 'blue' | 'emerald';
}

export const FAITH_COMMUNITIES: FaithCommunity[] = [
  {
    id: 'mssn-oau',
    name: "Muslim Students' Society of Nigeria (MSSN OAU Branch)",
    faith: 'Islam',
    category: 'Mosque & Islamic Society',
    keyVenues: [
      'OAU Central Mosque (Road 1, central core)',
      'Awolowo Hall Mosque',
      'Fajuyi Hall Mosque',
      'ETF Hall Mosque',
      'Angola Hall Mosque',
      'Mozambique Hall Mosque',
    ],
    description:
      'The unified Islamic body at Great Ife governed by the Ameer and Shura Council, including the active Sisters’ Wing (Al-Mu’minaat). Coordinates daily prayers, Friday Juma’at, and intellectual dawah across campus.',
    flagshipPrograms: [
      'Annual Jihad Week: Intellectual keynote lectures, Prof. Rahaman Qur’an & Debate Competition, and the Ameer’s Cup football tourney.',
      'Ramadan Free Feeding: Daily Sahur and Iftar meal packs for thousands of fasting students, funded by UNIFEMGA alumni.',
      'Ta’aruf (Freshers’ Islamic Orientation): Halal accommodation guidance, academic advice, and campus adjustment.',
    ],
    academicAndWelfare: [
      'Free Freshman Academic Clinic: Weekend tutorial classes for MTH 101, PHY 101, and CHM 101 in BOOC and White House led by senior Muslim scholars.',
      'UNIFEMGA Safety Net: Annual scholarship endowments and hostel accommodation subsidies for vulnerable students.',
      'Clinical Hijab & Modesty: Successfully institutionalized medical hijab and modest scrubs in OAUTHC hospital wards.',
    ],
    meetingTimes: 'Friday Juma’at: 1:00 PM – 2:30 PM | Sunday Usrah: 9:00 AM – 11:30 AM',
    shape: 'square',
    shapeColor: 'emerald',
  },
  {
    id: 'catholic-olplc',
    name: 'Catholic Chaplaincy of Our Lady of Perpetual Light (OLPLC)',
    faith: 'Christianity',
    category: 'Chapel & Chaplaincy',
    keyVenues: [
      'OLPLC Chaplaincy Compound (Road 1 / Central Axis)',
      'National Federation of Catholic Students (NFCS) Secretariat',
    ],
    description:
      'Established in 1962, the serene Catholic Chaplaincy serves students, lecturers, and staff. Houses the National Federation of Catholic Students (NFCS), the St. Cecilia Choir, and prayer gardens.',
    flagshipPrograms: [
      'NFCS Freshers’ Welcome Banquet and Orientation.',
      'Annual NFCS Week, liturgical music festivals, and charity hospital visitations to OAUTHC.',
      'Cathechism classes, Legion of Mary devotions, and Catholic Corpers’ liaison.',
    ],
    academicAndWelfare: [
      'Maintains a quiet on-site study library and landscaped prayer gardens open for student revision.',
      'Emergency Student Welfare Fund assisting students with medical expenses and meal tickets.',
      'Free academic peer tutorials organized by senior NFCS students in foundational subjects.',
    ],
    meetingTimes: 'Daily Masses: 6:30 AM & 6:00 PM | Sunday Masses: 6:30 AM, 8:30 AM (Youth/Student), and Evening Mass',
    shape: 'hexagon',
    shapeColor: 'navy',
  },
  {
    id: 'all-souls-chapel',
    name: 'All Souls’ Chapel (Chapel of the Resurrection)',
    faith: 'Christianity',
    category: 'Chapel & Chaplaincy',
    keyVenues: ['All Souls’ Chapel Compound (Road 1, Ecclesiastical Zone)'],
    description:
      'The interdenominational Protestant chapel of Great Ife featuring vaulted timber ceilings and stained glass. Welcomes students and staff from Anglican, Methodist, Presbyterian, and Baptist backgrounds.',
    flagshipPrograms: [
      'Choral Evensong and traditional liturgical communion services.',
      'Youth Fellowship vigils, student choir ministrations, and annual harvest thanksgiving.',
      'Interdenominational student orientation prayers.',
    ],
    academicAndWelfare: [
      'Chapel study fellowship and counseling desk for students facing emotional or academic stress.',
      'Indigent student support fund sponsored by university faculty and congregants.',
    ],
    meetingTimes: 'Sunday Services: 7:00 AM & 9:30 AM | Wednesday Midweek Communion: 6:00 PM',
    shape: 'triangle',
    shapeColor: 'gold',
  },
  {
    id: 'ujcm-ecu',
    name: 'Evangelical Christian Union (ECU)',
    faith: 'Christianity',
    category: 'Student Fellowship (UJCM)',
    keyVenues: [
      'Afrika Amphitheatre / Oduduwa Hall (Central Services)',
      'ECU Empowerment Centre (Permanent Complex, Road 1 Religious Ground)',
    ],
    description:
      'Founded in 1962 at the university’s inception, ECU is the oldest continuous indigenous student fellowship at Great Ife. Non-denominational, fiercely intellectual, and coordinated under UJCM.',
    flagshipPrograms: [
      'ECU Freshers’ Welcome & Discipleship Retreat.',
      'Mid-session Amphitheatre Praise Festivals and Spiritual Mission Conferences.',
      'Global ECU Alumni Association homecoming and career mentorship networks.',
    ],
    academicAndWelfare: [
      'Intensive weekend Part 1 Academic Tutorials (MTH 101, PHY 101, CHM 101) with free past question handouts.',
      'Substantial scholarship awards and student welfare handouts provided through its global alumni network.',
    ],
    meetingTimes: 'Tuesdays (Bible Study, 6:00 PM) | Thursdays (Midweek, 6:00 PM) | Sundays (8:00 AM)',
    shape: 'circle',
    shapeColor: 'blue',
  },
  {
    id: 'ujcm-rcf',
    name: 'Redeemed Christian Fellowship (RCF)',
    faith: 'Christianity',
    category: 'Student Fellowship (UJCM)',
    keyVenues: [
      'RCF Worship Centre & Secretariat (Road 1 Religious Ground)',
      'SUB Canopies & Designated Lecture Halls',
    ],
    description:
      'The student wing of the Redeemed Christian Church of God (RCCG) at Great Ife. Governed under UJCM, with active evangelical, welfare, choir, and academic wings.',
    flagshipPrograms: [
      'Ablaze Freshers’ Welcome and Campus Evangelism Missions.',
      'Word and Faith Clinics and end-of-semester joint exam vigils in the Amphitheatre.',
    ],
    academicAndWelfare: [
      'Free comprehensive freshman academic clinics for STEM and commercial foundational courses.',
      'Active welfare distribution desk providing food staples and hostel supplies to students.',
    ],
    meetingTimes: 'Wednesdays (6:00 PM) | Fridays (6:00 PM) | Sundays (Celebration Service, 8:00 AM)',
    shape: 'square',
    shapeColor: 'navy',
  },
  {
    id: 'ujcm-dlcf',
    name: 'Deeper Life Campus Fellowship (DLCF)',
    faith: 'Christianity',
    category: 'Student Fellowship (UJCM)',
    keyVenues: [
      'DLCF High-Capacity Auditorium (Road 1 Religious Ground)',
      'BOOC Lecture Theatre (Science Complex)',
    ],
    description:
      'A core constituent of UJCM focused on systematic Bible doctrine, discipleship, and academic distinction. Operates a permanent multi-tier auditorium on the Religious Ground.',
    flagshipPrograms: [
      'Systematic Bible Exposition and Campus Revival Conferences.',
      'Academic Distinction Summits featuring first-class stalite student mentors.',
    ],
    academicAndWelfare: [
      'Free Saturday tutorial clinics for science, engineering, and arts 100-level courses.',
      'Quiet hall accommodations and library facilities at the Road 1 fellowship centre.',
    ],
    meetingTimes: 'Mondays (Bible Study, 6:00 PM) | Thursdays (Revival, 6:00 PM) | Sundays (8:00 AM)',
    shape: 'hexagon',
    shapeColor: 'gold',
  },
  {
    id: 'ujcm-fellowships-directory',
    name: 'Other Accredited UJCM Member Fellowships',
    faith: 'Christianity',
    category: 'Student Fellowship (UJCM)',
    keyVenues: [
      'Faculty Lecture Theatres (Yellow House, ODLT, Humanities, EDM, Agric LT)',
      'Road 1 Religious Ground Centres (TACSFON, CACCF)',
    ],
    description:
      'The University Joint Christian Mission (UJCM) coordinates over a dozen accredited fellowships led by the Committee of Presidents (C.O.P).',
    flagshipPrograms: [
      'BSF (Baptist Student Fellowship - meets at Yellow House)',
      'CASOR (Assemblies of God student wing - meets in Humanities LT)',
      'TACSFON (The Apostolic Church Students - Civil/Mech LT & Road 1 Centre)',
      'WCF (Winners Campus Fellowship - ODLT / Technology axis)',
      'CACCF (Christ Apostolic Church Campus Fellowship - Arts LT & Road 1)',
      'NIFES, MFMCF, MCF, and ASF (Anglican Students Fellowship).',
    ],
    academicAndWelfare: [
      'All member fellowships organize free departmental and faculty-level tutorials on Friday evenings and Saturdays.',
      'UJCM Joint Exam Prayer Vigils at the Afrika Amphitheatre before Harmattan and Rain examinations.',
    ],
    meetingTimes: 'Service schedules harmonized through UJCM Committee of Presidents to avoid venue clashes.',
    shape: 'triangle',
    shapeColor: 'blue',
  },
];

export const RELIGIOUS_REGULATIONS = [
  {
    title: 'Mandatory DSA Accreditation',
    rule: 'Every religious society, fellowship, or mosque must be officially registered and accredited by the Division of Student Affairs (DSA). Unregistered bodies are barred from hosting meetings or pasting publicity handbills.',
  },
  {
    title: 'Academic Hours Acoustic Limits (No PA Systems 7am–6pm)',
    rule: 'The use of drums, brass bands, loud speakers, and high-wattage public address systems is strictly barred around lecture theatres, laboratories, and the Hezekiah Library between 7:00 AM and 6:00 PM on weekdays.',
  },
  {
    title: 'Hostel Early Morning "Morning Cry" Standards',
    rule: 'Student evangelists conducting early morning clarion calls (5:00 AM–6:00 AM) in Angola, Moz, Fajuyi, or Awo must remain in open courtyards with hand bells. High-decibel megaphones inside rooms and corridors are prohibited.',
  },
  {
    title: 'Academic Venue Booking Protocols (TAC Approval)',
    rule: 'Lecture halls (BOOC, AUD, ODLT, Yellow House) are academic facilities first. Weekend religious usage requires written approval from the Timetable and Attendance Committee (TAC) and relevant Faculty Officers.',
  },
  {
    title: 'Strict Freedom of Worship & Anti-Coercion',
    rule: 'Freedom of conscience is absolute at Great Ife. Any form of religious harassment, forced conversion, or intimidation is classified as a severe disciplinary offense under the Student Disciplinary Committee (SDC).',
  },
];

export const SPORTS_FACILITIES: SportsFacility[] = [
  {
    id: 'main-bowl',
    name: 'OAU Sports Complex Main Bowl Stadium',
    specs: 'Regulation natural grass football pitch, covered grandstand, and an 8-lane IAAF-certified tartan running track.',
    activities: [
      'Varsity football matches (OAU Giants vs visiting teams).',
      'Track and field events (sprints, hurdles, middle/long distance, relays).',
      'Annual Freshmen Sports Fiesta and University Inter-Faculty Athletics Championship.',
    ],
    accessRule: 'Open to registered student-athletes and intramural participants; running track open for morning fitness with sports gear.',
    shape: 'square',
    shapeColor: 'navy',
  },
  {
    id: 'olympic-pool',
    name: 'Olympic-Sized Competition Swimming Pool',
    specs: '50-meter, 10-lane international competition swimming pool with spectator bleachers and electronic timing system.',
    activities: [
      'Collegiate swimming championships and aquatic trials (freestyle, breaststroke, butterfly, backstroke).',
      'Physical and Health Education student practicals and lifesaving training.',
      'Recreational student swimming during scheduled supervised hours.',
    ],
    accessRule: 'Requires proper swimwear; non-swimmers must remain in shallow practice zones under lifeguard supervision.',
    shape: 'circle',
    shapeColor: 'blue',
  },
  {
    id: 'indoor-gym',
    name: 'Indoor Sports Hall & Gymnasium',
    specs: 'High-ceiling multi-purpose pavilion housing 4 badminton courts, table tennis tables, weightlifting apparatus, and fitness mats.',
    activities: [
      'Badminton, Table Tennis (Ping Pong), and indoor racket games.',
      'Combat sports training: Taekwondo, Judo, and Karate squads.',
      'Weightlifting and conditioning for university athletes.',
    ],
    accessRule: 'Requires clean indoor court shoes and student identification.',
    shape: 'hexagon',
    shapeColor: 'gold',
  },
  {
    id: 'tennis-complex',
    name: 'Paved Tennis Courts Complex',
    specs: 'Multi-court paved tennis arena with umpire towers, modernized during WAUG and NUGA game hostings.',
    activities: [
      'Lawn tennis singles and doubles varsity practice.',
      'Inter-university open invitationals and student leisure ladder matches.',
    ],
    accessRule: 'Rackets and non-marking tennis shoes required; court slots coordinated with Sports Council stewards.',
    shape: 'triangle',
    shapeColor: 'emerald',
  },
  {
    id: 'basketball-courts',
    name: 'Outdoor Basketball Courts & Polyurethane Court',
    specs: '4 outdoor asphalt courts with floodlights plus 1 indoor polyurethane court at the Sports Centre.',
    activities: [
      'OAU Giants basketball training and inter-hall slam tournaments.',
      'Evening student pickup games and shooting drills.',
    ],
    accessRule: 'Open daily to all students in sports apparel.',
    shape: 'square',
    shapeColor: 'gold',
  },
  {
    id: 'cricket-and-practice',
    name: 'Cricket Oval & Secondary Practice Pitches',
    specs: 'Natural grass cricket oval, batting cages, and secondary soccer pitches (including the active SUB pitch).',
    activities: [
      'Collegiate cricket matches and practice batting drills.',
      'Departmental soccer leagues (HOD Cup) and weekend hall football rivalries.',
    ],
    accessRule: 'Open access for student departmental fixtures; book official slots at Sports Secretariat.',
    shape: 'circle',
    shapeColor: 'navy',
  },
];

export const SPORTS_DISCIPLINES = [
  { category: 'Team Ball Sports', items: 'Football (Soccer), Basketball, Volleyball, Handball, Cricket' },
  { category: 'Track & Field (Athletics)', items: '100m, 200m, 400m Sprints, 4x100m/4x400m Relays, 800m–5000m, Hurdles, High/Long/Triple Jump, Shot Put, Discus, Javelin' },
  { category: 'Aquatics (Swimming)', items: '50m & 100m Freestyle, Breaststroke, Backstroke, Butterfly, Medley Relays' },
  { category: 'Racquet Sports', items: 'Lawn Tennis, Table Tennis (Ping Pong), Badminton, Squash' },
  { category: 'Martial Arts & Combat', items: 'Taekwondo, Judo, Karate' },
  { category: 'Mind Sports & Strategy', items: 'Chess, Scrabble' },
];

export const HOW_TO_JOIN_SPORTS = [
  {
    step: '1. Harmattan Semester Screening & Trials',
    desc: 'The Sports Council conducts annual open trials in October/November at the Main Bowl and Indoor Gymnasium for all 15+ disciplines. Bring your Student ID / ePortal clearance and your Health Centre Green Card.',
  },
  {
    step: '2. Freshmen Sports Fiesta (Freshers’ Cup)',
    desc: 'An inter-departmental soccer and track tournament organized exclusively for 100-Level freshers. Outstanding freshers are drafted directly into the OAU Giants varsity reserve pool.',
  },
  {
    step: '3. Intramural Tournaments (Dean’s & HOD Cups)',
    desc: 'Compete for your academic department in the HOD Cup or for your faculty in the Dean’s Cup. These matches draw massive campus crowds and serve as continuous talent identification grounds.',
  },
  {
    step: '4. Inter-Hall Tournaments (Awo vs. Faj Classic)',
    desc: 'Hall sports directors recruit resident athletes for fierce soccer, volleyball, and table tennis matches between halls (especially the legendary Awolowo vs. Adekunle Fajuyi clashes).',
  },
];

export const EXTRACURRICULAR_CLUBS: ExtracurricularClub[] = [
  {
    id: 'acj-oau',
    name: 'Association of Campus Journalists (ACJ OAU)',
    category: 'Campus Journalism',
    summary:
      'The umbrella body of student journalists and newsrooms across Great Ife. ACJ upholds independent investigative reporting, holds campus leaders accountable, and runs accredited media training.',
    keyUnitsOrEvents: [
      'Hall Press Boards: Awo Press, Fajuyi Press, Mozambique Press, Moremi Press, and ETF Press.',
      'ACJ Election Grilling Night: High-stakes public press interrogation of student union and hall candidates in the Amphitheatre.',
      'Annual ACJ International Campus Journalism Conference and Awards.',
    ],
    howToJoin: 'Join an accredited hall or faculty press board or register directly during ACJ induction week.',
    shape: 'square',
    shapeColor: 'navy',
  },
  {
    id: 'debating-societies',
    name: 'Literary and Debating Societies (L&D)',
    category: 'Debating & Oratory',
    summary:
      'Great Ife boasts a formidable oratory culture. Departmental, faculty, and university-level debating societies train students in British Parliamentary debating and public discourse.',
    keyUnitsOrEvents: [
      'Faculty of Law Debating Society (Lord Denning Chamber debates).',
      'All-Nigeria Universities Debating Championship (ANUDC) national representation.',
      'Fajuyi Hall "Tug of Words" inter-block and inter-hall intellectual debate championships.',
    ],
    howToJoin: 'Open auditions held at faculty orientation and departmental literary weeks.',
    shape: 'triangle',
    shapeColor: 'gold',
  },
  {
    id: 'hall-weeks',
    name: 'Hall Weeks & Cultural Traditions',
    category: 'Cultural Tradition',
    summary:
      'Week-long residential festivals celebrating hall identity, featuring world-famous campus satire, cultural food banquets, sports, and intellectual symposia.',
    keyUnitsOrEvents: [
      'Awolowo Hall Week & Aro Carnival: Satirical theatrical street procession and the free communal "Common Pot" (Asepo) cooked over firewood in the quadrangle.',
      'Mozambique & Moremi Hall Weeks: Miss Moz / Miss Moremi pageants, cultural food fairs, and female career empowerment workshops.',
      'Fajuyi Hall Week: Zikists’ intellectual debates, gaming tourneys, and variety shows.',
    ],
    howToJoin: 'Participate through your Hall Executive Council (HEC) social, sports, or cultural committees.',
    shape: 'hexagon',
    shapeColor: 'emerald',
  },
  {
    id: 'student-union-bodies',
    name: 'Student Unionism & Governance Bodies',
    category: 'Student Governance',
    summary:
      'The Students’ Union (SUG) operates as a democratic training ground with legislative, executive, and judicial arms centered at the Ken Saro-Wiwa Student Union Building (SUB).',
    keyUnitsOrEvents: [
      'Central Executive Council (CEC) & Students’ Representative Council (SRC parliament).',
      'Departmental Student Representative Councils (DSRC) and Faculty Consultative Councils (FCC).',
      'Hall Executive Councils (HEC) managing resident student welfare.',
    ],
    howToJoin: 'Contest elective positions after qualifying academic criteria (min 2.50 CGPA) or serve on union standing committees.',
    shape: 'circle',
    shapeColor: 'blue',
  },
];
