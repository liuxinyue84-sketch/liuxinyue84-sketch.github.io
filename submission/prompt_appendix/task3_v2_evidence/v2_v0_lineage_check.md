# V2 lineage check — is V2 built on V0?

**Requirement.** V2 must be built on the frozen V0 portfolio, not on V1 and not as a
standalone site.

**Checked:** 2026-10-27 (Asia/Hong_Kong), against `coursework/website/V0/` and
`task3/v2/website/`.

## 1. V0 was not modified

`v0_baseline_sha256.txt` was captured before V2 work. Recomputing the four hashes
today returns the recorded values, so the baseline the V2 copy came from is intact:

| File | Recorded = current |
|---|---|
| `index.html` | `653c9c6d…2f42e` |
| `style.css` | `028549f6…16d7` |
| `rag.js` | `375b5f2e…c803` |
| `knowledge-data.js` | `217ce13b…f42e` |

## 2. What V2 changed relative to V0

| File | Result | Detail |
|---|---|---|
| `app.js` | identical | byte-for-byte |
| `projects.js` | identical | byte-for-byte |
| `assets/` | identical | recursive compare, no differences |
| `knowledge/` | identical | recursive compare, no differences |
| `index.html` | 3 hunks | the course-note card, the footer version label (`V0 · 2026` → `Aria’s Sky Journal · 2026`), and the two script tags that swap `knowledge-data.js`/`rag.js` for `rag-knowledge.js`/`rag-v2.js` |
| `style.css` | one appended block | 45 added lines, every selector under the `/* V2-RAG coursework module */` block is `.rag-v2-*` (plus one `@media` containing only `.rag-v2-*`); no V0 rule is edited |

The V2 page therefore contains every V0 section, control and asset unchanged, and adds
one redesigned module.

## 3. Consequence recorded after the check

Two global overrides had been appended while building the card — `.nav-bar{margin-bottom:0}`
and `.section{scroll-margin-top:120px}`. Both changed page-wide spacing relative to V0
(the first pushed all content 53 px down). They were removed on 2026-10-27 so that the
only visible difference from V0 is the course-note module. Rechecked afterwards: the
sticky nav ends at 66 px and the card starts at 329 px, so no overlap; page height dropped
from 5,420 px to 5,367 px, which matches V0's spacing.

## 4. Verification after the change

- `node scripts/run_queries.cjs` → 28 queries, answers re-archived to `query_runs_v2.json`.
- `node scripts/relevance_regression.cjs` → `{"passed":true,"queries":28,"genericRules":10}`.
- `node scripts/e2e_v2.cjs` → `{"passed":true,"testCount":9,"errors":[],"externalRequests":[]}`,
  five evidence screenshots re-captured from the same run.

## 5. Scope note

V1 is a separate branch from the same frozen V0 (`coursework/website/V1/`), so its Home
chapter rail, thumbnail carousel and project story index are not part of V2. Under the
stated requirement this is correct: V2 is measured against V0 with one technique applied,
and importing V1's layout would confound that comparison.
