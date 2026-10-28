# Generic Bare-Concept and Process-Answer Repair

Date: 2026-10-27

## Reported failure

The short query `rag` retrieved four passages but produced an answer about a research timeline and agent applications. The screenshot supplied by the user showed that the selected answer did not define RAG, even though the visitor asked for the concept itself.

## Root cause

This was not only a RAG-specific defect. Three shared pipeline rules were incomplete:

1. A short concept-only query was not consistently treated as a definition request.
2. The title reranker could only reorder the four BM25 results and did not strongly prefer a concise definition or overview unit during initial retrieval.
3. Once a title-qualified chunk entered answer composition, a sentence could be selected merely because the chunk title was relevant; the sentence itself did not always contain local evidence for the query.

Process questions had a second general weakness: evidence markers such as `stage`, `pipeline`, `execute`, `call`, `return`, `mapping`, `shuffle`, and `reduce` were not recognised consistently. Application-oriented long titles could also outrank shorter concept units.

## Query-independent repair

The same rules now apply to every query:

- A query containing one to three subject tokens and no explicit intent is classified as a definition request.
- Definition/overview titles receive a retrieval boost; advanced, comparison and variant titles receive a penalty.
- Long, highly specific titles receive a small structural penalty so that concise concept units are preferred when other relevance evidence is similar.
- Process evidence recognises stage, pipeline, execution, call/return and map/shuffle/reduce language in both English and Chinese.
- A title admits a chunk, but each selected answer sentence must independently contain the queried subject or valid evidence for the requested non-definition intent.
- Heading fragments ending in a colon are excluded from the visitor answer.
- Retrieved noise is still retained in the folded reference panel for inspection; it is not silently deleted.

No fixed answer text and no query-specific answer branch were added for RAG, Transformer, MapReduce, tool use, GNN, MCP, back-propagation or gradient descent.

## Cross-topic verification

The deterministic browser logic was executed through `scripts/run_queries.cjs` after the change.

| Query | Observed post-repair behaviour |
|---|---|
| `rag` | Selects `RAG Definition` and explains that RAG combines a pretrained LLM with external knowledge retrieved at inference time. |
| `GNN` | Selects `What is a Graph Neural Network?` and explains the graph transformation and message-passing idea. |
| `Transformer` | No longer abstains; uses the Transformer Block unit and describes repeated blocks, Q/K/V attention, feed-forward processing and residual connections. |
| `How does MapReduce work?` | Returns process evidence including Shuffle and Reduce rather than a body-only keyword match. |
| `How do agents use tools?` | Explains how tool definitions enter context, how calls are produced, and how the harness executes and returns results. |
| `反向传播` | Continues to explain reverse gradient computation. |
| `梯度下降` | Continues to explain updates in the negative-gradient direction. |

The fixed 28-query suite produced no blank answer cards. Vague and out-of-scope queries continued to use the explicit insufficient-material response.

## Verification boundary

JavaScript syntax checking and deterministic query execution passed using the bundled Node.js runtime. Direct browser automation was attempted, but local browser control was disabled in the current Work settings. Therefore, the user should refresh `http://127.0.0.1:5584/#highlights` and capture the final visual evidence manually; this document does not claim a new automated screenshot.

## Remaining limitations

This is a static, extractive RAG demonstration without a live LLM. It can select and combine source sentences, but it cannot reliably rewrite every bilingual lecture fragment into polished English. Ambiguous one-word queries may still choose a specialised course meaning when several disciplines use the same term. These limitations should be disclosed in the V0–V2 analysis rather than hidden.
