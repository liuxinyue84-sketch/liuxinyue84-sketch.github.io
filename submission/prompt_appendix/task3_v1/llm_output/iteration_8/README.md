# Iteration 8 snapshot — full-bleed editorial (2026-10-27)

Source snapshot of V1 after the author rejected the iteration-7 app shell
("不想要有边框版，很局促" / "也不喜欢旁边放的信息") and chose the full-bleed
magazine direction.

Files: `index.html`, `style.css` (unchanged from V0), `v1.css`, `app.js`, `v1.js`.
`projects.js`, `rag.js`, `knowledge-data.js` and `assets/` are byte-identical to V0 and
are not duplicated here.

- `v1.css` — the app-shell block was cut entirely (lines 347–513 of the previous file);
  everything after that point is the new editorial layer, including the R9b/R9c/R9d/R9e/R9f
  correction passes. The passes are kept in place rather than merged so the review history
  stays readable.
- `app.js` — only two functions differ from the app-shell version: `setActive()` and
  `updateSectionNav()`, plus the `pagehide` guard.
- `v1.js` — `syncPaneBar()` removed; the nav `aria-current` sync is unchanged.

Tests: 35/35 E2E, 48 copy groups with 0 differences. See
`coursework/evaluation/evidence/V1/V1-R9-*`.
