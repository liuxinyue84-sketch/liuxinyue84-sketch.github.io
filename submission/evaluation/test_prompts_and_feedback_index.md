# Task 2 Test Prompts and Feedback Index

This index points to the actual saved test operations, query prompts, outputs, and feedback. It does not reconstruct missing historical interactions.

## V0 baseline

- **Dated public browser operations and observations:** `evidence/V0/2026-10-23_live_e2e_test.md`.
- **Captured browser evidence:** `evidence/V0/E2E-01_desktop-home_2026-10-23.png`.
- **Specific RAG test prompts and observed outcomes:** the dated log records “What is retrieval-augmented generation?” as relevant, and “How does MapReduce work?” as having a weak/irrelevant leading excerpt. It also records the empty Guestbook submission, music autoplay restriction, and untested valid Guestbook submission.
- **AI Judge evidence used for V0:** listed in `ai_raw_output_v0.md`. The raw Judge response is preserved; provenance discrepancies are disclosed in `record_corrections.md`.

## V1 Few-Shot version

- **Earlier version-level test prompts and feedback:** `evidence/V1/V1_E2E_test_log.md`.
- **Latest Iteration 12 E2E checks:** `evidence/V1/V1-R12-e2e-results.json`.
- **Content-preservation comparison:** `evidence/V1/V1-R12-content-parity.json`.
- **Screenshots submitted with the R12 evidence:** files named `V1-R12-*.png` in `evidence/V1/`.
- **Few-Shot prompt iterations and examples:** `../prompt_appendix/task3_v1/icl_prompt*.md` and `few_shot_examples*.md`; they are included in `../prompt_appendix.md`.

## V2 RAG version

- **RAG query set and expected behavior:** `../prompt_appendix/task3_v2_evidence/query_set.md`.
- **Exact per-query retrieval candidates, assembled prompt, answer and displayed references:** `../prompt_appendix/task3_v2_evidence/query_runs_v2.json` and `title_gate_query_results.json`.
- **Latest deployed RAG E2E result:** `evidence/V2/e2e_results_v2.json` (9/9 recorded cases passed).
- **Public non-RAG browser checks:** `evidence/V2/nonrag_public_e2e.json`.
- **Current screenshots:** PNG files in `evidence/V2/`; older pre-UI screenshots are retained separately under `prompt_appendix/task3_v2_evidence/iterations/` and labeled historical.
- **AI Judge output based on the latest evidence:** `ai_raw_output_v2_rerun.md`.

## Feedback and repair history

V1 design feedback, Few-Shot prompt revisions, and implementation changes are in `../prompt_appendix/task3_v1/`. V2 user-reported failures and shared-pipeline repairs are recorded as dated/named Markdown logs under `../prompt_appendix/task3_v2_evidence/`; those records are compiled into `../prompt_appendix.md`. Exact test outputs remain in the JSON files listed above.
