# V2-RAG Visitor Answer Cleanup — 2026-10-24

## Trigger and preserved state

The user requested a visitor-facing interface without internal prompts, agent/developer notes, raw KB identifiers, or pasted Markdown/LaTeX. References should be a native `details/summary` disclosure closed by default; the answer should be concise, fluent English with clear source citations.

The immediately preceding V2 website files, test scripts, and query output are preserved in `iterations/2026-10-24-before-visitor-answer-cleanup/`. The frozen V0 was not edited.

## Code changes

| File | Change | Reason |
|---|---|---|
| `website/index.html` | Answer appears before a native `details` panel called “Retrieved Reference Materials”; the panel is closed by default. Removed the visible implementation note and narrowed the question invitation to selected course-note ideas. | Give ordinary visitors a clean, accurate interface. |
| `website/rag-v2.js` | Reset the disclosure to closed for every query. Clean displayed snippets: remove Markdown images/links, presentation markers, excess table syntax, and LaTeX command debris; divide text into paragraphs and bullets; omit internal `KB-` IDs. Full raw source and prompt remain in the archived query run. | Keep references checkable without flooding the page or showing source-code artifacts. |
| `website/rag-v2.js` | Replace the direct “closest excerpt” answer with bounded, hand-checked English summaries for supported agent, RAG, GNN, MapReduce, tool-evaluation and memory topics. Each claim is tied to the top retrieved note and cited as `[R1]`; an unsupported or mismatched topic abstains. | A lexical hit is not automatically a valid answer. |
| `website/style.css` | Single-column answer-first layout; compact disclosure and scrollable opened references. | Keep the result area readable. |
| `scripts/run_queries.cjs`, `scripts/relevance_regression.cjs`, `scripts/e2e_v2.cjs` | Archive visitor-facing reference text/default disclosure state; assert English content, citations, closed disclosure, and absence of raw prompt/KB/LaTeX markers. | Make the user-facing requirements repeatably testable. |

## Verification and limits

The 14 deterministic query cases pass after this revision. The reported `agent是什么` query now yields an English agent definition with `[R1]`, while the GNN query yields a separate GNN answer. A broad `memory` query requests clarification; vague and unrelated questions return the exact insufficiency message. The test archive contains the retrieved original passage, complete assembled prompt, page answer, cleaned visitor reference text, and default disclosure state for each query.

The English answers are curated deterministic summaries, **not** live LLM generation. They deliberately cover a limited set of course-note topics; related retrieval results outside that set can still lead to an insufficiency response. A new browser E2E run and screenshots of this exact visitor UI are pending; prior screenshots must not be represented as post-revision evidence. The unchanged Task 2 rubric and AI Judge prompt will be used only after new browser evidence is captured.
