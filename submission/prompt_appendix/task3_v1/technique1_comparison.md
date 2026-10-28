# Task 3 · Technique 1 Results — V0 vs V1

## Lineage and protocol

V1 was copied directly from frozen `coursework/website/V0/` and then changed under `coursework/website/V1/`. The V0 code and `coursework/MANIFEST.sha256` were not edited. V0 and V1 were both run through the same `coursework/evaluation/scripts/test_portfolio_e2e.cjs` at a 1512 × 982 desktop viewport in Google Chrome headless on macOS, over local HTTP. The four rubric definitions, weights, scoring anchors, and AI-Judge prompt remain unchanged. Final V1 is published at [https://liuxinyue84-sketch.github.io/V1/](https://liuxinyue84-sketch.github.io/V1/); root V0 remains at [https://liuxinyue84-sketch.github.io/](https://liuxinyue84-sketch.github.io/).

## Outcome

The expanded shared script recorded 23/25 passing checks for V0 and 25/25 for V1. Both versions passed navigation, carousel, education/project disclosure, filtering, saved-state persistence, media preview, music control, guestbook empty validation, and no application-console-error checks. V1 passed both tested unsupported-query phrasings; unchanged V0 failed the MapReduce relevance case and the added paraphrased unsupported query. The meaningful differences were:

- **V0 input:** “How does MapReduce work?” The leading excerpt discussed neutral framing and prompt wording, not MapReduce. The stored raw output is `coursework/evaluation/evidence/V0/V0-e2e-results.json`.
- **V1 input:** the same question. The leading excerpt is from “6.5 MapReduce steps” in *Big Data Computing · Part 1*, and the answer cites that note. The raw output is `coursework/evaluation/evidence/V1/V1-e2e-results.json`.
- **V0 boundary failure:** “How do I bake sourdough bread?” returned an unrelated data-mining excerpt because “bread” was a shared corpus term. This is recorded as a V0 failure, not silently removed from the test.
- **V1 correction:** a non-topic query must now match at least two original content terms and at least 50% of them before an excerpt is returned. The two tested sourdough phrasings both receive the no-evidence fallback in V1. This is a targeted lexical threshold improvement, not comprehensive abstention reliability.

Screenshots: V0 and V1 desktop captures are under `coursework/evaluation/evidence/V0/` and `coursework/evaluation/evidence/V1/`. The V1 full Highlights capture also shows the board, preserved course-note interface, cited MapReduce excerpt, and no-evidence response.

## Human score estimate (provisional)

These are transparent rubric-based human estimates, not AI-Judge results. V0’s existing preliminary self-assessment is 76/100 (4, 4, 4, 3). Using the same rubric after the common run, the provisional V1 estimate is 80/100 (4, 4, 4, 4): Content Completeness 4, Navigation & Task Completion 4, Readability & Visual Consistency 4, Interaction Robustness 4. The weighted total is `(4/5×30)+(4/5×25)+(4/5×25)+(4/5×20) = 80/100`.

The 4/5 interaction score reflects the MapReduce relevance improvement and passing tested interactions, while a valid guestbook submission and length-limit handling remain untested. The 4/5 visual score reflects the coherent desktop screenshot but does not claim a contrast or mobile audit. The content score remains 4 because V1 preserves V0 facts and improves contribution visibility, but source-by-source CV/PS fact verification is outside this browser run. The single rubric point increase is supported by the concrete retrieval change and test evidence, not by the aggregate alone.

**AI-Judge result:** the independent clean-session V1 raw response is preserved verbatim in `../../evaluation/ai_raw_output_v1.md` (85/100 as reported by the Judge). The criterion values recompute to 86/100 under the listed rubric weights; the raw output is unchanged and the discrepancy is disclosed in `submission/README.md` and the report.

## How the few-shot examples affected V1

1. The education-card demonstration led to a dotted pinboard container, a hand-drawn chronology connector, bundled V0 photos, and keyboard-operable education disclosures.
2. The contribution-first example led to a separate “MY CONTRIBUTION” label around the unchanged V0 project-contribution strings.
3. The MapReduce example led to a topic profile and heading boost in the existing browser-local BM25 retriever. It changed which stored passage ranked first; it did not generate a new answer.
4. The unsupported-question example led to an evidence-overlap check and explicit no-evidence response. A live paraphrase exposed a false positive, so a V1-only minimum term-overlap correction was added and tested against unchanged V0. Broader unknown-question coverage remains untested.

## Trade-offs and remaining issues

- The pegboard makes education, skills, and project contributions easier to scan but adds vertical length to Highlights. The board is more illustrative and less compact than V0’s two-column baseline.
- The retrieval fix is a small transparent lexical/topic layer. It only models three example topics (MapReduce, RAG, agent planning), depends on curated topic profiles, and is not semantic retrieval or answer generation.
- The portfolio remains static HTML/CSS/JS; local favorites and guestbook entries remain browser-local.
- V1 is deployed at `/V1/`; the root V0 URL remains untouched. The final threshold correction is deployed; the published HTTPS run passed 25/25 after the test harness replaced a fixed carousel delay with a state-based wait. The first 24/25 live run remains archived as an initial test attempt.
- The old implicit favicon 404 remains in both codebases; it is reported separately because it is a browser-default request and not a missing application asset.
- The AI-Judge run is complete. Remaining evidence limits are a valid Guestbook submission, length-limit behavior, formal contrast audit, and comprehensive mobile verification; these are disclosed rather than treated as passed.

## Structural revision 2 — response to observed weakness

The first V1 did improve the Highlights board and RAG behavior, but it left the Home/Projects interaction and DOM patterns too close to V0. The user identified that as insufficient visible evidence of Few-Shot Learning. That feedback is retained in `change_log.md`; it was treated as a failed design iteration, not omitted.

V1-R2 applies a second explicit set of structural few-shot examples from the same frozen V0-derived V1 branch. The Home now has a numbered chapter rail and selectable image-thumbnail carousel; Projects has an anchored story index, an ordered list of project stories, separately labeled purpose/contribution, and a staggered paper-atlas layout. Interaction remains tied to existing project records, filters, expansions, and local saves. New E2E assertions verify these features.

The shared desktop protocol was expanded to 29 checks and run on both versions. V1-R2 passes 29/29; frozen V0 passes 27/29, with the same two known RAG limitations (MapReduce ranking and a paraphrased unsupported query). These E2E counts are behavior evidence, not replacements for the fixed weighted rubric. They should not be converted into rubric points without the Task 2 evaluator process.

Evidence: `coursework/evaluation/evidence/V1/V1-R2-E2E-01_home_desktop.png`, `V1-R2-E2E-13_projects_full_desktop.png`, and `V1-R2-e2e-results.json`; matched frozen-baseline evidence is under `coursework/evaluation/evidence/V0/` with the `V0-R2-` prefix. The V0 manifest is checked after the revision. Detailed generated files and prompt examples are in `llm_output/iteration_2/`, `icl_prompt_revision2.md`, and `few_shot_examples_revision2.md`.

## Iteration 6 — screenshot-led interaction clarity

The user reported unclear numeric-only navigation, carousel controls obscuring the image, inoperative education disclosures, and a neighboring project appearing to expand with the selected project. V1 now labels chapter destinations using the existing V0 section names and labels project-index links with their existing project titles. The image controls sit below the image. Both education entries expand from the title or photo and display a short action hint; the V1 CSS state selector now matches the V1 card class. Project articles use intrinsic heights so adjacent cards stay compact when one opens.

Local results at 1512×982: V1 35/35; V0 32/34, with its two known RAG limitations. Published V1 also passes 35/35 at `https://liuxinyue84-sketch.github.io/V1/?v=6379505`. The 48-group text contract and the V1 shell checks pass with zero differences locally and online. New screenshots record labeled navigation, image controls below the photo, both education disclosures open, and one project open beside a compact neighbor. Raw outputs are `evaluation/evidence/V1/V1-R7-*`, `V1-PAGES-R7-*`, and `evaluation/evidence/V0/V0-R7-*`; the user feedback and exact correction scope are preserved in `icl_prompt_revision6.md`.

The user then identified two further issues from screenshots: the Home thumbnail control and chapter rail collided, and repeated tile cards felt unattractive. The final V1 refinement moves the rail into normal flow below the hero and converts both navigation indices into restrained editorial strips. The final matched visual/interaction evidence is in `coursework/evaluation/evidence/V1/V1-R4-*`; the final local E2E run passed 29/29. V1-R3/R4 feedback, revised few-shot prompt, reference mappings, and complete source captures are preserved in `change_log.md`, `icl_prompt_revision3.md`, `reference_patterns.md`, and `llm_output/iteration_3/`. These run counts are supplementary behavioral evidence and do not replace the fixed weighted rubric.

## Iteration 5 — strict copy contract and component architecture

The user later noted that the prior iteration still looked too close to V0. In response, V1 was rebuilt around materially different component shells: a journal-cover Home, education-journey/skill-ledger Highlights, indexed semantic project stories, letter/media-atlas Life, and open-postcard Guestbook. The reviewed few-shot examples informed these structures and interactions; no reference personal copy or assets were used. This implementation remains independently derived from frozen V0.

The V0-to-V1 content contract compares 46 text groups plus hero-image alternative text and the complete project-story fields. It found **zero text differences**. Eleven expected V1 component-shell selectors are present while absent from V0, providing structural evidence beyond color changes. Full raw contract output: `evaluation/evidence/V1/V1-R6-content-contract.json`; live-page contract output: `evaluation/evidence/V1/V1-PAGES-R6-content-contract.json`.

The same desktop E2E protocol at 1512×982 gives local V1 33/33 and published V1 33/33; unchanged V0 gives 30/32, with only the known MapReduce first-passage relevance and paraphrased unsupported-query abstention failures. These are behavioral checks rather than weighted rubric scores. Screenshots cover Home, Highlights, Projects, Life, and Guestbook; see `evaluation/evidence/V1/V1-R6-*` and `V1-PAGES-R6-*`. The public build commit is `c80de98` at `https://liuxinyue84-sketch.github.io/V1/?v=c80de98`.
