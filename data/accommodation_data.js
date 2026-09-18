// data/accommodation_data.js
// On-campus & Off-campus accommodation guides for OAU freshers

export const ACCOMMODATION_GUIDE = {
  ballotingStrategy: {
    title: "Bed Space Balloting Masterclass",
    rules: [
      "Prerequisite Verification: You CANNOT ballot for a bed space until your official school fees have reflected and cleared on the ePortal.",
      "Strict First-Come, First-Served: Over 8,000 freshmen compete for fewer than 3,000 bed spaces. The portal usually fills up within minutes of opening.",
      "The 72-Hour Payment Rule: If you successfully secure an allocation, you must pay the accommodation fee and generate your bank payment slip within 72 hours. Failure to pay within this window automatically cancels your allocation and releases it back to the public pool.",
      "🚨 ANTI-SCAM WARNING: Never pay anyone claiming they can 'run' or 'secure' bed space for you. Bed spaces are tied to your personal JAMB/Matric profile. The university disciplinary committee enforces rustication/expulsion for illegal bed space racketeering."
    ],
    proTips: [
      "Find a location with solid 4G/5G coverage or high-speed Wi-Fi 15 minutes before the announced balloting hour (typically 10:00 AM).",
      "Use Chrome or Firefox on a PC or high-performance phone with cached login sessions so you don't waste time typing credentials.",
      "Keep your phone on 'Do Not Disturb' to avoid incoming calls interrupting your network connection while the page is submitting.",
      "Immediately screenshot or print your allocation confirmation page the second it appears."
    ]
  },

  onCampusHalls: [
    {
      id: "angola",
      name: "Angola Hall",
      target: "Male Freshmen (100-Level Only)",
      location: "Hostel Area 1 (Near Health Sciences / Maintenance Gate)",
      capacity: "Houses approx. 1,500+ freshers",
      highlights: "Vibrant community, quadrangle football games, evening discussion circles, on-site barbers, reading rooms.",
      curfew: "Hall gate closes at 10:00 PM for security.",
      porterDesk: "Block 1 Ground Floor (Open 24/7)"
    },
    {
      id: "mozambique",
      name: "Mozambique Hall (Moz)",
      target: "Female Freshmen (100-Level Only)",
      location: "Hostel Area 1 (Adjacent to Angola Hall)",
      capacity: "Houses approx. 1,800+ freshers",
      highlights: "Self-contained student ecosystem with in-hall salons, grocery mini-marts, laundry kiosks, and food stalls.",
      curfew: "Strict 10:00 PM curfew. Visitors are restricted to the reception pavilion only.",
      porterDesk: "Main Gate Entry Pavilion"
    },
    {
      id: "fajuyi",
      name: "Fajuyi Hall (Faj)",
      target: "Male Returning Students",
      location: "Hostel Area 2",
      capacity: "Classic multi-story blocks",
      highlights: "Fajuyi Bus Stop is a major campus transit terminal. Famous buttery strip with affordable meals.",
      curfew: "Open 24/7",
      porterDesk: "Central Quadrangle"
    },
    {
      id: "awolowo",
      name: "Awolowo Hall (Awo)",
      target: "Male Returning Students",
      location: "Hostel Area 2",
      capacity: "Heart of student politics and culture",
      highlights: "Headquarters of Great Ife Aroism culture. Awo Cafe operates late into the night.",
      curfew: "Open 24/7",
      porterDesk: "Main Archway"
    },
    {
      id: "moremi",
      name: "Moremi Hall",
      target: "Female Returning Students",
      location: "Central Campus (Near Motion Ground)",
      capacity: "Prime central location",
      highlights: "Closest hostel to Hezekiah Library and central lecture halls.",
      curfew: "Curfew at 10:00 PM",
      porterDesk: "Reception Hallway"
    }
  ],

  offCampusZones: [
    {
      id: "maintenance",
      zoneName: "Maintenance / Staff Quarters Road",
      distanceToCampus: "5 - 10 mins walk to Angola/Moz; 5 mins by Keke to SUB",
      estimatedPriceRange: "₦180,000 - ₦350,000 / year (Single Room / Self-Contain)",
      electricityRating: "High (Often connected to campus / priority feeder lines)",
      securityRating: "Very High (Well-patrolled residential area with campus security nearby)",
      summary: "The most popular off-campus location for freshmen who miss out on Angola/Moz due to proximity to the campus walking gate.",
      verdict: "Top Recommendation for Freshmen seeking convenience."
    },
    {
      id: "gate-ap",
      zoneName: "Campus Gate / AP / Toll Gate Axis",
      distanceToCampus: "2 mins walk to Campus Main Gate; 5 mins shuttle bus to SUB",
      estimatedPriceRange: "₦150,000 - ₦280,000 / year",
      electricityRating: "Moderate to Good",
      securityRating: "High",
      summary: "Super convenient for students who prefer being near the main road with 24/7 campus shuttle access.",
      verdict: "Great transit access, plenty of commercial food options and supermarkets."
    },
    {
      id: "mayfair",
      zoneName: "Mayfair / Lagere Axis",
      distanceToCampus: "15 - 25 mins by Campus Bus / Town Shuttle",
      estimatedPriceRange: "₦120,000 - ₦250,000 / year",
      electricityRating: "Moderate (Town power grid)",
      securityRating: "Moderate",
      summary: "In the heart of Ile-Ife town. Very affordable food markets, major banks, and shopping plazas.",
      verdict: "Budget-friendly, but daily transport fare to campus must be budgeted."
    },
    {
      id: "asherifa",
      zoneName: "Asherifa / Parakin Axis",
      distanceToCampus: "10 - 15 mins by Keke / Shuttle",
      estimatedPriceRange: "₦200,000 - ₦450,000 / year (Modern Studio Apartments)",
      electricityRating: "High (Substation dependent)",
      securityRating: "High (Gated communities)",
      summary: "Upscale student student flats with tiled floors, running water, and private compounds.",
      verdict: "Ideal for students prioritizing comfort, quiet study environments, and privacy."
    }
  ],

  landlordChecklist: [
    "Always inspect the water source (borehole vs well) and inquire if electricity is constant before making payments.",
    "Verify whether electricity is prepaid meter (divided per flat) or estimated billing.",
    "Confirm the waste management and security levies so there are no surprise monthly costs.",
    "Never pay cash directly to an unverified agent on WhatsApp. Meet in person, inspect the room, verify the real landlord/caretaker, and demand a signed receipt."
  ]
};
