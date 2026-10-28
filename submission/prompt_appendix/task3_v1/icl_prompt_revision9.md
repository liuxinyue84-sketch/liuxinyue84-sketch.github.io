# Generation Prompt — Iteration 10 (Life gallery, compact mosaic)

Second review-driven iteration in a row. The editorial skeleton from iteration 9 was
accepted, but the author pointed at the Life image wall: "你这个图片太平铺、太大了，你再多提取一些
样本学习一下吧". Two faults in one line — the wall is flat and uniform, and the tiles are too
large — plus an explicit instruction *how* to fix it: study more samples first, do not guess.

## Context handed to the model

```
You are revising the "Life" section of a personal portfolio that is already on its
editorial skeleton. The skeleton was accepted; the photo wall inside it was not.

Frozen baseline: coursework/website/V0/  (must not be modified)
Current V1: coursework/website/V1/      (the editorial layer lives in v1.css)

Review feedback, verbatim:
  "你这个图片太平铺、太大了，你再多提取一些样本学习一下吧"

Hard constraints:
  - Do not bring back borders, cards, tape, rotation or drop shadows on the tiles.
    Iteration 9 removed them on purpose.
  - Nine moments exist: seven photographs and two short films. None may be hidden
    at desktop width.
  - Do not rewrite any caption. The captions are compared byte-for-byte against V0.
  - Keep #media-gallery > .media-item as <button> elements; the dialog, keyboard
    activation and the aria-labels are already wired through them.
  - The page grid is full-bleed with a hairline rhythm. The wall must end flush on
    the right like every other block on the page.

Method, in this order:
  1. Measure the current wall: tile size, wall height, item count, what the last
     row does. State the faults as numbers before proposing anything.
  2. Collect references. Read the layout taxonomies (grid / masonry / justified /
     contact sheet), and find at least one source that names the failure mode —
     a uniform grid forcing a portrait and a landscape into the same shape, and
     the last row enlarging a lone remaining tile.
  3. Render at least three compositions with the real photographs at 1512 px and
     look at them. Reject the ones that only shrink the problem.
  4. Implement the one that solves both faults. Keep the passes separable in CSS
     so the review history stays readable.
```

## Constraints the composition had to satisfy

1. **No stranded tile.** The right edge of every band must be flush, so no tile can be
   stretched to fill a leftover slot.
2. **Hierarchy without size inflation.** The accent had to come from *shape*, not from making
   one tile enormous.
3. **Aspect honesty where it matters.** The one 2:3 portrait should be shown at something
   close to 2:3; the 3:2 landscapes should not be cropped to squares.
4. **Captions out of the image.** No gradient overlay.
5. **Graceful at 1512 / 1280 / 1024 / 820 / 414.** At two columns the ninth tile must not sit
   alone in the last row.

## What the model produced

A 20-column grid, eight tiles at `span 4` (267 × 178 at 1512 px) in two bands of four, with
the double-bass portrait pinned to `17 / span 4` across both bands at 267 × 400 — the
uncropped 2:3 frame. Captions moved into the margin. Breakpoint at 1120 px drops to four per
band; below 980 px it becomes two columns and the closing film takes the full width so the
wall does not end on an orphan.

## Deviations recorded

- The first attempt kept the old `grid-auto-rows: 27px` and the V0 `nth-child` row spans,
  which collapsed every row to 27 px and stacked the tiles on top of each other. Both rules
  were dead weight from the scrapbook era and were removed rather than fought with
  `!important`.
- A `!important` span reset from iteration 9 (`#media-gallery.media-wall > *`) had to be
  deleted for the same reason.
- Video tiles painted an empty beige rectangle while `preload="metadata"` was still
  fetching. Two poster frames were captured from the clips and shipped as assets instead of
  raising `preload` to `auto` on a 31 MB file.
- `E2E-08d` was restated. It had been written for the V0 scrapbook mosaic; see
  `gallery_pattern_sweep.md` §7 for the old and new assertion.

## Verification

`test_portfolio_e2e.cjs` 35/35 PASS, 0 console errors, 0 page errors
(`evidence/V1/V1-R10-e2e-results.json`); `check_v1_v0_content.cjs` 48 copy groups, 0
differences (`evidence/V1/V1-R10-content-parity.json`); wall measured at 1512 / 1280 / 1024 /
820 / 414 px with no horizontal overflow and a flush right edge at each.
