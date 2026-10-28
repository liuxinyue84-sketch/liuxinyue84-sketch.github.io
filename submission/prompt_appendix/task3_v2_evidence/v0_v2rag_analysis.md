# V0 vs V2-RAG Analysis

## Version lineage and technique

V2-RAG was copied from frozen V0 and developed independently; it was not derived from V1. The V0 baseline hashes are recorded in `v0_baseline_sha256.txt` and remain unchanged. V2 changes the course-note question module while retaining the rest of the V0 portfolio.

The formal technique is Retrieval-Augmented Generation (RAG). The static GitHub Pages implementation demonstrates the workflow in the browser: a structured course-note corpus is searched with BM25, retrieved excerpts and source metadata are shown in a collapsed reference panel, and a deterministic, cited English answer is composed from relevant evidence. It has no backend proxy, makes no live LLM API call, and embeds no API key; therefore it is an educational RAG workflow simulation, not a production or model-generated RAG service.

## Scores and evidence basis

The fixed Task 2 rubric and its weights are retained for the official AI-Judge comparison. Independent clean-session Judge outputs are preserved verbatim in `../../evaluation/ai_raw_output_v0.md` and `../../evaluation/ai_raw_output_v2_rerun.md`.

| Criterion | Weight | V0 AI Judge | V2 AI Judge | Change |
|---|---:|---:|---:|---:|
| Content Completeness & Clear Contribution | 30% | 5/5 | 5/5 | 0 |
| Navigation & Task Completion | 25% | 4/5 | 5/5 | +1 |
| Readability & Visual Consistency | 25% | 3/5 | 4/5 | +1 |
| Interaction Robustness | 20% | 4/5 | 4/5 | 0 |
| **Weighted total** | **100%** | **81/100** | **91/100** | **+10** |

Human scores are a separate assessment and should not be mixed into this table. The original fixed-rubric V0 human self-assessment is 76/100; the current V2 fixed-rubric human reassessment is 86/100. A separate version-sensitive supplementary assessment records V0 79, V1 90, and V2 91; it supplements rather than replaces the fixed rubric.

## Observable changes and tests

- V0's course-note module performs client-side BM25 retrieval and can surface a weak leading passage for a query such as MapReduce. Its original behavior and dated observations remain in the V0 source/evaluation archive.
- V2 separates the answer from source evidence. Visitors can inspect cleaned retrieved passages and citations by opening **View Retrieved Reference Materials**; internal prompt/debug text is not part of the visitor UI.
- The generic relevance and answer workflow preserves all BM25 hits in the evidence panel, separates answer-supporting chunks from noise, produces cited English responses from relevant material, and uses the insufficient-materials message when no relevant evidence is accepted. The 28-query regression record checks 10 shared invariants without per-query expected answers; all pass.
- The latest public RAG E2E run passed 9/9 representative cases on 2026-10-28, including RAG, MapReduce, memory, vague and out-of-scope questions, tool use, Chinese agent wording, CNN significance, and MCP. Current screenshots are indexed in `evidence/README.md`.
- A separate public non-RAG E2E record covers 13 functional checks across navigation, education disclosure, projects, filters/saves, media, and Guestbook availability. It records one favicon 404; no valid Guestbook submission, reload persistence, full mobile flow, or stress test is claimed.

## Improvements, trade-offs, and limitations

V2 makes retrieval evidence inspectable, gives visitors a concise answer area, cites supporting sources, and handles tested unsupported queries with a consistent abstention message. The public tests and Judge output provide stronger V2-specific evidence than the initial iteration; historical failures and repairs remain documented in the dated logs.

The implementation remains constrained by static hosting. BM25 and title-led relevance heuristics are lexical and may miss paraphrases or rank imperfectly. The answer composer is deterministic rather than a live LLM, so it cannot provide open-ended semantic synthesis beyond its evidence rules. The corpus increases client-side download and processing cost. Browser evidence is desktop-only at 1512×1000; the separate non-RAG run reported one favicon 404, and accessibility, mobile, repeated-session persistence, and stress behavior remain unverified.

## Iteration record

The initial UI exposed too much prompt/debug material; later revisions removed that from the visitor view and put references behind a closed-by-default disclosure. Early answer gates and query-specific answer handling caused false abstentions, blank outputs, and topic mismatches. Those failed approaches were removed in favor of shared relevance, noise filtering, citation, and fallback rules. Specific before/after screenshots and logs are retained under `iterations/` and the dated `*_log.md` files. Pending statements inside those dated logs describe the state at the time and are superseded by the final evidence above.
