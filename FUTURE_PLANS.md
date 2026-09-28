# Great Ife Freshman Companion (GUIDE17 / OAUMods)
# 🗺️ Future Plans & Progressive Feature Roadmap

> **Document Status**: Living Blueprint  
> **Source**: Voice Note Debrief & Competitive Benchmark Synthesis (NUSMods & TUM Munich Portal)  
> **Guiding Principle**: *"Build the skeleton and muscles first; roll out advanced features progressively as the project scales."*

---

## 🎯 Executive Vision

The long-term vision of **GUIDE17 / OAUMods** is to evolve from a freshman orientation and survival companion into an indispensable, campus-wide digital assistant for Obafemi Awolowo University (Great Ife). 

Inspired by world-class student-built platforms like **NUSMods** (National University of Singapore) and the **TUM Student Portal** (Technical University of Munich), OAUMods will progressively unify academic planning, campus spatial navigation, community insights, and daily student welfare.

---

## 🏗️ Core Architecture & Target Technology Stack

*   **Frontend**: Next.js (App Router), React, TypeScript, Tailwind CSS.
*   **Mobile / Offline**: Progressive Web App (PWA) with Service Worker caching and `localStorage` state persistence.
*   **Database & Auth**: Supabase (PostgreSQL) + Row Level Security (RLS).
*   **Spatial / Mapping**: Leaflet.js + OpenStreetMap (OSM) with custom OAU campus node overlays.
*   **Deployment**: Vercel edge deployment with automated CI/CD.

---

## 🚀 Progressive Phasing Roadmap

```
┌────────────────────────────────────────────────────────┐
│ PHASE 1 (Current — The Movement):                      │
│ Skeleton & Muscles: Core Portal, PWA, 100L Basics      │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│ PHASE 2 (Near-Term):                                   │
│ Interactive Leaflet Map, CGPA Hub, Student Reviews     │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│ PHASE 3 (Intermediate):                                │
│ University-Wide Course DB, Manual Timetable Builder   │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│ PHASE 4 (Long-Term Vision):                            │
│ Admin Data Engine, Universal Student Card, Transit Hub │
└────────────────────────────────────────────────────────┘
```

---

## 📦 Phase-by-Phase Feature Breakdown

### Phase 1: The Core Foundation (Current Movement)
*Focus: Rock-solid basics, zero external bloat, offline-ready, mobile-first (360px–420px).*

1.  **Layer A — Orientation & Info Portal**:
    *   Authentic Great Ife welcoming experience ("For Learning and Culture").
    *   Freshman Halls Guide: Angola Hall (males) and Mozambique Hall (females), plus context on Fajuyi and Awolowo halls.
    *   Key campus landmarks: Oduduwa Hall, SUB, Motion Ground, Pit Theatre, Amphitheatre, Hezekiah Oluwasanmi Library, Health Centre.
    *   Campus Lingo & Culture Glossary (*Aro*, *Keke*, *White House*, *BOO*, *SUB*).
    *   Persistent CTA to launch the companion app.
2.  **Layer B — OAUMods Companion Web App**:
    *   **Freshman Clearance Checklist**: Interactive tracker for e-portal, medicals, hall balloting, and departmental files (persisted via `localStorage`).
    *   **Academics & 100L Course Directory**: Pre-populated with core 100-level faculty courses (MTH, CHM, PHY, BIO, SER).
    *   **Basic CGPA Calculator**: Local GPA/CGPA computation adhering strictly to the OAU 5.0 grading scale.
    *   **Venue Directory**: Practical guidance on major lecture theatres (BOO, 1k LT, AUD, Yellow House, HSLT).

---

### Phase 2: Spatial Navigation & Community Features
*Focus: Maps, localized directions, and authenticated student personalization.*

1.  **Interactive Campus Map (Leaflet.js + OpenStreetMap)**:
    *   OpenStreetMap integration centered on OAU campus coordinates.
    *   Searchable building directory (faculties, halls of residence, lecture theatres, administrative offices).
    *   **Walking Context**: Contextual prompts estimating walking time from freshman halls (e.g., *"Angola to BOOC: ~7 min walk"*).
2.  **User Authentication (Supabase Auth)**:
    *   Secure student login/signup.
    *   Syncing saved courses, pinned timetables, and clearance progress across devices.
3.  **Community Notes & Venue Tips**:
    *   Peer-contributed, moderated advice on lecture halls (e.g., ventilation tips, where to sit for early audio clarity).
    *   Verified advice on navigation shortcuts across academic quads.

---

### Phase 3: The NUSMods Model (Advanced Timetabling)
*Focus: Managing academic schedules across departments.*

1.  **Faculty & Departmental Course Filtering**:
    *   Filter by Faculty (Technology, Science, Social Sciences, Arts, EDM, etc.).
    *   Filter by Department and Level (100L, 200L, etc.).
    *   Display credit unit weightings and prerequisites.
2.  **Interactive Timetable Builder**:
    *   Student course selection generating a visual weekly schedule grid.
    *   **Manual Slot Adjustment**: Because OAU departments frequently shift lecture venues, students can manually adjust class times and room slots to match sudden lecturer changes.
    *   **Conflict / Clash Detection**: Highlight overlapping lecture slots for dual-department or borrowing-course registrations.

---

### Phase 4: The TUM Model (Ecosystem & Campus Services)
*Focus: Universal student identity, comprehensive amenities, and transit.*

1.  **Universal Digital Student Pass (Card)**:
    *   Digital ID card preview displaying student profile, faculty, department, and matriculation status for quick reference.
    *   Personalized dashboard with pinned venues, active semester courses, and academic countdowns.
2.  **Campus Transit Hub (Yellow Keke & Bus Guide)**:
    *   Verified routes: Campus Gate ⇄ SUB / Motion Ground; Campus ⇄ Mayfair / Lagere; Campus ⇄ OAUTHC.
    *   Verified SU fare structure without guessing arbitrary schedules.
    *   Exploratory research into student-reported transit wait times.
3.  **Campus Amenities Directory**:
    *   Directory of student utilities: functional ATM galleries, printing and photocopy hubs, and cafeteria locations.
    *   Strict adherence to Rule 5: qualitative descriptions only (*"Open daytime"*, *"Near SUB basement"*) without inventing unverified closing hours.
4.  **Admin Ingestion Engine**:
    *   Secure admin dashboard to bulk-upload and update academic course data, departmental changes, and semester calendar dates from GitHub/CSV feeds.

---

## 🛡️ Anti-Hallucination & Ground-Truth Guardrails

Throughout every progressive milestone, the following operating rules established in [`AGENTS.md`](file:///c:/Users/DELL/Desktop/GUIDE17/AGENTS.md) remain inviolable:
1.  **No Invented Metrics**: Never add artificial clock hours, estimated seat counts, or guessed transport frequencies unless verified by institutional sources or the Project Lead.
2.  **Qualitative Accuracy**: When exact quantitative figures are unverified, express operational context qualitatively (e.g., *"Quiet evenings"*, *"Early morning arrival recommended"*).
3.  **Performance First**: The core app must always retain offline-first usability for students with poor connectivity.
