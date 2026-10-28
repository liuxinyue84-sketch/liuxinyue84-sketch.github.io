# V2-RAG Answer Card and Reference Disclosure Revision — 2026-10-24

## Request and baseline

The user prohibited three families of filler text, required an independently readable English answer with one opening sentence and 2–4 concise cited points, requested filtering of irrelevant recalled passages from the answer while preserving them in the expandable evidence area, and specified the title “View Retrieved Reference Materials.” The previous implementation and query archive are preserved in `iterations/2026-10-24-before-answer-card-cleanup/`.

## Code changes

- `website/index.html`: renamed the native, default-closed `details/summary` disclosure to **View Retrieved Reference Materials**.
- `website/rag-v2.js`: removed the visitor-facing inability/redirect fallback. The generic evidence selector now discards malformed or irrelevant English fragments and requires enough distinct supported facts to form an opening sentence plus at least two points. If lexical candidates lack answer-bearing evidence, they are retained in the internal `candidatePassages` trace but are not promoted to `retrievedPassages`; the final reference set is empty and the exact no-material message is displayed. This is a deterministic evidence gate, not live translation or LLM generation.
- Curated source-backed summaries cover the newly tested convolution question in addition to the existing course topics. Each answer point ends in the IDs of passages it uses. Irrelevant ranked passages remain visible in the reference disclosure when the overall retrieval is answerable; they are excluded from the Answer text.
- `cleanNote` removes fenced-code markers, inline LaTeX blocks, strikethrough/Markdown decoration, and table separator rows before visitor rendering. The disclosure can scroll and shows complete cleaned passages rather than truncating them mid-sentence.
- `website/style.css`: softened the Answer panel with generous rounded corners, translucent pale blue-white surfaces, and more comfortable text size and line spacing.

## Verification boundary

At this revision, the fixed set contained 24 deterministic queries, including `What is convolution?`. The answer-generation retrieval gate described above later caused a false abstention for MCP and was removed; see `mcp_answer_gate_repair_log.md`. Browser E2E/screenshots and independent AI Judge results remain pending. Frozen V0 and V1 were not edited.
