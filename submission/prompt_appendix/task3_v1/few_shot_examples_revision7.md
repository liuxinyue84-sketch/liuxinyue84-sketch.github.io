# Few-Shot Examples — V1 App Shell (Iteration 7)

The previous rounds changed components inside the same page skeleton: a single
column of paper sections under a pill navigation. Screenshot review of V1-R7
still read as the same website as V0, because the *frame* never changed.

Iteration 7 therefore conditions the model on **page skeletons**, not component
styling. Each demonstration below is a full-page pattern abstracted from a
public repository, reduced to its structural rule, then re-rendered with Aria's
own copy, photographs and palette. No reference copy, identity, image or code
was transferred.

## Reference sweep (2026-10-27)

Repositories were inspected and rendered before anything was written; the ones
that only repeat a centred hero plus a vertical card stack were discarded.

| Repository | Stars | What it actually renders | Verdict |
|---|---|---|---|
| `Ladvace/astro-bento-portfolio` | 392 | Asymmetric card mosaic; every card is a different function | Kept as skeleton A |
| `codewithsadee/vcard-personal-portfolio` | 8.1k | Fixed profile panel beside a tabbed content pane | Kept as skeleton B |
| `chrstnvi/zine-moskovskaya-excursia` | 115 | Full-bleed split spread, display type, meta row, rotated edge labels | Kept as skeleton C |
| `vivek9patel/vivek9patel.github.io` | 4.3k | Ubuntu desktop simulation; content lives inside draggable windows | Rejected: content becomes undiscoverable for a marker |
| `Cveinnt/LiveTerm` | 5.4k | Terminal emulation | Rejected: same discoverability problem, plus a typing metaphor that hides the work |
| `hackclub/scrapbook` | 190 | Daily journal cards with a streak grid | Rejected as a skeleton (blocked by a WAF anyway); its journal rhythm is already present in V1's paper cards |
| `rammcodes/Dopefolio` | 3.8k | Centred hero, gradient blob, vertical cards | Rejected: structurally identical to V0 |

## Example 1 — Bento mosaic (skeleton A)

- **Observed pattern:** one grid, twelve columns, cards of unequal span; each card
  carries exactly one fact or one control; there is no section-level scroll.
- **Abstract component:** `Mosaic(cells[])`, where a cell is
  `{span, role: identity | evidence | interactive}`.
- **Transfer attempt:** built as `work/design-draft/skeleton-A-bento.html` with
  Aria's copy — intro card, campus photograph, GPA figure, tool chips, the course-note
  chat, three project rows, a four-image strip, two school rows, a guestbook stub.
- **Result:** strongest "this is a different site" reading of the three, but the
  mosaic collapses into a plain card list below 720 px, which is where most of the
  marking will happen.

## Example 2 — Profile rail plus content window (skeleton B, chosen)

- **Observed pattern:** a persistent identity panel on the left holds the person,
  their meta facts and the navigation; the right side is a bounded window whose
  title bar names the current view; the window, not the page, scrolls.
- **Abstract component:**
  `AppFrame(Rail(identity, meta, nav, player), Window(TitleBar(crumb, counter), Pane[], StatusBar))`.
- **Transfer attempt:** built as `work/design-draft/skeleton-B-app-shell.html`, then
  implemented in `coursework/website/V1/`.
- **Why it was chosen:** it changes the reading model rather than the ornament —
  a visitor always sees who this is and where they are, and every V0 section keeps
  its own content and interactions.

## Example 3 — Editorial split spread (skeleton C)

- **Observed pattern:** each section is a full-bleed two-panel spread; one panel is
  a flat colour block carrying an oversized headline and a three-column meta row,
  the other is a single photograph; section labels are rotated along the edge.
- **Abstract component:** `Spread(textPanel(headline, kicker, metaRow), fullBleedMedia, edgeIndex)`.
- **Transfer attempt:** built as `work/design-draft/skeleton-C-editorial.html`.
- **Result:** the most "designed" of the three, but information density drops
  sharply — one project per screen is too slow for four projects plus coursework.

## Few-shot transfer constraints

1. Transfer skeleton, hierarchy and interaction pattern only — never copy,
   identity, imagery, or source code from a reference.
2. Only text that already exists in frozen V0 may appear; when the shell needs a
   label, it reuses V0's own strings (`Träumerei`, `with a little curiosity, Aria`).
3. Existing identifiers and behaviours must survive: `[data-nav]`,
   `.chapter-rail`, `#project-list`, `#media-gallery`, `#guestbook-form`,
   `#rag-form`, and every disclosure, filter, favourite and preview control.
4. The palette stays Aria's watercolour sky palette; the shell adds surfaces and
   spacing, not new colours.
