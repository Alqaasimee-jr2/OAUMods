# 💡 Feature Spec 01: Hierarchical Executive Directory (Faculty ➔ Department ➔ PRO & President)

> **Source**: Audio Notes 1, 4 & 5 (from Core Team)  
> **Status**: *Ideation / Review*  
> **Target Audience**: Incoming 100-Level Freshmen & Direct Entry Students

---

## 🎯 The Core Problem
When freshers arrive at OAU, they are flooded with dozens of unauthorized WhatsApp groups, spam links, and self-proclaimed "agents". They do not know:
1. Who the legitimate student leaders of their department are.
2. Which broadcast channel gives official information on lecture schedules, test cancellations, and clearance.
3. Where their Departmental Secretariat is physically located.

---

## 🏗️ Proposed Information Hierarchy

```
Obafemi Awolowo University
  │
  ├── 1. Select Faculty (13 Faculties)
  │     (e.g., Faculty of Technology, Faculty of Science, Faculty of Arts, etc.)
  │
  └── 2. Select Department (Over 60 Departments)
        (e.g., Computer Science & Engineering, Mechanical Engineering, Economics, etc.)
        │
        ├── 🏛️ Departmental Secretariat Details
        │     • Physical Location & Office Room Number
        │     • Departmental Association Name (e.g., NACOS, NAMSSN, NUESA)
        │
        ├── 📢 The Public Relations Officer (PRO) — [PRIMARY CONTACT]
        │     • Full Name & Photo (if verified)
        │     • Official WhatsApp Broadcast Channel / Announcement Link
        │     • *Why PRO first*: The PRO is the primary gateway for fresher onboarding, official notices, and timetable updates.
        │
        ├── 🎖️ The Departmental President
        │     • Full Name
        │     • Official Student Association Helpdesk / Email
        │
        └── 🤝 100-Level Class Representative / Interim Coordinator
              • Class Rep contact once appointed during orientation week.
```

---

## 🛡️ Verification & Anti-Spam Protocol
To protect both student executives and freshmen:
1. **Curated & Verified**: Contact info is not posted randomly; team members verify with departmental secretariats before publishing.
2. **Channel-First, Personal Number Second**: Prioritize official WhatsApp Announcement Community links or Telegram channels rather than exposing personal phone numbers directly to scraping.
3. **Report / Outdated Button**: An in-app flag allowing students to report when tenure transitions occur after departmental elections.

---

## 👥 Team Action Items
- [ ] Assign 2–3 faculties to each core team member to collect current association executive links.
- [ ] Format executive data into `data/executives.json`.
