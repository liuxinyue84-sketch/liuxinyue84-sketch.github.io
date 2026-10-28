# Base-concept title reranking (2026-10-27)

## Reported failure

For the query `GNN`, BM25 correctly retrieved both `What is a Graph Neural Network?` and `GNN vs CNN`, but the answer used the comparison/inductive-bias material instead of the definition. The original screenshot and pre-fix output are retained under `iterations/2026-10-27-before-base-concept-score/`.

## Cause

The title gate decided whether a chunk was eligible, but the subsequent ordering still relied mainly on retrieval and semantic scores. A narrower comparison passage could therefore outrank a base-concept definition.

## Repair requested and implemented

After title gating, each eligible unit receives a secondary `baseConceptScore` computed only from its existing title text; no knowledge-base field was added.

- `+10`: titles containing `What is`, `Definition`, `定义`, `是什么`, `Introduction to`, `Overview`, or `基础`.
- `-10`: titles containing `归纳偏置`, `bias`, `compare`, `vs`, `对比`, `tradeoff`, `advanced`, or `变体`.

The final `answerScore` is `semanticScore + baseConceptScore`. Eligible units are reordered by this score, and sentence extraction uses the same score. All BM25 results remain unchanged and visible in the folded evidence panel.

## Result

For `GNN`, `[R1] What is a Graph Neural Network?` now receives `baseConceptScore = +10` and supplies the definition, optimizable-transformation explanation, and message-passing description. `[R3] GNN vs CNN` receives `baseConceptScore = -10`, remains visible evidence, but no longer leads the answer. The complete post-fix trace is in `manual_base_concept_score_probe.json`. The 28-query, ten-rule generic regression suite remains passing.

