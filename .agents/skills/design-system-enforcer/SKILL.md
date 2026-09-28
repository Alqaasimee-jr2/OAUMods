---
name: design-system-enforcer
description: Enforce design token discipline, typography scales, color palettes, spacing rhythm, and border-radius rules. Activate whenever styling components, adding CSS variables, refactoring Tailwind utilities, or reviewing visual consistency.
---

# Design System Enforcer Skill

This skill enforces strict adherence to the project's codified design system. It guarantees visual cohesion across all screens, stops the introduction of arbitrary values, and safeguards WCAG contrast and readability.

---

## 🎨 Master Token Authority: The 13 Codified Tokens

All color decisions in this project must derive from [`DESIGN_TOKENS.md`](file:///c:/Users/DELL/Desktop/GUIDE17/DESIGN_TOKENS.md) and the Tailwind CSS v4 `@theme` block in [`oaumods/src/app/globals.css`](file:///c:/Users/DELL/Desktop/GUIDE17/oaumods/src/app/globals.css):

| Token Name | Hex Code | Semantic Role & Approved Usage |
| :--- | :--- | :--- |
| `oau-navy` | `#12345B` | Primary brand headers, hero gradients, institutional insignia, dark mode anchor. |
| `campus-blue` | `#1769AA` | Active navigation tabs, primary CTA buttons, interactive links, focus outlines. |
| `sky-blue` | `#4FA3D1` | Dark mode brand accents, secondary tag text, icon highlights, micro-interactions. |
| `pale-blue` | `#EEF7FC` | Subtle section backgrounds, tab rail container, hover highlights, callout cards. |
| `student-gold` | `#E6AD3C` | Great Ife honorary gold, Quality Points badges, degree honours highlights. |
| `warm-white` | `#FAFCFE` | Light mode canvas root background (glare-free, soft mobile viewport reading). |
| `pure-white` | `#FFFFFF` | Elevated surface cards, course rows, accordion containers, light form controls. |
| `deep-slate` | `#1F2937` | High-contrast WCAG AAA body text, course titles, primary form labels. |
| `muted-slate` | `#64748B` | Secondary captions, subtitle text, operating hints, prerequisite notes. |
| `soft-blue-gray`| `#D9E6F0` | Hairline dividers, card borders, table separators, input boundaries. |
| `fresh-green` | `#25855A` | First Class classifications, completed clearance checkmarks, online pills. |
| `amber-warn` | `#C88719` | Manila folder alerts, 2:2 / 3rd class standing, minimum credit underload notices. |
| `soft-red` | `#C94B4B` | Academic probation warnings, credit overload alerts (>24 units), scam warnings. |

---

## 📐 The Design System Dimension Matrix

Whenever creating or styling a component, ensure alignment across these 14 dimensions:

### 1. Typography & Font Family
- **Font Stack**: Native system font stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu...`). Clean, fast, zero network latency.
- **Hierarchy Scale**:
  - `h1`: `text-xl sm:text-2xl font-black tracking-tight text-oau-navy dark:text-sky-blue`
  - `h2`: `text-base sm:text-lg font-bold text-deep-slate dark:text-zinc-100`
  - `h3`: `text-sm sm:text-base font-semibold text-deep-slate dark:text-zinc-200`
  - Body: `text-xs sm:text-sm text-deep-slate dark:text-zinc-200 leading-relaxed`
  - Caption / Meta: `text-[11px] sm:text-xs text-muted-slate dark:text-slate-400 font-medium`
- **Text Width Constraints**: Cap reading lines at `max-w-prose` (60–75 characters) to preserve readability.

### 2. Surfaces & Dark Mode Mapping
- **Light Mode**:
  - Root Canvas: `bg-warm-white` (`#FAFCFE`)
  - Elevated Cards: `bg-pure-white` (`#FFFFFF`) with border `border-soft-blue-gray` (`#D9E6F0`)
  - Subtle Wells / Tabs: `bg-pale-blue` (`#EEF7FC`)
- **Dark Mode**:
  - Root Canvas: `dark:bg-[#09101A]` (Deep Midnight)
  - Elevated Cards: `dark:bg-[#0E1827]` (Navy Charcoal) with border `dark:border-[#1C2D44]`
  - Subtle Wells: `dark:bg-[#122033]` (Muted Blue Slate)

### 3. Spacing Scale & Container Layout
- **Rhythm**: Multiples of 4px / 0.25rem (`gap-1.5` = 6px, `gap-2` = 8px, `gap-3` = 12px, `gap-4` = 16px, `gap-6` = 24px).
- **Max Width**: Standardized at `max-w-5xl mx-auto px-4 sm:px-6`.
- **Vertical Padding**: Standardized page bottom padding `pb-24 md:pb-12` ensuring mobile navigation dock clearance.

### 4. Border Radius Scale
Strictly adhere to this 4-step radius hierarchy:
- `rounded-md` (6px): Tag pills, small badges, and table item rows.
- `rounded-lg` (8px): Form inputs, standard buttons, and small dropdowns.
- `rounded-xl` (12px): Standard cards, modal dialogs, and navigation rail containers.
- `rounded-2xl` (16px): Large hero cards, dial wrappers, and primary feature panels.
- *Prohibition*: Do not invent arbitrary radii like `rounded-[14px]` or randomly mix `rounded-none` and `rounded-3xl`.

### 5. Elevation & Shadows
- Use subtle, diffused shadows that do not muddy dark mode:
  - Default Cards: `shadow-xs border border-soft-blue-gray dark:border-[#1C2D44]`
  - Elevated CTA: `shadow-sm shadow-campus-blue/20`
  - Floating Docks: `shadow-lg shadow-black/5 dark:shadow-black/40`
- *Prohibition*: Avoid harsh `shadow-2xl` or multi-layer glow effects unless explicitly indicating active focus.

### 6. Interactive Controls & Hit Targets
- **Minimum Target Size**: All touch-interactive controls (buttons, checkboxes, tab triggers) must have a clickable area of at least **44px × 44px** on mobile.
- **Focus Rings**: Every interactive element must define visible focus states:
  - `focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-campus-blue dark:focus-visible:ring-sky-blue focus-visible:ring-offset-2`

### 7. Breakpoints & Grid System
- Standard mobile-first breakpoints:
  - `sm: 640px` (Small tablets & landscape phones)
  - `md: 768px` (Tablets / small laptops)
  - `lg: 1024px` (Desktops)
- Default grid layouts: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`.

### 8. Z-Index Conventions
- Base Content: `z-0`
- Sticky In-Page Headers: `z-10`
- Sticky Navigation Rail / Mobile Dock: `z-40`
- Modals, Drawers & Overlays: `z-50`
- Toasts & Alert Banners: `z-60`

---

## 🚫 Enforcement Rules

1. **Zero Ad-Hoc Hex Codes**: Never introduce arbitrary hex codes (e.g., `#3b82f6`, `#475569`, `#10b981`) in component files. Always use the registered token classes (`bg-campus-blue`, `text-muted-slate`, `bg-fresh-green`).
2. **Token Extension Protocol**: If a new color or token is genuinely required, you must:
   - Propose it explicitly in `DESIGN_TOKENS.md`.
   - Register it in `globals.css` under `@theme`.
   - Provide both light and dark mode mappings.
   - Verify WCAG contrast before using it.
