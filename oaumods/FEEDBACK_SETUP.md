# OAUMods Feedback System & Backend Delivery Setup

The OAUMods feedback system features two complementary entry points:
1. **Contextual Floating Panel (`FeedbackShortcut.tsx`)**: Appears floating in the bottom-right corner across pages (except `/feedback`). Allows students to rate pages (`Helpful` / `Not helpful`) and leave optional comments (up to 500 characters) without interrupting their reading.
2. **Dedicated Feedback Portal (`/feedback`)**: Full-page form for categorised input:
   - General feedback
   - Problem/bug reporting
   - Feature suggestions
   - Campus ground-truth corrections (places, fees, hours)

Both client components submit to the internal serverless API route:
```http
POST /api/feedback
```

---

## 🚀 Receiving Feedback Submissions (Backend Options)

The Next.js backend (`/api/feedback`) securely handles validation, honeypot spam protection, and dispatches submissions to the Project Lead via your choice of backend channels:

### Option 1: Instant Discord / Slack Push Notifications (Recommended)
Receive instant push notifications on your phone or desktop whenever a student submits feedback.

1. In Discord: Go to **Server Settings** > **Integrations** > **Webhooks** > **New Webhook**. Copy the Webhook URL.
   *(Or in Slack: Create an Incoming Webhook in your Slack workspace).*
2. Add this environment variable in your local `.env.local` or on your Vercel project dashboard:
   ```env
   FEEDBACK_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN
   ```
3. Submissions will automatically arrive as rich embed cards displaying the category, rating, location, student comment, and timestamp.

### Option 2: Direct Email to Your Inbox via Resend
Receive feedback directly in your personal or administrative email:

1. Sign up for a free account at [resend.com](https://resend.com) and get an API key.
2. Add these environment variables in Vercel:
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxx
   FEEDBACK_RECIPIENT_EMAIL=your-email@gmail.com
   ```

### Option 3: Formspree Email Forwarding (Server-Side Proxy)
If you prefer Formspree email digests:
1. Set:
   ```env
   FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
   ```
2. The backend proxies submissions server-to-server. This completely eliminates client ad-blocker interference, CORS issues, and protects your form endpoint from public scraping.
*(If unset, it falls back to the default OAUMods Formspree endpoint).*

### Option 4: Serverless Runtime Logs
If no external webhook or email service is configured (e.g. during local offline development), submissions are cleanly formatted and logged to `console.info` in the server terminal and Vercel runtime logs.

---

## 🔒 Privacy & Ground-Truth Protection
- **Zero PII Required**: No student name, matric number, password, or student email is requested.
- **Honeypot Shield**: Includes a hidden field (`website`) that rejects automated bot submissions with `HTTP 400`.
- **Character Boundaries**: Messages are capped at 2,000 characters and location inputs at 200 characters.

---

## 🧪 Verification & Smoke-Test Checklist

1. **Floating Shortcut Test**:
   - Open any page (e.g. `/halls` or `/map`).
   - Click **Feedback**. Confirm the panel opens without navigating away.
   - Press <kbd>Escape</kbd>; confirm it closes and returns focus to the trigger button.
   - Choose **Helpful**, add an optional comment, and click **Send feedback**.
   - Confirm the success state appears.
2. **Full Page Test**:
   - Visit `/feedback` on mobile viewport (360px–420px).
   - Select a category, enter feedback (>12 characters), and submit.
   - Confirm success banner displays.
3. **Backend Delivery Check**:
   - Check your Discord channel, email inbox, or Vercel Function logs to verify receipt of the submission payload.
