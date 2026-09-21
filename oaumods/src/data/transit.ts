export interface TransitRoute {
  id: string;
  name: string;
  from: string;
  to: string;
  fare: number;
  vehicleType: 'White Mini-Bus' | 'E-Trike / Keke' | 'Town Shuttle (Micra)' | 'Teaching Hospital Bus';
  operatingHours: string;
  frequency: string;
  tips: string;
}

export const TRANSIT_ROUTES: TransitRoute[] = [
  {
    id: 'gate-sub',
    name: 'Main Gate to SUB Terminal',
    from: 'Campus Main Gate / Security Post',
    to: 'Student Union Building (SUB) Car Park',
    fare: 100,
    vehicleType: 'White Mini-Bus',
    operatingHours: '6:30 AM – 10:00 PM',
    frequency: 'Every 2–3 minutes (Continuous queue)',
    tips: 'Official campus mini-bus rate is ₦100 ticket. Purchase ticket at the booth or pay exact cash to the conductor.',
  },
  {
    id: 'trike-hostels-faculties',
    name: 'Hostels to Academic Belt Shuttle',
    from: 'Angola / Moz / Fajuyi / Awo Halls',
    to: 'Hezekiah Library / BOOC / White House / Tech Axis',
    fare: 100,
    vehicleType: 'E-Trike / Keke',
    operatingHours: '7:00 AM – 9:00 PM',
    frequency: 'Every 1–3 minutes during class rush hours',
    tips: 'Eco-friendly e-trikes and campus tricycles operate fixed routes. Ideal when rushing for an 8:00 AM test.',
  },
  {
    id: 'sub-oauthc',
    name: 'College of Health Sciences / OAUTHC Link',
    from: 'SUB Terminal / Campus Gate',
    to: 'OAU Teaching Hospital Complex (OAUTHC)',
    fare: 300,
    vehicleType: 'Teaching Hospital Bus',
    operatingHours: '7:00 AM – 6:30 PM',
    frequency: 'Every 15–20 minutes',
    tips: 'Essential for Medical, Nursing, and Dentistry freshmen heading to hospital postings or clinical orientation.',
  },
  {
    id: 'gate-mayfair',
    name: 'Main Gate to Mayfair / Lagere',
    from: 'Campus Main Gate',
    to: 'Mayfair Roundabout / Lagere Market',
    fare: 150,
    vehicleType: 'Town Shuttle (Micra)',
    operatingHours: '6:00 AM – 11:00 PM',
    frequency: 'Immediate upon fill',
    tips: 'Town transportation hub for banks, courier pick-ups, supermarkets, and interstate travel parks.',
  },
];

export const TRANSIT_REGULATIONS = [
  {
    title: 'Okada Core Prohibition',
    rule: 'Commercial motorcycles (Okadas) are strictly barred from the Central Academic Core, Library Circle, and Amphitheatre zone for student pedestrian safety.',
  },
  {
    title: 'No Late-Night Gate Trekking',
    rule: 'The Main Gate is over 2.5 km from the residential halls. Never attempt to trek the bush-lined expressway past 8:00 PM; always take the official mini-buses or verified e-trikes.',
  },
  {
    title: 'Exact Fare Advice',
    rule: 'Always keep ₦100 and ₦200 clean naira notes handy. Conductors strongly penalize high denominations (₦1,000) during early morning rush hour.',
  },
];
