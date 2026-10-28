# Iteration 10 snapshot — cover plate (2026-10-28)

Source snapshot of V1 after the author sent a crop of the hero photograph with "不要这里",
asking for the caption bar, thumbnail strip and round arrows to stop sitting on the picture.

Files: `index.html`, `style.css` (unchanged from V0), `v1.css`, `app.js`, `v1.js`.
`projects.js`, `rag.js`, `knowledge-data.js` and `assets/` are byte-identical to V0 and are
not duplicated here.

- `index.html` — the `<figure class="hero-art">` now contains only the image, the stamp and
  the round "next" link. `.cover-visual` wraps it together with the new `.cover-plate`, which
  carries `#art-caption-text`, `#art-counter`, `#art-dots`, `#art-prev` and `#art-next`.
- `v1.css` — the R11 layer at the end is the whole change, plus the deletion of seven rules
  that only ever matched the old overlay.
- `app.js` — `showScene()` no longer injects `<img>`/`<span>` into each dot, and the counter
  prints `01 / 03` without the em dash.
- `v1.js` — untouched.

Tests: 35/35 E2E, 48 copy groups with 0 differences. See
`coursework/evaluation/evidence/V1/V1-R11-*`.
