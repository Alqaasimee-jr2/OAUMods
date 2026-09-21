export interface DiningSpot {
  id: string;
  name: string;
  location: string;
  category: 'Fast Food' | 'Swallow & Bukas' | 'Grills & Barbecue' | 'Finger Foods' | 'Hostel Diner';
  vibe: string;
  specialties: string[];
  hours: string;
  priceRange: string;
  tips: string;
}

export interface SanctuarySpot {
  id: string;
  name: string;
  location: string;
  vibe: string;
  bestHours: string;
  highlights: string[];
  caveat?: string;
}

export const DINING_SPOTS: DiningSpot[] = [
  {
    id: 'orente',
    name: 'Orente Grills',
    location: 'Afrika Amphitheatre / ODLT Axis',
    category: 'Grills & Barbecue',
    vibe: 'Bustling evening outdoor social hub, grilled smoke aroma, ambient campus vibes.',
    specialties: ['Peppered Chicken & Chips', 'Grilled Catfish (Point & Kill)', 'Double-Sausage Shawarma', 'Fried Yam & Plantain'],
    hours: '3:00 PM – 11:00 PM',
    priceRange: '₦1,200 – ₦4,500',
    tips: 'The prime hangout after an evening lecture at ODLT or before an Amphitheatre show.',
  },
  {
    id: 'captain-cook',
    name: 'Captain Cook',
    location: 'Student Union Building (SUB)',
    category: 'Fast Food',
    vibe: 'Air-conditioned indoor cafeteria, clean tiled dining, music, civilized lunch retreat.',
    specialties: ['Flaky Meat Pies & Chicken Pies', 'Scoop Ice Cream (Waffle Cones)', 'Executive Jollof & Fried Rice', 'Cold Beverages'],
    hours: '8:00 AM – 8:00 PM',
    priceRange: '₦500 (snacks) – ₦2,800 (meals)',
    tips: 'Ideal for escaping the scorching midday heat for a sit-down meal or project discussion.',
  },
  {
    id: 'as-e-dey-hot',
    name: '"As E Dey Hot"',
    location: 'Opposite Moremi & Alumni Halls',
    category: 'Finger Foods',
    vibe: 'High-speed, high-turnover pedestrian snack haven. Hot frying cauldrons on the main hostel avenue.',
    specialties: ['Steaming Golden Puff-Puff', 'Spicy Samosas & Spring Rolls', 'Egg Rolls & Meat Pies', 'Chilled Yogurt'],
    hours: '7:30 AM – 9:00 PM',
    priceRange: '₦100 – ₦800',
    tips: 'Lives up to its name 100%. A ₦300 bag of hot puff-puff is the ultimate walking snack.',
  },
  {
    id: 'coca-cola-rest',
    name: 'Coca-Cola Restaurant',
    location: 'Near Akintola Hall (Postgraduate Enclave)',
    category: 'Swallow & Bukas',
    vibe: 'Old-school, traditional Nigerian cafeteria with mature vibes. Heavy-duty student fuel.',
    specialties: ['Amala Dudu & Pounded Yam', 'Gbegiri, Ewedu & Obe Ata', 'Assorted Meats (Shaki, Bokoto)', 'Fresh Fish Cuts'],
    hours: '9:00 AM – 7:30 PM',
    priceRange: '₦1,000 – ₦3,000',
    tips: 'When you need heavy fuel that will power you through an all-night study marathon.',
  },
  {
    id: 'sub-shawarma',
    name: 'Mini Shawarma Cluster',
    location: 'Paved Apron in Front of SUB',
    category: 'Fast Food',
    vibe: 'Quick grab-and-go kiosk cluster overlooking the bus and tricycle terminal.',
    specialties: ['Quick-wrap Beef/Chicken Shawarma', 'Hot Sausages & Suya Skewers', 'Cold Sodas'],
    hours: '11:00 AM – 10:00 PM',
    priceRange: '₦1,000 – ₦2,500',
    tips: 'Perfect grab before boarding a bus to Campus Gate or heading to afternoon classes.',
  },
  {
    id: 'archi-kiosk',
    name: 'The Archi Hut Kiosk',
    location: 'Department of Architecture Quadrangle',
    category: 'Hostel Diner',
    vibe: 'Rustic timber & thatched-roof pavilion nestled under breezy trees. Intimate and deeply atmospheric on quiet nights.',
    specialties: ['Freshly Cooked Indomie & Eggs', 'Brewed Coffee & Hot Chocolate', 'Spiced Toast & Tea', 'Cold Drinks'],
    hours: '8:00 AM – 10:00 PM',
    priceRange: '₦600 – ₦1,800',
    tips: 'By day, a tranquil designer haven; on quiet nights, the soft lighting makes it one of the coziest spots on campus.',
  },
  {
    id: 'lil-dinners',
    name: '"Lil Dinners" (Hostel Buttery Strip)',
    location: 'Awo Cafe, Fajuyi Strip, Moz Butteries',
    category: 'Hostel Diner',
    vibe: 'Late-night student sustenance. Buzzing communal banter and mountain portions.',
    specialties: ['Awo Cafe Late-Night Jollof & Beans', 'Fajuyi 24/7 Fried Egg & Bread', 'Moz Spiced Pasta & Smoothies'],
    hours: '6:00 PM – 2:00 AM',
    priceRange: '₦400 – ₦1,500',
    tips: 'The most cost-effective calories on campus when studying late in the halls.',
  },
];

