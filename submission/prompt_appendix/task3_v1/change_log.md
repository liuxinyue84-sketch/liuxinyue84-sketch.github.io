# V1 Generation and Change Log

## Lineage and freeze check

- Official base: `coursework/website/V0/` (verified against `coursework/MANIFEST.sha256` before making V1 changes).
- V1 was created with a direct directory copy from the official V0 folder, then edited only under `coursework/website/V1/`.
- `outputs/aria-v0`, `outputs/aria-v1`, and any V2 directory were not used as inputs.
- The V0 hash manifest was rechecked after generation; V0 remains byte-identical.

## Generated files and changes

| V1 file | Change | Evidence / purpose |
|---|---|---|
| `index.html` | Added a V1-only stylesheet/script, pegboard wrapper, decorative education connector, and bundled V0 study photos. Updated RAG explanatory copy and visible version label. | Few-shot examples 1 and 3; all original education/project/profile facts remain in the page. |
| `v1.css` | New soft cream-blue dotted pegboard, irregular two-column education/skills layout, photograph treatment, thread drawing, and responsive single-column layout. New transitions use gentle easing and reduced-motion support. | Example 1; borrows only broad layout patterns. |
| `v1.js` | Adds an explicit project contribution label around the original source string; mirrors navigation active state with `aria-current`; synchronizes skill-chip `aria-pressed`. | Example 2; improves scanability and state feedback without modifying project data. |
| `rag.js` | Adds three few-shot-derived topic profiles, low-weight query-term expansion, a topic-heading relevance boost, a low-evidence abstention check, and a visible excerpt/source label. | Examples 3 and 4; factual answer content remains retrieved from V0 notes. |
| `README.md`, `VERSION.txt` | Identify the folder as V1 and explain lineage, files, behavior, and local launch. | Prevents V0/V1 label ambiguity. |

## Necessary bug fixes before V1 test

None recorded at generation time. Any later correction must be appended here with the failure, file/region changed, reason, and test result. Do not edit V0 to fix a V1 issue.

## Generated source output

`llm_output/` contains the complete initial generated versions of changed source files before verification fixes. If a post-generation fix becomes necessary, preserve the original there and apply the fix only to `website/V1/` with a dated note in this log.

## Verification correction — 2026-10-23

- Issue: copied base-style comments still labelled the V1 copy as “V0”, creating version ambiguity; one reused-photo alt label also implied that the graduation photo was specifically an undergraduate campus photo.
- Change: in V1 only, relabelled the inherited stylesheet comments as V1 base styling inherited from frozen V0; changed the image alt to the literal visible event (“Aria holding a bouquet on a campus track”). Clarified the V1 README wording.
- Reason: keep version metadata accurate and avoid an unsupported claim about the photograph.
- The pre-correction initial generated `style.css` is preserved at `llm_output/style.css`.

## Browser-test iteration record — 2026-10-23

- First automation attempt read the previous RAG response before the new request completed. The test harness was updated to wait for the retrieval status element to disappear before checking each answer. No website source was changed for this harness correction.
- The browser initially reported its implicit `/favicon.ico` request as a 404. The harness now records this browser-default request separately; it does not count as an application exception. No V0 source was changed to address it.
- The first video-preview assertion checked `currentSrc` before metadata had loaded. The harness now waits for `loadedmetadata`; the final V1 run confirms the bundled MP4 source and controls.
- Initial matched run before adding the paraphrased abstention test: V0 23/24 assertions (MapReduce leading passage failed); V1 24/24 assertions. These historical outputs are retained with the pre-waitfix JSON files; the expanded final protocol results are recorded below.


## Live-release boundary-case correction — 2026-10-23

- Failure found after the first public V1 deployment: the query “How do I bake sourdough bread?” returned an unrelated data-mining excerpt because the shared word “bread” met the former low overlap threshold.
- V1-only change in `rag.js`: record the number of matched original query terms and require a non-topic query to match at least two terms and 50% of its content terms before showing an excerpt. Curated MapReduce/RAG/agent-planning topic matches retain their topic-based path. V0 was not edited.
- The common E2E protocol now includes the paraphrased unsupported query as E2E-07c. After the change, V1 passes both no-evidence prompts; unchanged V0 returns an unrelated excerpt for the added paraphrase. The result supports a scoped robustness improvement, not a claim that all unsupported questions are handled correctly.
- Re-ran the same 25-check desktop suite after the correction: V1 25/25; V0 23/25 (the MapReduce relevance case and paraphrased unsupported-query case fail). Raw outputs and refreshed screenshots are saved under `evaluation/evidence/V0/` and `evaluation/evidence/V1/`.
- The correction was applied only to V1 after its initial release, and the final deployment was then updated. The initial generated `rag.js` remains preserved in `llm_output/rag.js`.


