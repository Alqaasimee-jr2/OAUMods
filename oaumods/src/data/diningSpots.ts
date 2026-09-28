export interface DiningSpot {
  id: string;
  name: string;
  location: string;
  category: 'Faculty Restaurant' | 'Grills & Fast Food' | 'Swallow & Bukas' | 'Finger Foods' | 'Hostel Diner';
  facultyAffiliation?: string;
  vibe: string;
  specialties: string[];
  settingNote?: string;
  tips: string;
}

export interface SanctuarySpot {
  id: string;
  name: string;
  location: string;
  vibe: string;
  recommendedSetting?: string;
  highlights: string[];
  caveat?: string;
}

export const DINING_SPOTS: DiningSpot[] = [
  {
    id: 'orente',
    name: 'Orente Grills',
    location: 'Afrika Amphitheatre / ODLT Axis',
    category: 'Grills & Fast Food',
    vibe: 'Outdoor grilled aroma and active social evening hub right beside the Amphitheatre and ODLT.',
    specialties: ['Grilled Chicken & Chips', 'Grilled Catfish', 'Chicken & Beef Shawarma', 'Barbecue Chops'],
    settingNote: 'Late afternoons, evenings & post-lecture gatherings',
    tips: 'Convenient hangout after an evening lecture in ODLT or before attending an Amphitheatre show.',
  },
  {
    id: 'science-restaurant',
    name: 'Faculty of Science Private Restaurant & Buttery',
    location: 'White House & Chemistry Building Quadrangle',
    category: 'Faculty Restaurant',
    facultyAffiliation: 'Faculty of Science',
    vibe: 'Fast-paced academic hub catering to students between lab practicals and general lectures.',
    specialties: ['Cooked Rice & Stew', 'Fresh Meat Pies', 'Sandwiches', 'Chilled Soft Drinks & Water'],
    settingNote: 'Continuous day hours during class weeks',
    tips: 'Prime stop when you have back-to-back lectures in BOOC, White House, or Chemistry labs.',
  },
  {
    id: 'admin-restaurant',
    name: 'Faculty of Administration Private Restaurant',
    location: 'Faculty of Administration Complex (opp. Hezekiah Library & Pit Theatre)',
    category: 'Faculty Restaurant',
    facultyAffiliation: 'Faculty of Administration',
    vibe: 'Quiet, indoor sit-down dining favored by Accounting, Public Admin, IR, and Law students.',
    specialties: ['Jollof & Fried Rice', 'Beans & Fried Plantain', 'Stewed Beef & Chicken', 'Cold Drinks'],
    settingNote: 'Breakfast & lunch hours',
    tips: 'Saves the long walk down to New Buka or SUB when taking lectures in First Bank LT or Pit Theatre.',
  },
  {
    id: 'social-sciences-restaurant',
    name: 'Faculty of Social Sciences Private Restaurant',
    location: 'Social Sciences Complex (near 1000-Seater Lecture Theatre)',
    category: 'Faculty Restaurant',
    facultyAffiliation: 'Faculty of Social Sciences',
    vibe: 'Busy daytime cafeteria frequented by Economics, Political Science, and Sociology students.',
    specialties: ['Steaming Swallow & Soups', 'White Rice & Beans', 'Egg Rolls & Snacks', 'Chilled Beverages'],
    settingNote: 'Morning and afternoon lecture breaks',
    tips: 'Convenient dining spot right beside the 1000-Seater lecture complex between morning and afternoon lectures.',
  },
  {
    id: 'archi-kiosk',
    name: 'The Archi Hut Kiosk',
    location: 'Department of Architecture Quadrangle (Faculty of EDM)',
    category: 'Faculty Restaurant',
    facultyAffiliation: 'Faculty of Environmental Design & Management',
    vibe: 'Rustic thatched-roof wooden pavilion under shade trees; calm by day and atmospheric on quiet nights.',
    specialties: ['Cooked Indomie & Eggs', 'Hot Coffee & Tea', 'Toast Bread', 'Cold Drinks'],
    settingNote: 'Quiet nights & relaxed dining',
    tips: 'By day, a calm retreat among studio buildings; by night, a warm and romantic spot to sit and eat.',
  },
  {
    id: 'new-buka',
    name: 'New Buka Cafeteria Complex',
    location: 'Central Food Corridor (Behind Social Sciences & EDM)',
    category: 'Swallow & Bukas',
    vibe: 'The quintessential Great Ife dining destination with independent traditional caterers serving steaming hot meals.',
    specialties: ['Amala Dudu & Ewedu', 'Pounded Yam & Egusi', 'Pepper Soup', 'Fried Fish & Assorted Meats'],
    settingNote: 'Lunch & early evening rush',
    tips: 'The premier destination for traditional cooked Nigerian meals on campus. Multiple caterers operate side-by-side.',
  },
  {
    id: 'captain-cook',
    name: 'Captain Cook & SUB Cafeterias',
    location: 'Ground Floor, Student Union Building (Ken Saro-Wiwa)',
    category: 'Grills & Fast Food',
    vibe: 'Indoor dining cafeteria with seating inside the Student Union Building.',
    specialties: ['Meat Pies & Pastries', 'Scoop Ice Cream', 'Jollof & Fried Rice', 'Cold Beverages'],
    settingNote: 'Daytime dining & lunch retreat',
    tips: 'Ideal for sit-down meals, project discussions with coursemates, or grabbing snacks at SUB.',
  },
  {
    id: 'as-e-dey-hot',
    name: '"As E Dey Hot"',
    location: 'Main Hostel Avenue (Opposite Moremi & Alumni Halls)',
    category: 'Finger Foods',
    vibe: 'High-turnover pedestrian snack spot with hot frying cauldrons along the hostel avenue.',
    specialties: ['Hot Puff-Puff', 'Samosas & Spring Rolls', 'Egg Rolls & Meat Pies'],
    settingNote: 'Fresh hot batches throughout the day',
    tips: 'Lives up to its name—snacks are sold directly from the frying pan. Popular walking snack along the hostel strip.',
  },
  {
    id: 'coca-cola-rest',
    name: 'Coca-Cola Traditional Restaurant',
    location: 'Near Akintola Hall (Postgraduate Enclave)',
    category: 'Swallow & Bukas',
    vibe: 'Traditional Nigerian cafeteria with a calm, mature atmosphere near Akintola Hall.',
    specialties: ['Amala Dudu & Pounded Yam', 'Gbegiri, Ewedu & Obe Ata', 'Assorted Meats & Fish'],
    settingNote: 'Lunch & dinner hours',
    tips: 'Go-to spot for traditional swallow and solid local soups during long study sessions.',
  },
  {
    id: 'sub-shawarma',
    name: 'Mini Shawarma Spots',
    location: 'Paved Apron in Front of SUB',
    category: 'Grills & Fast Food',
    vibe: 'Quick-service kiosk cluster overlooking the bus and tricycle terminal.',
    specialties: ['Shawarma Wraps', 'Sausages & Suya', 'Cold Drinks'],
    settingNote: 'Day and evening hours',
    tips: 'Fast grab-and-go option before catching a campus shuttle bus or tricycle at SUB.',
  },
  {
    id: 'lil-dinners',
    name: 'Hostel Butteries ("Lil Dinners")',
    location: 'Angola, Mozambique, Fajuyi, and Awolowo Halls',
    category: 'Hostel Diner',
    vibe: 'Hostel diner spots providing late sustenance for resident students right inside the halls.',
    specialties: ['Awo Cafe Jollof & Beans', 'Fajuyi Fried Egg & Bread', 'Angola & Moz Late Night Snacks'],
    settingNote: 'Evening & late-night hostel hours',
    tips: 'Convenient food options located right within residential halls, eliminating the need to trek out at night.',
  },
];

