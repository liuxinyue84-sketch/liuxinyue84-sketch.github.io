# Aria’s Sky Journal · V1

V1 is an independent branch copied from the frozen `coursework/website/V0/` baseline, then refined through an In-context Few-Shot Learning generation prompt. It does not inherit from V2 or any older `outputs/aria-v1` draft. Personal text, project facts, education, media, and source corpus are inherited from V0; no reference-site personal content was used.

## Open locally

Double-click `index.html`, or run `python3 -m http.server 8000` in this directory and visit `http://localhost:8000`. The embedded course-note corpus supports the RAG chat from `file://` as well as HTTP.

## V1 changes

- **Iteration 12 skill disclosures (2026-10-28):** the four lines in the skills ledger looked clickable — a row of four beads with one filled reads as a carousel page — and answered nothing; the only live control was the tool chips below. Each line is now a button that unfolds a hairline panel underneath: two lines of evidence drawn from the projects already on the page, plus a link into the matching project story that also unfolds that story. The `＋` at the row's right edge rotates when open, the folded panel is `inert`, and the resting copy is unchanged character for character. The band's eyebrow no longer prints through its own headline below 980 px.
- **Iteration 11 cover plate (2026-10-28):** the caption bar, the three photo thumbnails and the two round arrows were sitting on top of the hero photograph and covered the sitter. The picture now carries only itself and its stamp; the caption, the scene counter and the switcher moved onto a hairline underneath the frame, aligned to the photo's left edge. The thumbnails — 82 × 47 px, showing nothing legible — became three two-pixel rules, and the counter lost its leading em dash now that it no longer trails a caption. Scene switching by keyboard, by clicking the photograph and by arrow still works.
- **Iteration 10 image wall (compact mosaic):** the Life wall was rejected on review as "太平铺、太大" — nine equal tiles at 340 × 296 px in four columns, ~950 px tall, with the closing film stranded alone in the last row. It is now eight 267 × 178 tiles in two bands of four, with the 2:3 double-bass portrait pinned across both bands at 267 × 400 (the only tile shown uncropped). The wall is 420 px tall and flush on the right at every breakpoint; captions sit under each frame in tracked caps instead of over a gradient; the two films ship captured poster frames so a tile is never an empty rectangle. Composition study and rejected candidates: `coursework/prompt_appendix/task3_v1/gallery_pattern_sweep.md`.
- **Iteration 9 skeleton rebuild (full-bleed editorial):** the iteration-7 app shell was removed at review — a framed window and a profile rail made the page feel boxed in. V1 now runs edge to edge on a single hairline grid: a one-line top bar (wordmark, five labels, music toggle) with a sliding underline instead of a pill, a cover spread whose photograph bleeds off the right edge, oversized display type, and sections separated by hairlines rather than cards. Education entries are wide rows, the image wall runs to both edges, and the guestbook is an open letter on rules. Nothing is bordered, rounded or shadowed at page level; the sky photograph is confined to the cover so body copy sits on a plain paper tone. Below 981 px the cover stacks with the headline first and the photo still bleeds right.
- **Iteration 7 app shell (removed in iteration 9, kept here for the record):** a persistent profile rail carried the identity, four facts, five numbered sections and the music player, beside a bounded content window that named the current section (`HOME · 01 / 05`) and owned its own scroll.
- **Iteration 5 component rebuild:** Home is composed as an editorial journal cover with an illustration carousel and chapter rail; Highlights is an academic folio with an education journey, skill ledger, and knowledge workbench; Projects is a numbered index plus semantic story articles; Life pairs a letter with a varied media atlas; Guestbook uses an open-postcard/writing-desk shell. These shells and layouts differ substantially from V0's flat sections.
- **Iteration 6 usability corrections:** chapter and project indices now name their destinations; carousel thumbnails moved off the main image (the last of them were removed in iteration 11); both education entries and photos open their matching details with a visible action hint; opening one project leaves adjacent cards folded and compact.
- All personal/business copy, project fields, education facts, awards, course names, guestbook labels, media captions, and carousel scene descriptions are compared against V0. No V0 business copy has been rewritten. Evidence is in `coursework/evaluation/evidence/V1/V1-R12-content-parity.json` (48 copy groups, 0 differences).
- The V1 few-shot patterns abstract composition and interaction from reviewed references only. No reference text, identity, or media is included. The full prompt, pattern examples, source snapshots, change log, screenshots, and raw E2E JSON are retained under `coursework/prompt_appendix/task3_v1/` and `coursework/evaluation/`.
- V1 preserves the course-note retrieval experience and adds a relevance/confidence gate before returning an excerpt; out-of-scope questions receive the existing no-evidence message. The chat quotes retrieved notes and cites the source; it does not call an LLM or synthesize answers.
- Existing carousel thumbnails, project filters/details/favorites, media previews, guestbook behavior, keyboard access, visible focus, and reduced-motion support remain.

## Files

- `index.html`, `style.css`, `app.js`, `projects.js`, `rag.js`, `knowledge-data.js`, `v1.js`, `v1.css`: V0-derived files plus the V1 shell; every change is documented in `coursework/prompt_appendix/task3_v1/`.
- `MANIFEST.sha256` — hashes of the shipped V1 files, regenerated for iteration 12.
- `v1.css`, `v1.js`: V1-only presentation and accessible state refinements.
- `assets/`, `knowledge/`: copied static resources and the same course-note corpus as V0.

The matching SHA-256 manifest and generation record are stored in the coursework archive. Public deployment URL: https://liuxinyue84-sketch.github.io/V1/. The Pages package is additive under `/V1/`; the frozen V0 root remains the homepage.

### Life media scrapbook wall (V1 iteration 4)

The Life section keeps its original seven photos, two videos, labels, and native media preview. V1 arranges those same items in a responsive asymmetric paper-edged wall and adds two original inline SVG marginalia marks. Use Tab to focus a tile, Enter/Space to open it, and Escape to close the preview. The drawings are decorative and hidden from screen readers.
