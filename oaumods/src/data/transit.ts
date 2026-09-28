export interface TransitRoute {
  id: string;
  name: string;
  from: string;
  to: string;
  paymentMethod: 'Paper Ticket' | 'Cash to Driver';
  vehicleType: 'White Mini-Bus' | 'Electric Tricycle (E-Trike / Keke)' | 'Town Shuttle Bus' | 'Teaching Hospital Bus';
  tips: string;
}

export const TRANSIT_ROUTES: TransitRoute[] = [
  {
    id: 'gate-sub',
    name: 'Main Gate to SUB Terminal',
    from: 'Campus Main Gate / Security Post',
    to: 'Student Union Building (SUB) Car Park',
    paymentMethod: 'Paper Ticket',
    vehicleType: 'White Mini-Bus',
    tips: 'Campus shuttle buses operate on official paper tickets. Purchase tickets at designated ticketing park booths before boarding.',
  },
  {
    id: 'trike-hostels-faculties',
    name: 'Hostels to Academic Belt Shuttle',
    from: 'Angola / Moz / Fajuyi / Awo Halls',
    to: 'Hezekiah Library / BOOC / White House / Tech Axis',
    paymentMethod: 'Paper Ticket',
    vehicleType: 'Electric Tricycle (E-Trike / Keke)',
    tips: 'Electric tricycles (E-trikes / kekes) operate internal shuttle routes across campus residential and faculty corridors using paper tickets.',
  },
  {
    id: 'sub-oauthc',
    name: 'College of Health Sciences / OAUTHC Link',
    from: 'SUB Terminal / Campus Gate',
    to: 'OAU Teaching Hospital Complex (OAUTHC)',
    paymentMethod: 'Cash to Driver',
    vehicleType: 'Teaching Hospital Bus',
    tips: 'Dedicated shuttle service linking campus to the OAUTHC hospital complex in Ife town.',
  },
  {
    id: 'gate-mayfair',
    name: 'Main Gate to Mayfair / Lagere',
    from: 'Campus Main Gate',
    to: 'Mayfair Roundabout / Lagere Market',
    paymentMethod: 'Cash to Driver',
    vehicleType: 'Town Shuttle Bus',
    tips: 'Town transportation buses connect the campus main gate park to Mayfair and surrounding commercial hubs.',
  },
];

export const TRANSIT_REGULATIONS = [
  {
    title: 'Campus Transport Currency (Official Tickets)',
    rule: 'The transport currency within campus is official paper tickets. Specific fare costs from location to location are not fixed or known at the moment; purchase paper tickets at campus ticketing booths before boarding.',
  },
  {
    title: 'Commercial Motorcycle (Okada) Restriction',
    rule: 'Commercial motorcycles are barred from the central academic and library core to safeguard pedestrian movement.',
  },
  {
    title: 'Campus Gate Transit Safety',
    rule: 'The distance between Main Gate and the halls is over 2.5 km. Avoid trekking the bush-lined stretch late at night; use official campus shuttles or verified tricycles (kekes).',
  },
];
