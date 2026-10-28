# Compound-query title-gate repair (2026-10-27)

## Reported failure

The query `What is retrieval-augmented generation and how does it use retrieved context?` retrieved four clearly relevant RAG units but returned `Insufficient reference materials to answer this question.` The user screenshot and complete pre-fix query result are preserved under `iterations/2026-10-27-before-compound-query-fix/`.

## Cause

The title gate treated both the main concept and the secondary process clause as title subject tokens. A title such as `RAG Definition` could not contain terms from `how does it use retrieved context`, so every retrieved unit failed the title-coverage threshold. This was a relevance-filter false negative, not a knowledge-base or BM25 retrieval failure.

## Generic repair

1. Split compound questions only when a conjunction introduces a new `how`, `why`, `what`, `where`, or `when` clause.
2. Use the first clause to identify the title-matching subject.
3. Keep the full question available as the requested answer intent.
4. Infer an acronym only from the main subject clause.
5. Prefer a base definition title over a prefixed or suffixed variant such as `Self-RAG` when the query asks for the base concept.

No fixed RAG answer was added. The same compound-query and base-topic ordering rules apply to every query.

## Result

The exact reported query now selects `RAG Definition` as the highest-priority unit and returns a cited explanation beginning with the definition of RAG and its use of external knowledge at inference time. The complete post-fix output is stored in `manual_compound_query_probe.json`. The fixed 28-query suite continues to pass all ten generic invariants.

