# Task 3 — V2 RAG Evidence Archive

This folder contains the V2 technique inputs and iteration evidence. V2 is derived from frozen V0, not from V1.

- `knowledge_base_manifest.md`, `query_set.md`, and `query_runs_v2.json` — corpus provenance, test queries, retrieved passages, assembled prompts, and page outputs.
- `rag_prompt_template.md`, `relevance_regression_v2.json`, and the `manual_*_probe.json` files — shared answer workflow and regression evidence.
- `*_log.md` and `iterations/` — recorded failures, user feedback, attempted repairs, and pre-change snapshots. These are retained because the coursework requires iteration evidence.
- `evidence/` — current V2 screenshots and explicitly labeled historical pre-UI screenshots.
- `ai_judge_prompt_v2.md` — clean-session Judge prompt and available run metadata.
- `v0_v2rag_analysis.md`, `v2_v0_lineage_check.md`, and `deployment_record.md` — version comparison, independent-branch verification, and deployment evidence.

The latest V2 AI Judge raw output is `../../evaluation/ai_raw_output_v2_rerun.md` (91/100). The 2026-10-28 public run records 9/9 RAG checks and a separate non-RAG run records 13 functional checks with one favicon 404. Detailed test records and the fixed rubric are in `../../evaluation/`.
