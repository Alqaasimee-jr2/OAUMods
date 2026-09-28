# 📐 OAUMods UI/UX Development System & Operating Standard

> **"A rigorous, evidence-grounded framework governing user experience, interface design, frontend engineering, and quality assurance for the Great Ife Freshman Companion (OAUMods)."**  
> *Enforced across all development sessions by the Project Lead and Engineering Team.*

---

## 1. System Purpose & Core Philosophy

The primary objective of this UI/UX development system is to eliminate:
- **Vibe-Coded UI**: Guesswork, styling-first engineering, and lack of product planning.
- **Generic AI Dashboard Templates**: Meaningless metric grids, vanity cards, and layout slop.
- **Visual Inconsistency**: Ad-hoc color hexes, conflicting border radii, and irregular spacing.
- **Hallucinated Product Facts**: Fake testimonials, artificial metrics, and invented pricing/hours.
- **Desktop-Only Viewports**: Interfaces that break or cause horizontal overflow on mobile screens (360px–420px).
- **Missing Interaction States**: Unhandled loading, empty, error, success, and permission states.
- **Unverified Claims**: Stating that a feature works without runtime browser execution.

Every screen built in OAUMods must be **planned, purpose-driven, accessible, offline-resilient, visually unified, and verified in a live browser session**.

---

## 2. The 8 Core Agent Skills

The development system provides 8 specialized workspace skills located in `.agents/skills/`:

