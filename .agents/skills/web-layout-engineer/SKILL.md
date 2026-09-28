---
name: web-layout-engineer
description: Engineer resilient, responsive web layouts, container structures, flex/grid systems, mobile viewports (360px-428px), and overflow prevention. Activate whenever structuring pages, adjusting responsive breakpoints, fixing overflow bugs, or engineering layout containers.
---

# Web Layout Engineer Skill

This skill governs the physical structure, grid systems, flexbox hierarchies, and responsive mechanics of all web interfaces in the project. It guarantees that layouts remain resilient, readable, and thumb-friendly across 360px mobile viewports up to large desktop monitors without clipping, awkward wrapping, or horizontal scrolling.

---

## 📱 Mobile-First Realities & Constraints

Obafemi Awolowo University students predominantly access this companion on mobile devices (Android and iOS) under variable conditions. The layout rules are non-negotiable:

1. **Target Viewport**: The core baseline viewport is **360px to 428px**. If an interface does not look impeccable and natural on a 360px screen, it is defective.
2. **Zero Horizontal Overflow**: `overflow-x-hidden` on the outer wrapper is not a fix for broken child element widths. Every child container must be naturally contained (`min-w-0`, `max-w-full`, responsive padding).
3. **No Arbitrary Fixed Heights**: Never apply fixed pixel heights (`h-[300px]`, `h-[500px]`) to content containers containing dynamic text. Always allow natural vertical expansion (`min-h-[...]`, `h-auto`).
4. **Resilient Text Wrapping**: Ensure long course names, hall designations, and email addresses break gracefully using `break-words`, `truncate`, or `overflow-wrap: anywhere`.

---

## 📐 Pre-Implementation Layout Checklist

Before writing layout markup, define these 8 parameters:

| Layout Parameter | Standard Project Specification |
| :--- | :--- |
| **Max Content Width** | `max-w-5xl mx-auto` (bounded, legible, avoiding ultra-wide stretch). |
| **Page Gutters** | `px-4 sm:px-6` (16px on mobile, 24px on tablet/desktop). |
| **Main Layout System** | Flexbox for linear stacks and toolbars; CSS Grid for card collections and 2D matrices. |
| **Section Spacing** | `space-y-6 sm:space-y-8` between distinct primary modules; `gap-4` between cards. |
| **Column Relationships** | Single column (`grid-cols-1`) on mobile $\to$ Dual column (`md:grid-cols-2`) on tablet $\to$ 3 columns (`lg:grid-cols-3`) on desktop where applicable. |
| **Mobile Dock Offset** | `pb-24` on mobile canvas root to ensure the sticky bottom navigation dock never covers content or submit buttons. |
| **Sticky Mechanics** | Top Header: `sticky top-0 z-40 backdrop-blur-md`. Bottom Mobile Dock: `fixed bottom-0 z-40 md:hidden`. |
| **Hit Target Clearance** | Minimum spacing of `gap-2` (8px) between adjacent clickable elements to eliminate accidental taps. |

---

## 🛠️ Layout Patterns & Architecture

### 1. The Standard Application Shell
```tsx
<div className="min-h-screen bg-warm-white dark:bg-[#09101A] text-deep-slate dark:text-zinc-100 flex flex-col pb-24 md:pb-12">
  {/* Sticky Top Header */}
  <header className="sticky top-0 z-40 w-full border-b border-soft-blue-gray dark:border-[#1C2D44] bg-pure-white/90 dark:bg-[#0E1827]/90 backdrop-blur-md">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
      {/* Brand & Status */}
    </div>
  </header>

  {/* Main Viewport Container */}
  <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-6">
    {/* Active Module / Screen */}
  </main>

  {/* Mobile Bottom Dock */}
  <nav className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-pure-white/95 dark:bg-[#0E1827]/95 border-t border-soft-blue-gray dark:border-[#1C2D44] backdrop-blur-lg px-3 py-2">
    {/* Nav Items */}
  </nav>
</div>
```

### 2. The Resilient Responsive Grid
Always protect flex and grid items from expanding beyond parent boundaries:
```tsx
{/* Grid with min-w-0 children to prevent flex text blowouts */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="min-w-0 bg-pure-white dark:bg-[#0E1827] border border-soft-blue-gray dark:border-[#1C2D44] rounded-xl p-4 sm:p-5">
    <h3 className="font-bold text-base text-deep-slate dark:text-zinc-100 truncate">
      Long Course Title That Must Not Break
    </h3>
    <p className="text-xs text-muted-slate dark:text-slate-400 mt-1 break-words">
      Detailed syllabus and prerequisites that wrap gracefully across lines.
    </p>
  </div>
</div>
```

### 3. Absolute Positioning Safeguard
- **Rule**: Absolute positioning (`absolute`, `fixed`) is strictly reserved for:
  - Floating badges / count pills on icons.
  - Modal backdrops and slide-over drawers.
  - Tooltip popovers and sticky navigation docks.
- **Prohibition**: Never use `position: absolute` for structural content cards, text blocks, or columns.

---

## 🔍 Responsive Layout Stress Tests

Before declaring a layout complete, test against these real-world conditions:
1. **Narrow Viewport (360px)**: Open developer tools or resize browser to 360px width. Verify no elements bleed off-screen and no horizontal scrollbar appears.
2. **Text Explosion Test**: Test with extra-long course titles (e.g., *"CHM 101: Introductory Practical Chemistry for Biological & Physical Sciences"*). Ensure titles wrap neatly and do not overlap neighboring badges.
3. **Empty vs. Overloaded State**: Ensure the layout does not collapse awkwardly when an array is empty, nor does it become an unreadable wall when 20 items are loaded.
4. **Virtual Keyboard Emergence**: On mobile form inputs, verify that sticky footers do not cover active input fields when focused.
