// data/clearance_pipeline.js
// Authentic step-by-step clearance stages for Obafemi Awolowo University (OAU / Great Ife)

export const CLEARANCE_PIPELINE = [
  {
    id: "step-1",
    title: "School Fees & Remita Payment",
    category: "Financial / Portal",
    location: "Online (eportal.oauife.edu.ng) / Any Commercial Bank",
    office: "Bursary / ePortal Unit",
    summary: "Generate your Remita Retrieval Reference (RRR) on the ePortal and pay your official university school fees.",
    importantNote: "🚨 SCAM ALERT: OAU does NOT charge an 'Acceptance Fee'. Do not pay any money labeled 'acceptance fee'. Only pay your official school charges generated via your ePortal account.",
    documents: [
      "JAMB Admission Letter (Original & 3 photocopies)",
      "OAU Admission Notification Slip from ePortal",
      "Remita Payment Receipt / RRR printout with bank stamp (4 copies)",
      "ePortal Payment Clearance Slip"
    ],
    proTips: [
      "Always generate your RRR directly from your own student ePortal dashboard, never from a third-party cybercafé link.",
      "Print at least 4 colored copies of the stamped bank Remita receipt—different offices will demand an original stamped copy.",
      "Keep digital PDF copies backed up on Google Drive or your phone."
    ]
  },
  {
    id: "step-2",
    title: "Bio-Data & Online Screening Form",
    category: "Administrative / Portal",
    location: "eportal.oauife.edu.ng",
    office: "Academic Affairs Directorate",
    summary: "Fill out your student bio-data, next of kin, educational history, and upload scanned credentials.",
    importantNote: "Ensure your name matches letter-for-letter with your JAMB slip and O'Level certificate. Corrections later require tedious affidavit processing.",
    documents: [
      "Completed OAU Bio-Data Form (Printed in 4 copies)",
      "O'Level Result (WAEC / NECO / NABTEB statement of results - 4 copies)",
      "Birth Certificate or National Population Commission Declaration of Age",
      "Certificate of Origin / Local Government Identification Letter"
    ],
    proTips: [
      "Passport photos must be recent with a clear, uniform RED background (standard OAU requirement for student files).",
      "Print your screening clearance certificate once verified on the portal."
    ]
  },
  {
    id: "step-3",
    title: "Medical Screening & Health Center Registration",
    category: "Medical & Health",
    location: "University Health Center (JAC - Health Sciences Road)",
    office: "Records & Medical Screening Unit",
    summary: "Undergo mandatory chest X-ray, blood tests, eye tests, and medical doctor certification.",
    importantNote: "Queues at the Health Center get intense by 8:00 AM. Arrive between 6:30 AM and 7:00 AM to get an early number tag.",
    documents: [
      "Student Medical Screening Form (Downloaded from ePortal)",
      "Chest X-Ray film and radiologist report (Can be done at OAUTHC or accredited lab)",
      "Laboratory investigation results (Blood group, Genotype, Urinalysis, Packed Cell Volume)",
      "Immunization Card (if available)",
      "Two (2) recent passport photographs (Red background)"
    ],
    proTips: [
      "You will be issued a Health Center Patient Card / Green Card upon completion. Keep it safe—it grants free healthcare at the University Health Center throughout your stay in Ife."
    ]
  },
  {
    id: "step-4",
    title: "Bed Space Balloting & Hostel Clearance",
    category: "Accommodation",
    location: "eportal.oauife.edu.ng -> Hall of Residence",
    office: "Division of Student Affairs (DSA) / Hall Warden Office",
    summary: "Ballot for accommodation on the ePortal, pay hostel maintenance fee, and clear at your assigned hall.",
    importantNote: "Male freshers are assigned to Angola Hall; Female freshers are assigned to Mozambique Hall (Moz). Balloting is strictly first-come, first-served.",
    documents: [
      "Hostel Allocation Slip from ePortal (Original printout)",
      "Hostel Maintenance Fee Remita Payment Receipt",
      "Two (2) passport photographs",
      "Letter of Undertaking / Hall Rules agreement",
      "One flat file jacket"
    ],
    proTips: [
      "Be on high-speed Wi-Fi or 4G data 5 minutes before the announced balloting hour (typically 10:00 AM).",
      "Once you secure a bed space, you have a strict payment window (usually 48–72 hours) or the space is forfeited and re-balloted!"
    ]
  },
  {
    id: "step-5",
    title: "Faculty Officer Clearance",
    category: "Faculty Administration",
    location: "Your Specific Faculty Building (Dean's Office)",
    office: "Faculty Officer (FO) Desk",
    summary: "Physical verification of original credentials, certificates, and submission of the faculty file jacket.",
    importantNote: "Check your faculty's specific file jacket color! For example, Technology uses Orange/Brown files, Sciences use Green, Arts use Blue, Administration use Yellow.",
    documents: [
      "Original JAMB Result Slip & OAU Screening Slip",
      "Original O'Level Certificate or Statement of Result",
      "Original Birth Certificate / Age Declaration",
      "Letter of Attestation from a Clergy, Lawyer, or Civil Servant",
      "School Fees Remita Receipt (Stamped)",
      "Faculty File Jacket properly labeled with Full Name, Matric/UTME No, and Department",
      "Four (4) Passport photographs (Red background)"
    ],
    proTips: [
      "Do NOT staple your original documents into the file! Use paperclips or clear document sleeves.",
      "The Faculty Officer will stamp and sign your course registration eligibility slip."
    ]
  },
  {
    id: "step-6",
    title: "Departmental Clearance & Course Advisor Sign-Off",
    category: "Departmental",
    location: "Your Departmental Office / HOD Annex",
    office: "Head of Department (HOD) & 100-Level Course Advisor",
    summary: "Meet your 100-level Course Advisor, verify elective courses and credit units, and submit the Departmental file.",
    importantNote: "Do not finalize your course registration on the ePortal until you have confirmed your course list with your assigned Course Advisor.",
    documents: [
      "Departmental File Jacket (Purchased at Departmental Secretariat)",
      "Printed Course Form / Registration Slip (4 copies)",
      "Copy of Faculty Officer Clearance Endorsement",
      "Two (2) Passport photographs",
      "Departmental Association Dues Receipt (e.g. NACOS, NAMSSN, NUESA, etc.)"
    ],
    proTips: [
      "Find out who your Class Rep is on this day! Departmental WhatsApp groups are officially seeded here.",
      "Keep a copy of your signed course form for exam entry."
    ]
  },
  {
    id: "step-7",
    title: "Hezekiah Oluwasanmi Library Registration",
    category: "Library & Learning",
    location: "Hezekiah Oluwasanmi Library (Central Campus)",
    office: "Circulation Desk / E-Library Unit",
    summary: "Register your student profile in the university main library system and receive library barcode clearance.",
    importantNote: "Hezekiah Library is one of the largest academic libraries in West Africa. Your library card gives you access to reading halls, book borrowing, and digital e-resources.",
    documents: [
      "Approved Course Form signed by Course Advisor",
      "Student Bio-Data Form",
      "One (1) Passport photograph",
      "Library Registration Form (Collected at the ground floor circulation desk)"
    ],
    proTips: [
      "Take the library orientation tour if offered—it teaches you how to locate the 24/7 overnight reading rooms and reserve study carrels during exams."
    ]
  },
  {
    id: "step-8",
    title: "Matriculation & Final File Submission",
    category: "Ceremonial / Milestone",
    location: "Amphitheatre / Oduduwa Hall / Faculty Auditoriums",
    office: "Division of Student Affairs & Faculty Secretariat",
    summary: "Collect your matriculation gown, sign the Matriculation Register, take the Matriculation Oath, and officially become a bona fide Great Ife student!",
    importantNote: "You are not officially recognized as an OAU student until your name is signed in the Matriculation Register and your matric number is permanently sealed.",
    documents: [
      "Matriculation Gown Collection Receipt",
      "Student ID Card or Temporary Matric Slip",
      "Matriculation Oath Form (Signed after the ceremony)"
    ],
    proTips: [
      "Collect your gown early from your Faculty Secretariat to get a good size.",
      "Return the gown within the designated return window (usually 48 hours) to avoid heavy daily late fees."
    ]
  }
];
