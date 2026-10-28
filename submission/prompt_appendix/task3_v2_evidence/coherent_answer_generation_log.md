# Coherent Answer Generation Revision

## Requirement

The shared RAG pipeline must not render `The notes identify ...`, terminology lists, or raw table fragments as an answer. Every supported answer must use one explanatory lead sentence and two to four complete explanatory points, with citations at sentence ends. This rule must apply uniformly and must not introduce topic-specific branches.

## Implementation

The semantic relevance stage and BM25 retrieval remain unchanged. The shared `englishEvidence()` and `composeAnswer()` stages now:

1. remove Chinese remnants, markup, questions, instruction-like text, URLs, malformed formula fragments, and label-only rows;
2. accept only English clauses containing a grammatical predicate and at least five words;
3. convert only general bilingual-table syntax, such as `Subject · Collecting ...`, into the grammatical form `Subject involves collecting ...`;
4. reject capitalized mid-line table commands such as `Map Reduce` when they are not predicates;
5. deduplicate overlapping evidence;
6. require at least three supported sentences before rendering an answer;
7. render one lead plus two to four bullet points, each ending in its supporting `[R#]` citation;
8. use the exact insufficient-material response when the retrieved material cannot support a coherent English explanation.

No course topic, model name, query phrase, Q-number, or fixed answer appears in these generation rules.

## Evaluation

The historical 28-query corpus is retained unchanged. The generic regression suite now applies ten shared invariants, including a new `coherent-explanatory-prose` rule that rejects filler templates and terminology-only lines. All 28 queries pass the ten generic invariants. This is script-level evidence; current browser E2E and independent AI-Judge assessment remain pending.