export const SCENIC_SANCTUARIES: SanctuarySpot[] = [
  {
    id: 'archi-mountain',
    name: 'The Mountain Behind Archi',
    location: 'Behind Department of Architecture',
    vibe: 'Elevated scenic spot overlooking the campus landscape and surrounding hills.',
    recommendedSetting: 'Sunset & quiet evening visits',
    highlights: [
      'Scenic elevation looking out over the academic campus.',
      'Cool evening breeze and peaceful atmosphere.',
      'Quiet spot for conversation and relaxing.',
    ],
  },
  {
    id: 'alex-duduyemi',
    name: 'Alex Duduyemi / Old EDM Open Side',
    location: 'Near Alex Duduyemi building / Old EDM site',
    vibe: 'Open green area beneath shade trees; quintessential spot for a picnic.',
    recommendedSetting: 'Afternoon & evening relaxation',
    highlights: [
      'Pleasant open lawn ideal for sitting outdoors or spreading a picnic blanket.',
      'Shaded green environment away from crowded pedestrian corridors.',
      'Quiet outdoor setting for reading or chatting.',
    ],
  },
  {
    id: 'moot-court-garden',
    name: 'Biological Garden Around Moot Court',
    location: 'Near Faculty of Law Moot Court',
    vibe: 'Quiet biological garden area with shaded canopy and benches.',
    recommendedSetting: 'Daytime study breaks & quiet reflection',
    highlights: [
      'Quiet green garden setting providing natural shade from midday sun.',
      'Calm surroundings suitable for reading or relaxed conversation.',
      'Convenient quiet retreat around the Faculty of Law axis.',
    ],
  },
  {
    id: 'main-bowl-bleachers',
    name: 'Sports Complex Main Bowl Bleachers',
    location: 'Sports Complex Main Bowl Grandstands',
    vibe: 'Stadium bleachers overlooking the main pitch; good for sitting and watching games or quiet at night.',
    recommendedSetting: 'Game days & quiet evenings',
    highlights: [
      'Elevated seating overlooking sports activities and football matches.',
      'Open-air breeze and quiet night sky.',
    ],
    caveat: 'Some nights campus church programs take place at the pitch that bring loudspeakers and drums, which can spoil the quiet.',
  },
];
