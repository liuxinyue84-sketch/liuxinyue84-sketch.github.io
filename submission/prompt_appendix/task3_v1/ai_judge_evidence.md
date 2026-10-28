# V1 AI-Judge Evidence Manifest (for a separate blank session)

Use this manifest only to assemble evidence. Do not send any human score or human interpretation to the Judge.

1. Fixed evaluator prompt: `coursework/evaluation/ai_judge_prompt.md`.
2. Fixed scoring rubric: `coursework/evaluation/rubric.md`.
3. V1 E2E raw results: local common run `coursework/evaluation/evidence/V1/V1-e2e-results.json` and published HTTPS run `coursework/evaluation/evidence/V1/V1-PAGES-RETEST-e2e-results.json`.
4. V1 screenshots: local captures `coursework/evaluation/evidence/V1/V1-E2E-01_home_desktop.png`, `V1-E2E-12_highlights_desktop.png`, and `V1-E2E-12_highlights_full_desktop.png`; published captures use the matching `V1-PAGES-RETEST-` prefix.
5. The first published run’s timing-sensitive failure and original output are retained as `V1-PAGES-initial-e2e-results.json`; the final retest passed all assertions.
6. V1 source evidence: `coursework/website/V1/index.html`, `rag.js`, `v1.css`, and `v1.js`; compare with the frozen baseline files in `coursework/website/V0/` if needed.
7. Test protocol: `coursework/evaluation/scripts/test_portfolio_e2e.cjs`.

## Latest V1 evidence after structural/visual revisions

Use `V1-PAGES-R4-e2e-results.json` as the latest published 29-check behavior record. Its screenshots include the updated Home (`V1-PAGES-R4-E2E-01_home_desktop.png`), separate chapter rail (`V1-PAGES-R4-E2E-01b_chapter_rail_desktop.png`), Highlights, and asymmetrical Projects section (`V1-PAGES-R4-E2E-13_projects_full_desktop.png`). The corresponding latest local evidence uses the `V1-R4-` prefix. Earlier R2/R3 artifacts are retained as iteration history rather than current final screenshots.

The Judge should receive only the fixed rubric/prompt and these V1 artifacts. Do not include `human_self_assessment.md`, this comparison, the provisional human score, or the V0/V1 weakness discussion. Paste the Judge's unedited original response into a version-specific raw-output file only after the independent run.

## V1 iteration 4 evidence (Life scrapbook wall)

- Local E2E raw output: `../../evaluation/evidence/V1/V1-R5-e2e-results.json`.
- Life section screenshot: `../../evaluation/evidence/V1/V1-R5-E2E-14_life_full_desktop.png`.
- Shared E2E runner also records home, Highlights, Projects, and navigation screenshots for this run.
- The evaluator evidence now includes a test record that the original nine media items remain, distinct tile sizes/positions form the V1 wall, and keyboard activation/Escape operate the native preview.
- Task 2's rubric and AI-Judge prompt are unchanged. Human scores and AI-Judge output must not be inferred from these functional checks.

## V1 iteration 5 evidence (component architecture rebuild)

- Published page: `https://liuxinyue84-sketch.github.io/V1/?v=c80de98` (commit `c80de98`).
- Local E2E output and screenshots: `../../evaluation/evidence/V1/V1-R6-e2e-results.json` and `V1-R6-E2E-*.png`.
- Published E2E output and screenshots: `../../evaluation/evidence/V1/V1-PAGES-R6-e2e-results.json` and `V1-PAGES-R6-E2E-*.png`.
- Exact-copy/component-shell contract: `../../evaluation/evidence/V1/V1-R6-content-contract.json` and `V1-PAGES-R6-content-contract.json` (46 copy groups, hero alt text, project stories, and 11 shell assertions; zero differences/errors).
- Latest matched results: local V1 33/33, published V1 33/33; frozen V0 30/32 on the same desktop protocol. The two V0 RAG failures are recorded as limitations.
- Use screenshots for visible evidence and source snapshots from `llm_output/iteration_5/`. The Judge must still receive only the fixed rubric/prompt and site evidence, never human scores or this analysis.

## V1 iteration 6 evidence (interaction clarity)

- Published page: `https://liuxinyue84-sketch.github.io/V1/?v=6379505` (commit `6379505`).
- Local/public E2E results: `../../evaluation/evidence/V1/V1-R7-e2e-results.json` and `V1-PAGES-R7-e2e-results.json` (35/35 each); matched V0 baseline: `../../evaluation/evidence/V0/V0-R7-e2e-results.json` (32/34, two known RAG limitations).
- Copy/component contract: `../../evaluation/evidence/V1/V1-R7-content-contract.json` and `V1-PAGES-R7-content-contract.json` (48 groups, no differences).
- Interaction screenshots: `V1-R7-E2E-01b_chapter_rail_desktop.png`, `V1-R7-E2E-16_education_details_open_desktop.png`, and `V1-R7-E2E-17_single_project_open_desktop.png`; the Home full screenshot records thumbnails positioned below the main image.
- The five original issue screenshots are preserved as `V1-R7-user-feedback-01_...png` through `V1-R7-user-feedback-05_...png` for before/after comparison.
- Source: `llm_output/iteration_6/`. Keep the fixed rubric and judge prompt unchanged and omit human assessments from the new-session Judge input.
