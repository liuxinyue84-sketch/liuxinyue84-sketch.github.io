# Iteration 9 snapshot — Life gallery, compact mosaic (2026-10-27)

Source snapshot of V1 after the author rejected the Life image wall ("太平铺、太大") and asked
for more samples before another attempt.

Files: `index.html`, `style.css` (unchanged from V0), `v1.css`, `app.js`, `v1.js`.
`projects.js`, `rag.js`, `knowledge-data.js` and the photographs are byte-identical to V0 and
are not duplicated here. Two poster frames were added to `assets/` in the live folder
(`life-video-1-poster.jpg`, `life-video-2-poster.jpg`) and are not copied into this snapshot.

- `v1.css` — the R10 layer at the end of the file is the whole change. The iteration-9
  gallery rules (`repeat(4,1fr)`, the `!important` span reset, `aspect-ratio:1.15`) were
  deleted rather than overridden; so were two live scrapbook-era rules (`grid-auto-rows:27px`
  on the wall and the `:nth-child(1..9)` row spans) that silently collapsed the new grid.
- `app.js` — `addGalleryItem()` gained an optional `poster` argument; the two film entries
  pass one. Nothing else changed.
- `v1.js` — untouched.

Tests: 35/35 E2E, 48 copy groups with 0 differences. See
`coursework/evaluation/evidence/V1/V1-R10-*` and `gallery_pattern_sweep.md`.
