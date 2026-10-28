# Task 3 · V1 prompt, revision 11 — make the skill lines open

**Trigger.** One screenshot of the `THINGS I WORK WITH` band and one question:
"为什么这个点开不能看见具体介绍了". Not a design taste complaint — a report that a control the
author expected to work did nothing.

**Diagnosis before any writing.** The four `<li>` were V0 copy with no handler, no link and no
`tabindex`; the only live control in the band was the tool-chip strip 80 px below, whose own
label reads `TOOLS · CLICK TO SEE RELATED PROJECTS`. The four beads per row (one filled) read
as an unselected carousel page, which is what invited the click. So the failure was an
affordance that lied, not a missing paragraph.

**Samples.** This iteration did **not** run a new external sweep, and the record should say so
plainly rather than implying one. The pattern came from two places already inside the project:

1. **In-page precedent** — the education rows above it (`.school-head` / `.school-detail`,
   `aria-expanded` plus `inert`) already open a hairline panel on click. Reusing that pattern
   makes the band read as one system instead of a second, invented interaction.
2. **`reference_patterns.md`** — the Korbinian Möller entry ("detail modals … useful for making
   academic/project details scannable and inspectable without adding more full-size tiles") and
   the Hitesh Nandakumar entry ("project write-ups, visible capabilities") are what justify
   inspectable-detail-on-demand over a modal or a jump to another section. Neither was re-read
   as a new sample; they were already the stated basis for detail-on-demand in this build.

**Constraints handed to the generation.**

1. The line itself becomes the control — the whole row, not a link at its end.
2. Resting copy stays byte-identical to V0: beads, title, one-line summary. Any new affordance
   must be generated content, not DOM text, so `check_v1_v0_content.cjs` keeps reading the same
   four strings.
3. The panel carries evidence, not adjectives: two lines drawn from project facts already on
   the page, plus one link to the story that backs them. No new biography.
4. The link must land the reader on the evidence, so it also unfolds the project story it jumps
   to.
5. Collapsed panels are `inert` — never tabbable while invisible.
6. Nothing else on the page changes. No copy rewrite, no new section, no new colour.

**Deviations forced by the build.**

- The parity collector compared `.skill-notes li` `innerText` across builds, and the panels live
  inside those `li`. It now drops `.skill-detail` from the clone before reading, the same
  treatment `.school-action-hint` already had. The guarantee is unchanged — no V0 copy was
  rewritten — but the mechanism had to admit additive copy.
- The band's eyebrow had been printing through its own headline below 980 px since iteration 9
  (one grid cell, margins tuned for the 30 px desktop title). Found while checking 414 px, fixed
  in the same pass as R12b. Pre-existing, not caused by the disclosure, but it would have been
  dishonest to ship a new mobile check and leave that in place.
- The `＋` mark had to be `::after` rather than text, because a text node would have entered
  `innerText` and turned the equality check into a special case.

**Not done, deliberately.** No new external sample sweep for this iteration. If the archive
needs a fresh few-shot set per iteration, that is a decision to take on its own — inventing
samples after the fact would be fabrication.
