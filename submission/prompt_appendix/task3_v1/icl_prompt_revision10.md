# Task 3 · V1 prompt, revision 10 — take the caption strip off the photograph

**Trigger.** One screenshot crop and four characters: "不要这里". The crop showed the bottom
third of the hero photograph carrying a light caption bar (`A bright start on the campus
track` … `— 01 / 03`), a row of three 82 × 47 thumbnails, and two 34 px circular arrows, all
floating over the sitter's gown.

**How the instruction was read.** "这里" is a place, not a thing: the request is about
position, so the elements move rather than disappear. Deleting the caption and the switcher
would have removed the only way to reach scenes two and three — a functional loss the author
did not ask for. The revision therefore relocates, it does not delete.

**Constraints handed to the generation.**

1. The `<figure>` holds the photograph and the corner stamp only. No text, no control, no
   scrim on top of the picture.
2. Caption, counter and switcher move onto a hairline directly beneath the frame, left edge
   aligned to the photograph's left edge, right edge flush with its right edge.
3. The switcher must stop pretending to be a viewer. Three image thumbnails at 82 × 47 show
   a rectangle of sky and a 7 px caption; they become rules — 20 × 2 px, 34 px when active.
4. The counter drops the leading em dash it carried when it trailed a caption: `01 / 03`.
5. Nothing else is touched — no section re-layout, no copy rewrite, no change to
   `style.css`, `projects.js`, `rag.js`, `knowledge-data.js` or any asset.
6. Every behaviour survives: arrow buttons, clicking the photograph, Enter/Space, the
   `aria-live` caption, `aria-pressed` on each rule.

**Deviations forced by the build.**

- The plate could not simply be nudged with `position` — the old caption and controls were
  absolutely positioned inside a fixed-height `<figure>`. They had to leave the element, which
  meant wrapping the figure and the new plate in `.cover-visual` so the cover grid kept two
  columns rather than inventing a third row.
- Removing the strip made seven now-dead rules in `v1.css` visible (three `.art-controls`,
  three `.art-caption`, one `.scene-dot` block plus its media-query overrides). They were
  deleted rather than overridden, because a rule that can never match is a trap for the next
  edit.
- Below 1121 px the plate wraps: caption on its own line, controls right-aligned beneath. The
  first attempt wrapped at 600 px only, and at 1024 the caption broke after "campus", leaving
"track" orphaned above the rules — one line could hold the caption or the controls, not both.

**Correction to a claim made here (2026-10-28).** This record first said
`assets/traumerei.mp3` "has never been shipped, so the toggle 404s and plays nothing". That was
wrong. The file is present in V0 and V1 (2,487,708 bytes, hashed in `MANIFEST.sha256`), it
decodes (duration 155 s) and clicking the note in the navigation bar starts playback. The two
failed-resource lines the E2E run reports are `favicon.ico` and its default-path twin, which V0
also lacks. The mistake was inferring a missing asset from those two lines instead of checking
the directory; corrected in `change_log.md`, iteration 11.
