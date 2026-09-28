---
name: browser-verification
description: Perform live runtime browser testing, console error audits, responsive viewport checks (360px mobile to desktop), and interaction QA. Activate whenever completing frontend changes, verifying bug fixes, or validating a feature before sign-off.
---

# Browser Verification Skill

This skill enforces mandatory runtime verification. **Static code inspection is never sufficient to declare a feature working.** The application must be executed in a live browser session, tested across target viewports, and audited for runtime errors and layout anomalies.

---

## 🚫 The Cardinal Verification Rule

> **Never state that a user-facing feature works based solely on reading the code or seeing a clean build.**
> You must run the development server, navigate to the route in a browser instance, perform the user action, and verify the resulting DOM and visual presentation.

---

## 🧪 The 16-Step Browser QA Protocol

Whenever verifying an interface change, complete every step of this 16-step protocol:

### Step 1: Start Application Server
- Launch the development server using the verified project command:
  `npm run dev` inside `oaumods/`
- Ensure compilation succeeds with zero TypeScript or PostCSS errors.

### Step 2: Open Affected Route
- Direct browser subagent or headless browser to the target URL (e.g., `http://localhost:3000` or assigned dev port).

### Step 3: Test Primary User Flow
- Execute the single most important user action (e.g., calculating GPA with 5 courses, toggling a clearance checklist step).
- Confirm that the UI updates immediately and reflects the expected calculation or state change.

### Step 4: Test Secondary Flow
- Execute auxiliary actions (e.g., filtering campus transit routes, loading a faculty course template, copying emergency contacts).

### Step 5: Test Empty State
- Clear data or launch with blank initial state.
- Verify that the empty state renders helpful guidance and clear calls-to-action without crashing or displaying blank cards.

### Step 6: Test Loading State
- Simulate network delay or storage fetch if applicable. Verify that loading skeletons or indicators appear without jarring layout shifts.

### Step 7: Test Error State
- Provide invalid inputs (e.g., negative units, invalid grades, exceeding credit limits).
- Verify that validation errors appear inline, clearly describe the problem, and guide recovery.

### Step 8: Test Permission / Prerequisite State
- Attempt an action where prerequisites are not met (e.g., accessing accommodation before clearance).
- Verify disabled states and informational tooltips/callouts.

### Step 9: Test Desktop Viewport
- Set browser window to standard desktop dimensions (1280px × 800px).
- Verify container centering (`max-w-5xl`), padding, header alignment, and readability.

### Step 10: Test Mobile Viewport (Critical)
- Resize browser window to **360px × 740px** and **390px × 844px**.
- Inspect for any horizontal scrollbar (`document.documentElement.scrollWidth > window.innerWidth`).
- Verify that the bottom mobile navigation dock remains visible, functional, and does not obstruct content.

### Step 11: Test Keyboard Interaction
- Using `Tab`, navigate through all interactive controls.
- Verify that focus rings are clearly visible and that `Enter` / `Space` activate the intended buttons.

### Step 12: Check Browser Console Errors
- Inspect browser developer console.
- **Rule**: There must be **zero runtime exceptions, unhandled Promise rejections, or React key warnings**.

### Step 13: Check Network & Offline Resilience
- Disconnect network or simulate offline mode.
- Verify that local features (GPA calculation, clearance progress saved in `localStorage`, campus guides) continue functioning completely offline.
- Verify that the header status pill accurately reflects the "Offline" status.

### Step 14: Check Layout Boundaries & Overflow
- Inspect all cards, tables, and pill tags.
- Confirm zero text clipping, zero awkward word wrapping, and zero cut-off shadows.

### Step 15: Check Assets & Icons
- Verify that all Lucide icons render sharply.
- Verify zero broken image icons or 404 image requests.

### Step 16: Check Data Persistence
- Refresh the browser page (`F5` or `location.reload()`).
- Verify that user inputs and checklist states persist accurately via `localStorage`.

---

## 📊 Standard Verification Report Format

Every verification task must conclude with a formal report categorizing all tested elements into one of four verified states:

```markdown
## 📋 Browser Verification Report

**Target URL / Route**: `http://localhost:3050`  
**Test Viewports**: Mobile (360px, 390px) & Desktop (1280px)  
**Session Date**: [YYYY-MM-DD]

### 1. Verification Classification Table
| Feature / State | Classification | Evidence / Notes |
| :--- | :--- | :--- |
| **Primary Flow** | [VERIFIED / PARTIALLY VERIFIED / NOT VERIFIED / BLOCKED] | Description of verified behavior |
| **Secondary Flow** | [VERIFIED / PARTIALLY VERIFIED / NOT VERIFIED / BLOCKED] | Description of verified behavior |
| **Empty State** | [VERIFIED / PARTIALLY VERIFIED / NOT VERIFIED / BLOCKED] | Description of verified behavior |
| **Error Handling** | [VERIFIED / PARTIALLY VERIFIED / NOT VERIFIED / BLOCKED] | Description of verified behavior |
| **Mobile (360px)** | [VERIFIED / PARTIALLY VERIFIED / NOT VERIFIED / BLOCKED] | Confirmed zero horizontal overflow |
| **Console Logs** | [VERIFIED / PARTIALLY VERIFIED / NOT VERIFIED / BLOCKED] | Zero errors or unhandled warnings |
| **Persistence** | [VERIFIED / PARTIALLY VERIFIED / NOT VERIFIED / BLOCKED] | Checked state persists on reload |

### 2. Classification Definitions
- **VERIFIED**: Executed in live browser; DOM inspection and visual proof confirm 100% adherence to criteria.
- **PARTIALLY VERIFIED**: Core behavior verified, but edge case or specific viewport pending inspection.
- **NOT VERIFIED**: Code written and compiled, but runtime browser inspection not yet performed.
- **BLOCKED**: Runtime execution halted by environmental failure, missing dependency, or system error.
```
