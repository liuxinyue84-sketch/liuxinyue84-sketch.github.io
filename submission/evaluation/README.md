# Evaluation Archive Index

This folder contains the fixed Task 2 rubric, independent AI Judge prompts and verbatim outputs, human assessments, comparison, and consolidated per-version runtime evidence. The same four-criterion rubric is used for the official V0/V1/V2 comparison; the five-dimension score table is explicitly supplementary.

## Rubric and clean-session Judge materials

- `rubric.md` — official fixed four-criterion rubric.
- `ai_judge_prompt.md` — preserved V0 clean-session prompt. Its final evidence-file pointer uses an obsolete generic filename; actual output files are listed above. Version-specific V1/V2 instructions are in their respective appendix records.
- `ai_raw_output_v0.md`, `ai_raw_output_v1.md`, `ai_raw_output_v2_rerun.md` — raw Judge outputs and run metadata. V2 uses the latest rerun (91/100).
- `comparison_and_limitations.md` — corrected comparison of official human scores and current AI Judge totals; V2 rerun is the current result.
- `human_self_assessment.md`, `human_v1_assessment.md`, `human_v2_assessment.md` — official-rubric human scoring and evidence.
- `supplementary_rubric.md`, `supplementary_human_assessment.md` — version-sensitive supplementary evaluation, separate from the fixed Task 2 rubric.
- `record_corrections.md` — evidence provenance discrepancies and corrections without editing raw Judge outputs.

## Test prompts, operations, and feedback

See `test_prompts_and_feedback_index.md` for the concise Task 2 index of exact test records and their feedback.

- **V0:** `evidence/V0/2026-10-23_live_e2e_test.md` contains dated test operations, observed outcomes, and limitations. The homepage capture is `evidence/V0/E2E-01_desktop-home_2026-10-23.png`.
- **V1:** `evidence/V1/V1_E2E_test_log.md` records representative test prompts/actions and outcomes. The later Iteration 12 Judge evidence (R12 JSON and screenshots) is in `evidence/V1/`; the detailed Few-Shot prompt history is under `../prompt_appendix/task3_v1/` and compiled in `../prompt_appendix.md`.
- **V2:** `evidence/V2/e2e_results_v2.json` is the latest public RAG E2E result; `evidence/V2/nonrag_public_e2e.json` is the public non-RAG run. RAG query set and detailed per-query retrieval/output records are under `../prompt_appendix/task3_v2_evidence/query_set.md`, `query_runs_v2.json`, and `e2e_results_v2.json`.
- V2 screenshots are consolidated in `evidence/V2/`; the original archive copies remain under `../prompt_appendix/task3_v2_evidence/evidence/`.

## Evidence boundary

The V0 E2E log and homepage image now included were recovered from the project’s retained V0 evaluation archive; they were not recreated. The V0 clean-session raw Judge output remains unchanged. Its original evidence manifest has a mismatch: it says E7 full-page screenshots were unavailable, while the raw Judge response cites E7. `record_corrections.md` documents this. Do not treat absent V0 screenshots as supplied to the historical Judge session.

V1 R12 files and V2 test records are copied for convenient review; the prompt-appendix copies remain the archival source. Machine-readable JSON records preserve exact query/action details and outputs; they are not rewritten into reconstructed “raw prompts.”
