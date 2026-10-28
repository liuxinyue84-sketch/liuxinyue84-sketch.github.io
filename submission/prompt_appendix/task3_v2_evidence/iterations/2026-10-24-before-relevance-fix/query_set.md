# V2-RAG Test Query Set

Queries cover explicit concepts, a broad but relevant query, a vague query, and a completely out-of-scope request. Exact retrievals, BM25 scores, assembled prompt text, and page answer strings are archived in `query_runs_v2.json`.

| ID | Category | Exact query | Expected behavior |
|---|---|---|---|
| Q01 | Clear topic | What is retrieval-augmented generation and how does it use retrieved context? | Retrieve RAG definition and cite sources |
| Q02 | Clear topic | How does MapReduce divide and combine work? | Retrieve MapReduce pipeline evidence |
| Q03 | Clear topic | How do I evaluate tool use by an LLM agent? | Retrieve tool-selection/evaluation notes |
| Q04 | Broad but relevant | What did we discuss about memory? | Return relevant memory notes while retaining source citations |
| Q05 | Vague | Tell me about that thing from class. | Abstain with the required exact message |
| Q06 | Out of scope | What is the best recipe for tiramisu? | Abstain with the required exact message |

The initial pre-UI-revision browser run exercised five visible presets and a typed form submission. Its output is preserved under `iterations/2026-10-24-before-ui-simplification/`. The revised interface exposes only three natural suggested questions (Q01–Q03); broad, vague, and out-of-scope cases remain in this evaluation set and are covered by the deterministic query archive. Revised browser E2E is pending.
