# V2-RAG GitHub Pages Deployment Record

- Deployment date: 2026-10-28 (Asia/Hong_Kong)
- Public URL: https://liuxinyue84-sketch.github.io/V2/
- Repository: https://github.com/liuxinyue84-sketch/liuxinyue84-sketch.github.io
- Branch: `main`
- Commit: `0091834fdb54ac56fe47b72cfb29b049ab7582d6`
- Commit message: `Deploy Aria Sky Journal V2 RAG`
- GitHub Pages workflow run: https://github.com/liuxinyue84-sketch/liuxinyue84-sketch.github.io/actions/runs/40682186055
- Workflow conclusion: `success`

## Scope protection

The V2 source was deployed as the new `/V2/` directory. Existing root files serving V0 and the existing `/V1/` directory were not modified by the deployment commit.

## Post-deployment checks

### Fresh public V2 RAG E2E run — 2026-10-28

The public URL was tested with the bundled Playwright/Chrome runner at a 1512x1000 desktop viewport. All 9 tests passed with zero browser/console errors: RAG preset retrieval, MapReduce ordering, memory summary, vague-query abstention, out-of-scope abstention, tool-use retrieval, Chinese agent definition, CNN significance, and MCP definition. The run also verified closed-by-default reference disclosure, cleaned reference text, citation consistency, no prompt leakage, and no failed assertions. Evidence is stored in `e2e_results_v2.json` and five V2 screenshots in `evidence/`.

A second public run covered non-RAG portfolio paths. Home, all four navigation destinations, education disclosure, four projects, project detail expansion, research filtering, save/remove state, Life media count, photo preview, and Guestbook form all passed at the same viewport. The result is archived in `nonrag_public_e2e.json`; the only console message was a favicon 404.

The following public resources were requested after the Pages workflow completed:

| Resource | Result |
|---|---|
| `/V2/` | HTTP 200; HTML title `Aria’s Sky Journal` and `Explore my notes` marker present |
| `/V2/rag-v2.js` | HTTP 200; JavaScript served |
| `/V2/rag-knowledge.js` | HTTP 200; 4,920,462 bytes served |
| `/V2/assets/sky.webp` | HTTP 200; WebP served |

The remote `main` ref resolved to the same deployment commit recorded above.
