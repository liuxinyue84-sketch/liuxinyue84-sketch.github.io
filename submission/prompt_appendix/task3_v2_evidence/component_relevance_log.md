# Parent Concept and Component Relevance

## Reported behavior

The query `Transformer原理` recalled a KV Cache passage containing Q/K/V roles, causal attention, and cache reuse, but the answer abstained because the English evidence generator required direct query-level prose. The recalled passage was valid component evidence for the parent concept.

## Relevance rule

The semantic filter now supports a lightweight parent-component relation. A recalled passage may be relevant when:

1. the query names a parent concept;
2. the passage's own topic/body is directly about a recognized component of that concept; and
3. the evidence still passes clause-level provenance checks before it can be cited.

For Transformer, the current component vocabulary covers QKV, multi-head attention, KV Cache, and residual connections. This relation changes relevance only; it contains no fixed answer text.

## Answer construction

The same source-grounded answer generator remains in use. A general bilingual-structure normalizer converts explanatory source statements into grammatical English while retaining their exact reference:

- a `subject is ... mechanism` sentence becomes an English mechanism statement;
- labeled Query/Key/Value role descriptions become complete explanatory sentences;
- causal-attention reuse statements remain attached to the same chunk;
- formulas still require local subject agreement and formula provenance validation.

No Transformer-specific answer paragraph is stored in the implementation. The rendered content is assembled from the recalled passage.

## Evidence

`manual_component_relevance_probe.json` records a non-Q-number `Transformer原理` probe. The single KV Cache reference is accepted, and the output contains a lead mechanism sentence plus four explanatory component points, all cited `[R1]`. The existing 28-query corpus continues to pass all ten generic invariants. Browser E2E and independent AI-Judge verification remain pending.
