# OAUMods feedback form setup

The full student feedback page is available at `/feedback`. Across the rest of the app, the floating **Feedback** shortcut opens a small page-specific feedback panel; students can rate the current page and optionally add a short comment without leaving it. The full page remains available for detailed reports, corrections, and feature suggestions.

## Formspree configuration

The form submits directly from the browser to Formspree. By default it uses the current endpoint ID in `src/app/feedback/page.tsx`. To configure a different Formspree form, set this **public form endpoint** before building/deploying:

```env
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
```

Set it in the `oaumods` app's local environment (for local testing) or the deployment project's environment settings, then rebuild/redeploy. The value is sent to the browser, so it must contain only the public Formspree form endpoint—not a password, private API key, or other secret. If unset, the existing endpoint is used.

1. Confirm the endpoint belongs to the OAUMods project in Formspree.
2. Confirm the Formspree form is active and its destination email is verified.
3. Submit a test from the deployed `/feedback` page.
4. Check Formspree's submissions dashboard and destination inbox, including spam.
5. Simulate a failed request and confirm the page shows an error instead of a success message.
6. Confirm a request that takes longer than 15 seconds times out with a retryable error.
7. Confirm the page only displays success when Formspree returns a successful JSON response (`ok: true`).

No GitHub token, GitHub issue integration, or server-side environment variable is used by this implementation. Do not add secrets to client-side code.

## What feedback collects

The floating page-feedback panel collects:

- A required helpful / not helpful rating
- An optional comment (up to 500 characters)
- The current page path (pathname only; query strings are not included)
- A source label identifying the floating panel

The full `/feedback` page collects:

- Feedback category
- Message (12–2,000 characters)
- Optional page or campus place
- Optional 1–5 rating

Neither experience asks for a name or email. Both use a hidden honeypot field to discourage basic automated spam. Do not ask students to include passwords or sensitive personal information.

## Smoke-test checklist

1. On a page other than `/feedback`, open the floating **Feedback** panel and confirm it appears without navigating away.
2. Confirm keyboard users can reach the rating buttons, see focus indicators, and close the panel with Escape; focus should return to the shortcut.
3. Confirm a rating is required, the comment is optional, and the comment is limited to 500 characters.
4. Submit a rating with and without a comment; confirm Formspree receives the rating, current pathname, and source label.
5. Simulate a network failure and a request timeout; confirm an error is shown and the student can retry.
6. Navigate to another page while the panel is open; confirm it closes and does not reopen unexpectedly when returning to the previous page.
7. Confirm the floating shortcut is hidden on `/feedback`.
8. Visit `/feedback` on a phone-sized viewport.
9. Confirm category cards and star rating work with touch and keyboard.
10. Submit a message shorter than 12 characters; it should be blocked.
11. Submit a valid test message and confirm it appears in Formspree.
12. Confirm a filled honeypot never displays the success message.
13. Confirm network failures and timeouts show an error and allow retrying.
14. Confirm an HTTP-success response without Formspree's `ok: true` confirmation is not shown as successful.