## Shared browser protocol timing correction — 2026-10-23

- First deployed-site run: 24/25 checks passed; the carousel had not advanced when the test read its counter after a fixed 500 ms wait. Other live checks, including the updated RAG abstention behavior, passed. The initial raw JSON and screenshots are retained with the `V1-PAGES-initial-` prefix.
- Test-only change: `evaluation/scripts/test_portfolio_e2e.cjs` now waits up to five seconds for the visible carousel counter to reach slide 2 before asserting. This does not alter V0 or V1 website behavior.
- Re-ran the updated shared protocol against local V0, local V1, and the published V1 HTTPS URL. Results: V0 23/25, V1 25/25, published V1 25/25. The published run and its screenshots are saved with the `V1-PAGES-RETEST-` prefix.

## User feedback and structural revision — V1 iteration 2 — 2026-10-23

- **Observed shortcoming:** the first V1 had most visible changes in Highlights and RAG. The Home and Projects DOM/interaction patterns remained too close to V0, so the effect of Few-Shot Learning was difficult to see. The user explicitly identified this as insufficient evidence of a technique-led version change.
- **Lineage:** this remains the V1 branch derived from the frozen V0 copy. The correction is a new V1 generation iteration using the revised few-shot prompt in `icl_prompt_revision2.md`; no V2 source was used and V0 was not edited. The first prompt and first generated source output remain preserved unchanged as iteration 1.
- **Home structural changes:** `index.html` adds a numbered chapter rail linking to existing long-scroll sections and changes the hero container to semantic `figure`/`figcaption`; `app.js` renders image thumbnails and keeps selected state, main image, caption, and counter synchronized; `v1.css` lays out the thumbnail selector and chapter rail. Desktop proportions were adjusted after screenshot review; mobile rail returns to document flow.
- **Projects structural changes:** `index.html` adds a four-story anchor index and changes `#project-list` from a `div` to an ordered list. `app.js` now renders each item as an `li` with a semantic `article`, distinct purpose/contribution blocks, explicit paper-note actions, and retained tags/details. `v1.css` lays out asymmetrical staggered paper stories; filters preserve category semantics and reflow entries gently. The existing save state and detail controls remain operable.
- **Files changed:** `coursework/website/V1/index.html`, `style.css`, `app.js`, `v1.css`, `v1.js`; shared supplementary test harness `coursework/evaluation/scripts/test_portfolio_e2e.cjs` now checks both V0 baseline structure and the V1-specific chapter/story features. The Task 2 rubric and AI-Judge prompt were not edited.
- **Visual correction:** first screenshot review showed the chapter rail crowding the left hero copy. The rail was moved to a compact full-width strip at the bottom of the desktop hero; the hero column ratio and title size were adjusted. First project-atlas screenshot showed an oversized blank featured story; the first story no longer spans two rows, and the four stories now form a more balanced staggered two-row composition.
- **Follow-up screenshot correction:** the user reported that the carousel thumbnail controls overlapped the chapter rail in the scrolled Home view. The rail was moved out of the hero section into its own flow-positioned region directly below the hero; a dedicated rail screenshot is now captured. The carousel controls remain inside the figure, with the hero’s existing bottom padding separating the two regions. This correction supersedes the prior placement note above.
- **Reference-led refinement 3:** after the user asked for further refinement based on the four selected samples, the academic references were used for restrained hierarchy and scanning; the art portfolio for image-first category selection; and the interactive portfolio for small, purposeful hover/focus states. `reference_patterns.md` records each mapping. The Home chapter rail is now one translucent strip with dividers, while the Projects index is a simple editorial index rather than four additional tile cards. Actual project stories remain the visual focus. No reference copy, identity, or assets were used.
- **R4 verification:** final visual iteration passes all 29/29 local desktop E2E assertions at 1512×982, with zero uncaught browser/console errors. Final evidence is `V1-R4-E2E-01_home_desktop.png`, `V1-R4-E2E-01b_chapter_rail_desktop.png`, `V1-R4-E2E-13_projects_full_desktop.png`, and `V1-R4-e2e-results.json`. The E2E run records the layout after the overlap fix; older R2/R3 captures are retained as revision history.
- **Published verification:** V1 was pushed to `liuxinyue84-sketch/liuxinyue84-sketch.github.io` in commit `6b53131`. GitHub Pages served the updated markup, and the same 29-check desktop suite passed 29/29 against the public HTTPS URL. Raw result and screenshots use the `V1-PAGES-R4-` prefix. Frozen V0 is still the repository root and was not part of the V1-only commit.
- **Verification:** at 1512×982 desktop viewport, V1-R2 passes 29/29 E2E checks with no uncaught console errors. Same protocol run on frozen V0 passes 27/29; the two V0 failures remain the known MapReduce-ranking and paraphrased unsupported-query RAG limitations. Raw JSON and V0/V1 screenshots, including full Home, Highlights, and Projects captures, are stored in `coursework/evaluation/evidence/V0/` and `coursework/evaluation/evidence/V1/` with the `*-R2-*` prefix. Favicon 404 requests are separately recorded as browser-default requests.
- **Generated source capture:** complete V1-R2 outputs are saved under `llm_output/iteration_2/`; original iteration-1 generated files remain in `llm_output/`.

