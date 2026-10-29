# V2-RAG Human Self-Assessment

## Current reassessment — 2026-10-28

This is the current human score, based on the deployed V2 evidence, the nine-check browser record, the five current screenshots, and the 28-query/10-invariant regression. The historical 2026-10-24 assessment remains below for traceability.

| Criterion | Weight | Score / 5 | Weighted points |
|---|---:|---:|---:|
| Content Completeness & Clear Contribution | 30% | 5 | 30 |
| Navigation & Task Completion | 25% | 4 | 20 |
| Readability & Visual Consistency | 25% | 4 | 20 |
| Interaction Robustness | 20% | 4 | 16 |
| **Total** | **100%** |  | **86 / 100** |

The score is not 5 for navigation or robustness because the current V2 evidence does not freshly test project filtering/saving, media exploration, or valid Guestbook submission on the deployed URL. The RAG module itself has current retrieval, citation, fallback, and deployment evidence.

> **Historical pre-UI-revision assessment.** The source, screenshots, and browser results on which these scores were based are preserved in `iterations/2026-10-24-before-ui-simplification/`. After the 2026-10-24 front-end simplification, the scores and examples below have not yet been reassessed and must not be presented as current evidence.

**Version:** V2-RAG, independently derived from frozen V0.  
**Date:** 2026-10-24 (Asia/Hong_Kong).  
**Method:** Same fixed rubric as V0; scores use the standard weighted formula `Σ(score ÷ 5 × weight)`. The browser evidence here covers the RAG module, while non-RAG behavior is carried forward from unchanged V0 code and the existing V0 test record. This is a preliminary human assessment, not the independent AI-Judge result.

| Criterion | Weight | Score / 5 | Weighted points |
|---|---:|---:|---:|
| Content Completeness & Clear Contribution | 30% | 4 | 24 |
| Navigation & Task Completion | 25% | 4 | 20 |
| Readability & Visual Consistency | 25% | 4 | 20 |
| Interaction Robustness | 20% | 3 | 12 |
| **Total** | **100%** |  | **76 / 100** |

## Criterion evidence

### 1. Content Completeness & Clear Contribution — 4/5

**Test operation:** Inspect the portfolio sections and four project contribution fields, then check whether V2 preserved those V0 sections while replacing only the course-note module.  
**Observed behavior/evidence:** V2 `index.html` retains Home, Highlights, Projects, Life, and Guestbook; `projects.js` retains all four V0 project entries and contribution statements. The new structured corpus adds 20 paragraph records from those project records.  
**Why this score:** Main portfolio content remains present and contributions remain explicit. A 5 is not warranted because this iteration did not independently fact-check all personal claims against the original CV/PS.

### 2. Navigation & Task Completion — 4/5

**Test operation:** Use the RAG preset queries, submit a typed query, and open the assembled-prompt disclosure.  
**Observed behavior/evidence:** Six browser E2E tasks passed. Q01 retrieved a RAG definition; Q02 retrieved MapReduce passages; Q04 returned memory passages; Q05 and Q06 showed the exact abstention message; typed Q03 submitted and returned tool-use evidence with `[R1]`; the prompt disclosure opened. See E1–E3 and `e2e_results_v2.json`.  
**Why this score:** The course-note question task has discoverable test controls, visible evidence, citations, and an inspectable prompt. The other portfolio tasks were not all repeated in this V2 run, so 5 is not supported.

### 3. Readability & Visual Consistency — 4/5

**Test operation:** Inspect the desktop RAG panel screenshot at 1512×1000 browser viewport.  
**Observed behavior/evidence:** The module uses two clearly labeled panels for retrieved passages and answer, source labels, calm V0 colors, and a collapsible prompt. Text is separated into readable cards; screenshots E1–E2 show clear and fallback states.  
**Why this score:** The module’s hierarchy is legible and consistent with the surrounding V0 visual language. The test captured a desktop module, not every section or responsive viewport; therefore 5 is not supported.

### 4. Interaction Robustness — 3/5

**Test operation:** Submit clear, broad, vague, and out-of-scope questions; inspect prompt disclosure and browser errors.  
**Observed behavior/evidence:** The six E2E tasks passed, including exact fallback behavior for Q05/Q06; no JavaScript errors or external requests were observed. The page reports when no reliable passage is found. The answer is explicitly extractive and does not call an LLM. Existing audio autoplay restrictions and guestbook edge cases remain those of V0 and were not retested in this run.  
**Why this score:** The upgraded retrieval module has useful boundary feedback, but the rubric scores the portfolio’s interactions as a whole. Existing untested state/error cases elsewhere prevent claiming 4–5 overall.

## Limitations

The same aggregate as preliminary V0 (76/100) does not imply that the RAG module failed to improve. The rubric covers the entire portfolio, and changes are intentionally confined to one module. RAG behavior improved in the observed questions, while other-site interaction evidence and the clean-session AI Judge run remain incomplete. The deterministic response stage is not real LLM generation.
