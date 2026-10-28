# V2-RAG Multi-Source Answer Revision — 2026-10-24

## Request and prior behavior

The user required a self-contained, substantive English answer that examines every retrieved passage, integrates relevant information, and cites every passage actually used. The prior V2 answer catalog often cited only `[R1]` even when four references appeared. Its generic fallback could say “Open the cited reference for its detailed explanation.” That did not answer the visitor's question.

The prior script and 21-query archive are retained in `iterations/2026-10-24-before-multi-source-answer/`. Frozen V0 and V1 were not edited.

## Implementation

- `website/rag-v2.js` now inspects all retrieved paragraphs when preparing the answer. Source-checked supplementary claims enrich the existing curated explanations. A passage is cited only if its text supports the claim and it is relevant to the question; an unrelated high-ranked passage is not forced into the answer merely to show `[R4]`.
- The generic extractive fallback selects distinct English evidence from different retrieved passages. It no longer contains an instruction to open references. If none of the available passages provides a reliable English clause, the interface states that limitation rather than inventing a translation. This remains a static deterministic demonstration, not real LLM generation.
- The internally archived RAG prompt now explicitly asks for multi-passage synthesis and precise citations. It remains absent from the visitor page.
- Added two regression queries beyond the original 21: `What is overfitting?` and `How does breadth-first search work?`. Their cited answers combine definition/variance evidence and queue/optimality/example evidence respectively.

## Deterministic evidence

`query_runs_v2.json` stores every query, all retrieved original paragraphs, the assembled internal prompt, and the visitor answer. `relevance_regression_v2.json` records **23/23** passing deterministic checks. The checks reject the banned placeholder wording, citations to nonexistent `[R#]` items, non-English output, and the nonempty-references/insufficient-answer contradiction. In particular, Q01 uses `[R1][R3][R4]`, Q02 uses `[R1][R2][R4]`, Q17 uses `[R1][R2][R3][R4]`, and Q19–Q21 use `[R1][R2][R3]`.

These are code-level checks, not browser E2E or an independent AI Judge. The multi-source answer strategy is bounded by the fixed course-note corpus and deterministic templates. It cannot guarantee an accurate fluent synthesis for every arbitrary Chinese-only query; this limitation is exposed rather than masked with fabricated facts.
