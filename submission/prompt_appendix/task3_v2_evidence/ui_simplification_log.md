# V2-RAG Front-End Simplification — 2026-10-24

## User feedback and reason for change

The user asked that assembled prompts not appear on the website and that the visitor-facing page remain concise and accurate. The preceding review identified overlapping navigation, repeated empty-state text, oversized results, evaluator jargon in the public UI, and the misleading “Generated Answer” label. This is a presentation correction within V2-RAG; it is not a new course technique, a new baseline, or a change to V0/V1.

## Source changes

- `website/index.html`: removed the visible prompt disclosure and verbose technical intro; replaced test-category labels with three natural example questions; renamed the answer panel “Answer from sources” because the corpus includes course and project material; hid result panels until the first query; retained separate source and answer sections.
- `website/rag-v2.js`: continues to assemble the complete prompt and return it in `runQuery()` for the coursework trace, but no longer writes it into the DOM. The visible answer now quotes only the first retrieved note excerpt and cites only `[R1]`, avoiding implied support from unrelated lower-ranked results. Original source paragraphs remain available in expandable reference cards. The empty state is shorter.
- `website/style.css`: removed the prompt-panel styles and tall empty boxes; allowed the two result panels to size independently; reserved layout space for the sticky navigation and increased section anchor offset.
- `scripts/e2e_v2.cjs`: updated browser checks for the new UI. It tests that the prompt is absent from the DOM while prompt assembly remains available to the archive script.

## Preserved evidence

The pre-change source files, E2E script, test JSON, query archive, screenshots, and assessment documents are preserved in `evaluation/iterations/2026-10-24-before-ui-simplification/`. The old screenshots in `evaluation/evidence/` are marked `_PRE_UI`; they must not be submitted as screenshots of the revised UI.

## Verification and limits

- Passed: JavaScript syntax checks; six deterministic query runs; assembled prompts remain in `query_runs_v2.json`; frozen V0 file hashes match `v0_baseline_sha256.txt`; visitor HTML contains no prompt disclosure or “Generated Answer” label.
- Browser rerun is **pending**. This turn's shell sandbox rejected binding a local HTTP server (`PermissionError: Operation not permitted`) and Chrome headless exited during launch. The in-app browser also rejected a local `file:` URL under its URL policy. No revised screenshot or browser E2E result is claimed.
- Before using the revised V2 in the final report or independent AI Judge, rerun `scripts/e2e_v2.cjs` in a browser-enabled environment and refresh the screenshots. Keep the earlier evidence as iteration history.

## Remaining limitations

The answer is deterministic extraction, not live LLM generation. Lexical retrieval can select a passage that is relevant to a keyword but only partially answers a broad question, for example the archived broad “memory” query. The updated UI labels the excerpt honestly and does not imply that every retrieved result supports the answer.
