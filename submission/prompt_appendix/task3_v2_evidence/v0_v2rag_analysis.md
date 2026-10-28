# V0 vs V2-RAG Analysis

> **Evidence status, 2026-10-24:** This comparison and the preliminary V2 scores describe the first V2-RAG UI. Later changes removed prompt display and culminated in a generic semantic relevance and answer pipeline shared by every query. All BM25 hits remain visible, while only chunks accepted by the shared filter may support an answer. Earlier query-specific answer implementations are preserved under `iterations/` as failed attempts. Browser screenshots/E2E and a new human/AI assessment of the current V2 remain pending. Do not use historical screenshots or scores as proof of the revised version. See `generic_semantic_pipeline_refactor.md` and the dated repair logs.

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
- **First V2 behavior:** the visitor saw original retrieved passages and citations separately from the answer and could inspect the exact assembled prompt. The revised UI keeps separate source and excerpt sections, but the complete prompt is now retained only in code/archive, not shown on the page. `rag-v2.js` applies BM25 over 9,831 structured paragraphs from eight course notes and four existing V0 project profiles.
- **Historical runtime evidence:** six desktop browser tests passed before the UI revision. The result is preserved in `iterations/2026-10-24-before-ui-simplification/e2e_results_v2.json`. The revised UI's deterministic query archive is `query_runs_v2.json`; browser E2E remains pending.
- **Historical screenshot descriptions:** The pre-revision E1 and E2 screenshots are preserved under `iterations/2026-10-24-before-ui-simplification/` and as `_PRE_UI` files in `evidence/`. They do not show the revised interface.

## Improvements, trade-offs, limitations

**Improvement:** Retrieval evidence, prompt construction, source attribution, and abstention behavior are observable and repeatable. Visitors can verify the original passage instead of receiving an unexplained excerpt. The structured corpus covers course notes and pre-existing project/paper-profile content.

**Trade-offs:** Keeping everything client-side makes the demo self-contained and avoids exposing API credentials, but downloads a multi-megabyte corpus and performs retrieval in the browser. BM25 is lexical; bilingual bigrams and a small phrase expansion help, but do not provide semantic understanding. The response quotes/extracts from the top passage instead of synthesizing multiple passages with a real model.

**Static-site constraint:** GitHub Pages has no backend proxy in this implementation. No real LLM API was called and no API key is embedded. The revised page labels its response “Answer from sources” and states that it quotes an excerpt rather than claiming live AI generation.

**Remaining defects / failed attempts:** An early Q02 ranking selected a `Tips:`-only fragment; a vague Q05 initially matched generic `class` text; and Q01 first ranked a “National Day holiday weekend” example above the RAG definition. The recorded fixes filter non-informative records at ranking time, remove generic query terms after normalization, and expand/weight the explicit RAG concept. See `retrieval_iteration_log.md`. Residual false positives can still occur for broad lexical queries, and this demo is not a substitute for semantic retrieval or model-generated answers.

**Later relevance repair:** The user independently found a false positive for `agent是什么`: the answer cited a GNN passage because interrogative bigrams outweighed the actual subject. The repair removes question phrasing, groups short source paragraphs, emphasizes body evidence, and asks for clarification on the ambiguous `memory` query. The before/after evidence and test limitations are in `relevance_fix_log.md`. The original V0–V2 scores above have not been recalculated from the revised browser UI.

**Earlier visitor UI revision:** Answers used concise, source-checked English summaries for supported course-note topics with `[R1]` citations. The `Retrieved Reference Materials` panel became a native disclosure closed by default; displayed snippets were cleaned of Markdown/LaTeX debris and KB record IDs. At that stage, an unsupported query could still trigger the no-material message despite showing a retrieved passage; the assembled prompt and raw records remained in the evaluation archive, not in the visible page. This was a static RAG workflow demonstration without live model generation.

**Subsequent linkage repair:** The prior answer catalog could return the no-material message even when retrieval displayed passages. Now the no-material sentence is exclusive to zero-hit retrieval. Nonempty results yield a cited English summary, using controlled topic summaries or cautious extraction from the retrieved evidence. The Chinese debug shortcut was removed, leaving exactly the three requested English shortcuts. See `linked_answer_fix_log.md`.

**CNN significance repair:** The user's exact question `cnn的开创性意义` originally yielded zero passages because the Chinese significance phrase became low-coverage bigrams; this was a retrieval failure despite relevant course notes. The updated retrieval maps that intent to source-attested CNN terms and retrieves LeNet-5, AlexNet, and the CNN definition. Its English answer explains local connectivity, weight sharing, digit recognition, and larger-scale image learning with matching citations. At that revision, the deterministic suite passed 21/21 cases, including two CNN paraphrases; browser E2E and the revised screenshot are still pending. See `cnn_significance_repair_log.md`.

**Later multi-source answer revision:** The prior generic answer could direct visitors to open a reference, and many curated answers summarized only `[R1]`. The revised deterministic composer inspects every retrieved passage, adds distinct supported claims from relevant sources, and avoids citing unrelated matches. For example, the RAG explanation uses `[R1][R3][R4]`, the diffusion explanation uses all four references, and the CNN significance answer uses `[R1][R2][R3]`. Two new uncovered-topic cases check overfitting and breadth-first search. At that revision, the suite passed 23/23 script assertions, including citation validity and banned-phrase checks; this did not constitute browser or Judge verification. See `multi_source_answer_log.md`.

**Answer card cleanup revision:** The revised visitor output has an opening sentence and 2–4 cited points; unrelated recalled passages can remain in the default-closed **View Retrieved Reference Materials** section without appearing in the answer. Weak lexical candidates that lacked enough answer-bearing evidence remained only in the internal candidate trace, so the final reference set was empty and the exact no-material response was used. The banned redirection/inability phrases were removed, and cleaned reference passages were no longer truncated mid-sentence. At that revision, the suite passed 24/24 deterministic assertions. Its strict answer-bearing gate was subsequently removed after the MCP regression described below. See `answer_card_cleanup_log.md`.

**MCP repairs:** The answer-quality gate first caused a regression: `What is MCP?` ranked four correct note sections but erased them because the mixed-language text did not pass a generic English-sentence threshold. Retrieval no longer calls the answer composer or clears valid hits. A later test showed that `MCP的作用` retrieved four passages but rendered a blank Answer card because its Chinese intent was not mapped to the MCP composer. MCP-specific ranking and bilingual intent handling now produce a source-checked summary covering the standardized interface, Host–Client–Server roles, and stdio/HTTP transports. The current suite passes 26/26 deterministic assertions; browser and independent Judge checks remain pending. See `mcp_answer_gate_repair_log.md`.

**Current generic pipeline revision:** The topic-by-topic answer catalog described above was identified as the underlying design defect and removed from the current source. Every query now uses the same intent profile, chunk relevance assessment, noise separation, English evidence extraction, deduplication, citation, and abstention rules. The 28 accumulated questions are an evaluation corpus rather than 28 hard-coded expectations; all pass eight shared pipeline invariants. See `generic_semantic_pipeline_refactor.md`. Browser and independent Judge checks remain pending.

## Screenshot capture and Judge evidence

The previous desktop screenshots are marked `_PRE_UI` in `evaluation/evidence/` and copied to `evaluation/iterations/2026-10-24-before-ui-simplification/`. Capture the revised RAG panel after an explicit query and after a no-match query before final comparison; keep the desktop viewport and record browser/version, viewport, date, query, retrieved sources, and answer. Then use `ai_judge_prompt_v2.md` in a new blank Judge session with only the rubric and current website evidence. Save its complete response unchanged in `ai_judge_raw_output.md`.
