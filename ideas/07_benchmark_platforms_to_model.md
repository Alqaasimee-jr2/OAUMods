# 💡 Research Spec 07: Global & Local Working Benchmarks to Model & Copy From

> **Source**: Project Lead Research Directive  
> **Status**: *Research & Ideation*  
> **Purpose**: Deconstruct proven, successful student platforms worldwide and extract features to adapt for OAUMods.

---

## 🏛️ Benchmark 1: [CollegePad](https://www.thecollegepad.com/) & [JumpOffCampus](https://jumpoffcampus.com/)
*   **What It Is**: The industry-standard off-campus housing platform used across 70+ universities in North America.
*   **Winning Features to Model & Copy**:
    1.  **Verified Landlord / Property Badges**: Properties inspected and flagged as legitimate, cutting out fake middlemen.
    2.  **"Lease Literacy" Guides**: Plain-English educational cards explaining tenant rights, utility bills, and avoiding scams.
    3.  **Roommate & Sublease Matcher**: Dedicated matching tool based on budget, major, and sleep habits.
    4.  **Commute Time Heatmap**: Shows students how many walking or transit minutes each house is from the campus gates.
*   **How OAUMods Will Adapt It**:
    *   Map out Ife's specific student residential zones (Maintenance, Gate, AP, Asherifa, Mayfair) with verified rent brackets, light ratings, and anti-dupe rules.

---

## 🏛️ Benchmark 2: [UW Flow](https://uwflow.com/) (University of Waterloo – Student-Built & Open Source)
*   **What It Is**: Built in 2012 by student software engineering undergrads at Waterloo as a side project. Today, over 80% of Waterloo students use it to plan their semester.
*   **Open Source**: Hosted on GitHub under the [UWFlow Organization](https://github.com/UWFlow).
*   **Winning Features to Model & Copy**:
    1.  **Course Dependency Trees**: Visual diagrams showing prerequisite links (e.g., you cannot take `MTH 201` without passing `MTH 101`).
    2.  **Unfiltered Student Reviews**: Real feedback on courses and lecture workload from students who actually took them.
    3.  **One-Click Schedule Copier**: Fast way to assemble course codes and units for enrollment.
*   **How OAUMods Will Adapt It**:
    *   Provide clear 100-level prerequisite maps for Science, Tech, and Health Sciences courses so freshers know which courses are prerequisites for 200-level.

---

## 🏛️ Benchmark 3: [NUSMods](https://nusmods.com/) (National University of Singapore – Open Source)
*   **What It Is**: 100% student-created open-source timetable and venue navigation platform. Adopted by 40,000+ students.
*   **Open Source**: Hosted on GitHub at `nusmodifications/nusmods`.
*   **Winning Features to Model & Copy**:
    1.  **Interactive Venue Finder**: Search any lecture hall or room code and see its exact building, seating capacity, and scheduled lectures.
    2.  **Color-Coded Timetable Builder**: Interactive weekly lecture matrix with drag-and-drop course units.
    3.  **Offline State Cache**: Loads immediately even with zero cellular signal.
*   **How OAUMods Will Adapt It**:
    *   Interactive lookup for all OAU lecture rooms (BOOC, White House LTs, Yellow House rooms, Spider House, Pit Theatre, ODLT).

---

## 🏛️ Benchmark 4: [TUM Campus App](https://github.com/TUM-Dev/campus_flutter) (Technical University of Munich – Flutter Open Source)
*   **What It Is**: Open-source, student-led campus companion serving Germany's top technical university.
*   **Winning Features to Model & Copy**:
    1.  **Transit Departure Board**: Real-time or estimated schedules for campus buses and connecting trains.
    2.  **Cafeteria / Dining Menus**: Daily food options, student prices, and opening hours for campus buttery joints.
    3.  **Study Room Occupancy**: Shows which lecture rooms are free for night study or group tutorials.
*   **How OAUMods Will Adapt It**:
    *   Real OAU food spot pricing (Awo Cafe, Faj Buttery, Moz Buttery, SUB cafeteria) and verified campus shuttle / Keke fares.

---

## 🏛️ Benchmark 5: [Kurogo / Modo Campus](https://www.modolabs.com/) (Originally MIT Open Source)
*   **What It Is**: Mobile campus framework originally engineered at MIT, now powering apps for Harvard, UCF, and Notre Dame.
*   **Winning Features to Model & Copy**:
    1.  **Persona-Based Navigation**: The interface adapts based on whether you are a **Freshman** (Clearance + Orientation focus) or a **Returning Student** (Academics + Exam focus).
    2.  **Emergency Broadcast Banner**: Prominent banner for urgent campus notices, weather/security alerts, or portal deadlines.
*   **How OAUMods Will Adapt It**:
    *   Priority toggle between "Freshman Mode" (Clearance, Balloting, Campus 101) and "Academic Mode" (GPA, Timetable, Past Questions).

---

## 🏛️ Benchmark 6: Local Nigerian Precedents ([Cubbes](https://cubbes.com/) & [CampusGenie](https://campusgenie.ng/))
*   **What They Do**: Academic hubs for Nigerian universities featuring CGPA calculation, CBT practice, and study notes.
*   **The Gap OAUMods Fills**:
    *   These apps focus only on generic study/exam prep. None of them solve the **physical campus navigation, bed space balloting, departmental clearance queues, transit fares, and local campus culture** that make freshers panic at OAU.

---

## 💡 Feature Matrix: What OAUMods Copies & Improves

| Proven Feature | Source Benchmark | How OAUMods Implements It for Great Ife |
| :--- | :--- | :--- |
| **Verified Housing & Anti-Dupe** | CollegePad | Maintenance, Gate & Asherifa ratings, scam alerts, landlord checklist. |
| **Venue / Room Locator** | NUSMods & TUM | Direct search for BOOC, White House, Spider House, ODLT, AUD. |
| **Course & GPA Engine** | UW Flow & Cubbes | Great Ife 5.0 CGPA calculator with 100-level departmental course presets. |
| **Hostel & Clearance Pipeline** | Unique to OAUMods | Step-by-step checklist from Remita payment to matriculation gown. |
| **Campus Transit Fares** | TUM Campus | Verified student bus & Keke fares to stop drivers overcharging. |
| **Offline-First PWA** | NUSMods & TUM | 100% usable without internet data in basements and lecture halls. |
