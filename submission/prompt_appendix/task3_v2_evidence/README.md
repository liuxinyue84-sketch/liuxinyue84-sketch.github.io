# V2-RAG Evaluation Archive

This folder preserves the fixed Task 2 rubric, V2 RAG evidence, browser tests, assessment, prompt records, and version comparison.

**Current evidence status:** The 2026-10-27 visitor UI uses one shared title-led relevance and extractive answer pipeline for every query, with a concept-variant guard, a head-token rule and one-section answer reading (see `answer_consistency_and_language_guard.md`). All BM25 hits remain in the folded evidence panel; only units whose titles directly match the queried subject may support the cited answer. Body-only keyword matches remain visible evidence but cannot enter the Answer. Zero usable title-qualified units produce the exact no-material message. The fixed 28-query regression passes all ten generic invariants, local browser QA verified both answer branches, and the V2 deployment was verified on 2026-10-28. Current human and independent AI Judge records are now stored in this folder.

- `rubric.md` — unchanged copy of the fixed four-criterion Task 2 rubric.
- `query_set.md` — the full regression query set and categories.
- `query_runs_v2.json` — for each query: tokenized terms, ranked candidates, full original retrieved paragraphs, source metadata, complete assembled RAG prompt, and page output.
- `relevance_regression_v2.json` — ten generic pipeline invariants applied uniformly to the complete 28-query evaluation corpus; it contains no per-query expected answer text.
- `title_gate_query_results.json` — current complete query output after applying the title-led gate.
- `title_led_relevance_gate.md` — problem diagnosis, generic repair, observed checks, and precision/recall trade-off.
- `compound_query_title_gate_fix.md` — false-negative diagnosis and generic repair for a main concept followed by a secondary how/why/what clause.
- `manual_compound_query_probe.json` — complete post-fix output for the exact reported compound RAG query.
- `base_concept_title_reranking.md` — title-only `baseConceptScore` rule and the GNN definition-versus-comparison repair.
- `manual_base_concept_score_probe.json` — complete post-fix GNN reranking output with component scores.
- `bare_concept_and_process_pipeline_fix.md` — general repair for short concept queries, title specificity, process evidence and sentence-level relevance, with cross-topic verification.
- `deployment_record.md` — public V2 URL, deployment commit/workflow, scope protection, and post-deployment HTTP checks.
- `generic_semantic_pipeline_refactor.md` — rationale, shared filtering/generation design, preserved behavior, and test-method change.
- `coherent_answer_generation_log.md` — shared prose-quality rules, evidence requirements, and validation result.
- `exercise_solution_relevance_log.md` — generic rule for exercises, quizzes, worked explanations, and formula evidence.
- `clause_provenance_validation_log.md` — clause-level topic matching and formula-ownership validation.
- `component_relevance_log.md` — parent-concept/component relevance and source-grounded bilingual normalization.
- `bilingual_evidence_repair_log.md` — 2026-10-25 diagnosis and general repair for relevant Chinese/mixed-language evidence being discarded before answer composition.
- `manual_bilingual_evidence_probe.json` — complete deterministic `attention` probe after the bilingual evidence repair.
- `manual_component_relevance_probe.json` — non-Q-number Transformer/KV-Cache validation output.
- `manual_clause_provenance_probe.json` — non-Q-number diffusion probe confirming that a foreign reconstruction loss is excluded.
- `manual_exercise_solution_probe.json` — non-Q-number probe showing the rule and cited answer output.
- `rag_prompt_template.md` — generic prompt with placeholders.
- `answer_consistency_and_language_guard.md` — 2026-10-27 diagnosis and general repair for verbatim bilingual quoting and unstable stage order, with the verification run recorded.
- `v2_v0_lineage_check.md` — proof that V2 is frozen V0 plus one redesigned module: V0 hashes, file-by-file comparison, the two page-wide CSS overrides removed on 2026-10-27, and the post-change test run.
- `e2e_results_v2.json` — actual desktop Chrome output of the current build (9 checks, no console errors, no external requests).
- `evidence/` — current V2 screenshots plus `_PRE_UI` historical screenshots.
- `human_v2_assessment.md` — current 2026-10-28 human reassessment plus preserved historical score.
- `ai_judge_prompt_v2.md` — independent clean-session Judge prompt; it excludes human scores/opinions.
- `ai_judge_raw_output.md` — complete V2-RAG independent Judge response, preserved verbatim.
- `v0_v2rag_analysis.md` — score comparison, observable behavior, screenshots, trade-offs, and limitations.
- `retrieval_iteration_log.md` — recorded ranking/boundary failures and corrections.
- `knowledge_base_manifest.md` — corpus provenance and record counts.
- `ui_simplification_log.md` — user feedback, source changes, preserved traces, and verification limits.
- `relevance_fix_log.md` — reported wrong answer, retrieved-source analysis, repair steps, and regression evidence.
- `visitor_answer_cleanup_log.md` — user-requested visitor UI cleanup, answer limits, before/after behavior, and verification boundary.
- `linked_answer_fix_log.md` — later correction of references-plus-insufficient contradiction and removal of the Chinese debug shortcut.
- `cnn_significance_repair_log.md` — user-reported zero-recall CNN query, source evidence, retrieval/answer repair, and verification limits.
- `multi_source_answer_log.md` — revised answer synthesis, citation policy, removed placeholder wording, and verification limits.
- `answer_card_cleanup_log.md` — visitor-facing Answer and reference disclosure revision, evidence gate, styling, and verification limits.
- `mcp_answer_gate_repair_log.md` — MCP false-abstention cause, removal of the retrieval gate, cited answer, and verification limits.
- `iterations/2026-10-24-before-ui-simplification/` — complete pre-change source/test/document snapshot.
- `iterations/2026-10-24-before-relevance-fix/` — the user screenshot and pre-repair query/code snapshot.
- `iterations/2026-10-25-before-bilingual-evidence-fallback/` — source and test snapshot immediately before the bilingual evidence repair.

## Re-run checks

From the project root:

```sh
python3 task3/v2/scripts/build_knowledge_base.py
node task3/v2/scripts/run_queries.cjs > task3/v2/evaluation/query_runs_v2.json
node task3/v2/scripts/relevance_regression.cjs
node task3/v2/scripts/e2e_v2.cjs
```

The end-to-end script defaults to the local V2 `file:` URL and uses desktop Chrome. Set `V2_SITE_URL` to a served URL if needed. It is configured to write four revised evidence screenshots and `e2e_results_v2.json`. All three commands were executed for this revision: 28 queries, ten generic invariants and nine browser checks passed, and the five screenshots in `evidence/` were re-captured from the same run.

## Judge status

The V2 clean-session Judge response is preserved verbatim in `ai_judge_raw_output.md`. It was run without the human assessment or comparison document.
