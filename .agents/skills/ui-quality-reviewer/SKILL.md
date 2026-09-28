---
name: ui-quality-reviewer
description: Conduct comprehensive multidimensional UI/UX quality audits across Product, UX, Visual, Responsive, and Engineering dimensions. Activate whenever conducting final review of implemented screens, grading UI work, or catching subtle UX regressions.
---

# UI Quality Reviewer Skill

This skill conducts deep qualitative reviews of finished interfaces. **A successful build and absence of crashes does not mean the user experience is good.** This skill audits the subtle, critical nuances of product intent, cognitive load, visual balance, and ergonomic resilience.

---

## 🔍 The 5-Dimensional Quality Audit

Every finished interface must be audited and graded across all five core dimensions:

```
┌───────────────────────────────────────────────────────────┐
│                 5-DIMENSIONAL UI/UX AUDIT                 │
├─────────────┬─────────────┬─────────────┬─────────────────┤
│   Product   │     UX      │   Visual    │   Responsive    │   Engineering   │
│   Quality   │   Quality   │   Quality   │     Quality     │     Quality     │
└─────────────┴─────────────┴─────────────┴─────────────────┴─────────────────┘
```

---

### Dimension 1: Product Quality
- **Core User Task**: Does this interface solve an authentic, urgent problem for an OAU freshman?
- **Action Prominence**: Is the primary call-to-action immediately obvious within 3 seconds of viewing?
- **Truthful Content**: Is all content, terminology, and operational guidance grounded in genuine institutional reality?
- **State Completeness**: Are loading, empty, active, success, and error states all thoughtfully designed and functional?

### Dimension 2: UX Quality & Interaction Flow
- **Cognitive Clarity**: Can a stressed student navigating campus on low battery understand this screen without guidance?
- **Predictable Controls**: Do buttons and inputs behave exactly as expected without surprising side-effects?
- **Graceful Error Recovery**: When an error occurs, does the interface tell the user how to fix it immediately?
- **Safeguarded Destructive Actions**: Are irreversible actions (e.g., clearing courses or resetting clearance) guarded by clear confirmation steps?
- **Immediate Sensory Feedback**: Does the UI provide instant feedback (visual, badge, or toast) when an action occurs?

### Dimension 3: Visual Quality & Design Cohesion
- **Clear Information Hierarchy**: Does the eye track naturally from main heading $\to$ focal cards $\to$ secondary tools?
- **Spacing Rhythm & Grid Alignment**: Are margins and gaps consistent multiples of 4px/8px? Are cards neatly aligned?
- **Typography Contrast**: Does body text meet WCAG AAA/AA contrast? Are headings distinct from secondary captions?
- **Design Token Discipline**: Are colors strictly sourced from the 13 codified tokens in `DESIGN_TOKENS.md`?
- **Anti-Vibe / Anti-Slop Enforcement**: Is the interface free of generic AI dashboard templates, random gradients, and decorative bloat?

### Dimension 4: Responsive & Viewport Ergonomics
- **Mobile Baseline (360px–428px)**: Does the layout feel native, spacious, and completely natural on small mobile viewports?
- **Zero Horizontal Bleed**: Is there zero horizontal overflow on any screen width?
- **Adaptive Components**: Do complex elements (like the GPA course list or clearance stages) stack gracefully into thumb-friendly cards rather than squishing horizontally?
- **Fixed Dock Clearance**: Does the page include adequate bottom padding (`pb-24`) so the mobile navigation dock never obscures content?

### Dimension 5: Engineering Quality & Maintainability
- **Component Reusability**: Are shared UI elements (buttons, badges, inputs) composed from reusable building blocks?
- **Scoped Scope**: Are unrelated features and files left completely untouched?
- **Console Hygiene**: Is the developer console completely free of warnings, hydration mismatches, and errors?
- **Offline Integrity**: Does the interface function seamlessly without an active internet connection?

---

## 🚦 Defect Severity Classification

Every finding discovered during review must be assigned an explicit severity level:

| Severity Level | Definition | Action Required |
| :--- | :--- | :--- |
| 🔴 **BLOCKER** | Prevents the user from completing their primary task; causes data loss; breaks mobile viewports (e.g., severe overflow); or violates institutional anti-hallucination rules. | Must be fixed immediately. Deployment or PR merge is halted. |
| 🟠 **HIGH** | Significant UX friction, confusing error state, missing keyboard focus ring, or contrast failure below WCAG AA. | Must be resolved before the feature can be declared complete. |
| 🟡 **MEDIUM** | Minor visual inconsistency, subtle spacing misalignment, or non-optimal button copy. | Scheduled for polish in the active sprint. |
| 🟢 **LOW** | Cosmetic enhancement, micro-animation refinement, or non-blocking code clean-up. | Documented as an optional polish item. |

---

## 🚫 Root-Cause Problem Identification Rule

> **Never implement visual "fixes" without first identifying and documenting the root cause.**
> If text wraps awkwardly, do not randomly add `w-[240px]`. Determine why the flex container failed to shrink (`min-w-0`), whether padding was excessive, or whether the text should truncate.