## Life scrapbook wall and SVG marginalia — V1 iteration 4 — 2026-10-23

- **User-approved scope:** Add original hand-drawn SVG marginal notes and rearrange the current Life photographs/videos into an asymmetric scrapbook wall, preserving existing content and interactions.
- **Few-shot inputs:** `icl_prompt_revision4.md` and `few_shot_examples_revision4.md`. They abstract only gallery structure, marginalia, and keyboard interaction patterns from the selected references. No reference-site text, identity, or media was copied.
- **V1-only source changes:** `index.html` adds two original inline decorative SVGs and identifies the gallery as an accessible scrapbook wall; `v1.css` adds low-saturation marginalia and a responsive varied-size grid with gentle paper-like edges; `app.js` adds gallery item indices/kinds, dialog semantics, and photo alt text. All seven existing photos, two videos, captions, and preview dialog remain.
- **Shared test harness:** added checks for all nine gallery items, V1-only varied/staggered wall geometry, keyboard activation, Escape closing, and a full Life-section screenshot. Existing V0 behavior remains a conditional baseline in the same shared suite. Task 2 scoring rubric and AI-Judge prompt were not changed.
- **Local desktop verification:** 33 checks passed at 1512×982 on the V1 local HTTP server; no uncaught browser or console errors. Evidence: `evaluation/evidence/V1/V1-R5-e2e-results.json` and `V1-R5-E2E-14_life_full_desktop.png` (plus the run's other screenshots).
- **V0 boundary:** `coursework/MANIFEST.sha256` verified before and after; V0 files were not edited.
- **Initial source snapshot:** complete changed V1 source files are saved under `llm_output/iteration_4/`.
- **Published verification:** V1 was pushed to `liuxinyue84-sketch/liuxinyue84-sketch.github.io` in commit `8f0f2e4`. The live URL `https://liuxinyue84-sketch.github.io/V1/?v=8f0f2e4` serves the new markup and passes 33/33 checks in the same desktop suite; no uncaught browser or console errors. Online raw output and screenshots are saved with the `V1-PAGES-R5-` prefix.
- **V0 regression-boundary run:** the same updated desktop protocol completed 32 checks against frozen V0; 30 passed and the two previously documented RAG cases failed (MapReduce passage ranking and a paraphrased unsupported query). The V0 Life gallery and keyboard preview checks passed. Raw output is `evaluation/evidence/V0/V0-R5-e2e-results.json`; V0 checksum verification passed.

## Copy-preserving component architecture rebuild — V1 iteration 5 — 2026-10-23

- **User feedback:** the previous V1 still looked too much like V0. The user set a strict content contract (100% verbatim V0 business copy) and required large, observable changes to component shells, layout, and interactions using the reviewed few-shot patterns.
- **Few-shot inputs:** `icl_prompt_revision5.md` and `few_shot_examples_revision5.md`. The examples abstract editorial folio, image-led feature, project story index/article, and letter/media-atlas patterns. Reference copy and assets are excluded.
- **V1-only structure:** Home uses a journal-cover composition and chapter rail; Highlights uses an education journey, skill ledger, and knowledge workbench; Projects uses an index and semantic story articles; Life uses a letter/media atlas; Guestbook uses an open-postcard/writing-desk shell. V0 copy and content data remain the source.
- **Correction discovered during verification:** the first R6 desktop run failed the paraphrased unsupported RAG query because an abstention check had been omitted while refining answer output. Restored the evidence-confidence gate in V1 `rag.js`, retaining the original V0 no-evidence message. This is recorded as a V1 robustness correction, not a content rewrite.
- **Source snapshot:** complete current V1 source files are preserved in `llm_output/iteration_5/`.
- **Copy and structure verification:** `evaluation/scripts/check_v1_v0_content.cjs` compares 46 text groups, carousel alt text, full project story data, and 11 component-shell assertions. Result `PASS`: no copy differences; all V1 shells present. Raw result: `evaluation/evidence/V1/V1-R6-content-contract.json`.
- **Matched local desktop tests:** shared E2E at 1512×982: V1 33/33, no uncaught browser errors; unchanged V0 30/32, with its known MapReduce-leading-excerpt and paraphrased unsupported-query failures. Raw JSON and screenshots use the `V1-R6-` and `V0-R6-` prefixes in `evaluation/evidence/`.
- **Visual correction:** screenshot review found the Home hero heading crowded in its paper panel. The desktop column ratio and title size were adjusted; the resulting full-section capture is `evaluation/evidence/V1/V1-R6-E2E-01_home_full_desktop.png`.
- **V0 boundary:** frozen manifest verification is required before release; no V0 source files were edited. Task 2 rubric and AI-Judge prompt remain unchanged.
- **Published verification:** V1 was pushed to `liuxinyue84-sketch/liuxinyue84-sketch.github.io` in commit `c80de98`. GitHub Pages completed the deployment successfully; the cache-busted URL `https://liuxinyue84-sketch.github.io/V1/?v=c80de98` serves the new component shells and passes 33/33 shared desktop E2E checks with zero uncaught errors. The public copy/structure contract also passes against local frozen V0 with no differences. Raw online outputs and screenshots use `V1-PAGES-R6-` prefixes.
- **V0 boundary:** `shasum -a 256 -c coursework/MANIFEST.sha256` passed after the work. The V0 source was not changed; the published change is limited to `/V1/`.

## Screenshot-led interaction correction — V1 iteration 6 — 2026-10-23

- **User feedback:** screenshots showed that the chapter and project indices used unexplained numbers, carousel thumbnails covered the bottom of the main photo, the education disclosure affordance did not work, and an expanded project made its grid neighbor look expanded too.
- **Prompt record:** `icl_prompt_revision6.md` keeps the user's feedback verbatim and separates the correction instruction from it. This iteration is a targeted usability correction within the V1 Few-Shot branch, not a new claimed technique.
- **Navigation guidance:** chapter links now show the existing section names; project index names are populated directly from the V0 project-title data. No personal/business text was invented or rewritten.
- **Carousel:** thumbnail controls are positioned below the main image with enough space to prevent overlap.
- **Education:** discovered the V1 event handler had moved to `.education-leaf` while the inherited open-state CSS still targeted `.school-card.open`. Updated the V1 selector, added visible “Click to view details” / “Click to hide details” guidance, and made photo/card clicks activate the matching disclosure. Existing education text remains unchanged.
- **Projects:** changed V1 grid alignment and card sizing from row-stretched to intrinsic height so an adjacent project remains folded and compact when one project expands. Toggle logic remains per article.
- **Evaluation:** expanded the shared suite to assert labeled destinations, both education disclosures (including clicking the undergraduate photo), independent project expansion and compact neighbor geometry. The suite now saves explicit open-state screenshots for education and projects. The copy contract now checks 48 groups including chapter and project-index labels, stripping only the new UI hint from the school copy comparison.
- **Local results:** V1 R7 passes 35/35; V0 R7 passes 32/34 with the same two previously recorded RAG limitations. Copy/structure contract passes with no differences. Evidence files use `V1-R7-` and `V0-R7-` prefixes.
- **V0 boundary:** frozen V0 files remain unchanged; the full 32-file V0 manifest passed. Task 2 rubric and AI-Judge prompt remain unchanged.
- **Source capture:** complete implementation files and static resources are saved under `llm_output/iteration_6/`.
- **Published verification:** V1 usability corrections were pushed in commit `6379505`; GitHub Pages completed successfully. The cache-busted URL `https://liuxinyue84-sketch.github.io/V1/?v=6379505` passes 35/35 shared desktop checks and the live V0/V1 copy/component contract passes with zero differences. Evidence uses the `V1-PAGES-R7-` prefix.
- **Before/after visual record:** the five user-provided feedback screenshots are archived in `evaluation/evidence/V1/` as `V1-R7-user-feedback-01_...png` through `V1-R7-user-feedback-05_...png`; updated Home, chapter rail, Highlights, expanded education, and single-project screenshots are saved with `V1-R7-` and `V1-PAGES-R7-` prefixes.

## Iteration 7 — page skeleton rebuild (2026-10-27)

**Problem.** R7 screenshot review: V1 still read as the same website as V0. Every
previous iteration had changed components *inside* one frame — a single column of
paper sections under a centred pill navigation.

**Reference sweep.** Six public portfolios were rendered before writing anything
(`few_shot_examples_revision7.md`). Three skeletons survived: bento mosaic, profile
rail with a content window, and an editorial split spread. Three were rejected —
a desktop simulation and a terminal both hide content behind a metaphor, and
Dopefolio is structurally V0.

**Chosen.** Profile rail + content window. Three clickable drafts were produced in
`work/design-draft/` with the real copy and palette; the author picked B.

**Files changed.**

| File | Change |
|---|---|
| `index.html` | masthead and floating nav replaced by `.app-frame` → `.app-rail` + `.app-window` containing `.pane-bar` and `main`; the chapter rail moved inside `#home` |
| `v1.css` | appended the app-shell block: rail, vertical `pill-nav`, window frame, one-screen sections, two-column project grid, mobile collapse |
| `app.js` | `setActive()` follows `--nav-axis` so the indicator travels vertically; `updateSectionNav()` measures the window scroller instead of the page and no longer forces `guestbook` when nothing scrolls |
| `v1.js` | `syncPaneBar()` keeps the window title bar's section name and `01 / 05` counter in step with the active link |

**Deliberately unchanged.** `style.css`, `projects.js`, `rag.js`,
`knowledge-data.js`, every asset, and every section's internal markup. V0 remains
byte-identical and unfrozen files are untouched.

**Verification.**

- `test_portfolio_e2e.cjs` — 35/35 PASS, 0 console errors, 0 page errors
  (`coursework/evaluation/evidence/V1/V1-R8-e2e-results.json`)
- `check_v1_v0_content.cjs` — 48 copy groups, 0 differences, 0 structure errors
  (`coursework/evaluation/evidence/V1/V1-R8-content-parity.json`)
- Manual breakpoint pass at 1512 / 820 / 414 px: no horizontal overflow, no
  clipped controls.
- Screenshots `V1-R8-E2E-01 … 17` regenerated from the same run.

**Known trade-off.** Each section now claims one window height, so Highlights and
Projects still overflow and scroll inside the window. The frame stays fixed; the
content moves — which is the intended reading model, not a defect, but it should be
stated plainly rather than described as "one screen per section".


---

## Iteration 9 · 2026-10-27 · full-bleed editorial skeleton (replaces the app shell)

**Why.** The author rejected iteration 7 on sight: "v1好丑啊，越优化越丑…不想要有边框版，很局促"
with a screenshot of the framed window, and added "也不喜欢旁边放的信息" about the profile
rail. Two concrete faults: the window turned the page into an app inside a box, and the
rail occupied a permanent column of facts the author did not want on screen. The author
chose the full-bleed magazine direction from three options.

**Direction.** No frame, no side rail, no boxed cards. Everything runs the full viewport
width on one hairline rhythm; structure comes from scale, rules and bleed rather than
from borders, radii and shadows.

**Files changed.**

| File | Change |
|---|---|
| `index.html` | `.app-frame` / `.app-rail` / `.app-window` / `.pane-bar` removed; replaced by a single `.ed-topbar` (wordmark, five labels, music toggle), the progress line and `main` |
| `v1.css` | the whole app-shell block deleted; a new editorial layer added (top bar, cover spread, hairline section heads, row-based highlights and projects, full-bleed image wall, open-letter guestbook, paper body with a masked sky band confined to the cover) |
| `app.js` | `setActive()` now sizes and places the underline from the active link's own box instead of `translateX(i*100%)`; `updateSectionNav()` measures the page again; `pagehide` cleanup guarded (see below) |
| `v1.js` | `syncPaneBar()` removed with the window title bar |

**Deliberately unchanged.** `style.css`, `projects.js`, `rag.js`, `knowledge-data.js`,
every asset, every section's internal markup and every piece of copy. V0 remains
byte-identical.

**Legibility correction found during the rebuild.** With the paper cards gone, the fixed
sky photograph became the page surface and body copy sat directly on mountains — unreadable.
The sky is now a masked band confined to the cover, with a paper wash on the text side; the
body is a flat `#f7f5ee`. This is recorded because it changes how the page is read: the
photograph is an opening image, not a background.

**Latent defect fixed.** `app.js` called `mediaURLs.forEach(...)` on `pagehide` but
`mediaURLs` is declared nowhere in the bundle — inherited unchanged from frozen V0, where it
threw on every page hide. Guarded with `typeof mediaURLs !== 'undefined'` in V1 only; V0 is
left untouched because it is frozen.

**Verification.** `test_portfolio_e2e.cjs` 35/35 PASS with 0 console and 0 page errors
(`evidence/V1/V1-R9-e2e-results.json`); `check_v1_v0_content.cjs` 48 copy groups, 0
differences (`evidence/V1/V1-R9-content-parity.json`); breakpoint pass at 1512 / 1280 /
1024 / 820 / 414 px with no horizontal overflow; screenshots `V1-R9-E2E-01 … 17`.

**Known trade-offs, stated plainly.**

- The cover photograph only bleeds on the right. It is a block of image against a paper
  field, not a full-bleed hero; that is a deliberate editorial choice, not an oversight.
- Project rows leave the lower right of each row empty. The contribution sits at the top of
  the right column and the expandable detail unfolds beneath it, so a closed row reads as
  airy rather than dense. On a wide screen this is generous; on a 1280px laptop it is close
  to sparse.
- The Life wall is a plain four-column grid, not a masonry composition. Uneven tile heights
  were tried during the rebuild and made the section look broken rather than composed.

---

## Iteration 10 · 2026-10-27 · Life wall rebuilt as a compact mosaic

**Why.** The editorial skeleton was accepted; the photo wall inside it was not. Verbatim:
"你这个图片太平铺、太大了，你再多提取一些样本学习一下吧". Measured faults at 1512 px: nine items
in `repeat(4,1fr)` with every tile forced to `aspect-ratio:1.15`, tiles 340 × 296, wall
height ~950 px — taller than the copy block above it — and a final row holding one film
alone, which the eye reads as a stray panel.

**Method.** Samples first, then three rendered candidates, then one implementation. The
sweep and the rejected candidates are recorded in `gallery_pattern_sweep.md`; the prompt and
its constraints in `icl_prompt_revision9.md`.

**Chosen composition.** 20-column grid, eight tiles at `span 4` (267 × 178) in two bands,
the 2:3 portrait pinned to `17 / span 4` across both bands (267 × 400, uncropped). Captions
moved out of the photographs into the margin. Wall height 420 px, tile area roughly half of
the previous wall.

**Files changed.**

| File | Change |
|---|---|
| `v1.css` | new R10 layer; deleted the dead iteration-9 gallery rules (`repeat(4,1fr)`, the `!important` span reset, `aspect-ratio:1.15`) and the inheritance-facing bits they relied on |
| `app.js` | `addGalleryItem()` takes an optional poster and sets `el.poster`; the two films now ship a captured frame |
| `assets/` | added `life-video-1-poster.jpg` (87 KB) and `life-video-2-poster.jpg` (71 KB) |

**Nothing else moved.** `index.html`, `style.css`, `projects.js`, `rag.js`,
`knowledge-data.js` and every existing photograph are unchanged. V0 remains byte-identical.

**Latent defects found while rebuilding.**

- Two rules from the scrapbook era were still live and silently broke the new grid:
  `.media-gallery.media-wall{grid-auto-rows:27px}` pinned every row to 27 px, and the
  `:nth-child(1..9)` block still assigned explicit `grid-row` spans. Both were removed
  instead of being overridden with `!important`.
- A film tile could paint as an empty beige rectangle before its metadata arrived. Fixed
  with poster frames rather than `preload="auto"`, which would fetch 31 MB on first paint.

**Verification.** `test_portfolio_e2e.cjs` 35/35 PASS, 0 console and 0 page errors
(`evidence/V1/V1-R10-e2e-results.json`); `check_v1_v0_content.cjs` 48 copy groups, 0
differences (`evidence/V1/V1-R10-content-parity.json`). Wall measured at 1512 / 1280 / 1024 /
820 / 414 px: five-across at the top two widths, four-across to 1120 px, two-across below
980 px, flush right at every one, no horizontal overflow.

**Test change, recorded rather than hidden.** `E2E-08d` asserted "varied card sizes and
staggered positions" (≥4 distinct `w×h`, ≥5 distinct `y`). That described the V0 scrapbook
mosaic and would fail on any flush composition, including this one. It now asserts what the
design actually claims: ≤2 distinct widths, exactly one tile ≥1.6× the median height, flush
right edge, every caption outside its frame.

**Known trade-offs.**

- Tiles are small on purpose. 267 px shows a scene, not a face; the dialog is where a
  photograph is examined.
- The composition is tuned for nine items and the portrait slot is pinned to `:nth-child(7)`.
  A tenth photograph needs a new slot, not a new rule.
- Between 981 and 1120 px the wall becomes 3 + 3 + 2 because the portrait still claims two
  rows. It stays flush, but it is a different composition rather than a scaled one.

---

## Iteration 11 · 2026-10-28 · caption plate moved off the hero photograph

**Why.** The author sent a crop of the bottom of the hero image — the caption bar, the three
thumbnails and the two round arrows — with one line: "不要这里". The strip sat directly over
the sitter's gown and bouquet. Everything it carried was legible only as clutter: at 82 × 47
the thumbnails showed a rectangle of sky and a caption set at 7 px.

**What moved.** The photograph now carries only the picture and the corner stamp. Caption,
scene counter and switcher sit on a hairline immediately beneath the frame, aligned to its
left edge and running to its right edge:

| | Before | After |
|---|---|---|
| Caption | translucent bar at `bottom:60px`, inside the frame | `10.5px` tracked caps on the hairline, outside the frame |
| Counter | `— 01 / 03` inside the bar | `01 / 03` at the right end of the plate |
| Scenes | three 82 × 47 thumbnails on a blurred pill | three 20 × 2 px rules, 34 px when active |
| Arrows | two 34 px circles floating on the image | two 24 px glyphs at the end of the plate |

**Files changed.**

| File | Change |
|---|---|
| `index.html` | `.cover-visual` wrapper added; `figcaption` and `.art-controls` removed from the `<figure>`; `.cover-plate` added under it with `#art-caption-text`, `#art-counter`, `#art-dots`, `#art-prev`, `#art-next` |
| `v1.css` | R11 layer appended; the dead thumbnail rules deleted (`.art-controls` ×3, `.art-caption` ×3, `.scene-dot` block, the media-query overrides) rather than left to be overridden |
| `app.js` | `showScene()` builds the dots without `<img>` or `<span>` now that the selector is a rule; counter text drops the em dash |

`style.css`, `projects.js`, `rag.js`, `knowledge-data.js`, every asset and every photograph
are unchanged. V0 remains byte-identical.

**Accessibility kept.** The caption is still a live region (`aria-live="polite"`), each rule
still carries `aria-label="View scene n: …"` and `aria-pressed`, the photograph is still
clickable and focusable as a "next scene" control, and the arrows remain real buttons. Only
the decoration changed.

**Correction, 2026-10-28.** This entry first claimed that `assets/traumerei.mp3` had never
shipped in any build, so the music toggle 404'd in silence. That was wrong, and it was wrong
because it was reasoned from the two "failed resource" lines the E2E run reports rather than
measured. The file is present in both builds (2,487,708 bytes in V0 and V1, hashed in
`MANIFEST.sha256`), it decodes (`readyState 4`, duration 155 s), and a click on the note in the
navigation bar starts playback (`paused false`, `currentTime` advancing, `aria-pressed="true"`).
A page-level scan of every response during load and playback returns no 4xx or 5xx at all; the
two failed resources are `favicon.ico` and its default-path twin, which V0 also lacks. The
toggle behaves as designed: autoplay is blocked on load, the reader's click starts the music.
No latent defect existed here, and nothing needs fixing. Left in the record rather than quietly
deleted so the earlier claim is not mistaken for a finding.

**Test change, recorded rather than hidden.** `E2E-03` and `E2E-03b` asserted the string
`— 02 / 03` and the presence of three `<img>` inside `#art-dots`. Both were properties of the
old overlay. They now assert `02 / 03` and three `.scene-dot` buttons. The assertions test
the same behaviour — advance, jump, return — under the new markup.

**Verification.** `test_portfolio_e2e.cjs` 35/35 PASS, 0 console and 0 page errors
(`evidence/V1/V1-R11-e2e-results.json`); `check_v1_v0_content.cjs` 48 copy groups, 0
differences (`evidence/V1/V1-R11-content-parity.json`). Plate measured at 1512 / 1280 / 1024 /
820 / 414 px: caption left edge on the photograph's left edge, plate right edge flush with the
photograph's right edge, no horizontal overflow. Below 1121 px the plate wraps to two lines —
caption on its own row, controls right-aligned under it — because at 1024 the photo column is
~470 px and one line could hold the caption or the controls, not both; letting the caption
break left "track" orphaned above the rules.

**Known trade-offs.**

- The scene whose picture is not on screen now has no preview. Three rules say "there are
  three, you are on the first"; they cannot say what the others look like. That is the cost
  of taking the strip off the photograph, and it is the intended reading: the cover is a
  photograph, not a viewer.
- The caption repeats, in tracked caps, the photograph's `aria-label`. Deliberate — the
  label serves screen readers, the line serves sighted readers, and they say the same thing.

---

## Iteration 12 — the skill lines open (2026-10-28)

**What was reported.** "为什么这个点开不能看见具体介绍了" — a review of the
`THINGS I WORK WITH` band in which the four lines were clicked and nothing happened.

**What was actually there.** The four `<li>` were plain V0 copy: a row of four beads with one
filled, a title, a one-line summary. No handler, no link, no `tabindex`. The beads made each
line look like an unselected carousel page, which is exactly the affordance that invites a
click, and the only live control in the band sat 80 px below it — the tool chips, whose own
label reads `TOOLS · CLICK TO SEE RELATED PROJECTS`. So the band said "click me" twice and
answered once, and the one place it answered was the one place that looked least like a
button.

**What changed.** Each line is a disclosure now.

| Element | Before | After |
|---|---|---|
| The line itself | static `<li>` | `<button class="skill-note-toggle">` filling the row |
| Indicator | four decorative beads only | beads plus a 11 px `＋` at the row's right edge, rotating 45° when open |
| Resting copy | title + one line | unchanged, character for character |
| Panel | none | hairline-topped panel, two evidence lines and a link into the matching project story |
| Collapsed panel | — | `inert`, so it is never tabbed into while invisible |

Each panel closes on the evidence behind its one-liner: the parsing pipeline and the
JSON-Schema guardrails for Python; BM25 with SQLite FTS5 against the SentenceTransformer and
ClickHouse pair for RAG; the Future Internet review for AI Agents; the Vue 3 / Spring Boot /
ECharts stack for Full-Stack. Every claim is drawn from a project story already on the page or
from the CV facts already in it; no new biography was invented.

**The link does two things.** Clicking `Intelligent Policy Q&A System ↗` jumps to
`#project-story-2` *and* unfolds that project's note, so the reader lands on the evidence
rather than on a folded row. If the note is already open it is left alone.

**Files changed.**

| File | Change |
|---|---|
| `index.html` | the four `<li>` rebuilt as `button` + `skill-detail` pairs; `#skill-detail-0…3` |
| `v1.css` | R12 layer — disclosure, panel, project link, focus ring; R12b fixes the ≤ 980 px intro stack |
| `v1.js` | toggle handler with `aria-expanded` / `inert` sync; project link unfurls its story |
| `check_v1_v0_content.cjs` | the parity collector strips `.skill-detail` before reading `.skill-notes li` |

`style.css`, `projects.js`, `rag.js`, `knowledge-data.js`, all assets and every photograph are
unchanged. V0 remains byte-identical.

**Why the plus is generated content.** `.skill-note-toggle::after` draws the `＋`, so it never
enters the DOM text. The resting string of each line stays byte-identical to V0 and the parity
check keeps reading the same four strings without a special case.

**Test change, recorded rather than hidden.** The parity collector compared the `innerText` of
`.skill-notes li` between the two builds. The new detail panels live inside those `li`, so their
copy would have counted as a V0/V1 difference. The collector now drops `.skill-detail` from the
clone before reading it — the same treatment `.school-action-hint` already gets, and for the
same reason: the disclosure is additive, and the guarantee the check exists to make is that no
V0 copy was rewritten. It still compares 48 groups and still finds 0 differences.

**A second defect found while checking the first.** Below 980 px the band's eyebrow printed
straight through its own headline: the intro column put eyebrow, title and footnote in one
named grid cell and separated them with margins tuned for the 30 px desktop title. At 414 px
the title is 21 px and the eyebrow wraps to two lines, so `margin: 26px 0 0` no longer cleared
it — measured at y 2374 h 40 against y 2400, a 14 px overlap. Pre-existing since iteration 9 and
unrelated to the disclosure, but visible on every phone. R12b gives each line its own row below
the breakpoint; the three now sit at 2374 / 2414 / 2472 with no overlap.

**Verification.** `test_portfolio_e2e.cjs` 35/35 PASS, 0 console and 0 page errors
(`evidence/V1/V1-R12-e2e-results.json`); `check_v1_v0_content.cjs` 48 copy groups, 0 differences
(`evidence/V1/V1-R12-content-parity.json`). Behaviour measured in Chrome: `aria-expanded` flips
`false → true`, `#skill-detail-2` reports `inert true` when folded, the project link leaves
`#project-story-2` open with `location.hash` at `#project-story-2`, and the toggles are real
`BUTTON` elements so Tab and Enter reach them. No horizontal overflow at 1280 / 1024 / 820 /
414 px (0 px at each).

**Correction carried into this pass.** Iteration 11 recorded the missing `traumerei.mp3` as a
latent defect. It was not missing — see the correction note in that entry. The music was
measured this time instead of inferred: it plays.
