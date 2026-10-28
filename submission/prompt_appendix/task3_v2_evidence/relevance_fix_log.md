# V2-RAG Relevance Repair — 2026-10-24

## Reported failure

**User test/query:** `agent是什么` in the V2 question form.  
**Observed before repair:** the page cited `KB-1296`, “Part 5 GNNs I: From Graphs to GNNs”, and displayed “图是什么 → 为什么不能直接用 DNN → GNN 怎么做” as the answer. The user screenshot is preserved unchanged in `iterations/2026-10-24-before-relevance-fix/agent-wrong-answer-user-screenshot.png`.  
**Why this was wrong:** the passage did not define an agent. It was selected because the tokenizer treated Chinese interrogative bigrams such as `是什` and `什么` as high-value search terms, while the short paragraph and repeated heading/path text distorted BM25 ranking. The response stage then quoted the first ranked hit without checking whether it actually answered the question.

## Repair steps and code changes

1. In `website/rag-v2.js`, remove Chinese question phrasing before tokenizing the subject. Filter English stopwords before suffix normalization, so `does` does not become a false content term `doe`.
2. Group neighboring short original paragraphs from the same source section into retrieval units. The canonical `rag-knowledge.js` corpus remains unchanged at 9,831 records; each returned unit keeps its original record IDs and exact source text. Image-only Markdown paragraphs are excluded as answer evidence.
3. Weight matches in original paragraph bodies more heavily than title matches, and require body evidence. Apply definition-section boosts only when the section also matches the queried subject. Distinguish a singular agent definition from a multi-agent-system definition. Add small bilingual concept aliases only when they help a focused definition question.
4. For explicitly qualified questions, require both core terms when there are two, such as `agent memory` or `HDFS memory`. For the broad `memory` question, show both agent-memory and computer-memory sources and ask which topic the visitor means instead of asserting that the HDFS meaning is intended.
5. When the user asks for a MapReduce process or tool-use evaluation, rank passages that actually describe the process or evaluation dimensions. The visible answer still quotes the leading source; no external LLM or semantic embedding model was added.

These are repairs to V2-RAG retrieval and answer selection, not a new technique and not changes to frozen V0 or V1. The pre-repair JS, test set, query output, and screenshot are preserved under `iterations/2026-10-24-before-relevance-fix/`.

The visitor page also adds an `Agent 是什么？` example question so the reported scenario can be retried directly.

## After-repair observations

| Query | Top source after repair | Visible behavior |
|---|---|---|
| `agent是什么` | `knowledge/5584-LLM-for-Agent-1.md`, “1.1 智能体（Agent）的定义” | Quotes an intelligent system interacting with its environment and cites `[R1]`. |
| `什么是智能体`; `What is an agent?` | Same agent-definition section | Same grounded definition, not GNN. |
| `什么是图神经网络` | GNN definition section | Keeps the GNN answer associated with a GNN question. |
| `How does MapReduce divide and combine work?` | “6.3 MapReduce Pipeline” | Excerpt includes Mapper and Reducer stages. |
| `How do I evaluate tool use by an LLM agent?` | “Part 7 Evaluating Tool Use” | Excerpt mentions tool selection, arguments, order, and operational quality. |
| `What did we discuss about memory?` | Agent-memory and computer-memory references | Requests clarification rather than choosing a meaning silently. |
| Vague and unrelated queries | No reliable source | Preserves the exact insufficiency fallback. |

The exact 14 queries, candidate rankings, source passages, assembled prompts, and page strings are archived in `query_runs_v2.json`. `relevance_regression_v2.json` records 14 passing deterministic semantic assertions; the assertions verify source relevance and critical answer terms, not just that some text was returned.

## Verification boundary and remaining risks

JavaScript syntax and the 14 deterministic checks passed. Frozen V0 file hashes were rechecked. A browser E2E rerun and screenshot of the repaired query are still pending because browser launch/local server access was blocked in this execution environment; `e2e_results_v2.json` remains a pending marker. Do not call the user screenshot a post-repair result.

The system is still lexical BM25 plus deterministic extractive rendering. It cannot guarantee relevance for every paraphrase or synthesize across sources like a real LLM-backed RAG system. Ambiguity and low-confidence matches should be treated conservatively in the report.
