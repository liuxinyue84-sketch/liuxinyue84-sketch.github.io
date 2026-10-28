# COMP5583 Final Experiment Submission

## Public websites

- V0 baseline: https://liuxinyue84-sketch.github.io/
- V1 Few-shot: https://liuxinyue84-sketch.github.io/V1/
- V2 RAG: https://liuxinyue84-sketch.github.io/V2/

## Package contents

- `report.pdf` — Chinese main report (8 pages).
- `COMP5583_实验报告_中文版.docx` — editable Word version of the report.
- `website/V0/`, `website/V1/`, `website/V2/` — independent complete source copies with static assets and local README files.
- `evaluation/` — fixed rubric, human assessments, independent AI Judge prompts and raw outputs, comparison records, deployment record, and latest V2 browser-test results.
- `prompt_appendix/task1_v0/` — V0 initial prompt and trace notes; reconstructed history is explicitly distinguished from verbatim source.
- `prompt_appendix/task3_v1/` — Few-shot inputs, reference-pattern decisions, source snapshots, and iteration record.
- `prompt_appendix/task3_v2_evidence/` — RAG corpus/query/prompt/output evidence, failure and repair logs, screenshots, and V0-lineage checks.

## Scores

Official AI Judge totals: V0 81/100, V1 85/100, V2 latest rerun 91/100. The V1 raw output reports 85, while its criterion scores recompute to 86 using the rubric weights; both values are disclosed in the report without altering the raw output.

The original Task 2 V0 human self-assessment is 76/100. The separate version-sensitive supplementary human assessment is V0 79, V1 90, V2 91; it does not replace the official rubric.

## Local preview

Run a static server from the version directory, for example:

```sh
cd website/V2
python3 -m http.server 8000
```

Open `http://localhost:8000/`. Repeat with `website/V0/` or `website/V1/` to preview the other archived versions.

## Evidence limitations

The V2 public desktop run recorded nine RAG checks passing and a separate non-RAG run recorded 13 checks passing with one favicon 404. The report discloses the 404 and the lack of full-site mobile/accessibility evidence. Some historical Trae prompts were not exported verbatim; the appendix labels reconstructed summaries accordingly.
