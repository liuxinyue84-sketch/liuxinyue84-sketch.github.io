# Gallery pattern sweep · iteration 10 (2026-10-27)

The author rejected the Life image wall on sight: "你这个图片太平铺、太大了，你再多提取一些
样本学习一下吧" — with a screenshot showing four equal columns of near-full-width photos. This
document records the samples consulted, what each one contributed, and why the chosen
composition is the one it is.

## 1. What was actually wrong (measured, not guessed)

Before the sweep, at a 1512 px viewport:

| Property | Value |
|---|---|
| Items | 9 (7 photos + 2 films) |
| Source ratios | six at 3:2, one at 2:3 (the double-bass portrait), two films at 16:9 / 4:3 |
| Grid | `repeat(4, 1fr)`, `gap: 8px`, every tile forced to `aspect-ratio: 1.15` |
| Tile size | 340 × 296 px |
| Wall height | ~950 px — larger than the copy block above it |
| Last row | 1 item, so the closing film took a quarter of the width on its own |

Three faults follow from this: every tile is the same size (no hierarchy), every tile is
large (the section reads as a photo dump rather than a page), and the tail row leaves one
tile stranded.

## 2. References consulted

| Source | What it contributed |
|---|---|
| SmugMug gallery-style taxonomy (Grid / Collage / Justified / Masonry / Slideshow) | The vocabulary; specifically that *justified* fixes row height and lets width vary, *masonry* fixes column width and lets height vary |
| 60 Minute Sites, "Photography Portfolio Layout Options Explained" | The explicit trade-offs: standard grid "can feel rigid"; masonry "can feel chaotic if not carefully balanced"; justified keeps ratios but "row compositions may shift on different screen sizes" |
| mediagallery.org, "Media Gallery Layouts" | The single most useful warning: a uniform grid "asks a portrait, a wide scene and a near-square composition to occupy the same shape", and on the final row "some implementations enlarge a lone remaining image… a quiet detail picture can suddenly look as if it was appointed chairman of the collection". That is exactly what the 4-column grid did to the closing film. |
| master-addons.com masonry comparison | Confirms the honest implementation routes: CSS columns, or a grid with explicit placement. No JS library needed for nine fixed items. |
| GitHub: `miromannino/Justified-Gallery` (used by 500px), `nk-o/flickr-justified-gallery` | Confirms justified rows are the photographer-side default for mixed orientations — and that they rely on measuring images at runtime, which a static nine-item page does not need. |

## 3. Rendered candidates

All three were rendered with Aria's real photographs at 1512 px and inspected as
screenshots (`work/design-draft/gallery-samples.html` keeps the study page).

| Candidate | Composition | Tile size | Wall height | Verdict |
|---|---|---|---|---|
| A · Contact sheet | 5 + 4, uniform | 268 × 179 | ~440 | Compact and tidy, but still a wall of equal cells — the flatness moved down in scale instead of away |
| B · Editorial mosaic | 5+5+note / 4 / portrait+2 films | 566 → 224 | ~760 | Real hierarchy, but the opening pair is bigger than what was already there — the opposite of the complaint |
| C · Justified rows | 3 per band, true ratios | 360 × 240 | ~900 | No crop at all, but three different right edges read as unfinished |
| **D · Compact mosaic (chosen)** | **4 + 4, one portrait spanning both bands** | **267 × 178** | **~420** | Small tiles, one vertical accent, all edges flush, no stranded tile |

## 4. Why D

- **It fixes the size complaint by arithmetic, not by opinion.** Nine items in two bands of
  four leaves the ninth slot for the portrait, which is the only image whose shape wants to
  be tall. Tile area drops from 100 640 px² to 47 526 px² — about 53 % of the old wall —
  and the wall height falls from ~950 px to ~420 px.
- **The portrait is not decoration.** At 267 × 400 the 2:3 frame is shown at 0.667 with no
  crop at all, while every landscape tile is a 3:2 frame in a 3:2 box. The accent is the one
  tile that is *not* cropped.
- **Nothing is stranded.** The right edge is flush in both bands; the closing tile is the
  tall portrait, not a leftover film.
- **Captions moved out of the photographs.** The gradient-overlay caption was the strongest
  "stock gallery widget" signal on the page; the caption now sits under each frame in 9.5 px
  tracked caps, the way a contact sheet is annotated.

## 5. Rejected on the way

- **Justified rows** — correct preservation of aspect ratio, but three ragged right edges in
  a row on an otherwise hairline-flush page.
- **Masonry via CSS columns** — solves raggedness, but the visual order stops matching the
  DOM order, so keyboard focus jumps around the grid. Not acceptable for a page that opens
  every tile with a button.
- **Restoring the V0 scrapbook** (rotated cards, tape, shadows) — this is what iteration 9
  deliberately removed; the author asked for no boxes.

## 6. Costs, stated plainly

- The tiles are small: 267 px wide at 1512. Faces are legible, details are not; the dialog
  is where a photograph is actually looked at. This is a deliberate trade for density.
- The composition is tuned for nine items. A tenth photograph would need a new slot, and the
  portrait slot is pinned to `:nth-child(7)` — the comment in `v1.css` says so.
- Between 981 and 1120 px the grid drops to four per band and the tall portrait takes the
  third row band with it, so the wall becomes 3 + 3 + 2. It is still flush, but it is a
  different composition, not a scaled one.
- A video tile used to paint nothing while `preload="metadata"` was still fetching metadata.
  Two poster frames were captured from the clips (`assets/life-video-1-poster.jpg`,
  `-2-poster.jpg`) rather than shipping 31 MB of video on first paint.

## 7. Test change record

`E2E-08d` previously asserted "varied card sizes and staggered positions" (≥4 distinct
`w×h`, ≥5 distinct `y`) — written for the V0 scrapbook mosaic, which no longer exists. It now
asserts the property the current design actually claims: uniform small tiles (≤2 distinct
widths), exactly one tile at least 1.6× the median height, a flush right edge, and every
caption outside its frame. The old assertion would have failed on any flush composition,
including this one; that is why it was restated rather than dropped.
