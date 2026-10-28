# Reference Pattern Notes for V1

Only component structure, information hierarchy, and interaction patterns were considered. Reference authors’ words, identity, images, and personal information were not copied.

| Reference | Pattern observed | Adaptation to Aria’s site |
|---|---|---|
| [al-folio](https://github.com/alshedivat/al-folio) | Clean academic information structure and explicit section hierarchy. | Keep Aria’s long-scroll sections easy to scan; avoid decorative controls competing with the content. |
| [Shaoyan Liu’s academic homepage](https://github.com/shaoyanliu/academic-homepage) | Compact academic homepage with news/publication groupings, filters, and accessible media viewing. | Present the four projects through a compact index plus detailed story cards; reuse existing site interactions and content. |
| [Jiya Batra’s art portfolio](https://github.com/JiyaBatra/ArtPortfolio-jtc) | Image-led gallery organization, categories, and direct viewing actions. | Keep the V0-owned carousel thumbnails selectable and preserve image/video previews in Life; no unrelated imagery was introduced. |
| [Michael Kolesidis’s portfolio](https://github.com/michaelkolesidis/michaelkolesidis.com) | Deliberate, responsive microinteractions around page elements. | Use restrained hover/focus and selected-state feedback only; do not reproduce its deliberately colorful early-web aesthetic or its content. |
| [Scrapbook Portfolio](https://github.com/aalinchen/Scrapbook-Portfolio) | Multi-page journal organization, original hand-drawn SVG doodles, and small scroll interactions. | Best additional match for Aria’s diary feeling: use the page-sequence and restrained hand-drawn annotation ideas, while preserving the watercolor sky and avoiding decorative clutter. |
| [Photography Wall](https://github.com/Gabriel-Dalton/photography-wall) | Uneven masonry photo wall with a keyboard-operated lightbox. | A possible model for organizing Aria’s own Life photos and videos into a more image-led gallery with accessible next/previous viewing. Use only her existing photos and videos. |
| [Korbinian Möller’s personal website template](https://github.com/korbinianmoller/personal_website_template) | Compact researcher/developer site with section navigation, grouped publications, and detail modals. | Useful for making academic/project details scannable and inspectable without adding more full-size tiles. Keep the content and visual tone personal to Aria. |
| [Hitesh Nandakumar’s portfolio](https://github.com/hiteshwired/PortfolioWebsite) | Static single-page portfolio with project write-ups, visible capabilities, keyboard-friendly navigation, and reduced-motion support. | Useful as an implementation reference for clear case-study content and accessible vanilla-JS behavior; keep the sky-journal art direction. |

## Decisions after screenshot review

- The chapter rail originally collided with the carousel thumbnails. It now sits in document flow after the hero, in a single glass strip with dividers.
- Repeated standalone boxes made the Home and Projects index areas feel like a dashboard. Both indices now use typography and separators; the project stories themselves retain the paper-card treatment.
- Artwork remains the focus of the Home hero. Existing V0 assets are used for the hero and thumbnails; no stock image was added.
- These refinements and their tested screenshot output are recorded in `icl_prompt_revision3.md`, `change_log.md`, and the `V1-R4-` evidence files.

## V1 iteration 4 application

- `Photography Wall` informed the image-first, uneven arrangement and keyboard-operable viewing; V1 keeps its own native preview dialog rather than copying a reference implementation.
- `Scrapbook Portfolio` informed the use of small, original SVG margin notes. The new sprig and flight-path sketches were authored for this site, use its muted palette, and are decorative only.
- The seven existing photos and two videos remain the only Life media; the art direction, copy, and identity remain Aria's.
