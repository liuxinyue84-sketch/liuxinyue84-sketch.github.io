# V2-RAG Evidence Index

This index distinguishes current final evidence from retained iteration evidence. Dated `_PRE_UI` screenshots and screenshots under `iterations/` document earlier interface states or reported failures; they are not evidence of the final interface.

## Current final evidence

- `V2-RAG-01_retrieved-answer-desktop.png` — public desktop RAG answer with cited retrieved sources.
- `V2-RAG-02_insufficient-materials-desktop.png` — public desktop no-evidence answer.
- `V2-RAG-03_agent-definition-desktop.png` — public desktop agent query and answer.
- `V2-RAG-04_cnn-significance-desktop.png` — public desktop CNN query and answer.
- `V2-RAG-05_mcp-definition-desktop.png` — public desktop MCP query and answer.
- `V2-public-E2E-*.png` — public desktop site and interaction states.
- `../e2e_results_v2.json` — public V2 RAG E2E record (9/9 cases, 2026-10-28).
- `../nonrag_public_e2e.json` — separate public non-RAG interaction record (13 functional checks; one favicon 404).
- `../relevance_regression_v2.json` — 28 archived queries checked against 10 shared pipeline invariants; all checks pass. This is deterministic regression evidence, not browser E2E.
- `../../../evaluation/ai_raw_output_v2_rerun.md` — independent clean-session AI Judge raw response (91/100).

The public runs used Google Chrome headless at 1512×1000. The evidence does not establish full mobile, accessibility, or stress-test coverage.

## Historical and failure evidence

`V2-RAG-01_retrieved-answer-desktop_PRE_UI.png` and `V2-RAG-02_insufficient-materials-desktop_PRE_UI.png` show the initial UI before visitor-facing prompt removal and answer cleanup. The dated screenshots under `iterations/` preserve reported failures such as the early agent/GNN mismatch, CNN no-retrieval result, GNN ranking issue, and compound-query failure. Keep them as change-history evidence; do not present them as final behavior.

The former browser-server limitation and pending-capture notes in earlier dated logs describe the state when those logs were written. The public final screenshots and test records listed above supersede those status notes.
