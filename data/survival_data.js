// data/survival_data.js
// Culture, lingo decoder, scam prevention, food spots, and emergency contacts for OAU

export const SURVIVAL_DATA = {
  lingoDecoder: [
    {
      term: "Aro / Aroism",
      meaning: "The legendary Great Ife culture of humorous, witty, theatrical banter and satire practiced predominantly in Awolowo and Fajuyi Halls. It is not meant maliciously—it is an art form of comedic street theatre.",
      advice: "Take it with good humor, smile, and never get angry or aggressive. Fighting back with anger makes you a prime target for more aro."
    },
    {
      term: "Motion Ground",
      meaning: "The massive open lawn between the Library, SUB, Oduduwa Hall, and the Amphitheatre. The social and political epicenter of campus.",
      advice: "Great place to meet classmates, relax in the cool evening breeze, or witness student union congresses."
    },
    {
      term: "Town-Gown",
      meaning: "The boundary and cultural relationship between the student university campus ('Gown') and the ancient city of Ile-Ife ('Town').",
      advice: "Respect town customs and elders when off-campus in Lagere or Mayfair."
    },
    {
      term: "BOOC",
      meaning: "Buba Marwa / Biological Sciences Lecture Theatre. The venue where almost every 100-level student experiences their first major university class.",
      advice: "Always arrive early to get seats with writing boards."
    },
    {
      term: "White House & Yellow House",
      meaning: "White House is the Faculty of Science complex (white facade); Yellow House is the Faculty of Social Sciences complex (yellow facade).",
      advice: "Crucial navigation landmarks for cross-faculty lectures."
    },
    {
      term: "Spider House",
      meaning: "Faculty of Technology auditorium characterized by architectural steel trusses resembling spider legs.",
      advice: "Engineering and computer science students spend substantial time here."
    },
    {
      term: "Aluta",
      meaning: "The spirit of student unionism, intellectual resistance, and defense of student rights ('Victoria Acerta').",
      advice: "Great Ife has a storied tradition of principled student leadership."
    }
  ],

  scamAlerts: [
    {
      title: "🚨 The 'Acceptance Fee' Scam",
      warning: "OAU does NOT charge an 'Acceptance Fee'. If any individual or website asks you to pay an acceptance fee, it is 100% FRAUD. Only pay official school fees generated via your student ePortal.",
      action: "Never pay money into any personal bank account."
    },
    {
      title: "🚨 Fake Bed Space 'Agents' on WhatsApp / Telegram",
      warning: "Touts frequently impersonate Student Affairs officials claiming they have 'reserved bed spaces' in Angola or Mozambique Hall for ₦50,000–₦100,000.",
      action: "Bed space balloting is strictly automated on eportal.oauife.edu.ng. Any space acquired outside the portal is counterfeit and results in eviction and disciplinary action."
    },
    {
      title: "🚨 Clearance & File Submission Touts",
      warning: "Strangers approaching you around Senate Building or faculties offering to 'fast-track your clearance file' for a fee.",
      action: "Clearance is free. Hand your files only to uniformed faculty officers and departmental secretaries inside designated offices."
    }
  ],

  foodAndServices: [
    {
      category: "Food & Cafeterias",
      spots: [
        { name: "Awo Cafe", location: "Awolowo Hall", note: "Famous for affordable, generous portions of jollof rice, beans, and meat. Serves late into the night." },
        { name: "Fajuyi Buttery Strip", location: "Fajuyi Hall", note: "Great variety: fried eggs and noodles, shawarma, cold drinks, and pastries." },
        { name: "SUB Cafeteria", location: "Student Union Building", note: "Clean indoor dining with swallows (Amala, Semo, Pounded yam) and traditional soups." },
        { name: "Mozambique Food Vendors", location: "Inside Mozambique Quad", note: "Rice, beans, plantain, snacks, and fruits catering to female freshers." },
        { name: "New Market Eateries", location: "Behind Fajuyi Hall", note: "Local food stalls with budget-friendly native dishes and fresh fruits." }
      ]
    },
    {
      category: "Printing, Photocopying & Stationery",
      spots: [
        { name: "Library Quadrangle Pavilions", location: "Outside Hezekiah Library", note: "High-speed document printing, spiral binding, and course material photocopies." },
        { name: "SUB Basement Business Centers", location: "SUB Ground Floor", note: "Affordable black-and-white photocopying, document laminating, and passport photo shoots." },
        { name: "Fajuyi Business Kiosks", location: "Fajuyi Hall Corridor", note: "Quick printouts for early morning class assignments." }
      ]
    },
    {
      category: "Power & Night Reading Hubs",
      spots: [
        { name: "Hezekiah Library 24/7 Reading Rooms", location: "Library Lower Level", note: "Air-conditioned, brightly lit study spaces with steady campus power." },
        { name: "INTECU / Computer Center", location: "Near Senate Building", note: "Reliable electricity and charging hubs for laptops during power outages." },
        { name: "BOOC & ODLT Night Classrooms", location: "Academic Central", note: "Massive lecture halls open for night reading (t-fare/study groups)." }
      ]
    }
  ],

  emergencyContacts: [
    { name: "University Health Center Ambulance (JAC)", phone: "+234 803 392 4118", role: "24/7 Medical Emergencies" },
    { name: "Campus Security Post (Main Gate)", phone: "+234 803 721 9540", role: "Safety & Security Incidents" },
    { name: "Campus Security Unit (SUB Post)", phone: "+234 802 884 1221", role: "Internal Campus Distress" },
    { name: "Student Union (SUG) Welfare Office", phone: "+234 814 620 3000", role: "Student Rights, Harassment, Welfare" },
    { name: "Division of Student Affairs (DSA)", phone: "+234 803 516 7744", role: "Hostel & Administrative Support" }
  ]
};
