---
name: product-ui-planner
description: Plan digital product interfaces, user journeys, component inventories, screen states, and testable acceptance criteria before writing frontend code. Activate whenever planning a new UI feature, refactoring an interface, or preparing a user-facing workflow.
---

# Product UI Planner Skill

This skill enforces disciplined, user-centered planning before any application code is written. It prevents vibe-coded UI, unplanned screens, generic dashboards, and invented product claims.

---

## 🚫 Pre-Implementation Prohibitions

1. **Never write application code before completing the plan.**
2. **Never invent business rules, product metrics, testimonials, student pricing, integrations, or operational claims.**
3. **Never use vague acceptance criteria** (e.g., *"The page should look modern and clean"*).
4. **Never treat assumptions as verified facts.** Always categorize findings into:
   - **Confirmed Facts** (backed by codebase or institutional evidence)
   - **Observed Project Behavior** (runtime/code inspection)
   - **Assumptions** (explicitly labeled, conservative)
   - **Unknowns** (items requiring user clarification)

---

## 📋 The 23-Point Interface Specification Framework

For every new interface or significant UI modification, produce a structured specification answering all 23 dimensions:

```markdown
### 1. Product Objective
What specific problem does this interface solve for the user and the product?

### 2. Target User
Who is using this screen? (e.g., OAU Part 1 fresher balloting for bed space, fresh student arriving at JAC Health Center).

### 3. User Problem
What exact friction, confusion, or bottleneck does the user encounter without this interface?

### 4. Primary User Task
What is the single most important action the user must accomplish on this screen?

### 5. User Journey
Where does the user arrive from, what do they do on this screen, and where do they go next?

### 6. Screens & Views Required
List of distinct views, modals, drawers, or tabs needed for the workflow.

### 7. Navigation & Route Changes
How does the user access this view? Are route URLs, query params, or tab state variables modified?

### 8. Information Architecture
How is the content organized hierarchically from most critical to secondary?

### 9. Content Hierarchy
- Primary Focal Point: (e.g., GPA Dial, Active Clearance Stage)
- Secondary Details: (e.g., Course Unit breakdown, Required Documents)
- Tertiary / Meta: (e.g., Timestamps, offline badge, helpful tips)

### 10. Component Inventory
List existing components to reuse and new components to create.
- Reused: (e.g., `GpaCalculator.tsx`, `Header.tsx`)
- New: (e.g., `DocumentUploadDrawer.tsx`, `VenueCard.tsx`)

### 11. Data Requirements & Schemas
What static data, localStorage keys, or props are needed? Specify types explicitly.

### 12. Loading State
How does the screen render while data or local storage is being initialized? (Skeleton, spinner, or instant static render).

### 13. Empty State
What does the user see when no items exist? (e.g., zero courses added, no clearance tasks checked). Include clear guidance on how to populate.

### 14. Error State
How are validation errors, storage failures, or calculation overflows displayed to the user?

### 15. Success State
How does the user know an action completed successfully? (Toast, inline banner, badge, or celebratory trigger).

### 16. Permission State
If an action requires prerequisites (e.g., cannot ballot before school fees are cleared), how is this disabled and explained?

### 17. Destructive Action State
How are irreversible actions (e.g., "Reset all clearance progress", "Clear all courses") protected? (Confirmation dialog, two-step tap).

### 18. Responsive Behavior
- Mobile (360px–428px): Single-column stack, thumb-friendly tap targets (min 44x44px), sticky navigation.
- Tablet (640px–768px): Dual-column grid where beneficial, comfortable padding.
- Desktop (1024px+): Centered bounded container (`max-w-5xl`), side rails or multi-column layout.

### 19. Accessibility Requirements
- Semantic landmarks (`<main>`, `<nav>`, `<header>`, `<section>`).
- Visible focus rings with adequate contrast.
- Explicit form `<label>` associations.
- `aria-label` on icon-only buttons.
- Touch target sizes (>= 44x44px).

### 20. Copy Requirements
Concise, action-oriented, human, and authentic to Great Ife campus context. No placeholder latin or hype marketing copy.

### 21. Technical Constraints
Offline capability, zero bundle-bloat, TypeScript typing, no unapproved external dependencies.

### 22. Acceptance Criteria
Observable, testable statements formatted as:
- GIVEN [context] WHEN [action] THEN [observable outcome].
- Example: "GIVEN the user is on a 360px mobile screen WHEN opening the course dropdown THEN the dropdown expands without causing horizontal scroll or viewport clipping."

### 23. Assumptions, Risks & Open Questions
- Confirmed Facts: ...
- Assumptions: ...
- Risks: ...
- Open Questions: ...
```

---

## 🎯 Plan Verification Checklist
Before submitting a plan for approval:
- [ ] Are all 23 sections completed?
- [ ] Is every acceptance criterion testable in a browser?
- [ ] Are all metrics, prices, and locations grounded in verified institutional data?
- [ ] Is there zero placeholder text or generic AI boilerplate?
- [ ] Has the plan been shared with the user for explicit approval?
