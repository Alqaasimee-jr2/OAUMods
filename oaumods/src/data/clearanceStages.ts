export interface ClearanceStage {
  id: string;
  stageNumber: number;
  title: string;
  category: 'Medical' | 'Hostel' | 'Faculty' | 'Departmental' | 'Library';
  location: string;
  office: string;
  timeline: string;
  summary: string;
  prerequisites: string[];
  proTips: string[];
  colorBadge: string;
}

export const CLEARANCE_STAGES: ClearanceStage[] = [
  {
    id: 'health',
    stageNumber: 1,
    title: 'Health Centre Screening & Green Card',
    category: 'Medical',
    location: 'University Health Centre (Residential Sector — opp. Alumni Hall, beside Awolowo Hall)',
    office: 'Medical Records & Screening Hall (Ground Floor)',
    timeline: '6:30 AM arrival for tally; 8:00 AM – 3:30 PM screening',
    summary: 'Mandatory physical examination, chest X-ray inspection, diagnostic laboratory audit, physician sign-off, and laminated Green Card collection.',
    prerequisites: [
      'Student Medical Screening Form (Printed from ePortal)',
      'Certified Chest X-Ray film & official radiologist report (OAUTHC or teaching hospital)',
      'Laboratory results (Blood Group, Genotype, PCV, Urinalysis)',
      'Immunization / vaccination record history',
      'Two (2) recent passport photographs (Strictly RED background)',
    ],
    proTips: [
      'Arrive between 6:30 AM and 7:00 AM to secure a low paper tally number at the entrance.',
      'Guard your laminated Green Card with your life—it guarantees free medical consultations and prescription drugs throughout your stay at Great Ife.',
      'The Health Centre is NOT the College of Health Sciences; it is located in the hostel sector.',
    ],
    colorBadge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
  },
  {
    id: 'hall',
    stageNumber: 2,
    title: 'Hall of Residence Check-In & Room Key',
    category: 'Hostel',
    location: 'Angola Hall (Male Freshmen) / Mozambique Hall (Female Freshmen)',
    office: 'Hall Warden Office & Chief Porter Lodge (Block 1 Ground Floor)',
    timeline: 'Within 72 hours of ePortal bed space balloting',
    summary: 'Bed space verification, hall executive dues payment, signing fire safety/appliance undertakings, and physical room key collection.',
    prerequisites: [
      'ePortal Bed Space Allocation Slip (Original printout)',
      'Remita Hostel Maintenance Payment Receipt (stamped)',
      'Two (2) Red-background passport photographs',
      'Photocopies of JAMB Admission Letter & Acceptance Fee receipt',
      'One flat file jacket (Standard Pale Yellow)',
    ],
    proTips: [
      'Strict Appliance Ban: Do NOT bring hotplates, electric boiling rings, or heavy cooking coils. Possession results in immediate bed space forfeiture.',
      'Observe the 10:00 PM hostel gate curfew.',
      'Pay your hall executive dues to collect your Hall Handbook, hall sticker, and hall T-shirt.',
    ],
    colorBadge: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
  },
  {
    id: 'faculty',
    stageNumber: 3,
    title: 'Faculty Officer Credential Verification',
    category: 'Faculty',
    location: 'Your Respective Faculty Building (Dean Complex)',
    office: 'Faculty Officer (FO) Clearance Desk',
    timeline: '8:30 AM – 3:00 PM on official clearance days',
    summary: 'Face-to-face inspection of original certificates, opening of your permanent institutional archive in the standard Pale Yellow file jacket.',
    prerequisites: [
      'Standard Pale Yellow Flat File Jacket labeled in bold ink',
      'Original JAMB Result Slip & JAMB Admission Letter + 3 photocopies',
      'Original O\'Level Statement of Results / Certificates (WAEC/NECO) + 3 photocopies',
      'Original Birth Certificate or NPC Declaration of Age + 3 photocopies',
      'Local Government Certificate of Origin + 3 photocopies',
      'Letter of Attestation (Clergy, Lawyer, or Principal on letterhead)',
      'Bank-stamped School Fees Remita Receipt + 3 photocopies',
      'Four (4) Passport photographs (Strictly RED background)',
    ],
    proTips: [
      'The file jacket is strictly PALE YELLOW for all faculties across campus.',
      'NEVER staple original certificates into your file jacket. Use steel paperclips or transparent document sleeves.',
      'Beware of touts loitering outside offering to fast-track your file for a fee. Clearance is 100% free.',
    ],
    colorBadge: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
  },
  {
    id: 'departmental',
    stageNumber: 4,
    title: 'Departmental Clearance & Course Advisor Sign-Off',
    category: 'Departmental',
    location: 'Departmental Secretariat / HOD Annex',
    office: 'Head of Department (HOD) & 100-Level Course Advisor',
    timeline: '9:00 AM – 2:00 PM',
    summary: 'Course vetting with your Course Advisor, verification of credit unit limits (15–24 units), handbook collection, and HOD stamp on your Course Forms.',
    prerequisites: [
      'Printed Course Registration Forms from ePortal (5 copies)',
      'Faculty Officer Clearance Certificate / Eligibility Slip',
      'Departmental Association Dues Receipt (e.g., NACOS, SOSA, IFELAW)',
      'Two (2) Passport photographs (Red background)',
    ],
    proTips: [
      'Strict Credit Load Enforcement: You must register between 15 (minimum) and 24 (maximum) units per semester.',
      'Do not click final submit on ePortal without your Course Advisor verifying your elective combinations and prerequisite pathways.',
      'Distribute your 5 copies: Student, Department, Faculty, Exams & Records (Senate), and DSA.',
    ],
    colorBadge: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
  },
  {
    id: 'library',
    stageNumber: 5,
    title: 'Hezekiah Oluwasanmi Library Registration',
    category: 'Library',
    location: 'Hezekiah Oluwasanmi Library (Central Academic Concourse)',
    office: 'Readers Services / Circulation Desk (Ground Floor)',
    timeline: 'Monday – Friday, 8:00 AM – 4:00 PM',
    summary: 'Reader index registration, issuance of physical book Borrowing Tickets, digital repository onboarding, and E-Library database activation.',
    prerequisites: [
      'Endorsed Course Registration Form (stamped by Course Advisor & HOD)',
      'Bank-stamped School Fees Remita Receipt',
      'Faculty Clearance Slip',
      'Two (2) Red-background passport photographs',
    ],
    proTips: [
      'Your borrowing tickets allow you to borrow 2–4 physical books from open stacks for 14 calendar days.',
      'Activate your free off-campus access to ScienceDirect, JSTOR, and Research4Life at the First Floor E-Library.',
      'Strict cloakroom rule: All backpacks must be checked in at the Ground Floor lockers before entering the reading halls.',
    ],
    colorBadge: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
  },
];
