# Iteration 11 snapshot — skill disclosures (2026-10-28)

Source snapshot of V1 after the author clicked the four lines in the skills ledger and asked
why nothing opened: "为什么这个点开不能看见具体介绍了".

Files: `index.html`, `style.css` (unchanged from V0), `v1.css`, `app.js`, `v1.js`.
`projects.js`, `rag.js`, `knowledge-data.js` and `assets/` are byte-identical to V0 and are
not duplicated here.

- `index.html` — each of the four `.skill-note` entries is a `button.skill-note-toggle`
  (beads, title, one-line summary) plus a `.skill-detail` panel holding two evidence lines and
  a `.skill-project-link` into the matching project story.
- `v1.css` — the R12 layer at the end covers the disclosure, the panel and the link; R12b
  gives the band's eyebrow, title and footnote their own rows below 980 px, where they had
  been overlapping since iteration 9.
- `v1.js` — toggle handler that keeps `aria-expanded` and `inert` in sync, and the link
  handler that unfolds the project story it jumps to.
- `app.js` — untouched.

Hashes match the shipped files exactly (`index.html` 0aa1782b…), so this snapshot is the
deployed `V1/` package, not a draft. Tests: 35/35 E2E (also run against the live Pages URL),
48 copy groups with 0 differences. See `coursework/evaluation/evidence/V1/V1-R12-*`.
