# Human vs AI Judge Comparison and Limitations

## Current official Task 2 comparison — 2026-10-28

The table below compares the fixed four-criterion Task 2 human assessment with each independent AI Judge result. The official human scores are recorded in `human_self_assessment.md`, `human_v1_assessment.md`, and `human_v2_assessment.md`. The V2 value uses the latest clean-session rerun only.

| Version | Human total | AI Judge raw total | AI Judge recomputed total | Difference (raw AI − human) |
|---|---:|---:|---:|---:|
| V0 | 76 / 100 | 81 / 100 | 81 / 100 | +5 |
| V1 Few-shot | 86 / 100 | 85 / 100 | 86 / 100 | −1 |
| V2-RAG | 86 / 100 | 91 / 100 | 91 / 100 | +5 |

The V1 human criterion scores (5, 4, 4, 4) produce 86/100 under the fixed weights. The raw V1 AI Judge output states 85/100, while its listed criterion scores (also 5, 4, 4, 4) recompute to 86/100. The raw value is preserved for auditability; the recomputed value is shown separately and is not substituted for the raw output.

### Criterion-level comparison

| Version | Criterion | Human / 5 | AI / 5 | Difference |
|---|---|---:|---:|---:|
| V0 | Content completeness | 4 | 5 | +1 |
| V0 | Navigation & task completion | 4 | 4 | 0 |
| V0 | Readability & visual consistency | 4 | 3 | −1 |
| V0 | Interaction robustness | 3 | 4 | +1 |
| V1 | Content completeness | 5 | 5 | 0 |
| V1 | Navigation & task completion | 4 | 4 | 0 |
| V1 | Readability & visual consistency | 4 | 4 | 0 |
| V1 | Interaction robustness | 4 | 4 | 0 |
| V2-RAG | Content completeness | 5 | 5 | 0 |
| V2-RAG | Navigation & task completion | 4 | 5 | +1 |
| V2-RAG | Readability & visual consistency | 4 | 4 | 0 |
| V2-RAG | Interaction robustness | 4 | 4 | 0 |

### Raw AI Judge outputs

- V0: `ai_raw_output_v0.md`
- V1 Few-shot: `ai_raw_output_v1.md`
- V2-RAG latest rerun: `ai_raw_output_v2_rerun.md`

The current table does not use the earlier V2 pre-rerun score. The latest V2 raw output is preserved verbatim. Judge sessions received their fixed rubric/prompt and version-specific evidence, not human scores or this comparison.

## Disagreement analysis

V0 received a higher AI content score because the Judge treated the source evidence as sufficient to establish complete project contributions, while the human score was conservative about evidence coverage. V0 readability was scored lower by AI because only limited visual evidence was supplied; the human score relied on broader local inspection. V0 robustness was scored higher by AI because it counted the dated E2E interactions despite the untested valid Guestbook path.

V1 criterion-level scores agree (5, 4, 4, 4). The human weighted total is 86; the AI raw total is 85, but recomputing from its listed criterion scores yields 86. The one-point raw-total difference is an arithmetic discrepancy in the AI response, not a criterion-level disagreement. The latest R12 evidence supplies both 35/35 E2E checks and 48-group content parity. For V2, the current AI Judge awards 5/5 for navigation based on fresh public non-RAG interaction evidence, while the independently recorded human score remains 4/5 because it was assessed under a more conservative evidence threshold.

## Evaluator limitations

1. **Evidence coverage:** A screenshot shows only a specific viewport and state; it cannot establish all navigation paths, persistence, or error handling.
2. **Source-versus-runtime gap:** Code can describe intended behavior but does not prove the browser executed it correctly.
3. **Subjectivity:** Visual coherence, contribution clarity, and task clarity require judgment; two evaluators can reasonably interpret the same evidence differently.
4. **No direct interaction:** A text-only Judge cannot independently click the live site and should lower confidence when runtime evidence is absent.
5. **Version consistency:** Different browser runs, viewports, stored state, and test scopes can confound V0/V1/V2 comparison.
6. **Aggregate masking:** A weighted total can hide a weak criterion; per-criterion scores and concrete observations must be retained.

## Interpretation rule

AI scores are a second assessment, not ground truth. Disagreements are reported transparently, with raw outputs preserved. The V2 human score was independently assessed from current evidence and was not supplied to the V2 Judge.
