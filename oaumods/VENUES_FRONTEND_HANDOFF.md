# Campus Places & Reviews — Frontend Handoff

This PR adds the presentation layer only. It does not add a database, authentication, API routes, image uploads, moderation, or persistent review submission.

## Routes

- `/venues` — searchable and filterable directory.
- `/venues/[slug]` — venue detail, rating summary, review list and review form prototype.

## Current preview data

- `src/data/venues.ts` contains typed illustrative records used by the UI.
- All venue names, ratings, review counts and comments are placeholders. They are not verified campus listings or actual student submissions.
- Replace `sampleVenues` with API-backed data once the backend contract is agreed.

## Suggested backend contract

The frontend will need:
- `GET /api/venues?query=&category=` — list and filter venues.
- `GET /api/venues/:slug` — venue details and rating summary.
- `GET /api/venues/:id/reviews` — paginated reviews.
- `POST /api/venues/:id/reviews` — authenticated student review submission.

Suggested response fields for a venue: `id`, `slug`, `name`, `category`, `location`, `description`, `priceLabel`, `averageRating`, `reviewCount`, `highlights`, and optional image URL.

Suggested review fields: `id`, `studentDisplayName`, `rating`, `comment`, and `createdAt`.

The backend should own validation, authentication, duplicate-review policy, moderation, rate limiting, report handling, and rating aggregation. Do not trust client-supplied student IDs or rating totals.

## Integration notes

- The review form currently shows an explicit preview-only notice and does not send or store data.
- The visual cards use initials/colour blocks rather than fabricated venue photography.
- Category filtering and search are client-side against sample records for demonstration.
- The directory uses the existing portal layout and shared OAUMods Tailwind theme. No global CSS changes are required.
