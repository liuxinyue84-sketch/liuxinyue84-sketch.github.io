# Human vs AI Judge Comparison and Limitations

## Current version comparison — 2026-10-28

All AI values below come from independent clean-session Judge outputs saved without human scores in the Judge input.

| Version | Human total | AI Judge total | Difference (AI − human) |
|---|---:|---:|---:|
| V0 | 76 / 100 | 81 / 100 | +5 |
| V1 Few-shot | 86 / 100 | 85 / 100* | −1 |
| V2-RAG | 86 / 100 | 91 / 100 | +5 |

#*The V1 raw Judge output states 85/100, although its listed criterion scores recompute to 86/100. The comparison uses the unedited raw total; the arithmetic discrepancy is disclosed.

## Criterion-level comparison

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

## Version-specific raw outputs

- V0: `ai_raw_output_v0.md`
- V1: `ai_raw_output_v1.md`
- V2-RAG latest rerun: `ai_raw_output_v2_rerun.md` (91/100); the earlier V2 run is retained separately if present.

The raw Judge responses are preserved verbatim. The Judge sessions received only their fixed rubric/prompt and version-specific evidence, not human scores or this comparison.

## Disagreement analysis

V0 received a higher AI content score because the Judge treated the source evidence as sufficient to establish complete project contributions, while the human score was conservative about evidence coverage. V0 readability was scored lower by AI because only limited visual evidence was supplied; the human score relied on broader local inspection. V0 robustness was scored higher by AI because it counted the dated E2E interactions despite the untested valid Guestbook path.

V1 scores agree because the latest R12 evidence supplies both 35/35 E2E checks and 48-group content parity. The initial V2 Judge run scored 81/100 because the supplied evidence did not establish non-RAG portfolio behavior. After a fresh public non-RAG E2E record was added, the independent V2 Judge rerun scored 91/100 and raised Navigation & Task Completion from 3 to 5. The human score remains 86/100 because the available checks still do not cover valid Guestbook submission, reload persistence, mobile interaction, or stress behavior.

## Evaluator limitations

1. **Evidence coverage:** A screenshot shows only a specific viewport and state; it cannot establish all navigation paths, persistence, or error handling.
2. **Source-versus-runtime gap:** Code can describe intended behavior but does not prove the browser executed it correctly.
3. **Subjectivity:** Visual coherence, contribution clarity, and task clarity require judgment; two evaluators can reasonably interpret the same evidence differently.
4. **No direct interaction:** A text-only Judge cannot independently click the live site and should lower confidence when runtime evidence is absent.
5. **Version consistency:** Different browser runs, viewports, stored state, and test scopes can confound V0/V1/V2 comparison.
6. **Aggregate masking:** A weighted total can hide a weak criterion; per-criterion scores and concrete observations must be retained.

## Interpretation rule

AI scores are a second assessment, not ground truth. Disagreements are reported transparently, with raw outputs preserved. The V2 human score was independently assessed from current evidence and was not supplied to the V2 Judge.

## V2 Judge rerun after public non-RAG evidence — 2026-10-28

After adding the fresh public RAG and non-RAG E2E records, an independent V2 Judge rerun produced **91/100** (5, 5, 4, 4). The earlier V2 score of 81/100 remains preserved as the pre-rerun result; it is not overwritten. The rerun raised Navigation & Task Completion from 3 to 5 because the new evidence verified navigation, education disclosure, project expansion/filtering/saving, Life media/photo preview, Guestbook form availability, and nine RAG cases. Readability remained 4 because only the 1512x1000 desktop viewport was evidenced. Robustness remained 4 because the non-RAG run recorded one favicon 404 and did not test reload persistence, stress behavior, or mobile interaction.
