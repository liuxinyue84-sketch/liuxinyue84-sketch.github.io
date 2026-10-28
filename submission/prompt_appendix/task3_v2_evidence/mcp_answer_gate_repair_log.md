# V2-RAG MCP Answer-Gate Repair — 2026-10-24

## Reported regression

`What is MCP?` correctly ranked four course-note sections: MCP basic concepts, Host–Client–Server architecture, the relationship among those elements, and transport methods. A later answer-quality gate nevertheless called `composeAnswer()` inside `retrieve()` and replaced all four hits with an empty array when the mixed Chinese/English notes did not yield three generic English evidence sentences. The visitor therefore received the no-material response despite valid retrieval.

The pre-repair source and test files are preserved under `iterations/2026-10-24-before-removing-answer-gate/`.

## Repair

- Removed the answer-generation gate from `retrieve()`. Retrieval is again decided by BM25 evidence strength and query coverage; answer formatting no longer erases valid hits.
- Added a source-checked MCP summary derived from the recalled notes. It explains MCP as a standardized agent-facing interface, its integration purpose, the Host–Client–Server separation, and stdio/HTTP transports with `[R1]`, `[R2]`, and `[R4]` citations.
- Added Q25 `What is MCP?` to the query archive and regression suite.

## Verification boundary

The first repair passed **25/25** cases: Q25 retained four recalled passages and produced one opening sentence plus three cited points. A later manual test exposed a second wording-specific failure: `MCP的作用` retrieved four passages but left the Answer card blank because the composer did not recognize the Chinese role intent and the MCP concept section was not guaranteed to rank first. The retriever now expands and boosts MCP concept, architecture, and transport terms; the composer can also answer from a valid architecture passage. Q26 preserves this exact reported query. The deterministic suite now passes **26/26** cases. This is script-level evidence; revised browser E2E/screenshots and independent AI Judge output remain pending. Frozen V0 and V1 were not edited.
