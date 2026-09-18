// data/transit_fares.js
// Authentic campus transit routes, vehicle types, and verified student fares for OAU

export const TRANSIT_GUIDE = {
  currency: "₦",
  note: "Fares are regulated by the Student Union (SUG) and campus transport union. Always verify fares before boarding during peak periods.",
  routes: [
    {
      id: "gate-to-sub",
      origin: "Campus Main Gate",
      destination: "Student Union Building (SUB Terminal)",
      vehicleType: "Campus Shuttle Bus (Coaster / Mini-bus)",
      fare: "₦100 - ₦150",
      operatingHours: "6:00 AM - 10:30 PM",
      keyStops: ["Main Gate", "Senate Building Junction", "Sports Complex", "First Bank / Bank Road", "SUB Terminal"],
      tips: "The fastest and most affordable way to enter campus from the express road. Buses fill up every 2–3 minutes during morning peak hours."
    },
    {
      id: "sub-to-halls",
      origin: "SUB Keke Terminal",
      destination: "Angola & Mozambique Halls",
      vehicleType: "Tricycle (Keke Napep)",
      fare: "₦100 - ₦150",
      operatingHours: "6:30 AM - 10:00 PM",
      keyStops: ["SUB", "Moremi Hall", "Health Sciences Road", "Mozambique Gate", "Angola Gate"],
      tips: "Walking is under 12 minutes through the paved walkway, but Keke is ideal when carrying heavy provisions or bags."
    },
    {
      id: "sub-to-maintenance",
      origin: "SUB / Academic Area",
      destination: "Maintenance Gate / Off-Campus Axis",
      vehicleType: "Tricycle (Keke Napep)",
      fare: "₦150 - ₦200",
      operatingHours: "6:30 AM - 9:30 PM",
      keyStops: ["SUB", "Civil Tech Junction", "Staff Quarters", "Maintenance Gate"],
      tips: "Key transit route for students living in private off-campus hostels around Maintenance."
    },
    {
      id: "mayfair-to-campus",
      origin: "Mayfair / Lagere (Town)",
      destination: "OAU Campus Main Gate",
      vehicleType: "Town Commercial Bus (Danfo / Korope)",
      fare: "₦200 - ₦300",
      operatingHours: "5:30 AM - 10:00 PM",
      keyStops: ["Lagere", "Mayfair", "Toll Gate", "Campus Main Gate"],
      tips: "If you stay in town, alight at Campus Gate and board a Campus Shuttle directly to SUB."
    },
    {
      id: "sub-to-fajuyi-awo",
      origin: "SUB Terminal",
      destination: "Fajuyi / Awolowo Halls (Hostel Area 2)",
      vehicleType: "Campus Shuttle / Keke",
      fare: "₦100 - ₦150",
      operatingHours: "6:30 AM - 10:30 PM",
      keyStops: ["SUB", "Hezekiah Walkway", "Fajuyi Park", "Awo Archway"],
      tips: "A pleasant 7-minute walk across Motion Ground; transport is mainly used when carrying supplies."
    }
  ],

  transitSurvivalHacks: [
    "Always carry small denominations (₦100, ₦200, ₦500 notes). Drivers and conductors often delay change if you bring ₦1,000 notes early in the morning.",
    "Morning Rush Alert: Between 7:30 AM and 8:45 AM, the Campus Main Gate bus stop experiences long queues as thousands head for 8:00 AM classes. Leave early!",
    "Night Movement: After 10:00 PM, shuttle buses become scarce. Coordinate night walking in pairs or groups when moving from the Library to Angola/Moz."
  ]
};
