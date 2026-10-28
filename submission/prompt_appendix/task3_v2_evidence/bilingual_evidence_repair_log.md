# Bilingual Evidence Repair Log

Date: 2026-10-25  
Version: V2-RAG only; the frozen V0 source was not modified.

## Reported behaviour

The query `attention` retrieved four reference materials. The first retrieved
chunk directly explained bidirectional attention, causal attention, attention
masks and encoder-decoder cross-attention, but the Answer card displayed:

`Insufficient reference materials to answer this question.`

## Root cause

Retrieval and semantic relevance filtering succeeded. All four recalled chunks
were preserved and the relevance layer accepted the directly explanatory
chunks. The later evidence-extraction stage, however, required complete English
predicate sentences. Because the strongest course-note evidence was mainly
Chinese prose with English technical terms, it was discarded before answer
composition. The final abstention therefore represented an answer-generation
failure rather than a retrieval failure.

## General repair

`website/rag-v2.js` now contains a source-grounded bilingual evidence
normalisation stage before the existing English evidence filter. The stage:

1. reads explanatory structures from the retrieved source text;
2. converts supported bilingual note statements into concise academic English;
3. retains the original reference number for every converted claim;
4. does not inspect or branch on a particular user query;
5. adds no fact that is absent from the cited chunk.

The BM25 retrieval logic, folded reference panel, evidence cleaning, citation
rules and zero-evidence fallback are unchanged.

## Verification

- JavaScript syntax check: passed.
- Fixed 28-query evaluation corpus: passed.
- Generic regression rules: 10/10 passed.
- Manual generic probes: `attention`, `attention是什么`,
  `How does attention work?`, and `Transformer原理` all produced cited answers.
- Browser check at `http://127.0.0.1:5584/#highlights`: passed. The query
  `attention` displayed one lead sentence and four cited explanatory points;
  the reference disclosure remained closed by default.
- Browser console/debug prompt content was not rendered.

The complete manual probe is preserved in
`manual_bilingual_evidence_probe.json`. The pre-change source and test scripts
are preserved in
`iterations/2026-10-25-before-bilingual-evidence-fallback/`.

## Remaining limitation

This is a deterministic static GitHub Pages demonstration, not a live LLM. Its
bilingual normalisation can only reorganise structures represented by the local
rules and source corpus. Unsupported source phrasing may still cause a cautious
abstention, even when a human reader could infer a partial answer.
