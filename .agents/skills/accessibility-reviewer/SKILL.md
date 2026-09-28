---
name: accessibility-reviewer
description: Audit interfaces for accessibility (WCAG 2.1 AA/AAA compliance), keyboard navigation, screen reader support, color contrast, and touch target sizes. Activate whenever building or reviewing forms, interactive controls, dialogs, color changes, or navigation systems.
---

# Accessibility Reviewer Skill

This skill enforces strict accessibility standards (WCAG 2.1 Level AA and AAA where feasible). It guarantees that all students—regardless of physical ability, device capability, or lighting conditions—can navigate, interact with, and benefit from the Great Ife Freshman Companion.

---

## 🚫 Absolute Accessibility Prohibitions

1. **Never ship icon-only buttons without accessible text**: Every button containing only an icon (e.g., `<button><TrashIcon /></button>`) must have an `aria-label="Delete course"` or visually hidden text (`<span className="sr-only">Delete course</span>`).
2. **Never strip focus outlines without a replacement**: Removing `:focus` or `focus:outline-none` without providing a high-contrast `focus-visible:ring-2` is strictly forbidden.
3. **Never convey status purely through color**: A green border or red text alone is insufficient; pair it with an icon, badge text, or descriptive text indicator.
4. **Never create non-interactive elements with click handlers**: `<div onClick={...}>` or `<span onClick={...}>` must never be used for clickable actions. Always use `<button type="button">` or `<a href="...">`.
5. **Never ship unlabelled form inputs**: Every `<input>`, `<select>`, and `<textarea>` must have an associated `<label htmlFor="...">` or explicit `aria-label`.
6. **Never trap keyboard focus**: Modals and dropdowns must allow keyboard escape (`Escape` key) and circular tab trapping where appropriate.

---

## 📋 The 16-Point Accessibility Audit Matrix

Evaluate every screen and component against this 16-point checklist:

### 1. Semantic HTML Structure
- Uses native HTML landmarks: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`.
- Lists are marked with `<ul>`, `<ol>`, and `<li>`.

### 2. Logical Heading Hierarchy
- Exactly one `<h1>` per page (e.g., `"OAUMods — Great Ife Freshman Companion"`).
- Headings descend sequentially: `<h1>` $\to$ `<h2>` $\to$ `<h3>`. Never skip from `<h1>` to `<h3>` for styling purposes.

### 3. Accessible Form Controls
- All inputs possess an explicit `<label>` connected via `htmlFor` and `id`.
- Helper text or error text is linked to inputs via `aria-describedby="[id]"`.
- Required fields are declared with `required` and `aria-required="true"`.

### 4. Visible Focus Indicators
- All interactive elements show a clean, high-contrast focus ring when navigated via keyboard:
  `focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-campus-blue dark:focus-visible:ring-sky-blue focus-visible:ring-offset-2`

### 5. Full Keyboard Operability
- All clickable features are reachable and actionable using `Tab`, `Shift+Tab`, `Enter`, and `Space`.
- Tab rails support arrow key navigation (`ArrowLeft`, `ArrowRight`) or intuitive linear tabs.

### 6. Color Contrast Ratios (WCAG 2.1)
- **Body Text**: Minimum contrast ratio of **4.5:1** against its background in both light and dark modes.
- **Large Text (>= 18pt or 14pt bold)**: Minimum contrast ratio of **3.0:1**.
- **UI Components & Borders**: Minimum contrast ratio of **3.0:1** against adjacent backgrounds.

### 7. Non-Color Status Indicators
- First Class classification: Green color + GraduationCap icon + explicit "First Class" text badge.
- Academic Probation: Soft red color + AlertTriangle icon + explicit warning banner.
- Clearance Completed: Green checkbox + checkmark icon + strike-through / "Cleared" badge.

### 8. Touch Target Dimensions
- All interactive controls (buttons, pills, tabs, checkboxes) must measure at least **44px × 44px** on touch screens or include sufficient padding to satisfy the target boundary.

### 9. Reduced Motion Respect
- Animations and transitions must respect user system preferences:
  `@media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }`

### 10. Modal & Dialog Mechanics
- Opening a modal moves focus to the modal container.
- Pressing `Escape` closes the modal and returns focus to the trigger button.
- Background scrolling is locked while modal is open (`overflow: hidden`).

### 11. Tablist ARIA Semantics
- Tab containers use `role="tablist"`.
- Individual tabs use `role="tab"`, `aria-selected="true|false"`, and `aria-controls="panel-[id]"`.
- Active content panel uses `role="tabpanel"` and `aria-labelledby="tab-[id]"`.

### 12. Screen Reader Live Announcements
- Dynamic calculation updates (e.g., recalculated GPA, clearance counter) use `aria-live="polite"` so screen reader users hear updates without jarring interruptions.

### 13. Image Alt Attributes
- Informative graphics must have descriptive `alt` text.
- Decorative SVGs and Lucide icons must have `aria-hidden="true"`.

### 14. Responsive Text Scaling
- Layouts must tolerate browser text zooming up to 200% without overlapping text, broken cards, or clipped buttons.

### 15. Link & Anchor Clarity
- Links must not be labeled simply "Click here" or "More". Use descriptive anchor text: `"View OAU Student Handbook PDF"`.

### 16. Touch Target Spacing
- Adjacent interactive buttons must have a minimum physical separation of 8px (`gap-2`) to avoid fat-finger mis-taps on mobile viewports.

---

## 🛠️ Accessibility Sign-Off Standard

No pull request or feature branch may be finalized without passing:
- [ ] Keyboard navigation smoke test (`Tab`, `Enter`, `Escape`).
- [ ] Automated accessibility check (zero WCAG violations).
- [ ] Visual verification of focus rings in both light and dark modes.
- [ ] Verification of all `aria-label` tags on icon buttons.
