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
**Status**: 🟡 *In Progress*

### Key Tasks:
- [x] **0.1 Research Proven Precedents**: Deep-dive into NUSMods, TUM Campus App, and Guidebook Higher Ed to extract winning UX patterns.
- [x] **0.2 Define Problem Space & Identity**: Ground the app in authentic OAU realities (Angola/Moz bed spaces, faculty clearance, campus landmarks).
- [x] **0.3 Establish Living Documentation**:
  - [x] `README.md` (Project Identity & Manifesto)
  - [x] `CHANGELOG.md` (Project Diary initialized with Entry 001)
  - [x] `MILESTONES.md` (This Execution Roadmap)
  - [x] `PROJECT_RULES.md` (Operational Guidelines for Agent & Lead)
- [ ] **0.4 Scaffold Frontend Stack**: Set up a lightweight, blazing-fast, mobile-first project structure with vanilla CSS design tokens, modern typography, and PWA service worker support.

**Exit Criteria for Phase 0**: Repository initialized, docs in place, and dev server running cleanly with a mobile-responsive shell.

---

## 📌 Phase 1: The Core MVP (Clearance Tracker & Campus POI Directory)
**Goal**: Build the two most critical tools a freshman needs on Day 1: knowing what to do (clearance) and knowing where to go (campus atlas).  
**Status**: ⚪ *Not Started*

