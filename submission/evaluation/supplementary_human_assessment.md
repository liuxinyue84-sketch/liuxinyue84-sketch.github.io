# Supplementary Human Assessment

This version-sensitive assessment supplements, and does not replace, the official Task 2 assessment. Scores below are the user-provided weighted points under the supplementary five-dimension rubric; they are not the official four-criterion Task 2 scores.

| Version | Content /20 | Experience /20 | Technique /30 | Robustness /20 | Evidence /10 | Total /100 |
|---|------------:|---------------:|--------------:|---------------:|-------------:|-----------:|
| V0 | 18 | 15 | 23 | 16 | 7 | **79** |
| V1 Few-shot | 19 | 18 | 27 | 18 | 8 | **90** |
| V2 RAG | 19 | 17 | 28 | 18 | 9 | **91** |

The table records weighted points directly; each row sums to 100 maximum. V0 and V1 criterion-level supporting examples were not separately recorded in this supplementary assessment, so no empty evidence templates are retained and no examples are reconstructed as historical observations. The detailed official-rubric human evidence remains in `human_self_assessment.md` and `human_v1_assessment.md`.

## V2 supporting evidence recorded

- **Test operation:** Fresh public-URL desktop end-to-end run on 2026-10-28, covering nine RAG cases including RAG, MapReduce, memory, vague/out-of-scope queries, tool use, Chinese agent definition, CNN significance, and MCP definition.
- **Observed behavior:** All nine RAG tests passed; successful answers carried citations, and the reference panel remained closed by default until opened. Vague and out-of-scope questions abstained; topic-specific questions returned answers; cleaned references contained no prompt leakage or raw KB markup.
- **Why this supports the score:** This run addresses the former AI-Judge evidence gap for the V2 RAG module. It does not, by itself, establish all non-RAG portfolio paths.
- **Additional non-RAG test:** Home, navigation, education disclosure, four projects, project detail expansion, research filtering, save/remove state, Life media, photo preview, and Guestbook form checks passed at 1512×1000. The recorded console finding was one favicon 404. See `evaluation/evidence/V2/nonrag_public_e2e.json`.

## Comparative conclusion

The supplementary totals increase from 79 for V0 to 90 for V1 and 91 for V2. These user-provided totals indicate the strongest supplementary gain for V1, with V2 scoring highest overall. The evidence archive contains V1 Few-shot iteration and structural-change records, and V2 RAG query, retrieval, answer, and public-test records. Because V0/V1 supplementary per-indicator examples were not separately documented, interpret their totals alongside the detailed official-rubric assessments rather than as a complete standalone evidence narrative.
