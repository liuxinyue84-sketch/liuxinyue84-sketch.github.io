# Supplementary Human Assessment

This version-sensitive assessment supplements, and does not replace, the official Task 2 assessment.

| Version | Content /20 | Experience /20 | Technique /30 | Robustness /20 | Evidence /10 | Total /100 |
|---|------------:|---------------:|--------------:|---------------:|-------------:|-----------:|
| V0 | 18 | 15 | 23 | 16 | 7 | **79** |
| V1 Few-shot | 19 | 18 | 27 | 18 | 8 | **90** |
| V2 RAG | 19 | 17 | 28 | 18 | 9 | **91** |

The table records weighted points directly. The five columns sum to a maximum of 100.

## V0 and V1 evidence note

This file does not contain retrospective, criterion-level human observations for V0 or V1. Their recorded scores are retained above; no missing test operations or observations have been reconstructed or presented as contemporaneous evidence. Version artifacts and independent Judge records remain in the corresponding `coursework/evaluation/` and `prompt_appendix/task3_v1/` folders.

## V2 RAG evidence

- Query/test operation: Fresh public-URL desktop E2E run on 2026-10-28, covering nine RAG cases including RAG, MapReduce, memory, vague/out-of-scope queries, tool use, Chinese agent definition, CNN significance, and MCP definition.
- Retrieved evidence and answer behavior: All nine tests passed; successful answers carried citations and the reference panel remained closed by default until opened.
- Relevance, noise, or fallback behavior: Vague and out-of-scope questions abstained; topic-specific questions returned answers; cleaned references contained no prompt leakage or raw KB markup.
- Why this supports the score: The new run directly addresses the former AI-Judge evidence gap for the V2 RAG module. It does not by itself verify non-RAG portfolio paths.

Additional non-RAG public test: Home, Highlights, Projects, Life, Guestbook, education disclosure, four-project count, project detail expansion, research filtering, save/remove state, Life media, photo preview, and Guestbook form all passed at 1512x1000. Archived in `task3/v2/evaluation/nonrag_public_e2e.json`; one favicon 404 was the only console message.

## Comparative conclusion

- Strongest V1 improvement: The V1 Few-shot version records 90/100 in the supplementary human score versus 79/100 for V0. The version record describes a change to the page shell and component structure; separate evidence reports 48 content comparisons with no differences and 35/35 desktop E2E checks.
- Strongest V2 improvement: V2 records 91/100 in the supplementary human score and 91/100 in the latest AI Judge run. Its nine public RAG E2E cases cover retrieval, citations, abstention, and representative English and Chinese queries.
- Remaining trade-off: V2 is a static RAG workflow demonstration without a live LLM; BM25 and title-led relevance rules can miss paraphrases or rank imperfectly. The public non-RAG run also recorded one favicon 404. V1 has weaker evidence for mobile behavior and successful guestbook submission.
- Evidence that the improvement is version-specific: V1 evidence is tied to its Few-shot iteration record, content comparison, and 35/35 E2E result. V2 evidence is tied to the RAG-specific public test run and its query/retrieval archive. The two versions target different improvements and both originate from frozen V0.

The supplementary score must be reported next to, not instead of, the official score.