### Key Tasks:
- [ ] **1.1 Interactive Clearance & Registration Pipeline**:
  - [ ] Visual step progression: Acceptance Fee -> Remita RRR -> Bio-data -> Health Center Screening -> Bed Space -> Faculty Clearance -> Departmental Clearance -> Library Registration.
  - [ ] Interactive checkboxes with state persistence (saved locally on the student's phone).
  - [ ] Document prerequisite modal for every step (required number of copies, passport background color, file jacket color, office room number).
- [ ] **1.2 OAU Campus Landmark Atlas (POI Directory)**:
  - [ ] Curate database of key campus landmarks:
    - *Faculties*: Science, Tech, Administration, Arts, Social Sciences, EDM, Pharmacy, Health Sciences, Law, Agriculture, Education.
    - *Lecture Theatres*: BOOC, AUD, ODLT 1 & 2, PGLT, White House, Spider House, Yellow House.
    - *Halls of Residence*: Angola, Mozambique, Fajuyi, Awolowo, Moremi, ETF, Alumni.
    - *Central Facilities*: SUB, Hezekiah Library, Health Center (JAC), Amphitheatre, Motion Ground, Sport Complex.
  - [ ] Search bar with instant autocomplete.
  - [ ] Filter pills (All, Faculties, Lecture Halls, Hostels, Admin/Services, Food/ATMs).
  - [ ] Rich detail drawer for each POI (Photo, "What happens here", opening hours, closest shuttle drop-off, tips).
- [ ] **1.3 Bed Space Balloting Survival Guide**:
  - [ ] Preparation guide: network tips, portal countdown, payment confirmation window.
  - [ ] Breakdown of Angola (male freshers) vs Mozambique (female freshers) requirements.

**Exit Criteria for Phase 1**: A functional, mobile-tested prototype where a student can check off clearance steps and look up any key building at OAU.

---

## 📌 Phase 2: Campus Mobility, Essential Directory & Survival Bible
**Goal**: Expand the guide to cover transportation, emergency contacts, and campus cultural integration.  
**Status**: ⚪ *Not Started*

### Key Tasks:
- [ ] **2.1 Campus Transit & Movement Engine**:
  - [ ] Detailed guide to Campus Shuttles (Main Gate to SUB, Town to Campus, Hall routes).
  - [ ] Tricycle (Keke) parks and routes (SUB, Fajuyi, Mozambique, Maintenance).
  - [ ] Verified student fare table (protecting freshers from being overcharged).
  - [ ] Recommended walking shortcuts across campus.
- [ ] **2.2 Essential Campus & Emergency Directory**:
  - [ ] One-tap emergency call buttons for Health Center Ambulance and Campus Security Post.
  - [ ] Contact list for Dean of Student Affairs, Faculty Officers, Sub-Deans, and SUG Helpdesk.
- [ ] **2.3 Great Ife Survival Bible & Lingo Decoder**:
  - [ ] Campus slang dictionary ("Aro", "Town-Gown", "Aluta", "Motion Ground", "BOOC").
  - [ ] Scam Alert section (fake hostel agents, unofficial clearance fees, dues to avoid).
  - [ ] Lifestyle guide: Top budget eateries, reliable power outlets, 24/7 night study halls.

**Exit Criteria for Phase 2**: Full feature completeness for v0.1 release, covering all day-to-day freshman survival needs.

---

## 📌 Phase 3: Roommate Alpha & Data Hardening
**Goal**: Validate the app with real students living in the room, stress-test the UI on multiple devices, and collect accurate departmental variations.  
**Status**: ⚪ *Not Started*

### Key Tasks:
- [ ] **3.1 Roommate Testing Session**:
  - [ ] Deploy a live staging link (accessible on mobile phones).
  - [ ] Have roommates test usability, speed, and accuracy of clearance steps.
  - [ ] Log all feedback, bugs, and clearance war stories directly into `CHANGELOG.md`.
- [ ] **3.2 Cross-Faculty Data Enrichment**:
  - [ ] Gather specific clearance variations across faculties (e.g. Faculty of Technology vs Faculty of Arts file requirements).
  - [ ] Verify office room numbers and current personnel designations.
- [ ] **3.3 Offline PWA Hardening**:
  - [ ] Configure Service Worker to precache all static assets, landmark images, and directories.
  - [ ] Test in airplane mode to guarantee zero-data functionality.

**Exit Criteria for Phase 3**: Roommates give unanimous sign-off; the app functions reliably offline and without UI glitches on mobile screens.

---

## 📌 Phase 4: Public Open-Source Call & Campus Launch
**Goal**: Transition from a private project to a recognized Great Ife open-source movement; onboard the incoming freshman batch.  
**Status**: ⚪ *Not Started*

### Key Tasks:
- [ ] **4.1 Open Source Repository Prep**:
  - [ ] Push to GitHub with a welcoming `CONTRIBUTING.md` and issue templates.
  - [ ] Label beginner-friendly issues (`good first issue`, `data wanted`, `design tweak`).
- [ ] **4.2 The Public Recruitment Call**:
  - [ ] Post the public call to Great Ife tech communities (GDSC OAU, NACOS, tech WhatsApp groups).
  - [ ] Onboard 3–5 dedicated contributors (Frontend, UI, Campus Curators).
- [ ] **4.3 Campus Seeding & Distribution**:
  - [ ] Seed the live link across official and unofficial Freshman WhatsApp and Telegram groups.
  - [ ] Engage Student Union (SUG) executives and departmental presidents for official backing.
  - [ ] Distribute QR code flyers at the campus main gate, cybercafés, and registration centers.

**Exit Criteria for Phase 4**: 1,000+ active freshman users during orientation week; active open-source contributor community established.

---

## 📌 Phase 5: Reusability & Long-Term Campus Companion
**Goal**: Keep students engaged throughout their entire academic journey so the app is never uninstalled after orientation.  
**Status**: ⚪ *Deferred / Long-Term*

### Key Tasks:
- [ ] **5.1 Semester Timetable Builder**: Interactive weekly lecture schedule with notifications.
- [ ] **5.2 CGPA Planner & Academic Calculator**: Tailored to OAU’s 5-point grading system.
- [ ] **5.3 Senior Mentorship & Marketplace**: Verified secondhand textbook exchanges and senior-to-fresher advice channels.

---
*(Milestones are updated in lockstep with work sessions and logged in `CHANGELOG.md`.)*
