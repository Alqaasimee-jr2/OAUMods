# OAUMods Official Design Tokens & Color Palette

This document defines the official, codified color system and design tokens for the **Great Ife Freshman Companion (OAUMods)**. All frontend modules, subcomponents, and future iterations must strictly adhere to these color mappings.

---

## 🎨 Master Color Palette

| Role | Name | Hex | CSS Variable / Utility | Intended Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Brand primary** | **OAU Navy** | `#12345B` | `--color-oau-navy` / `bg-oau-navy`, `text-oau-navy` | Main institutional headings, hero banner gradient anchor, primary brand logo, dark contrast elements. |
| **Interactive blue** | **Campus Blue** | `#1769AA` | `--color-campus-blue` / `bg-campus-blue`, `text-campus-blue` | Active navigation tabs, primary CTA buttons, interactive links, focused state outlines, progress highlights. |
| **Friendly accent** | **Sky Blue** | `#4FA3D1` | `--color-sky-blue` / `bg-sky-blue`, `text-sky-blue` | Secondary highlights, pill indicators, dark-mode accessible accents, icons, and micro-animations. |
| **Soft section background** | **Pale Blue** | `#EEF7FC` | `--color-pale-blue` / `bg-pale-blue`, `border-pale-blue` | Sub-nav bar background, subtle card containers, accordion header hover tints, information callout cards. |
| **Warm accent** | **Student Gold** | `#E6AD3C` | `--color-student-gold` / `bg-student-gold`, `text-student-gold` | Great Ife honorary gold, Quality Points badges, degree classification highlights, 1-tap quick loader accents. |
| **Page background** | **Warm White** | `#FAFCFE` | `--color-warm-white` / `bg-warm-white` | Light mode root canvas background (soft, clean, glare-free on mobile viewports). |
| **Card background** | **Pure White** | `#FFFFFF` | `--color-pure-white` / `bg-pure-white` | Elevated surface cards, course rows, faculty accordion containers, input backgrounds in light mode. |
| **Main text** | **Deep Slate** | `#1F2937` | `--color-deep-slate` / `text-deep-slate` | Primary headings, course titles, degree names, form labels (optimized for AAA WCAG readability). |
| **Secondary text** | **Muted Slate** | `#64748B` | `--color-muted-slate` / `text-muted-slate` | Subtitles, location descriptions, operating hours, prerequisite bullet notes. |
| **Borders** | **Soft Blue Gray** | `#D9E6F0` | `--color-soft-blue-gray` / `border-soft-blue-gray` | Subtle hairline borders, card dividers, table separators, input field boundaries. |
| **Success** | **Fresh Green** | `#25855A` | `--color-fresh-green` / `bg-fresh-green`, `text-fresh-green` | First Class Honours classification, cleared clearance stage checkmarks, positive projection notifications. |
| **Warning** | **Amber** | `#C88719` | `--color-amber-warn` / `bg-amber-warn`, `text-amber-warn` | Statutory credit underload notice, second class lower indicators, pale yellow Manila file alert badges. |
| **Error** | **Soft Red** | `#C94B4B` | `--color-soft-red` / `bg-soft-red`, `text-soft-red` | Academic probation warnings, credit overload alerts (>24 units), anti-scam shield banners, delete buttons. |

---

## 🌓 Dark Mode Mapping Matrix

| Role | Light Mode Value | Dark Mode Surface | Dark Mode Text / Border |
| :--- | :--- | :--- | :--- |
| **Page Canvas** | `#FAFCFE` (Warm White) | `#09101A` (Deep Midnight) | — |
| **Elevated Cards** | `#FFFFFF` (Pure White) | `#0E1827` (Navy Charcoal) | `border: #1C2D44` |
| **Soft Container** | `#EEF7FC` (Pale Blue) | `#122033` (Muted Blue Slate)| — |
| **Primary Brand Text** | `#12345B` (OAU Navy) | `#4FA3D1` (Sky Blue) / `#FFFFFF` | — |
| **Interactive Blue** | `#1769AA` (Campus Blue)| `#38BDF8` (Bright Azure) | — |
| **Primary Headings** | `#1F2937` (Deep Slate) | `#F1F5F9` (Crisp Light Slate) | — |
| **Secondary Text** | `#64748B` (Muted Slate)| `#94A3B8` (Soft Gray) | — |

---

## 💻 Tailwind CSS v4 Theme Registration

Located in [`oaumods/src/app/globals.css`](file:///c:/Users/DELL/Desktop/GUIDE17/oaumods/src/app/globals.css):

```css
@import "tailwindcss";

@theme {
  --color-oau-navy: #12345B;
  --color-campus-blue: #1769AA;
  --color-sky-blue: #4FA3D1;
  --color-pale-blue: #EEF7FC;
  --color-student-gold: #E6AD3C;
  --color-warm-white: #FAFCFE;
  --color-pure-white: #FFFFFF;
  --color-deep-slate: #1F2937;
  --color-muted-slate: #64748B;
  --color-soft-blue-gray: #D9E6F0;
  --color-fresh-green: #25855A;
  --color-amber-warn: #C88719;
  --color-soft-red: #C94B4B;
}
```
