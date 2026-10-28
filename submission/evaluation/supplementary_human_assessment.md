# Supplementary Human Assessment

This version-sensitive assessment supplements, and does not replace, the official Task 2 assessment.

| Version | Content /20 | Experience /20 | Technique /30 | Robustness /20 | Evidence /10 | Total /100 |
|---|------------:|---------------:|--------------:|---------------:|-------------:|-----------:|
| V0 | 18 | 15 | 23 | 16 | 7 | **79** |
| V1 Few-shot | 19 | 18 | 27 | 18 | 8 | **90** |
| V2 RAG | 19 | 17 | 28 | 18 | 9 | **91** |

The table records weighted points directly. The five columns sum to a maximum of 100.

## V0 evidence

- Test operation or prompt:
- Observed behavior:
- Why this supports the score:

## V1 Few-shot evidence

- Few-shot material inspected:
- Structural change observed:
- Personal-content preservation check:
- Why this supports the score:

## V2 RAG evidence

- Query/test operation: Fresh public-URL desktop E2E run on 2026-10-28, covering nine RAG cases including RAG, MapReduce, memory, vague/out-of-scope queries, tool use, Chinese agent definition, CNN significance, and MCP definition.
- Retrieved evidence and answer behavior: All nine tests passed; successful answers carried citations and the reference panel remained closed by default until opened.
- Relevance, noise, or fallback behavior: Vague and out-of-scope questions abstained; topic-specific questions returned answers; cleaned references contained no prompt leakage or raw KB markup.
- Why this supports the score: The new run directly addresses the former AI-Judge evidence gap for the V2 RAG module. It does not by itself verify non-RAG portfolio paths.

Additional non-RAG public test: Home, Highlights, Projects, Life, Guestbook, education disclosure, four-project count, project detail expansion, research filtering, save/remove state, Life media, photo preview, and Guestbook form all passed at 1512x1000. Archived in `task3/v2/evaluation/nonrag_public_e2e.json`; one favicon 404 was the only console message.

## Comparative conclusion

- Strongest V1 improvement:
- Strongest V2 improvement:
- Remaining trade-off:
- Evidence that the improvement is version-specific:

The supplementary score must be reported next to, not instead of, the official score.