| Skill | Path | Primary Purpose |
| :--- | :--- | :--- |
| **`product-ui-planner`** | [`.agents/skills/product-ui-planner/SKILL.md`](file:///c:/Users/DELL/Desktop/GUIDE17/.agents/skills/product-ui-planner/SKILL.md) | Produces the 23-point interface specification before coding. Separates facts from assumptions. |
| **`professional-product-ui`** | [`.agents/skills/professional-product-ui/SKILL.md`](file:///c:/Users/DELL/Desktop/GUIDE17/.agents/skills/professional-product-ui/SKILL.md) | The primary 12-step implementation driver from product discovery to code and verification. |
| **`design-system-enforcer`** | [`.agents/skills/design-system-enforcer/SKILL.md`](file:///c:/Users/DELL/Desktop/GUIDE17/.agents/skills/design-system-enforcer/SKILL.md) | Guards the 13-token color palette, typography scale, radii, and dark mode mappings. |
| **`web-layout-engineer`** | [`.agents/skills/web-layout-engineer/SKILL.md`](file:///c:/Users/DELL/Desktop/GUIDE17/.agents/skills/web-layout-engineer/SKILL.md) | Engineers mobile-first (360px) flex/grid structures and guarantees zero horizontal overflow. |
| **`copy-editor`** | [`.agents/skills/copy-editor/SKILL.md`](file:///c:/Users/DELL/Desktop/GUIDE17/.agents/skills/copy-editor/SKILL.md) | Crafts concise, action-oriented, truthful microcopy in authentic Great Ife campus dialect. |
| **`accessibility-reviewer`** | [`.agents/skills/accessibility-reviewer/SKILL.md`](file:///c:/Users/DELL/Desktop/GUIDE17/.agents/skills/accessibility-reviewer/SKILL.md) | Enforces WCAG 2.1 AA/AAA compliance, keyboard operability, and 44x44px touch targets. |
| **`browser-verification`** | [`.agents/skills/browser-verification/SKILL.md`](file:///c:/Users/DELL/Desktop/GUIDE17/.agents/skills/browser-verification/SKILL.md) | Mandates live runtime browser execution across viewports and logs formal QA reports. |
| **`ui-quality-reviewer`** | [`.agents/skills/ui-quality-reviewer/SKILL.md`](file:///c:/Users/DELL/Desktop/GUIDE17/.agents/skills/ui-quality-reviewer/SKILL.md) | Audits product, UX, visual, responsive, and engineering quality, triaging defects. |

---

## 3. Required End-to-End Workflow

Every new screen, significant layout change, or complex feature follows this sequential pipeline:

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  1. INSPECT  │ ──> │   2. PLAN    │ ──> │  3. APPROVE  │ ──> │ 4. IMPLEMENT │
│ Existing Code│     │23-Point Spec │     │ User Review  │     │ Mobile-First │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
                                                                       │
┌──────────────┐     ┌──────────────┐     ┌──────────────┐             │
│   7. DONE    │ <── │ 6. UI AUDIT  │ <── │5. BROWSER QA │ <───────────┘
│ Sign-Off Doc │     │  5-Dim Review│     │ Live Runtime │
└──────────────┘     └──────────────┘     └──────────────┘
```

1. **Inspect**: Review existing components, routes, data structures, and tokens before proposing changes.
2. **Plan**: Run `product-ui-planner` to generate the 23-point specification and testable acceptance criteria.
3. **Approve**: Obtain explicit user approval on the plan before touching application code.
4. **Implement**: Run `professional-product-ui`, `design-system-enforcer`, and `web-layout-engineer` to build incrementally.
5. **Browser QA**: Run `browser-verification` to test in live browser at 360px, 390px, and 1280px viewports.
6. **UI Audit**: Run `ui-quality-reviewer` across Product, UX, Visual, Responsive, and Engineering dimensions.
7. **Sign-Off & Log**: Record progress in `docs/UI-UX-DECISION-LOG.md` and append an entry to `CHANGELOG.md`.

---

## 4. Anti-Hallucination & Ground-Truth Policy

Adhering strictly to Rule 5 in [`AGENTS.md`](file:///c:/Users/DELL/Desktop/GUIDE17/AGENTS.md):
- **Never invent** student pricing, lecture hall seat capacities, transit frequencies, or opening/closing hours.
- For anything not explicitly provided by the Project Lead, **do not add it** unless supported by authoritative institutional documentation.
- If data is unverified, omit the field or represent it with authentic qualitative guidance (e.g., *"Quiet evenings"*, *"Continuous batches"*, *"Orientation period"*).

---

## 5. Anti-Slop Visual Rules

Interfaces must remain focused, clean, and authentic:
- **No generic dashboards**: No cards containing placeholder numbers or vanity metrics.
- **No random gradients or excessive glassmorphism**: Use solid, high-contrast tokenized surfaces.
- **No excessive nesting**: Maximum 2 card layers (Page canvas $\to$ Surface card).
- **No icon-only mystery controls**: Every icon button must have accessible label text.
- **No placeholder copy**: No "Lorem Ipsum", "Coming soon", or ungrounded hype phrases.

---

## 6. Runtime Browser Verification Protocol

A feature is never considered working based only on static inspection:
1. Start application with `npm run dev` in `oaumods/`.
2. Inspect in live browser session.
3. Verify primary user action.
4. Verify edge cases and empty states.
5. Resize to **360px** and **390px**; verify zero horizontal scrollbar (`overflow-x`).
6. Inspect console for zero runtime warnings or errors.
7. Produce standard verification report classifying items as `VERIFIED`, `PARTIALLY VERIFIED`, `NOT VERIFIED`, or `BLOCKED`.

---

## 7. Definition of Done (DoD)

A UI task is strictly complete when:
- [ ] Product objective and user problem are clearly identified.
- [ ] 23-point interface plan was approved before code changes began.
- [ ] Existing components and tokens were reused without ad-hoc styling.
- [ ] All 6 interaction states (Ideal, Loading, Empty, Error, Success, Destructive) are handled.
- [ ] Mobile viewport (360px–420px) is verified with zero horizontal overflow.
- [ ] WCAG AA/AAA contrast and 44x44px touch targets are satisfied.
- [ ] Code compiles with zero TypeScript, PostCSS, or ESLint errors.
- [ ] Live runtime verification passed in browser with zero console exceptions.
- [ ] Copy is verified authentic to Great Ife culture; zero hallucinated metrics.
- [ ] `CHANGELOG.md` and `docs/UI-UX-DECISION-LOG.md` are updated.

---

## 8. Protocols for System Extensions

### A. Adding New Design Tokens
1. Check existing tokens in [`DESIGN_TOKENS.md`](file:///c:/Users/DELL/Desktop/GUIDE17/DESIGN_TOKENS.md) to avoid duplication.
2. Formulate the semantic role, light hex, and dark hex.
3. Verify contrast ratios (minimum 4.5:1 for body text, 3:1 for UI elements).
4. Update `DESIGN_TOKENS.md` with table row and rationale.
5. Register under `@theme` and `:root` / `@media (prefers-color-scheme: dark)` in [`oaumods/src/app/globals.css`](file:///c:/Users/DELL/Desktop/GUIDE17/oaumods/src/app/globals.css).

### B. Adding External Dependencies
1. Explain why the dependency is strictly necessary and why existing tools cannot achieve the goal.
2. Evaluate bundle weight impact on mobile network conditions.
3. Check compatibility with Next.js 16 and React 19.
4. Request explicit approval from the Project Lead before running `npm install`.

### C. Handling Assumptions
1. Explicitly document any assumption in the plan under **Assumptions**.
2. Never convert an assumption into a product claim or factual metric.
3. If an assumption affects student clearance, fees, or graduation requirements, pause and obtain verification before proceeding.
