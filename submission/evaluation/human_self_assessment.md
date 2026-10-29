# V0 Human Self-Assessment (Preliminary Review with Live Evidence Addendum)

**Version under review:** `website/V0/` (official frozen coursework baseline)  
**Assessment status:** The original scores below are provisional source-based scores. A live browser evidence addendum was collected on 2026-10-23 and is recorded in `evaluation/evidence/V0/2026-10-23_live_e2e_test.md`; the scores have not been silently changed. This was a partial end-to-end test, not the complete common evaluation or AI Judge run.  
**Score calculation:** Weighted score = `Σ (score / 5 × weight)`.

| Criterion | Weight | Human score / 5 | Weighted points |
|---|---:|---:|---:|
| Content Completeness & Clear Contribution | 30% | 4 | 24 |
| Navigation & Task Completion | 25% | 4 | 20 |
| Readability & Visual Consistency | 25% | 4 | 20 |
| Interaction Robustness | 20% | 3 | 12 |
| **Total** | **100%** |  | **76 / 100** |

## Criterion evidence

### 1. Content Completeness & Clear Contribution — 4/5

**Test operation / prompt:** Inspect the main sections in `index.html` and project records in `projects.js`; check whether profile, education/skills, projects, life content, and contact are present and whether each project states a contribution.

**Observed site/source behavior:** `index.html` contains Home, Highlights, Projects, Life, and Guestbook sections. `projects.js` contains four project entries with purpose, contribution, detail, and tags fields; for example, one entry says the owner led project organization, system architecture, and end-to-end implementation. The portfolio also includes education/skills and personal interests. This is source evidence, not a live content-completeness walkthrough.

**Why this score:** The central portfolio content and explicit contribution statements are present, so the site is above the 3/5 partial anchor. A 5/5 is not justified yet because completeness, factual accuracy, and visibility of all details have not been independently checked against the source CV/PS and in-browser states.

### 2. Navigation & Task Completion — 4/5

**Test operation / prompt:** Inspect the navigation anchors and controls; trace the code paths for a representative task: open Projects, filter by Research, expand a project, save it, then return to the saved filter.

**Observed site/source behavior:** The navigation links target the five section IDs. `app.js` renders project cards, wires filters and saved-only state, exposes detail toggles, and persists saved project indices in local storage. This path was traced in source; it was not clicked through in a fresh browser test.

**Why this score:** The site has direct section anchors and code-defined task flows for the representative project task, supporting a score above partial. A 5/5 requires observed completion and clarity across the representative tasks, including the RAG chat and guestbook.

### 3. Readability & Visual Consistency — 4/5

**Test operation / prompt:** Inspect the supplied screenshot of the V0 course-note section and review `style.css` for shared typography, surfaces, controls, and layout rules.

**Observed site behavior:** The supplied screenshot shows a coherent low-saturation sky background, pill navigation, and readable high-contrast content panel; the course-note area is visually separated from the background. The source stylesheet includes a common visual system. The screenshot is one desktop viewport and one section only; it does not establish consistency across every page.

**Why this score:** The available screenshot supports coherent visual identity and readable content, exceeding the 3/5 partial anchor. A 5/5 is not warranted until the complete site is reviewed at desktop scale with contrast and text-size checks.

### 4. Interaction Robustness — 3/5

**Test operation / prompt:** Inspect code paths and known supported conditions for (a) course-note retrieval when opened from a local file, (b) saved project state, (c) guestbook validation/storage, and (d) media/audio controls.

**Observed site/source behavior:** `index.html` loads the embedded `knowledge-data.js` before `rag.js`, addressing the browser restriction that blocked fetching local Markdown from a `file://` page. The RAG implementation is local BM25 retrieval, not an external LLM. Project saves and guestbook entries use local storage. Audio code includes status messages for autoplay being blocked. These behaviors are visible in source, but no fresh runtime interaction was executed during this assessment.

**Why this score:** Core paths and several failure messages are implemented, so there is evidence of partial robustness. The environment-dependent RAG history, browser autoplay policy, local-storage restrictions, and lack of current end-to-end testing prevent a higher confidence score. The 3/5 is provisional rather than a claim that all paths passed.

## Live browser evidence addendum — 2026-10-23

The published V0 was opened over HTTPS in Chrome on macOS. The desktop test covered all five navigation links, hero-scene selection, education disclosure, project filtering and details, favorite persistence across reload, typed RAG queries with displayed sources, photo/video previews, the music play/pause control, and the guestbook empty-submit state. Favorite state was reset to zero after testing; no guestbook message was submitted. The browser console had no errors. The RAG query about MapReduce returned a weakly relevant leading passage, and browser autoplay was blocked until a user clicked the music control. See `evaluation/evidence/V0/2026-10-23_live_e2e_test.md` for exact observations and test-state cleanup.

These observations supplement but do not retroactively alter the original criterion scores. A dated reassessment should update scores only after the rubric's remaining tasks and the clean-session AI Judge run are complete.

## Evidence collection still required

Still required: test the RAG no-match behavior; test valid guestbook submission and length limits in an isolated storage context; complete desktop readability/contrast checks; retain the supplied screenshot at `evaluation/evidence/V0/E2E-01_desktop-home_2026-10-23.png`; the clean-session AI Judge result is preserved in `evaluation/ai_raw_output_v0.md`. The empty guestbook state, a relevant typed RAG query, a weak MapReduce retrieval, desktop navigation, media preview, and music autoplay/manual play-pause were tested and are documented in the dated log. The clean-session Judge run is complete; the raw response and its evidence-provenance caveat are archived separately. Do not silently revise these provisional scores; record a dated reassessment if the result changes.
