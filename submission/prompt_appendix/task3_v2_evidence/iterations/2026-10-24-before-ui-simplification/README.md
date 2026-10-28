# V2-RAG Screenshot Evidence

Screenshots were captured from the local static site in desktop Chrome at a 1512×1000 browser viewport on 2026-10-24 (Asia/Hong_Kong). They capture the question module itself; the browser viewport was not set to mobile.

- `V2-RAG-01_retrieved-answer-desktop.png` — explicit retrieval-augmented generation query; ranked original source passages and citations on the left; deterministic grounded answer on the right.
- `V2-RAG-02_insufficient-materials-desktop.png` — vague query; no retrieved evidence and exact required insufficiency message.

Refresh captures with `node task3/v2/scripts/e2e_v2.cjs` while the local server is running. Keep the original query, browser viewport, and generated output in `e2e_results_v2.json`.
