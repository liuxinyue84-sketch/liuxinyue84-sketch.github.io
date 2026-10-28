# Generic Semantic RAG Answer Pipeline Refactor

## Trigger

Manual testing exposed a structural defect: the earlier static demo added a topic-specific answer branch whenever a new wording failed. This produced brittle behavior, duplicated logic, and blank Answer cards for unrecognized queries even when BM25 had recalled useful material.

## Preserved behavior

- The existing BM25 keyword retrieval and its four-hit limit remain the retrieval layer.
- Every recalled hit remains visible as its original `R1`–`R4` entry in the default-closed **View Retrieved Reference Materials** panel.
- The UI, reference cleaning, citation format, and exact insufficient-material message remain unchanged.
- The pre-refactor implementation and query output are preserved in `iterations/2026-10-24-before-generic-semantic-pipeline/`.

## Shared pipeline

Every query now follows the same code path:

1. `queryProfile()` detects a general information need (definition, process, reason, example, comparison, limitation, or general) and removes question phrasing from the subject tokens.
2. `assessChunk()` compares the subject with each recalled chunk's topic and body, checks whether the passage contains evidence appropriate to the general intent, penalizes navigation/outline text, and labels the chunk relevant or noise.
3. `filterRelevantChunks()` keeps semantic decisions separate from retrieval. Noise remains visible in the reference panel but cannot support the answer.
4. `englishEvidence()` extracts clean English evidence from every relevant chunk, removes markup, instruction-like source text, questions, duplicates, and malformed fragments.
5. `composeAnswer()` selects up to five distinct cited lines. It contains no topic names, query-specific branches, or fixed answers.
6. When relevant evidence is absent, the Answer card always displays `Insufficient reference materials to answer this question.` It never remains blank.

## Evaluation change

The 28 accumulated queries are retained as an evaluation corpus and historical evidence. `relevance_regression.cjs` no longer contains a separate expected sentence for each Q-number. It applies eight shared invariants to the complete corpus:

- visitor controls remain unchanged;
- the reference disclosure remains present;
- every query produces visible output;
- the relevant/zero-relevant branch is consistent;
- every citation points to a chunk accepted by the shared semantic filter;
- all BM25 hits remain in the evidence panel;
- visitor output contains no Chinese answer text, prompt/debug material, or internal KB identifiers;
- each answer contains one lead and no more than four cited points.

Current deterministic result: **28 evaluation queries passed all 10 generic rules**. This is script-level evidence, not browser E2E or independent AI-Judge evidence.