export const SCENIC_SANCTUARIES: SanctuarySpot[] = [
  {
    id: 'archi-mountain',
    name: 'The Mountain Behind Archi',
    location: 'Elevated rock formation behind Department of Architecture',
    vibe: 'Dramatic panoramic ridge overlooking the campus forest canopy and rolling Ife hills.',
    bestHours: '5:30 PM – 7:00 PM (Golden Hour / Sunset)',
    highlights: [
      'Spectacular sunset views as the sky turns orange across the academic core.',
      'Cool, unhindered evening mountain breeze.',
      'Cinematic atmosphere for quiet reflection or deep couple conversations.',
    ],
  },
  {
    id: 'alex-duduyemi',
    name: 'Alex Duduyemi / Old EDM Lawn',
    location: 'Lush open lawn near Alex Duduyemi building & Old EDM site',
    vibe: 'Manicured open green space beneath ancient shade trees. The quintessential campus picnic sanctuary.',
    bestHours: '4:00 PM – 6:30 PM (Late Afternoon)',
    highlights: [
      'Sprawling soft grass ideal for spreading a throw blanket.',
      'Calm shade with virtually zero noisy pedestrian foot traffic.',
      'Perfect for reading together or sharing snacks from As E Dey Hot or Captain Cook.',
    ],
  },
  {
    id: 'moot-court-garden',
    name: 'Moot Court Biological Garden',
    location: 'Secluded botanical grove behind Faculty of Law Moot Court',
    vibe: 'Dense tropical canopy, cool shaded micro-climate, secluded stone benches, and natural birdsong.',
    bestHours: '12:00 PM – 4:30 PM (Midday Escape)',
    highlights: [
      'Dense tree canopy drops ambient temperature several degrees below the surrounding quads.',
      'Natural intellectual privacy shielded from the harsh afternoon sun.',
      'Stone benches ideal for quiet reading and relaxed study breaks.',
    ],
  },
  {
    id: 'main-bowl-bleachers',
    name: 'Sports Complex Main Bowl Bleachers',
    location: 'Grand concrete grandstands overlooking the main soccer stadium',
    vibe: 'Elevated stadium seating with unhindered breeze over the green pitch and running tracks.',
    bestHours: '5:00 PM – 8:00 PM (Sunset & Stargazing)',
    highlights: [
      'Panoramic view of varsity athletes training and departmental soccer matches.',
      'Open-air breezy night sky for relaxed stargazing and group chats.',
    ],
    caveat: 'Periodic campus fellowship night vigils book the pitch with loudspeakers, drums, and revival prayers—check if stadium floodlights are on before planning a quiet evening!',
  },
];
