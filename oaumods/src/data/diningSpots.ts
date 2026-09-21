export interface DiningSpot {
  id: string;
  name: string;
  location: string;
  category: 'Fast Food' | 'Swallow & Bukas' | 'Grills & Barbecue' | 'Finger Foods' | 'Hostel Diner';
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
    category: 'Grills & Barbecue',
    vibe: 'Outdoor grilled smoke aroma and active social evening hub by the Amphitheatre and ODLT.',
    specialties: ['Grilled Chicken & Chips', 'Grilled Catfish', 'Shawarma', 'Barbecue Chops'],
    settingNote: 'Evenings & post-lecture social gatherings',
    tips: 'Convenient hangout after an evening lecture at ODLT or before an Amphitheatre show.',
  },
  {
    id: 'captain-cook',
    name: 'Captain Cook',
    location: 'Student Union Building (SUB)',
    category: 'Fast Food',
    vibe: 'Indoor dining cafeteria with seating inside the Student Union Building.',
    specialties: ['Meat Pies & Pastries', 'Scoop Ice Cream', 'Jollof & Fried Rice'],
    settingNote: 'Daytime dining & lunch retreat',
    tips: 'Ideal for sit-down meals, project discussions with coursemates, or grabbing snacks at SUB.',
  },
  {
    id: 'as-e-dey-hot',
    name: '"As E Dey Hot"',
    location: 'Opposite Moremi & Alumni Halls',
    category: 'Finger Foods',
    vibe: 'High-turnover pedestrian snack spot with hot frying cauldrons along the hostel avenue.',
    specialties: ['Hot Puff-Puff', 'Samosas & Spring Rolls', 'Egg Rolls & Meat Pies'],
    settingNote: 'Fresh hot batches throughout the day',
    tips: 'Lives up to its name—snacks are sold directly from the frying pan. Popular walking snack along the hostel strip.',
  },
  {
    id: 'coca-cola-rest',
    name: 'Coca-Cola Restaurant',
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
    category: 'Fast Food',
    vibe: 'Quick-service kiosk cluster overlooking the bus and tricycle terminal.',
    specialties: ['Shawarma Wraps', 'Sausages & Suya', 'Cold Drinks'],
    settingNote: 'Day and evening hours',
    tips: 'Fast grab-and-go option before catching a campus shuttle bus or tricycle at SUB.',
  },
  {
    id: 'archi-kiosk',
    name: 'The Archi Hut Kiosk',
    location: 'Department of Architecture Quadrangle',
    category: 'Hostel Diner',
    vibe: 'Hut-like kiosk in the Architecture quadrangle; nice spot to eat and romantic on quiet nights.',
    specialties: ['Cooked Indomie & Eggs', 'Hot Coffee & Tea', 'Toast & Snacks'],
    settingNote: 'Quiet nights & relaxed dining',
    tips: 'By day, a calm retreat among studio buildings; by night, a warm and romantic spot to sit and eat.',
  },
  {
    id: 'lil-dinners',
    name: '"Lil Dinners" Across Halls of Residence',
    location: 'Awo Cafe, Fajuyi Strip, Mozambique & Angola Butteries',
    category: 'Hostel Diner',
    vibe: 'Hostel diner spots providing late sustenance for resident students.',
    specialties: ['Awo Cafe Jollof & Beans', 'Fajuyi Fried Egg & Bread', 'Moz Butteries Delicacies'],
    settingNote: 'Evening & late-night hostel hours',
    tips: 'Convenient food options located right within residential halls.',
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
