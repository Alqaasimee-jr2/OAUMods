---
name: copy-editor
description: Review and craft clear, concise, action-oriented, and authentic interface copy. Prevents vague labels, invented marketing claims, fake testimonials, and unverified stats. Activate whenever writing microcopy, buttons, error messages, empty states, or onboarding content.
---

# Copy Editor Skill

This skill ensures that all text across the interface is human, clear, concise, action-oriented, and rigorously truthful. It eliminates vague AI marketing slop, invented statistics, and generic button labels.

---

## 🚫 The Anti-Slop Copy Prohibitions

1. **Zero Invented Product Claims**: Never write claims like *"Trusted by 10,000+ Great Ife students"*, *"99.9% clearance success rate"*, or *"Official partner of OAU Senate"*.
2. **Zero Fake Testimonials & Reviews**: Never generate fabricated student quotes (e.g., *"'OAUMods saved my life during balloting!' — Tunde A., Part 1"*).
3. **Zero Hallucinated Metrics**: Never invent price estimates, exact lecture hall seat counts, or opening minutes unless explicitly provided by the Project Lead or institutional documents.
4. **Zero Vague Action Buttons**:
   - ❌ Bad: `Submit`, `Click here`, `Continue`, `Get Started`, `Proceed`, `Manage everything`.
   - ✅ Good: `Calculate GPA`, `Save Course`, `Mark Stage as Cleared`, `Filter Hostels`, `Reset Calculator`, `View Prerequisite Docs`.

---

## ✍️ Microcopy Best Practices & Patterns

### 1. Action-Oriented Buttons & CTAs
Every interactive button must clearly announce the specific outcome of tapping it:
- `Add Course to List` (instead of `Add`)
- `Copy Emergency Numbers` (instead of `Copy`)
- `Load Pre-Med Template` (instead of `Template`)
- `Mark Completed` (instead of `Done`)
- `Clear All Courses` (instead of `Delete`)

### 2. Form Labels & Descriptive Helper Text
- **Form Labels**: Always explicit, sentence case, and descriptive (`Course Code`, `Credit Units`, `Expected Grade`).
- **Helper Text**: State the format or institutional requirement directly (`e.g., MTH 101`, `Select between 1 and 6 units`).
- **Validation Messages**: Never display generic `"Invalid input"`. State exactly what must be corrected (`"Credit units must be a whole number between 1 and 6"`).

### 3. Complete State Copy Directory
Every feature flow must author copy across all 7 interaction states:

| Flow State | Copy Pattern | Approved Example |
| :--- | :--- | :--- |
| **Page Heading** | Noun + Context | `5-Stage Physical & Digital Clearance Pipeline` |
| **Supporting Subtitle** | 1 sentence, actionable guidance | `Track your required documents, office stops, and verification stamps in order.` |
| **Empty State** | State problem + 1 clear fix | `No courses added yet. Tap "+ Add Course" or load a Part 1 faculty template above.` |
| **Loading State** | Transparent action status | `Loading your saved clearance progress from device storage...` |
| **Success Feedback** | Concise confirmation | `Clearance checklist progress saved to device.` |
| **Error Feedback** | Cause + specific recovery action | `Unable to calculate GPA. Ensure all courses have valid credit units selected.` |
| **Confirmation / Destructive** | Exact consequence + explicit choices | `Reset all checklist progress? This will uncheck all 5 stages on this phone. [Cancel] [Reset All]` |

---

## 🏛️ Authentic Great Ife Cultural & Institutional Vocabulary

Respect and utilize authentic Obafemi Awolowo University terminology:
- Use **"Part 1"** (standard OAU terminology, not "100 Level" or "Freshman year").
- Use **"ePortal"** (OAU's student record portal).
- Use **"Health Center (JAC)"** (Joint Action Committee / campus health center).
- Use **"Angola"** (Part 1 male hall) and **"Mozambique"** (Part 1 female hall).
- Use **"Motion Ground"**, **"Amphitheatre"**, **"SUB"**, **"BOOC"**, **"AUD"**, **"ODLT"**, **"White House"**.
- Use **"Aroism"** / **"Aro"** (traditional humorous social campus culture).
- Explicitly emphasize: **OAU does not charge an Acceptance Fee**.

---

## 🔍 Pre-Release Copy Review Checklist

Before approving any UI copy:
- [ ] Is every button label specific and action-oriented?
- [ ] Are all headings and subtitles free of marketing buzzwords?
- [ ] Is there zero placeholder text (`Lorem Ipsum`, `TBD`, `Coming Soon`)?
- [ ] Are error messages instructive rather than punitive?
- [ ] Are OAU-specific terms spelled and capitalized accurately?
- [ ] If any detail is unverified, is it marked neutrally without guessing?
