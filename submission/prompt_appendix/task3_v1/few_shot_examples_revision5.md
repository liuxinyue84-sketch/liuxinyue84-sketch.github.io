# Few-Shot Examples — V1 Component Architecture (Iteration 5)

These are pattern-level examples abstracted from the four GitHub references reviewed earlier. They record the reusable design pattern and the transfer, not any reference author's copy, identity, or assets.

## Example 1 — Editorial academic profile

- **Observed pattern:** use a clear editorial hierarchy, short section introductions, and a readable primary content column instead of a dense dashboard of uniform widgets.
- **Abstract component:** `FolioSection(eyebrow, heading, primaryStory, supportingLedger)`; the primary story carries the narrative while a smaller ledger presents supporting facts.
- **V1 transfer:** Highlights becomes an education journey beside a skill ledger; the lecture-note RAG module becomes a separate knowledge workbench. Existing V0 strings are moved into those shells unchanged.
- **Expected effect on generation:** replace the flat academic rows with a semantic, visually tiered folio and a distinct side ledger.

## Example 2 — Image-led art portfolio

- **Observed pattern:** let a dominant artwork lead, with small selectable previews and compact category/navigation cues that do not compete with the image.
- **Abstract component:** `ArtworkFeature(mainMedia, caption, index, thumbnails)`.
- **V1 transfer:** Home's existing carousel becomes a figure inside a journal-cover composition. Its existing captions and image alternatives remain; the chapter rail is a separate, flow-positioned navigation component.
- **Expected effect on generation:** make the existing illustration a major visual anchor and give the carousel a meaningful, synchronized thumbnail selector.

## Example 3 — Interactive project portfolio

- **Observed pattern:** provide a scannable project index, semantic individual case/story articles, and compact disclosure controls for deeper detail.
- **Abstract component:** `StoryIndex(items) + ProjectArticle(title, purpose, contribution, details, actions)`.
- **V1 transfer:** render the original four V0 projects as numbered index links and ordered semantic articles. Retain category filters, favorites, expansion, original details, tags, and source links.
- **Expected effect on generation:** move from uniform text rows to a loose editorial story atlas with direct section navigation and meaningful article structure.

## Example 4 — Personal visual archive

- **Observed pattern:** pair a short first-person introduction with an irregular media wall; use an accessible focused preview rather than turning every item into a heavy card.
- **Abstract component:** `LetterAside(copy) + MediaAtlas(existingMedia, keyboardPreview)`.
- **V1 transfer:** Life becomes a letter and image atlas containing the existing seven photographs and two videos. Guestbook uses the related open-letter form convention while preserving its original fields and state behavior.
- **Expected effect on generation:** vary the spatial rhythm, preserve the user's media, and make the preview interaction keyboard-accessible.

## Few-shot transfer constraints

1. Transfer DOM/component composition, semantic structure, hierarchy, and interaction patterns only.
2. Never transfer reference copy, biography, identity, repository imagery, or personal facts.
3. Every business-text string must come from frozen V0; if the source string cannot be identified, omit the proposed copy instead of inventing it.
4. Keep the visual treatment within the user's low-saturation watercolor diary palette.
