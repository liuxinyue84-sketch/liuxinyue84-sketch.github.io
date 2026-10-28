# V1 Few-Shot Prompt — Visual Refinement 3

**Trigger:** User screenshot review found that the Home carousel controls collided visually with the chapter navigation and the page composition felt unattractive. The user asked for refinement beyond that fix, informed by the four previously selected GitHub examples.

## Full refinement instruction

> Refine the existing V1-R2 design by editing the V1 files only; do not touch frozen V0 and do not use a V2 source. Use the four previously reviewed GitHub examples only as structural references. Keep all of Aria’s personal content, page sections, project facts, sky background, colors, and existing interactions. Never copy reference-site text, imagery, identity, or personal information.
>
> Use these reference-derived few-shot patterns:
>
> **Example 1 — restrained academic index**  
> Input: “The page needs navigation and scanning aids, but repeated standalone cards compete with the main content.”  
> Output: keep a clear editorial hierarchy; use a slim index with restrained dividers and typography rather than turning every link into a tile. Allow generous space around the main heading and featured work.
>
> **Example 2 — artwork remains the visual focus**  
> Input: “A creative portfolio uses thumbnails, filters, and previews to make its media explorable.”  
> Output: keep image selection as a direct, visible interaction, but keep controls compact and visually subordinate to the selected artwork. Use only the owner’s existing relevant assets; do not fill empty areas with unrelated stock photos.
>
> **Example 3 — purposeful microinteraction**  
> Input: “Interaction should reward exploration without making a calm personal website feel like a game.”  
> Output: use one small hover/focus response that clarifies the clickable target or updates a meaningful selected state. Avoid moving unrelated elements, collision, exaggerated easing, or decorative interactions with no feedback value.
>
> Apply the patterns to the V1-R2 layout: place the chapter rail in normal document flow directly under the Home hero and outside the carousel figure; make the three destinations one light glass strip with separators rather than three separate cards. Restyle the four-item project story index as a slim editorial index with separators, not four extra tiles; keep the actual project stories as the primary, asymmetrically arranged paper cards. Ensure the hero thumbnail selector and story index do not overlap at 1512×982, retain readable labels, and preserve responsive flow. Capture screenshots of the full Home view, chapter rail, and Projects section, then run the unchanged behavior checks. Do not weaken tests to accommodate the visual redesign.
