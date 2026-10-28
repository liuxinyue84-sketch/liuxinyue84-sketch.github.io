# Aria’s Sky Journal · V1

V1 is an independent branch copied from the frozen `coursework/website/V0/` baseline, then refined through an In-context Few-Shot Learning generation prompt. It does not inherit from V2 or any older `outputs/aria-v1` draft. Personal text, project facts, education, media, and source corpus are inherited from V0; no reference-site personal content was used.

## Open locally

Double-click `index.html`, or run `python3 -m http.server 8000` in this directory and visit `http://localhost:8000`. The embedded course-note corpus supports the RAG chat from `file://` as well as HTTP.

## V1 changes

- **Structural revision 2 and visual refinement 3:** Home adds a numbered journal chapter rail and image-thumbnail scene selector; Projects adds an anchored four-story index, semantic ordered story list, and asymmetric paper-atlas layout. The chapter rail and project index use restrained editorial separators, leaving the carousel and project stories as the focal points. Project purpose, personal contribution, details, filters, and saved state are visibly distinct and interactive. Full prompts, generated-source iterations, feedback, screenshots and E2E JSON are retained in `coursework/evaluation/` and `coursework/prompt_appendix/task3_v1/`.
- Highlights are arranged on a soft pegboard surface with a hand-drawn education connector; the education and skill facts remain from V0. Existing personal photographs already bundled with V0 are used for the two study cards.
- Project contribution labels are made easier to scan, while V0 project data, filtering, detail, and saved-state behavior remain.
- Few-shot-derived lexical topic patterns improve course-note passage ranking for MapReduce, RAG, and agent-planning questions. The chat quotes a retrieved passage and names its source; it does not call an LLM or synthesize answers.
- Navigation state exposes `aria-current`; layout and transitions adapt to smaller screens and reduced-motion preferences.

## Files

- `index.html`, `style.css`, `app.js`, `projects.js`, `rag.js`, `knowledge-data.js`: V0-derived files; V1-specific changes are documented in `coursework/prompt_appendix/task3_v1/`.
- `v1.css`, `v1.js`: V1-only presentation and accessible state refinements.
- `assets/`, `knowledge/`: copied static resources and the same course-note corpus as V0.

The matching SHA-256 manifest and generation record are stored in the coursework archive. Public deployment URL: https://liuxinyue84-sketch.github.io/V1/. The Pages package is additive under `/V1/`; the frozen V0 root remains the homepage.

### Life media scrapbook wall (V1 iteration 4)

The Life section keeps its original seven photos, two videos, labels, and native media preview. V1 arranges those same items in a responsive asymmetric paper-edged wall and adds two original inline SVG marginalia marks. Use Tab to focus a tile, Enter/Space to open it, and Escape to close the preview. The drawings are decorative and hidden from screen readers.
