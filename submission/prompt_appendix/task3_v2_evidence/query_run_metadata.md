# Query Run Metadata

- Version: V2-RAG
- Query cases: 25 (original six, eight agent/GNN relevance regressions, four retrieval/answer linkage cases, three CNN significance cases, three multi-source/answer-format cases, one MCP answer-gate regression)
- Structured knowledge records: 9831
- Method: client-side BM25 retrieval over neighboring source paragraphs + cited deterministic English summaries enriched from relevant recalled passages, exact no-material response only for zero hits
- Evidence detail: `query_runs_v2.json` stores exact queries, tokenization, ranked candidates, retrieved original paragraphs, source metadata, complete assembled prompts, page answer text, cleaned visitor reference text, and whether references were open by default.
- `relevance_regression_v2.json` applies ten shared invariants to all 28 archived evaluation queries. It checks output totality, relevant/irrelevant branching, relevant-only citations, preservation of all BM25 evidence, visitor-output cleanliness, answer shape, and the unchanged controls/disclosure. It contains no query-specific answer assertions.
- Revised browser check: pending; `e2e_results_v2.json` contains the pending marker. The initial browser result and screenshots are preserved under `iterations/2026-10-24-before-ui-simplification/`.
