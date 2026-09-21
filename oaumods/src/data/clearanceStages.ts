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
    timeline: 'Orientation screening period (early morning arrival recommended for daily tally collection)',
    summary: 'Physical examination, chest X-ray inspection, diagnostic laboratory audit, physician sign-off, and laminated Green Card collection.',
    prerequisites: [
      'Student Medical Screening Form (Printed from ePortal)',
      'Certified Chest X-Ray film & official radiologist report (OAUTHC or accredited hospital)',
      'Laboratory investigation results (Blood Group, Genotype, PCV, Urinalysis)',
      'Immunization / vaccination record history',
      'Two (2) recent passport photographs (Strictly RED background)',
    ],
    proTips: [
      'Arrive early in the morning to collect your entry tally number at the security desk.',
      'Keep your laminated Green Card safe—it serves as your campus medical passport for clinic visits.',
      'The Health Centre is located in the student hostel sector; it is completely separate from the College of Health Sciences.',
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
    timeline: 'Freshman check-in period upon ePortal bed space confirmation',
    summary: 'Bed space verification, hall dues processing, tenancy and safety rules agreement, and physical room key issuance.',
    prerequisites: [
      'ePortal Bed Space Allocation Slip (Original printout)',
      'Remita Hostel Maintenance Payment Receipt',
      'Two (2) Red-background passport photographs',
      'Photocopies of JAMB Admission Letter & Acceptance Fee receipt',
      'One flat file jacket (Standard Pale Yellow)',
    ],
    proTips: [
      'Strict Appliance Ban: Cooking coils, electric boiling rings, and heavy heating appliances are barred in the halls.',
      'Pay your hall executive dues at the hall office to receive your Hall Handbook and guidelines.',
      'Keep your room key and docket safe during orientation week.',
    ],
    colorBadge: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
  },
  {
    id: 'faculty',
    stageNumber: 3,
    title: 'Faculty Officer Credential Verification',
    category: 'Faculty',
    location: 'Your Respective Faculty Secretariat (Dean Complex)',
    office: 'Faculty Officer (FO) Clearance Desk',
    timeline: 'Orientation weeks during official university working hours',
    summary: 'Verification of original academic certificates and official opening of your faculty file in the standard Pale Yellow jacket.',
    prerequisites: [
      'Standard Pale Yellow Flat File Jacket labeled in clear ink',
      'Original JAMB Result Slip & JAMB Admission Letter + 3 photocopies',
      'Original O\'Level Statement of Results / Certificates (WAEC/NECO) + 3 photocopies',
      'Original Birth Certificate or Declaration of Age + 3 photocopies',
      'Local Government Certificate of Origin + 3 photocopies',
      'Letter of Attestation (Clergy, Legal practitioner, or Principal)',
      'Bank-stamped School Fees Remita Receipt + 3 photocopies',
      'Four (4) Passport photographs (Strictly RED background)',
    ],
    proTips: [
      'The file jacket is strictly PALE YELLOW for all faculties across campus.',
      'Never staple original certificates into your file jacket; use document clips or transparent sleeves.',
      'Clearance is entirely free. Submit documents only to designated faculty desk officers inside the secretariat.',
    ],
    colorBadge: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
  },
  {
    id: 'departmental',
    stageNumber: 4,
    title: 'Departmental Clearance & Course Advisor Sign-Off',
    category: 'Departmental',
    location: 'Departmental Secretariat / HOD Office',
    office: 'Head of Department (HOD) & 100-Level Course Advisor',
    timeline: 'Following faculty verification during departmental working hours',
    summary: 'Course registration vetting with your Course Advisor, verification of credit limits (15–24 units), and HOD endorsement.',
    prerequisites: [
      'Printed Course Registration Forms from ePortal (5 copies)',
      'Faculty Officer Clearance Certificate / Eligibility Slip',
      'Departmental Association Dues Receipt',
      'Two (2) Passport photographs (Red background)',
    ],
    proTips: [
      'Statutory Credit Load: You must register between 15 (minimum) and 24 (maximum) units per semester.',
      'Review course selections with your assigned 100-Level Course Advisor before final submission.',
      'Distribute copies to required offices: Student, Department, Faculty, Exams & Records, and DSA.',
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
    timeline: 'After departmental course form endorsement during library service hours',
    summary: 'Borrower index registration, issuance of library borrowing tickets, and digital academic database onboarding.',
    prerequisites: [
      'Endorsed Course Registration Form (stamped by Course Advisor & HOD)',
      'Official School Fees Payment Receipt',
      'Faculty Clearance Slip',
      'Two (2) Red-background passport photographs',
    ],
    proTips: [
      'Your borrowing tickets allow you to check out books from the open stacks.',
      'Inquire about off-campus electronic database access at the E-Library section.',
      'Cloakroom policy: Bags and bulky packages must be deposited at the ground floor entrance lockers.',
    ],
    colorBadge: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
  },
];
