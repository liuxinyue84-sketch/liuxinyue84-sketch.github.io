# Clause and Formula Provenance Validation

## Reported defect

A diffusion-model answer cited a reconstruction loss, `L = (1/n) sum (x^i - G(E(x^i)))^2`, taken from a chunk that compared several generative-model families. The chunk was broadly relevant to generative models, but that individual formula belonged to another model column. Chunk-level relevance alone was therefore insufficient.

## Generic repair

The retrieval output and chunk-level semantic filter remain unchanged. A second evidence-level check now applies to every candidate clause and formula:

- A prose clause must overlap the query subject, be an explanatory/anaphoric clause from a directly matching topic, or be explanatory evidence from an accepted exercise solution.
- A formula is inspected in its local source window. It is retained only when that local context contains the query subject/acronym, when an accepted exercise solution directly supplies it, or when a single-formula directly matching chunk provides it.
- If a Markdown table contains several formulas, column ownership is considered ambiguous. No formula is extracted from that table unless reliable column attribution exists; the prose evidence can still be used.
- Every rendered sentence retains the reference number of the exact chunk from which its text or formula was extracted.

These rules contain no branch for diffusion models, VAEs, GANs, DQN, CNNs, or any other named topic.

## Evidence

- `manual_clause_provenance_probe.json` records a non-Q-number diffusion query. Its answer uses diffusion-process evidence and does not contain the reconstruction loss.
- `manual_exercise_solution_probe.json` confirms that a worked exercise's single arg-max formula remains available and correctly cited.
- `relevance_regression_v2.json` now includes the shared `formula-provenance` invariant. The 28-query corpus passes all ten generic invariants.

This is deterministic script evidence. Current browser E2E and independent AI-Judge verification remain pending.
