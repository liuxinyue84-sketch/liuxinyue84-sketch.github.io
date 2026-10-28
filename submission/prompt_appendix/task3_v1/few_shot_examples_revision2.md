# Few-Shot Demonstrations — Structural Revision 2

These examples were included in the V1 generation prompt. They encode component and interaction transformations; no example provides personal content or replaces Aria’s V0 facts.

## 1. Long-page chapters

- **Input need:** Visitors should understand the long-scroll sequence and jump to existing sections.
- **Demonstrated output:** A compact, numbered chapter rail immediately beneath the Home hero, linking to Highlights, Projects, and Life, with keyboard-operable anchors and responsive placement. It sits outside the hero image/carousel control area to prevent overlap.
- **Applied in V1:** `index.html` `.chapter-rail`; styles in `v1.css`; checked by `E2E-02b`.

## 2. Carousel scene selection

- **Input need:** A visitor should preview and select a scene instead of using only previous/next arrows.
- **Demonstrated output:** Semantic `figure`/`figcaption`, image thumbnails, a selected state, and synchronized image/caption/counter updates.
- **Applied in V1:** Hero selector markup and `app.js` thumbnail rendering/selection; checked by `E2E-03b`.

## 3. Project stories

- **Input need:** Provide a quick index and make purpose and personal contribution distinguishable.
- **Demonstrated output:** An index of anchored stories, semantic ordered list, asymmetrically arranged paper cards, explicit expandable notes, filters, and persistent saves.
- **Applied in V1:** `index.html` story index and `ol`; `app.js` story renderer; `v1.css` atlas layout; checked by `E2E-04c`, `E2E-04d`, `E2E-04b`, `E2E-05*`, and `E2E-06*`.

## 4. Filtered reflow

- **Input need:** Category changes should not make remaining stories jump abruptly or lose their identity.
- **Demonstrated output:** Preserve the same records and animate their position/opacity during filter reflow.
- **Applied in V1:** `.project-entry` transition and filtering in `app.js`; checked by filter result assertions `E2E-05a`–`E2E-05c`.
