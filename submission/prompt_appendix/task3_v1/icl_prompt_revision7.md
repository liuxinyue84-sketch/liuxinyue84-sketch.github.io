# Generation Prompt — Iteration 7 (App Shell)

## Context handed to the model

```
You are rebuilding the page skeleton of a personal portfolio.

Frozen baseline: coursework/website/V0/  (must not be modified)
Current V1: coursework/website/V1/      (may be rebuilt)
Constraints:
  - Every string, project fact, education record, award, course name,
    media caption and image already exists in V0. Do not invent copy.
  - The course-note RAG module keeps its retrieval behaviour.
  - Keep every id and class the existing scripts query, or the
    interactions die: [data-nav], .nav-indicator, #sound-toggle,
    #art-prev/#art-next/#art-dots, .school-head/.school-detail,
    #project-list, .row-toggle, .filter, #saved-filter,
    #media-gallery, #media-dialog, #guestbook-form, #rag-form.
  - Palette: the existing watercolour sky palette only.
  - One variable at a time: this iteration changes the shell, not the content.

Problem: the R7 screenshot still reads as the same site as V0 — a single
column of paper sections under a pill navigation. Changing components
inside that frame does not register as change. Rebuild the frame.

Provide three skeleton candidates as clickable single-page drafts rendered
with the real copy, then implement the chosen one.
```

## Candidates returned

| Draft | Skeleton | Structural rule |
|---|---|---|
| A | Bentos mosaic | one 12-column grid, no section scroll, every cell is one fact or one control |
| B | Profile rail + content window | identity and navigation persist on the left; the right side is a bounded window that owns its scroll |
| C | Editorial split spread | each section is a full-bleed two-panel spread with an oversized headline and a meta row |

Chosen by the author: **B**.

## Implementation rules derived for the chosen skeleton

1. **Sections stay in normal flow.** Hiding them behind tabs would break every
   in-page anchor, the IntersectionObserver reveal, and the shared E2E protocol.
   The window scrolls; the sections do not move in the DOM.
2. **The rail reuses the existing navigation element.** `.nav-bar` / `.pill-nav` /
   `.nav-indicator` are restyled vertical rather than replaced, so `setActive()`
   and `aria-current` keep working. The indicator needs one axis switch.
3. **The active section is measured against the window, not the page.** The old
   `updateSectionNav()` compared rects to `innerHeight` and forced `guestbook`
   whenever the page bottom was reached — with no page scroll that fires on load.
4. **The chapter rail moves inside `#home`.** It was a sibling of the section, so
   between two 1-screen panels it fell into the seam and was never visible.
5. **Narrow screens keep the old reading model.** Below 981 px the rail collapses
   to a horizontal bar and the page scrolls normally.
6. **Two stories per row.** Four project cards across a 836 px pane produced
   rotated cards overlapping each other.

## Recorded deviations

- The first attempt at "one screen per section" left 300 px of dead space in the
  rail and pushed the chapter rail below the fold; the rail is now grouped with
  two auto margins instead of one, and the rail moved into the section.
- `.section-number` (`01 / HIGHLIGHTS`) duplicates the window title bar's
  `02 / 05`; it is hidden in shell mode, not deleted.
- The mobile cover originally showed the photograph before the headline; the
  order is now text-first in the shell.
