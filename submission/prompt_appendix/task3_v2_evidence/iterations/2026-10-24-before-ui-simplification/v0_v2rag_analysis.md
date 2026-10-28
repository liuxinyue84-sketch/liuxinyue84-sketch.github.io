# V0 vs V2-RAG Analysis

## Version lineage and technique

V2-RAG is a copy of frozen `coursework/website/V0/`; it was not created from V1. Hashes of V0 `index.html`, `style.css`, `rag.js`, and `knowledge-data.js` were captured before editing in `v0_baseline_sha256.txt` and are verified unchanged. Only the V2 course-note question module was redesigned, with its own structured JS corpus and browser-side RAG demo. The V0 version remains untouched.

The formal technique is Retrieval-Augmented Generation (RAG): retrieve passages from an external-to-the-query knowledge corpus, combine the original question with retrieved passages in a grounded prompt, then format a cited response. Given GitHub Pages’ static-only hosting and the explicit no-key/no-external-LLM constraint, the final response step is deterministic extractive rendering rather than a real LLM call. This is an educational workflow simulation, not a production RAG service.

## Rubric comparison

The fixed Task 2 rubric was used for both columns. V0’s 76/100 is the existing preliminary human score, not an AI-Judge score. V2’s score is a preliminary human assessment based on this iteration’s evidence and unchanged V0 evidence for unaffected areas. The independent V2 AI-Judge output is pending and is not fabricated here.

| Criterion | Weight | V0 preliminary | V2-RAG human | Change |
|---|---:|---:|---:|---:|
| Content Completeness & Clear Contribution | 30% | 4/5 | 4/5 | 0 |
| Navigation & Task Completion | 25% | 4/5 | 4/5 | 0 |
| Readability & Visual Consistency | 25% | 4/5 | 4/5 | 0 |
| Interaction Robustness | 20% | 3/5 | 3/5 | 0 |
| **Weighted total** | **100%** | **76/100** | **76/100** | **0** |

The overall score is unchanged because this rubric evaluates the whole portfolio. The non-RAG modules were deliberately inherited from V0, and whole-site guestbook/audio/state edge cases have not been rerun for V2. This is not evidence that the RAG task itself did not improve.

## Observable RAG changes and evidence

- **V0 behavior:** V0’s `rag.js` retrieves up to six BM25 chunks, then displays the first excerpt as the answer; its live V0 record notes weak leading relevance for a MapReduce query and a file-loading restriction that had required the embedded knowledge data.
- **V2 behavior:** the visitor now sees original retrieved passages and citations separately from the answer, can inspect the exact assembled prompt, and can try clear/broad/vague/out-of-scope cases. `rag-v2.js` applies BM25 over 9,831 structured paragraphs from eight course notes and four existing V0 project profiles.
- **Runtime evidence:** six desktop browser tests passed. Clear queries for RAG, MapReduce, and tool-use returned source passages; a broad memory question returned memory notes; the vague and unrelated queries returned exactly `Insufficient reference materials to answer this question.` The test found no JavaScript errors or external requests. See `e2e_results_v2.json`, `query_runs_v2.json`, and E1–E2 screenshots.
- **Screenshot descriptions:** E1 shows the RAG definition, four ranked source cards, a grounded cited answer, test-query chips, and prompt disclosure; E2 shows the no-reliable-material fallback for an unsupported query.

## Improvements, trade-offs, limitations

**Improvement:** Retrieval evidence, prompt construction, source attribution, and abstention behavior are observable and repeatable. Visitors can verify the original passage instead of receiving an unexplained excerpt. The structured corpus covers course notes and pre-existing project/paper-profile content.

**Trade-offs:** Keeping everything client-side makes the demo self-contained and avoids exposing API credentials, but downloads a multi-megabyte corpus and performs retrieval in the browser. BM25 is lexical; bilingual bigrams and a small phrase expansion help, but do not provide semantic understanding. The response quotes/extracts from the top passage instead of synthesizing multiple passages with a real model.

**Static-site constraint:** GitHub Pages has no backend proxy in this implementation. No real LLM API was called and no API key is embedded. “Generated Answer” labels the workflow stage; the nearby disclosure explicitly says the response is deterministic extractive assembly.

**Remaining defects / failed attempts:** An early Q02 ranking selected a `Tips:`-only fragment; a vague Q05 initially matched generic `class` text; and Q01 first ranked a “National Day holiday weekend” example above the RAG definition. The recorded fixes filter non-informative records at ranking time, remove generic query terms after normalization, and expand/weight the explicit RAG concept. See `retrieval_iteration_log.md`. Residual false positives can still occur for broad lexical queries, and this demo is not a substitute for semantic retrieval or model-generated answers.

## Screenshot capture and Judge evidence

The desktop interaction screenshots are stored in `evaluation/evidence/`. Capture the RAG panel after an explicit query and after a no-match query if refreshing the evidence; keep the desktop viewport and record browser/version, viewport, date, query, retrieved sources, and answer. Use `ai_judge_prompt_v2.md` in a new blank Judge session with only the rubric and listed website evidence. Save its complete response unchanged in `ai_judge_raw_output.md`.
