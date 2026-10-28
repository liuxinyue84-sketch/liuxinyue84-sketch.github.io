# Task 3 · V1 Few-Shot Learning Archive

This folder records the V1 generation inputs and outputs:

- `icl_prompt.md` — complete generation prompt and constraints.
- `icl_prompt_revision5.md` and `few_shot_examples_revision5.md` — the copy-preserving, component-architecture rebuild prompt and four abstracted few-shot patterns.
- `icl_prompt_revision6.md` — verbatim screenshot feedback and the corresponding usability correction record.
- `icl_prompt_revision7.md` and `few_shot_examples_revision7.md` — the page-skeleton rebuild: three rendered candidates, the reference sweep behind them, the chosen app shell, and the implementation rules it produced. Superseded at review.
- `icl_prompt_revision8.md` — the full-bleed editorial rebuild that replaced the app shell: the verbatim rejection feedback, the three directions offered, the chosen one, the six rules it produced, and the deviations forced by rendering.
- `gallery_pattern_sweep.md` — the Life image-wall study: the measured faults, the five layout references consulted (including the source that names the stranded-last-tile failure), three rendered candidates with verdicts, the chosen mosaic and its numbers at five breakpoints, and the record of which E2E assertion was restated and why.
- `icl_prompt_revision9.md` — the prompt for that rebuild: constraints (no boxes, no hidden items, no rewritten captions, flush right edge), the study-first method, and the deviations.
- `icl_prompt_revision10.md` — moving the hero caption, counter and scene switcher off the photograph and onto the hairline beneath it: how "不要这里" was read as a position rather than a deletion, the six constraints, and the deviations the layout forced.
- `icl_prompt_revision11.md` — turning the four skill lines into disclosures after the author reported that clicking them did nothing: the diagnosis (an affordance that lied, not missing copy), the in-page pattern reused instead of a new sample sweep, the six constraints, and the parity-collector change this forced.
- `few_shot_examples.md` — four input/output demonstrations, reference-pattern mapping, and explanation of how the examples conditioned the generated components.
- `llm_output/` — initial generated full source files, before the version-label/alt-text verification correction.
- `llm_output/iteration_5/` and `iteration_6/` — complete source snapshots for the structural rebuild and subsequent usability correction.
- `llm_output/iteration_7/` — complete source snapshot of the app-shell rebuild (index.html, style.css, v1.css, app.js, v1.js).
- `llm_output/iteration_8/` — complete source snapshot of the full-bleed editorial rebuild that replaced it.
- `llm_output/iteration_9/` — complete source snapshot of the compact Life mosaic (index.html, style.css, v1.css, app.js, v1.js).
- `llm_output/iteration_10/` — complete source snapshot of the cover-plate rebuild (index.html, style.css, v1.css, app.js, v1.js).
- `llm_output/iteration_11/` — complete source snapshot of the skill-disclosure rebuild, hash-matched to the deployed `V1/` package.
- `change_log.md` — source lineage, modified files, correction record, and evidence boundary.
- `technique1_comparison.md` — V0-to-V1 results, trade-offs, and remaining evaluation gaps.

Official baseline: `coursework/website/V0/`. V1 source: `coursework/website/V1/`. The fixed Task 2 rubric and AI Judge prompt were not changed. The clean-session AI Judge response is intentionally pending and must not be fabricated or replaced with the human assessment.
