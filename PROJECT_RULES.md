# 📜 Project Operating Rules & Governance

> **"The operating contract governing our collaboration, code standards, documentation habits, and architectural choices moving forward."**  
> *Enforced across all sessions by the Project Lead and AI Pair Programmer.*

---

## 🧭 Core Principles

### Rule 1: Living Diary Discipline (Mandatory Changelog Maintenance)
*   **The Chronicle Never Lags**: `CHANGELOG.md` is our living project diary.
*   **When to Update**:
    *   Whenever an architectural or product decision is reached.
    *   Whenever feedback is received from roommates, testers, or new team members.
    *   Whenever a code milestone is completed or a significant feature is deployed.
*   **Format Integrity**: Every entry must include Date, Context/Thoughts, Decisions Made, Milestone Progress, People & Community, and Next Immediate Step.

### Rule 2: Roadmap Alignment (Adherence to Milestones)
*   **Focus on the Active Phase**: All code and effort must advance the tasks specified in the active phase of [MILESTONES.md](file:///c:/Users/DELL/Desktop/GUIDE17/MILESTONES.md).
*   **Anti-Scope Creep**: If exciting new ideas arise (e.g., AI chatbot, complex social features), document them under Phase 5 / Backlog instead of letting them derail the core MVP.
*   **Checkboxes are Sacred**: Only mark a milestone item as completed (`[x]`) after it has been built and verified.

### Rule 3: Mobile-First & 100% Offline Resilience
*   **Phone Screen First**: 95%+ of freshmen will access FreshOAU on Android and iOS mobile devices. Every screen must look stunning, thumb-friendly, and perfectly scaled on 360px to 428px widths before desktop responsiveness is considered.
*   **Zero Bloatware**: The application bundle must remain ultralight. Avoid heavy UI libraries with large JavaScript overheads.
*   **Offline-Ready**: Campus networks in lecture halls and hostels are notoriously unpredictable. All essential directories, checklists, and guides must be saved locally and accessible completely offline once loaded.

### Rule 4: Cultural & Geographic Authenticity to Great Ife
*   **True to OAU Reality**: Every place, procedure, slang, and contact must reflect the actual reality of Obafemi Awolowo University.
*   **No Guesswork**: If a specific departmental requirement or office location is unverified, mark it clearly with a `[Verification Needed]` tag and assign it to our campus curators and roommate network.

### Rule 5: Open-Source Ergonomics & Contributor-Friendly Code
*   **Clean Separation of Data and UI**: All campus data (locations, clearance steps, transit fares, emergency lines, glossary) must reside in well-structured, human-readable JSON or JavaScript data files. This allows non-technical student curators to contribute data without touching UI code.
*   **Readable & Documented**: Maintain clear comments and straightforward design patterns so that any Great Ife student dev inspecting the repository can understand it within 10 minutes.

---
*These rules are binding across our entire development lifecycle.*
