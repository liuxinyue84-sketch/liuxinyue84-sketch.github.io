# Title-led relevance gate repair (2026-10-26)

## Problem observed

The second offline translation model improved terminology consistency but did not produce portfolio-quality English for long lecture paragraphs. More importantly, translation did not address retrieval noise: a passage could mention a query term incidentally while its main subject was different. `Gradient descent` and `clustering` exposed this distinction.

## General repair

The BM25 retrieval stage is unchanged. It still returns up to four ranked passages, and every retrieved passage remains visible in the folded **View Retrieved Reference Materials** panel for assignment evidence.

Answer eligibility is now decided by a shared title-led gate:

1. The knowledge-unit title must directly match most of the query subject tokens; a one-token coincidence is not enough for a longer subject.
2. A short acronym written in the title may match a full-form query when the acronym is derived automatically from that query.
3. A title naming a recognized component may support its parent concept, but body-only component mentions do not pass the gate.
4. A passage that only mentions the term inside its body remains retrieval evidence but cannot support the answer.
5. If no title-qualified passage yields a concise explanatory extract, the page returns exactly `Insufficient reference materials to answer this question.`

No query-specific answer text was added. All queries use the same retrieval, title gate, extract selection, citation, and abstention path.

## Observed checks

- `梯度下降`: four BM25 passages were preserved, but none had a title directly about gradient descent; the Answer correctly abstained.
- `反向传播`: the titled unit `反向传播: Backward Propagation` passed and produced cited extracts from `[R2]`.
- `attention`: `Attention Patterns: 注意力模式` passed and produced cited extracts from `[R1]`.
- `Transformer原理`: the titled component `KV Cache 的原理` passed the existing parent/component rule and produced cited extracts from `[R1]`.
- An unrelated tiramisu query retrieved zero passages and correctly abstained.

The fixed 28-query generic regression suite passed all ten invariants. Browser QA over `http://127.0.0.1:5584/#highlights` confirmed both the abstention branch and the supported-answer branch. The reference disclosure remained collapsed and showed all four retrieved passages.

## Trade-off

This conservative gate favors precision and traceability over recall. A useful paragraph whose title is broad may be excluded even when its body contains an answer. This is intentional for the static demonstration because it avoids presenting body-level keyword noise as a grounded answer. The source language is preserved instead of applying low-quality automatic translation.

