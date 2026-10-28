# V2-RAG Retrieval/Answer Linkage Repair — 2026-10-24

## User-reported defects

1. A query could display one or more retrieved reference passages while the answer area said `Insufficient reference materials to answer this question.` The retrieval stage and the small curated-answer catalog had separate success conditions. For example, **“How do agents use tools?”** retrieved four passages, while the former answer function returned `null` and displayed the no-material message. **“What are the limitations of RAG?”** retrieved one relevant passage and produced the same contradiction.
2. The visitor shortcut row still contained a Chinese `Agent 是什么？` test button. The tool-use shortcut also used a label different from the requested “How do agents use tools?”.

The preceding implementation, scripts, and query output are retained under `iterations/2026-10-24-before-linked-answer-fix/`. Frozen V0 and V1 were not edited.

## Repair

- `website/rag-v2.js`: `renderAnswer` now selects the exact no-material sentence **only when `hits.length === 0`**. Every nonempty retrieval gets a source-cited English response. Source-checked summaries cover the common topics; other queries use matching English evidence sentences from the retrieved passages, and Chinese-only passages receive a cautious English source description. This is deterministic formatting, not a live LLM call.
- `website/rag-v2.js`: the internal assembled prompt template now states the same zero-hit-only abstention rule. It remains in code and evaluation records, never in visible HTML.
- `website/rag-v2.js`: added supported summaries for agent tool use, simple-RAG limitations, diffusion sampling, and reinforcement learning. Broad `memory` results summarize both meanings with `[R1]` and `[R2]` citations instead of only posing a follow-up question.
- `website/index.html`: the shortcut row is exactly **What is RAG?**, **How does MapReduce work?**, **How do agents use tools?**. The `agent是什么` case remains available in the test archive and typed form, but no Chinese debug shortcut appears on the page.
- `scripts/relevance_regression.cjs`: each query now enforces the invariant `retrieved passages > 0 ⇒ cited answer without the no-material sentence`; `retrieved passages = 0 ⇒ exact no-material sentence`. Four new cases test the reported contradiction and cross-source citations. `scripts/e2e_v2.cjs` checks the same rule and shortcut labels when a browser rerun is available.

## Current verification and boundary

The deterministic suite passes **18/18** cases. In archived results, the tool-use query has four passages and a cited English answer; the RAG-limitations query has one passage and a cited English answer. The zero-hit vague and tiramisu queries show only the exact no-material sentence. The V0 baseline hashes remain unchanged.

The fallback summary is intentionally conservative because GitHub Pages cannot run a private server-side LLM. It may describe a retrieved passage rather than fully answer an arbitrary question; it never invents unsupported details or claims there are no materials when materials are displayed. Revised browser screenshots, browser E2E, human reassessment, and the independent AI Judge result are still pending and must not be inferred from the deterministic test output.
