# 🏆 OAUMods: Project Milestones & Execution Roadmap

> **"A realistic, phase-by-phase compass guiding the development of OAUMods (Great Ife Freshman Companion)."**  
> *No matter how day-to-day work fluctuates, as long as we achieve each milestone phase, we remain on course to transform the freshman experience.*

---

## 🚦 Roadmap Overview

```
Phase 0: Foundations & Architecture       [IN PROGRESS]
    │
    ▼
Phase 1: Core MVP (Clearance & Campus Map) [UPCOMING]
    │
    ▼
Phase 2: Mobility, Directory & Survival   [PLANNED]
    │
    ▼
Phase 3: Roommate Alpha & Data Hardening  [PLANNED]
    │
    ▼
Phase 4: Open Source Call & Campus Launch [PLANNED]
    │
    ▼
Phase 5: Reusability & Semester Companion [LONG-TERM]
```

---

## 📌 Phase 0: Foundations & Architecture Setup
**Goal**: Establish the project identity, living documentation, and technical scaffolding.  
**Target Duration**: 1–2 Days  
**Status**: 🟢 *Completed*

### Key Tasks:
- [x] **0.1 Research Proven Precedents**: Deep-dive into NUSMods, TUM Campus App, and Guidebook Higher Ed to extract winning UX patterns.
- [x] **0.2 Define Problem Space & Identity**: Ground the app in authentic OAU realities (Angola/Moz bed spaces, faculty clearance, campus landmarks).
- [x] **0.3 Establish Living Documentation**:
  - [x] `README.md` (Project Identity & Manifesto)
  - [x] `CHANGELOG.md` (Project Diary initialized with Entry 001)
  - [x] `MILESTONES.md` (This Execution Roadmap)
  - [x] `PROJECT_RULES.md` (Operational Guidelines for Agent & Lead)
- [x] **0.4 Scaffold Frontend Stack**: Set up a lightweight, blazing-fast, mobile-first project structure with vanilla CSS design tokens, modern typography, and PWA service worker support.

**Exit Criteria for Phase 0**: Repository initialized, docs in place, and dev server running cleanly with a mobile-responsive shell.

---

## 📌 Phase 1: The Core MVP (Clearance, Campus Atlas & Accommodation)
**Goal**: Build the primary tools a freshman needs immediately upon arrival: knowing what to do (clearance), where to go (campus atlas with global search), and how to secure housing (accommodation hub).  
**Status**: 🟢 *Completed & Verified*

