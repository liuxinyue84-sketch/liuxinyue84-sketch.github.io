# Supplementary Version-Sensitive Rubric

This rubric supplements, but does not replace, the official COMP5583 Task 2 rubric. The official four-metric rubric remains unchanged. This version-sensitive rubric reveals improvements introduced by In-context Few-shot Learning in V1 and Retrieval-Augmented Generation in V2.

## Scoring

Each criterion is scored from 0 to 5. `total = content x 20 + experience x 20 + technique x 30 + robustness x 20 + evidence x 10`. Since each raw score is out of 5, the maximum is 100.

| Score | Meaning |
|---:|---|
| 0 | Not implemented, absent, or unsupported |
| 3 | Partially implemented, with visible gaps or incomplete evidence |
| 5 | Clearly implemented, stable, and reproducible |

## Criteria

### 1. Content Fidelity and Completeness — 20%

Measures whether the frozen V0 personal content, education, projects, interests, and contribution statements remain accurate.

- **0:** Important content is missing, replaced, or contradicted.
- **3:** Most content remains, but some parts are incomplete or unclear.
- **5:** V0 content is preserved accurately and contributions are clear.

### 2. Page Structure and Visitor Experience — 20%

Measures information hierarchy, navigation, layout clarity, visual consistency, and visitor guidance.

- **0:** Main sections are confusing, inaccessible, or broken.
- **3:** Main path works, but hierarchy, guidance, responsiveness, or consistency has weaknesses.
- **5:** Controls are discoverable, hierarchy is clear, and the visitor flow is coherent.

### 3. Formal Technique Implementation — 30%

The criterion is version-sensitive in its evidence but uses the same score scale. For V0, assess whether a usable baseline is established without falsely claiming a task-3 technique. For V1, assess recorded few-shot examples, genuine component-architecture change, unchanged personal content, and documented example selection. For V2, assess the structured knowledge base, retrieval, source display, general relevance filtering, grounded citations, empty-result fallback, and exclusion of noise or cross-topic formulas.

- **0:** The claimed technique is absent or only described in prose.
- **3:** A partial implementation exists, but it is shallow, inconsistent, or weakly evidenced.
- **5:** The technique is materially implemented, version-appropriate, reproducible, and visibly affects behavior or architecture.

### 4. Interaction Stability and Boundary Handling — 20%

Measures normal interactions and edge cases including expansion, filtering, saving, media, music, guestbook, invalid input, and empty retrieval.

- **0:** Core interactions fail or produce misleading output.
- **3:** Main interactions work, but boundary or secondary paths remain unreliable.
- **5:** Normal and boundary paths provide clear feedback and preserve state correctly.

### 5. Version Evidence and Reproducibility — 10%

Measures whether a reviewer can reconstruct what changed and why.

- **0:** No usable version, prompt, source, or test evidence exists.
- **3:** Some evidence exists, but provenance or repeatability is incomplete.
- **5:** Prompts, source snapshots, change logs, screenshots, tests, and lineage records are consistent.

## Required evidence

Use screenshots, source excerpts, prompts, change logs, E2E results, regression results, and version hashes. Do not assign a score from the aggregate total alone.
