# Generation Prompt — Iteration 9 (Full-bleed Editorial)

This iteration was triggered by review feedback, not by a fresh design idea. The
author's verdict on iteration 7 was a screenshot of the framed window plus one line:
"v1好丑啊，越优化越丑…不想要有边框版，很局促", followed by "也不喜欢旁边放的信息".
That is the constraint set the prompt had to encode: no frame, no side column, and
not more of the same.

## Context handed to the model

```
You are rebuilding the page skeleton of a personal portfolio that is already
four iterations deep. The last iteration (app shell) was rejected on sight.

Frozen baseline: coursework/website/V0/  (must not be modified)
Current V1: coursework/website/V1/      (may be rebuilt)

Rejection feedback, verbatim:
  "v1好丑啊，越优化越丑怎么，不想要有边框版，很局促"
  "而且也不喜欢旁边放的信息"

Hard constraints:
  - No page-level frame and no bordered container around the content. A window,
    a card wall, or a rounded panel that encloses the layout is out.
  - No persistent side column carrying identity or facts.
  - Every string, project fact, education record, award, course name, media
    caption and image already exists in V0. Do not invent or rewrite copy.
  - Keep every id and class the existing scripts query, or the interactions die:
    [data-nav], .nav-indicator, #sound-toggle, #art-prev/#art-next/#art-dots,
    .school-head/.school-detail, #project-list, .row-toggle, .filter,
    #saved-filter, #media-gallery, #media-dialog, #guestbook-form, #rag-form.
  - The course-note RAG module keeps its retrieval behaviour.
  - Change the skeleton, not the content. This is a layout iteration.

Problem to solve: the site must read as structurally different from V0 at first
glance, without adding chrome. Structure has to come from scale, rules, whitespace
and bleed rather than from borders, radii and shadows.

Ask for three directions first, describe each in one line, let the author pick,
then implement only the chosen one.
```

## Directions offered

| | Direction | One-line description |
|---|---|---|
| A | Full-bleed editorial (chosen) | Content runs the whole viewport width on a hairline grid; oversized display type and edge-to-edge images carry the structure; no card anywhere. |
| B | Horizontal story line | Scroll-driven horizontal pages, one large image and one sentence per screen — closest to a photo book, most work in mobile and accessibility. |
| C | Subtraction only | Keep the existing structure, remove the window frame and rail, put navigation back on top — smallest change. |

The author picked **A**.

## Rules extracted from the direction

1. **One hairline grid.** A single rule weight separates every block. No block owns a
   border of its own.
2. **Type does the work a card used to do.** Section headings and project titles are
   display-sized; the old 30–40px card headings were not big enough to carry a layout
   without a container.
3. **Bleed on one axis only.** The cover photograph and the Life wall run to the
   viewport edge on the right; the left gutter stays constant. Bleeding on both axes
   turned the page into a slideshow in the draft.
4. **The top bar is a line, not a capsule.** Wordmark left, five labels right, music
   toggle last, underline for the active section. No pill, no blur box.
5. **The photograph is an opening image, not a background.** The fixed sky backdrop was
   retired; the sky survives as a masked band behind the cover only.
6. **Sections stay in normal flow.** No tabs, no clipping, no scroll hijacking — every
   anchor, filter, favourite, disclosure and gallery keeps working.

## Deviations recorded during implementation

- The first build kept the fixed sky photograph as the page background. With the paper
  cards gone, body copy sat on mountains and was unreadable. Confining the sky to the
  cover and giving the body a flat paper tone was not in the prompt; it was forced by
  the rendering and is logged in `change_log.md`.
- The Life wall was tried as a masonry composition and reverted to a four-column grid:
  uneven tile heights read as a broken section rather than a composed one at this
  content volume.
- The project row number was first placed at the far right of the left column and
  drifted into the gutter between columns; it now opens the row as a folio.

## Verification of this prompt

- `test_portfolio_e2e.cjs`: 35/35 PASS, 0 console errors, 0 page errors.
- `check_v1_v0_content.cjs`: 48 copy groups, 0 differences, 0 structure errors — the
  prompt's copy constraint held.
- Breakpoints 1512 / 1280 / 1024 / 820 / 414 px: no horizontal overflow.
