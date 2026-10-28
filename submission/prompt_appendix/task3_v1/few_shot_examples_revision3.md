# Few-Shot Demonstrations — Visual Refinement 3

## 1. Editorial navigation instead of duplicate tile cards

- **Input:** Navigation/index links are useful, but standalone tiles repeat the visual grammar of the content cards.
- **Output pattern:** A compact index with subtle separators and small typographic numbering; keep large cards for content and give the featured area breathing room.
- **Applied:** `.chapter-rail` is a single glass strip after the Home hero; `.project-atlas-index` uses a simple four-part editorial index. They no longer overlay carousel controls or add a second set of project cards.

## 2. Artwork-first media controls

- **Input:** A visual portfolio should let visitors select work directly without making controls dominate the image.
- **Output pattern:** Direct image thumbnails with one clear selected state, compact controls, and no unrelated stock imagery.
- **Applied:** Existing V0 carousel assets remain the source of the thumbnail and hero image. No new image asset or unrelated photograph was introduced.

## 3. Restrained interaction feedback

- **Input:** Clickable elements need feedback while the overall portfolio remains quiet.
- **Output pattern:** Small hover/focus shifts or a selected-state change, avoiding animation that moves neighboring content or obscures content.
- **Applied:** The chapter/index link hovers subtly highlight their own target; carousel selection and project filtering retain their existing stateful interactions.
