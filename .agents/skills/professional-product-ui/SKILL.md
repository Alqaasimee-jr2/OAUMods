---
name: professional-product-ui
description: Primary UI/UX design and implementation skill. Guides end-to-end interface creation, component engineering, state handling, responsive design, and browser QA. Activate when developing, refactoring, or reviewing frontend components and screens.
---

# Professional Product UI Skill

This is the primary UI/UX implementation skill for the project. It provides an end-to-end disciplined workflow ensuring that every screen built is purposeful, responsive, accessible, authentic, and visually rigorous.

---

## 🚫 The Anti-Slop & Anti-Vibe Mandate

Every interface produced under this skill **strictly rejects**:
- ❌ **Generic AI Dashboard Templates**: Grid upon grid of vanity metric boxes that do not serve the user's primary task.
- ❌ **Decorative Fluff**: Visual elements, illustrations, or containers that have no user purpose.
- ❌ **Excessive Cards & Pills**: Nesting cards inside cards inside cards, or turning every single word into a colored pill tag.
- ❌ **Random Gradients & Gimmicky Glassmorphism**: Arbitrary multi-color gradients or blurs that decrease legibility and contrast.
- ❌ **Fake Statistics & Testimonials**: Inventing fake user quotes, fake review scores, artificial ratings, or unverified campus metrics.
- ❌ **Invented Business Rules & Pricing**: Hallucinating fees, opening hours, or capacity limits without verified evidence.
- ❌ **Excessive Shadows & Arbitrary Radii**: Mixing `rounded-sm`, `rounded-2xl`, and `rounded-full` without design token alignment.
- ❌ **Desktop-Only Thinking**: Building screens that look great at 1440px but break, overflow, or clip at 360px–420px mobile viewports.
- ❌ **Icon-Only Mystery Controls**: Buttons with icons but no accessible labels or text descriptions.
- ❌ **Placeholder Copy**: Shipping "Lorem Ipsum", "Coming soon", or vague "Manage your campus life" marketing copy.

---

## 🧭 The 12-Step Implementation Workflow

You must never start with styling or JSX. Follow this exact 12-step sequence:

### Step 1: Inspect
- Inspect the active codebase, existing components, layout structure, and design tokens in [`DESIGN_TOKENS.md`](file:///c:/Users/DELL/Desktop/GUIDE17/DESIGN_TOKENS.md) and [`globals.css`](file:///c:/Users/DELL/Desktop/GUIDE17/oaumods/src/app/globals.css).
- Identify working patterns to reuse. Do not reinvent existing solved components.

### Step 2: Understand the Product Context
- Clarify who the student is, where they are on campus, and what urgent problem they are solving.
- Ground terminology in authentic Obafemi Awolowo University conventions.

### Step 3: Identify the User Task
- State the single primary action the user is trying to complete on this screen.
- Ensure the interface is optimized around making this primary action immediate and unambiguous.

### Step 4: Plan Information Architecture
- Organize screen hierarchy: Primary CTA/Focal card $\to$ Supporting operational details $\to$ Secondary actions.
- Ensure the user's eye naturally tracks through the most vital information first.

### Step 5: Define All Screen States
Ensure all 6 essential states are explicitly designed before touching code:
1. **Ideal / Active State**: The standard populated interface.
2. **Loading State**: Clean skeletons or instant static renders without layout shifts.
3. **Empty State**: Clear guidance and a direct call-to-action to get started.
4. **Error State**: Informative, non-technical error messaging with clear recovery paths.
5. **Success State**: Meaningful confirmation without disrupting flow.
6. **Destructive / Confirmation State**: Two-step confirmations for irreversible actions.

### Step 6: Define or Extend Design System
- Check existing design tokens in `DESIGN_TOKENS.md`.
- Reuse established color tokens (`oau-navy`, `campus-blue`, `student-gold`, `warm-white`, `deep-slate`, etc.).
- Never introduce an ad-hoc hex code, spacing value, or font size without documented approval.

### Step 7: Plan the Implementation
- Break the work down into atomic, testable sub-tasks.
- Ensure changes maintain complete offline functionality via `localStorage` and zero bundle bloat.

### Step 8: Implement Incrementally
- Build mobile-first (360px–428px viewport).
- Use semantic HTML tags (`<article>`, `<section>`, `<nav>`, `<header>`, `<main>`).
- Implement clear interactive states (`hover`, `active`, `focus-visible`, `disabled`).

### Step 9: Run the Application Locally
- Start the development server using the verified project command (`npm run dev` in `oaumods/`).
- Ensure the server compiles cleanly with zero TypeScript or build errors.

### Step 10: Verify the Browser Experience
- Conduct real runtime verification across mobile (360px–420px) and desktop viewports.
- Check console logs, inspect layout boundaries for overflow, and test actual click/touch interactions.

### Step 11: Review Visual & UX Quality
- Audit typography contrast, visual hierarchy, spacing rhythm, and tap target sizes.
- Verify that copy is human, accurate, and completely free of artificial metrics.

### Step 12: Report Assumptions & Unresolved Issues
- Clearly document what was verified in runtime, what was based on conservative assumptions, and what remains pending.

---

## ✅ Quality Standards Checklist

Before declaring any UI task done, verify:
- [ ] **Mobile-First**: Tested and flawless on a 360px viewport.
- [ ] **WCAG AA/AAA**: Contrast ratio >= 4.5:1 on body text, >= 3:1 on large text.
- [ ] **Touch Targets**: All interactive controls are at least 44x44px.
- [ ] **Accessible Names**: Every button, link, and input has an explicit label or `aria-label`.
- [ ] **No Overflow**: Zero horizontal page scrolling on mobile.
- [ ] **Offline Resilience**: Works without internet connectivity; reads/writes cleanly to `localStorage`.
- [ ] **Authentic Content**: 100% verified OAU campus context; zero synthetic statistics.
