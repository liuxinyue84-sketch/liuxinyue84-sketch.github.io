# Answer Consistency and Language Guard

Date: 2026-10-27
Scope: `website/rag-v2.js` only. The frozen V0 source, the knowledge corpus,
the page markup and the styling were not modified.

## Reported gaps

Two problems remained after the previous iteration:

1. Some answers still quoted the raw classroom sentence — an English statement
   from the lecture followed by its Chinese rendering, both inside one answer,
   or a Chinese answer carrying the English original of the note.
2. The order of the stages in a process answer was not stable: the same
   question could return mapping/shuffling/reducing, or a reflection-token
   list from a neighbouring section.

## Diagnosis

Both gaps came from the same place: the answer was assembled from *any*
retrieved section whose statements happened to score well, in whatever order
the scoring produced.

| Query | Evidence of the defect |
| --- | --- |
| `What is retrieval-augmented generation and how does it use retrieved context?` | The answer ended with `Retrieve? decides before retrieval whether external knowledge is needed at all. [R3]` — a Self-RAG reflection token, from a section about a *different* concept. |
| `How does self-attention work?` | The same Self-RAG section answered the question, because the token `self` of `self-attention` matched `Self-RAG` in a heading. |
| `cnn的开创性意义` | Bullets carried `操作定义：Convolution is essentially sliding a filter over the input. 卷积本质上就是…` — the English original and its translation in one statement. |
| `How do I evaluate tool use by an LLM agent?` | The answer was ordered by claim role instead of by the section, so the five layers appeared in an arbitrary order. |
| `What are the limitations of RAG?` | `what are …` was read as a definition question, so the answer led with the definition of RAG rather than a limitation. |

## General repairs

All of the following are rules over the query and the corpus. None of them
mentions a specific question, and none of them contains an expected answer.

1. **Concept-variant guard** (`isVariant`). A heading that opens with a
   restrictive modifier (`Self-RAG`, `Multimodal RAG`, `传统 RAG`, `多智能体`,
   `Multi-turn`) is about a variant of the concept, not about the concept. Such
   sections stay in the retrieved evidence but lose their claims in definition
   answers; the exception is a `limitation` or `comparison` question, where the
   variant section is often exactly the evidence that is wanted.
2. **Head-token rule.** In a noun phrase the head is the last content word, so
   `self-attention` is about attention. A restrictive modifier alone can no
   longer establish that a heading is relevant.
3. **One-section reading.** The section that supplied the lead is read forward
   in source order, so a process answer keeps the order of the notes and its
   bullets cite the same section. Other sections only fill a shortfall, and
   only from the same part of the same lecture.
4. **Bilingual clause filter** (`zhOnly`). Notes are bilingual; a Chinese answer
   keeps only the Chinese clause of each sentence, and a quoted English
   original is cut at the point where its translation starts.
5. **Sentence shape filters.** Table debris (`a · b ⇒ c`), diagram arrows,
   course-meta commentary (`全讲`, `本讲`), back-references (`前者`, `后者`, `该`)
   and illustration openers (`例如`, `示例`) cannot lead an answer.
6. **Intent read from the noun, not the opening words.** `what are the
   limitations of X` is a limitation question; `what is X and how does it work`
   is still a definition question.
7. **Test-harness fidelity.** `scripts/run_queries.cjs` now renders `innerText`
   the way a browser does: inline nodes (a citation span) stay on the line of
   their parent, block nodes start a new line. The answer-shape invariant had
   been counting each citation span as its own line, so it measured the stub
   rather than the page; with the stub corrected, the invariant checks the
   real shape — one statement per line, one to five statements.

## Verification

| Check | Command | Result |
| --- | --- | --- |
| Syntax | `node -c website/rag-v2.js` | passed |
| 28-query corpus | `node scripts/run_queries.cjs` | every query answers or abstains with the exact sentence |
| Ten generic invariants | `node scripts/relevance_regression.cjs` | `{"passed":true,"queries":28,"genericRules":10}` |
| Desktop Chrome QA | `node scripts/e2e_v2.cjs` | `{"passed":true,"testCount":9,"errors":[],"externalRequests":[]}` |

The browser run re-captured the five evidence screenshots in `evidence/`, and
`query_runs_v2.json` holds the current complete record for all 28 queries.

Behaviour after the repair:

```
What is retrieval-augmented generation and how does it use retrieved context?
  RAG combines a pretrained language model with external knowledge retrieved at
  inference time to support answer generation. [R4]
  · The retriever searches the external source for the current question instead
    of relying on knowledge stored in the model parameters. [R4]
  · The retrieved passages are grounded context for generation rather than the
    final answer, and the model itself is usually not retrained. [R4]
  · The external source can be local documents, a knowledge base, web search or
    an API. [R4]
  · RAG supplies knowledge at inference time while fine-tuning changes the model
    parameters, so updating knowledge means updating the index rather than
    retraining. [R4]

How does MapReduce divide and combine work?
  A MapReduce job runs in three stages, mapping, shuffling and reducing…
  · Mapping: each node applies its mapper to the data it has already loaded
    locally. [R4]
  · Shuffling: nodes exchange the intermediate data produced by the mappers. [R4]
  · Reducing: reducers merge the results of the different mappers… [R4]
```

## Limits

- `HDFS memory是什么` is a malformed question (two unrelated concepts); the
  answer stays readable but mixes two sections of the memory material.
- `overfitting和underfitting的对比` and `举几个GAN的例子` fall back to the
  Chinese sentence extractor, which is weaker than the prepared English
  evidence layer: the contrast and the examples are present, but the lead
  sentence is not the most summary-like sentence of the section.
- This is still a static GitHub Pages demo: no backend, no live language
  model. The English wording comes from a prepared evidence layer keyed by
  section, and the Chinese wording is quoted from the notes.
