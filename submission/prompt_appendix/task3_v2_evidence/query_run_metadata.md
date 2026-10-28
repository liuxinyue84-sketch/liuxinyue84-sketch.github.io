# Query Run Metadata

- Version: V2-RAG
- Archived evaluation queries: 28, checked by the generic regression suite
- Structured knowledge records: 9831
- Method: client-side BM25 retrieval over neighboring source paragraphs + cited deterministic English summaries enriched from relevant recalled passages, exact no-material response only for zero hits
- Evidence detail: `query_runs_v2.json` stores exact queries, tokenization, ranked candidates, retrieved original paragraphs, source metadata, complete assembled prompts, page answer text, cleaned visitor reference text, and whether references were open by default.
- `relevance_regression_v2.json` applies ten shared invariants to all 28 archived evaluation queries. It checks output totality, relevant/irrelevant branching, relevant-only citations, preservation of all BM25 evidence, visitor-output cleanliness, answer shape, and the unchanged controls/disclosure. It contains no query-specific answer assertions.
- Latest public browser check: 9/9 RAG cases passed at 1512×1000 on 2026-10-28; see `e2e_results_v2.json`. Ten shared invariants pass across all 28 archived evaluation queries in `relevance_regression_v2.json`. Earlier UI screenshots and browser states remain under `iterations/` as historical evidence.
