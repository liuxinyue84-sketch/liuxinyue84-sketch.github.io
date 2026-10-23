# Aria’s Sky Journal · V1

V1 is an independent branch copied from the frozen `coursework/website/V0/` baseline, then refined through an In-context Few-Shot Learning generation prompt. It does not inherit from V2 or any older `outputs/aria-v1` draft. Personal text, project facts, education, media, and source corpus are inherited from V0; no reference-site personal content was used.

## Open locally

Double-click `index.html`, or run `python3 -m http.server 8000` in this directory and visit `http://localhost:8000`. The embedded course-note corpus supports the RAG chat from `file://` as well as HTTP.

## V1 changes

- **Iteration 5 component rebuild:** Home is composed as an editorial journal cover with an illustration carousel and chapter rail; Highlights is an academic folio with an education journey, skill ledger, and knowledge workbench; Projects is a numbered index plus semantic story articles; Life pairs a letter with a varied media atlas; Guestbook uses an open-postcard/writing-desk shell. These shells and layouts differ substantially from V0's flat sections.
- All personal/business copy, project fields, education facts, awards, course names, guestbook labels, media captions, and carousel scene descriptions are compared against V0. No V0 business copy has been rewritten. Evidence is in `coursework/evaluation/evidence/V1/V1-R6-content-contract.json`.
- The V1 few-shot patterns abstract composition and interaction from reviewed references only. No reference text, identity, or media is included. The full prompt, pattern examples, source snapshots, change log, screenshots, and raw E2E JSON are retained under `coursework/prompt_appendix/task3_v1/` and `coursework/evaluation/`.
- V1 preserves the course-note retrieval experience and adds a relevance/confidence gate before returning an excerpt; out-of-scope questions receive the existing no-evidence message. The chat quotes retrieved notes and cites the source; it does not call an LLM or synthesize answers.
- Existing carousel thumbnails, project filters/details/favorites, media previews, guestbook behavior, keyboard access, visible focus, and reduced-motion support remain.

## Files

- `index.html`, `style.css`, `app.js`, `projects.js`, `rag.js`, `knowledge-data.js`: V0-derived files; V1-specific changes are documented in `coursework/prompt_appendix/task3_v1/`.
- `v1.css`, `v1.js`: V1-only presentation and accessible state refinements.
- `assets/`, `knowledge/`: copied static resources and the same course-note corpus as V0.

The matching SHA-256 manifest and generation record are stored in the coursework archive. Public deployment URL: https://liuxinyue84-sketch.github.io/V1/. The Pages package is additive under `/V1/`; the frozen V0 root remains the homepage.

### Life media scrapbook wall (V1 iteration 4)

The Life section keeps its original seven photos, two videos, labels, and native media preview. V1 arranges those same items in a responsive asymmetric paper-edged wall and adds two original inline SVG marginalia marks. Use Tab to focus a tile, Enter/Space to open it, and Escape to close the preview. The drawings are decorative and hidden from screen readers.
