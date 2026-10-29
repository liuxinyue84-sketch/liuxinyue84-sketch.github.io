# V2-RAG Screenshot Evidence

The files currently suffixed `_PRE_UI.png` were captured from the first V2-RAG UI in desktop Chrome at a 1512×1000 browser viewport on 2026-10-24 (Asia/Hong_Kong). They are iteration evidence, **not screenshots of the revised visitor UI**. Copies are in `../iterations/2026-10-24-before-ui-simplification/`.

The user's screenshot of the later `agent是什么` → GNN mismatch is preserved at `../iterations/2026-10-24-before-relevance-fix/agent-wrong-answer-user-screenshot.png`. It is failure evidence, not a screenshot of the repaired result.

The user's screenshot of `cnn的开创性意义` returning no references is preserved at `../iterations/2026-10-24-before-cnn-retrieval-fix/cnn-no-answer-user-screenshot.png`. The revised CNN answer screenshot `V2-RAG-04_cnn-significance-desktop.png` is pending.

The revised MCP answer screenshot `V2-RAG-05_mcp-definition-desktop.png` is pending. It should show that all four MCP passages remain available after removal of the answer-generation retrieval gate.

- `V2-RAG-01_retrieved-answer-desktop_PRE_UI.png` — previous clear-query result, including the now-removed prompt disclosure.
- `V2-RAG-02_insufficient-materials-desktop_PRE_UI.png` — previous vague-query fallback.

Screenshots of the latest answer-first UI, including the native closed reference disclosure and formatted English answers, are still pending. The current sandbox could not bind a local web server, and the browser URL policy blocks automated access to `file:` pages. In a browser-enabled environment, run `node task3/v2/scripts/e2e_v2.cjs` from the project root; the script defaults to the local `file:` page and can use an HTTP URL through `V2_SITE_URL`. It should create five unsuffixed screenshots, including the repaired agent, CNN, and MCP answers, and replace the pending marker in `e2e_results_v2.json`. Keep the prior evidence for the change history.
