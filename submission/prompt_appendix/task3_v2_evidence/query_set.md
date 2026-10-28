# V2-RAG Test Query Set

Queries cover explicit concepts, a broad but relevant query, a vague query, and a completely out-of-scope request. Exact retrievals, BM25 scores, assembled prompt text, and page answer strings are archived in `query_runs_v2.json`.

| ID | Category | Exact query | Expected behavior |
|---|---|---|---|
| Q01 | Clear topic | What is retrieval-augmented generation and how does it use retrieved context? | Retrieve RAG definition and cite sources |
| Q02 | Clear topic | How does MapReduce divide and combine work? | Retrieve MapReduce pipeline evidence |
| Q03 | Clear topic | How do I evaluate tool use by an LLM agent? | Retrieve tool-selection/evaluation notes |
| Q04 | Ambiguous across courses | What did we discuss about memory? | Summarize both retrieved meanings with citations and invite a narrower question |
| Q05 | Vague | Tell me about that thing from class. | Abstain with the required exact message |
| Q06 | Out of scope | What is the best recipe for tiramisu? | Abstain with the required exact message |
| Q07 | Reported failure retest | agent是什么 | Cite the agent definition; never answer with GNN material |
| Q08 | Chinese paraphrase | 什么是智能体 | Cite the agent definition |
| Q09 | English paraphrase | What is an agent? | Cite the agent definition |
| Q10 | Chinese definition | 什么是RAG | Cite the RAG definition |
| Q11 | Confounder control | 什么是图神经网络 | Cite the GNN definition; keep it distinct from agent |
| Q12 | Chinese definition | 什么是MapReduce | Cite an introductory MapReduce definition |
| Q13 | Qualified memory | agent memory是什么 | Cite an agent-memory section |
| Q14 | Qualified memory | HDFS memory是什么 | Cite the HDFS metadata-in-memory section |
| Q15 | Suggested tool use | How do agents use tools? | Show a source-backed tool-use answer, matching the visitor shortcut |
| Q16 | Retrieved but previously contradictory | What are the limitations of RAG? | Summarize the cited study’s limits; do not show the no-material message alongside a source |
| Q17 | Cross-source process | How do diffusion models generate images? | Use the retrieved sampling passage with its actual citation number |
| Q18 | Cross-source definition | What is reinforcement learning? | Use the retrieved agent/environment/reward passage with its actual citation number |
| Q19 | User-reported zero-recall failure | cnn的开创性意义 | Retrieve CNN milestone evidence and explain local connectivity, weight sharing, LeNet and AlexNet |
| Q20 | Chinese CNN paraphrase | CNN的意义 | Preserve the same evidence-backed CNN significance answer |
| Q21 | English CNN paraphrase | Why were CNNs important for image recognition? | Preserve the same evidence-backed CNN significance answer |
| Q22 | Multi-source concept | What is overfitting? | Integrate the definition and bias–variance note; cite both relevant sources, omit unrelated hits |
| Q23 | Multi-source algorithm | How does breadth-first search work? | Explain queue and layers, equal-edge-weight optimality, and the route example with their source IDs |
| Q24 | Independent-answer format | What is convolution? | Give a source-backed definition plus operation and CNN-layer points; avoid raw fragments or redirection text |
| Q25 | Reported answer-gate regression | What is MCP? | Preserve all four relevant recalled passages and summarize concept, architecture, and transport with matching citations |
| Q26 | Reported Chinese MCP-role regression | MCP的作用 | Retrieve the MCP concept, architecture, and transport notes and produce a substantive cited English answer |
| Q27 | Reported fitting-comparison regression | overfitting和underfitting的对比 | Exclude outline/GAN noise and contrast model capacity, bias, variance, and generalization |
| Q28 | Reported GAN-example regression | 举几个GAN的例子 | Retrieve image-synthesis and handwritten-digit evidence and produce a cited answer |

The first six queries were retained from the initial evaluation set. Q07–Q14 are relevance regressions for the reported agent/GNN mismatch. Q15–Q18 test the rule that a nonempty retrieval must yield a cited English answer. Q19–Q21 test the user-reported CNN zero-recall failure and two paraphrases. Q22–Q24 check substantive, independent answers beyond the initial curated topics. Q25 checks that answer formatting cannot erase valid MCP retrievals, Q26 checks the Chinese “MCP role” wording, and Q27 checks the reported overfitting/underfitting comparison that previously retrieved outline noise and left the Answer card blank. The visitor interface exposes exactly three English shortcuts: “What is RAG?”, “How does MapReduce work?”, and “How do agents use tools?”. The reported typed queries remain in the regression suite. The prior browser run is preserved under `iterations/2026-10-24-before-ui-simplification/`; revised browser E2E is pending.
