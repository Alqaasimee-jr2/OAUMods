export interface TransitRoute {
  id: string;
  name: string;
  from: string;
  to: string;
  fare: number;
  vehicleType: 'White Mini-Bus' | 'E-Trike / Keke' | 'Town Shuttle (Micra)' | 'Teaching Hospital Bus';
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
    tips: 'Official campus mini-bus ticket rate is ₦100. Purchase ticket at designated ticketing points or pay to the bus conductor.',
  },
  {
    id: 'trike-hostels-faculties',
    name: 'Hostels to Academic Belt Shuttle',
    from: 'Angola / Moz / Fajuyi / Awo Halls',
    to: 'Hezekiah Library / BOOC / White House / Tech Axis',
    fare: 100,
    vehicleType: 'E-Trike / Keke',
    tips: 'Electric tricycles (E-trikes) and kekes operate internal shuttle routes across campus residential and faculty corridors.',
  },
  {
    id: 'sub-oauthc',
    name: 'College of Health Sciences / OAUTHC Link',
    from: 'SUB Terminal / Campus Gate',
    to: 'OAU Teaching Hospital Complex (OAUTHC)',
    fare: 300,
    vehicleType: 'Teaching Hospital Bus',
    tips: 'Dedicated shuttle service linking campus to the OAUTHC hospital complex in Ife town.',
  },
  {
    id: 'gate-mayfair',
    name: 'Main Gate to Mayfair / Lagere',
    from: 'Campus Main Gate',
    to: 'Mayfair Roundabout / Lagere Market',
    fare: 150,
    vehicleType: 'Town Shuttle (Micra)',
    tips: 'Town transportation link connecting campus main gate to Mayfair and surrounding commercial hubs.',
  },
];

export const TRANSIT_REGULATIONS = [
  {
    title: 'Commercial Motorcycle (Okada) Restriction',
    rule: 'Commercial motorcycles are barred from the central academic and library core to safeguard pedestrian movement.',
  },
  {
    title: 'Campus Gate Transit Safety',
    rule: 'The distance between Main Gate and the halls is over 2.5 km. Avoid trekking the bush-lined stretch late at night; use official campus shuttles or verified tricycles.',
  },
  {
    title: 'Small Denomination Currency',
    rule: 'Carry small naira notes or exact fare tickets to avoid change delays during peak travel times.',
  },
];