### Key Tasks:
- [x] **1.1 Interactive Clearance & Registration Pipeline**:
  - [x] Visual step progression: School Fees on ePortal via Remita -> Bio-data -> Health Center Screening -> Bed Space -> Faculty Clearance -> Departmental Clearance -> Library Registration.
  - [x] Interactive checkboxes with state persistence (saved locally on the student's phone).
  - [x] Document prerequisite modal for every step (required number of copies, passport background color, file jacket color, office room number).
- [x] **1.2 OAU Campus Landmark Atlas (POI Directory) & Global Search**:
  - [x] Curate database of key campus landmarks:
    - *Faculties*: Science, Tech, Administration, Arts, Social Sciences, EDM, Pharmacy, Health Sciences, Law, Agriculture, Education.
    - *Lecture Theatres*: BOOC, AUD, ODLT 1 & 2, PGLT, White House, Spider House, Yellow House.
    - *Halls of Residence*: Angola, Mozambique, Fajuyi, Awolowo, Moremi, ETF, Alumni.
    - *Central Facilities*: SUB, Hezekiah Library, Health Center (JAC), Amphitheatre, Motion Ground, Sport Complex.
  - [x] Global search bar with instant autocomplete across all buildings, faculties, and lecture rooms.
  - [x] Filter pills (All, Faculties, Lecture Halls, Hostels, Admin/Services, Food/ATMs).
  - [x] Rich detail drawer for each POI (Photo, "What happens here", opening hours, closest shuttle drop-off, tips).
- [x] **1.3 Accommodation Hub (Hostel & Bed Space Engine)**:
  - [x] Bed space balloting strategy: countdowns, network prep tips, portal steps, and verification.
  - [x] Detailed hall guides: Angola (freshmen males), Mozambique (freshmen females), Fajuyi, Awolowo, Moremi, Alumni, ETF.
  - [x] Off-campus accommodation directory (Maintenance, Mayfair, Asherifa, Ibadan Road, AP, OAU Gate) with verified landlord tips and pricing expectations.

**Exit Criteria for Phase 1**: A functional, mobile-tested prototype where a student can check off clearance steps, look up any key building at OAU, and navigate accommodation.

---

## 📌 Phase 2: Campus Mobility, Campus Life & Survival Bible
**Goal**: Expand the guide to cover transportation, daily student services, emergency contacts, and campus cultural integration.  
**Status**: ⚪ *Not Started*

### Key Tasks:
- [ ] **2.1 Campus Transit & Movement Engine**:
  - [ ] Detailed guide to Campus Shuttles (Main Gate to SUB, Town to Campus, Hall routes).
  - [ ] Tricycle (Keke) parks and routes (SUB, Fajuyi, Mozambique, Maintenance).
  - [ ] Verified student fare table (protecting freshers from being overcharged).
  - [ ] Recommended walking shortcuts across campus.
- [ ] **2.2 Campus Life & Essentials Directory**:
  - [ ] Affordable food spots, cafeterias, and buttery joints across campus and halls.
  - [ ] Student services: Printing/photocopying hubs, cybercafés, bookshops, laundry.
  - [ ] Banks, working ATMs, and POS cash withdrawal points.
- [x] **2.3 Essential Directory, Health & Emergency Systems**:
  - [x] University Health Center ("JAC") primary care protocols, mandatory "Green Card" registration pipeline, and TSHIP integration.
  - [x] 24/7 dedicated campus ambulance hotlines (`0815 375 0977`, `0903 569 9725`, `0817 398 0288`) and OAUTHC tertiary referral protocols.
  - [x] OAUTHC Emergency Medicine Department direct contact lines (`+234 815 209 2813`, `+234 815 209 2908`, `+234 805 500 4262`).
  - [x] Historical review of health crises (October 2021 protests) and student emergency escort playbooks.
- [x] **2.4 Great Ife Residential, Religious & Sports Knowledge Base**:
  - [x] Comprehensive profiling of all 9 halls of residence, layout, amenities, cooking/appliance bans, curfew, and Aroism culture (`research/08`).
  - [x] Complete mapping of religious ecosystems: UJCM, Committee of Presidents, major fellowships, Catholic Chaplaincy OLPLC, All Souls Chapel, MSSN OAU, Central Mosque, hall mosques, and Jihad Week (`research/09`).
  - [x] Extensive sports intelligence: Directorate of Sports, available disciplines, world-class Sports Complex facilities, trials, HOD/Dean/VC cups, and 1970/1973/1984/2014 NUGA hosting history (`research/11`).
- [ ] **2.5 Campus Mobility, Transit & Movement Engine**:
  - [ ] Detailed guide to Campus Shuttles (Main Gate to SUB, Town to Campus, Hall routes).
  - [ ] Tricycle (Keke) parks and routes (SUB, Fajuyi, Mozambique, Maintenance).
  - [ ] Verified student fare table (protecting freshers from being overcharged).
  - [ ] Recommended walking shortcuts across campus.
- [ ] **2.6 Campus Life, Food Spots & Essentials**:
  - [ ] Affordable food spots, cafeterias, and buttery joints across campus and halls.
  - [ ] Student services: Printing/photocopying hubs, cybercafés, bookshops, laundry.
  - [ ] Banks, working ATMs, and POS cash withdrawal points.

**Exit Criteria for Phase 2**: Full coverage of day-to-day freshman survival, transport, food, health, and safety.

---

## 📌 Phase 3: Academics Hub, GPA Calculator & Roommate Alpha
**Goal**: Build the academic engine (including the custom Great Ife 5.0 GPA calculator), validate with roommates, and harden offline PWA support.  
**Status**: ⚪ *Not Started*

### Key Tasks:
- [ ] **3.1 Academics Hub**:
  - [ ] Directory of faculties, departments, and typical freshman 100-level course codes.
  - [ ] Course information, credit units, prerequisites, and elective selection advice.
- [ ] **3.2 🧮 Great Ife 5.0 GPA Calculator**:
  - [ ] Pre-calibrated to OAU's grading scale (A = 5, B = 4, C = 3, D = 2, E = 1, F = 0).
  - [ ] Dynamic course adder (Course Code, Unit, Grade).
  - [ ] Real-time GPA calculation + target GPA projection for future semesters.
  - [ ] Local storage persistence so calculations aren't lost.
- [ ] **3.3 Roommate Testing & Alpha Review**:
  - [ ] Deploy a live staging link for mobile testing.
  - [ ] Have roommates stress-test usability, speed, and accuracy of clearance steps and GPA math.
  - [ ] Log all feedback, bugs, and clearance war stories directly into `CHANGELOG.md`.
- [ ] **3.4 Offline PWA Hardening**:
  - [ ] Service Worker precaching all static assets, landmark images, and JSON directories.
  - [ ] Full offline functionality verified in airplane mode.

**Exit Criteria for Phase 3**: Roommates give unanimous sign-off; GPA calculator and clearance operate 100% offline without glitches.

---

## 📌 Phase 4: Public Open-Source Call, Community Verification & Campus Launch
**Goal**: Transition from a private project to an open-source movement; onboard the incoming freshman batch.  
**Status**: ⚪ *Not Started*

### Key Tasks:
- [ ] **4.1 Open Source Repository Prep**:
  - [ ] Push to GitHub with a welcoming `CONTRIBUTING.md` and issue templates.
  - [ ] Label beginner-friendly issues (`good first issue`, `data wanted`, `design tweak`).
- [ ] **4.2 Community Verification Engine**:
  - [ ] In-app contribution trigger: students can submit corrections, new food spots, or updated clearance room numbers.
  - [ ] Departmental verification badges ensuring data reliability.
- [ ] **4.3 The Public Recruitment Call**:
  - [ ] Post the public call to Great Ife tech communities (GDSC OAU, NACOS, tech WhatsApp groups).
  - [ ] Onboard 3–5 dedicated contributors (Frontend, UI, Campus Curators).
- [ ] **4.4 Campus Seeding & Distribution**:
  - [ ] Seed the live link across official and unofficial Freshman WhatsApp and Telegram groups.
  - [ ] Engage Student Union (SUG) executives and departmental presidents for official backing.
  - [ ] Distribute QR code flyers at the campus main gate, cybercafés, and registration centers.

**Exit Criteria for Phase 4**: 1,000+ active freshman users during orientation week; active open-source contributor community established.

---

## 📌 Phase 5: Admin Dashboard, Notifications & Future AI Campus Assistant
**Goal**: Provide long-term administration, real-time campus broadcast alerts, and an intelligent student guide.  
**Status**: ⚪ *Deferred / Long-Term*

### Key Tasks:
- [ ] **5.1 Lightweight Admin / Curator Dashboard**:
  - [ ] Secure portal to review community submissions, update transport fares, and post announcements.
- [ ] **5.2 Campus Updates & Deadline Notifications**:
  - [ ] Alerts for hostel balloting, course registration closing dates, matriculation rehearsals, and exams.
- [ ] **5.3 🤖 Future AI Campus Assistant**:
  - [ ] Natural language Q&A grounded in verified OAU handbook data (*"Where do I submit my green file for CSC?"*).
- [ ] **5.4 Semester Timetable Builder & Senior Marketplace**:
  - [ ] Interactive weekly lecture schedule with clash detection.
  - [ ] Verified peer-to-peer secondhand textbook exchange.

---
*(Milestones are updated in lockstep with work sessions and logged in `CHANGELOG.md`.)*
