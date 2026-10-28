# V1 Few-Shot Prompt — Structural Revision 2

**Purpose:** Correct the documented limitation of the first V1 generation: its most visible changes were concentrated in Highlights/RAG, while the Home and Projects DOM and interaction patterns remained close to V0. This is a further V1 iteration from the frozen V0 baseline. It is not V2 and does not use V1 as a source for another version.

## Full prompt used for the structural revision

> Work only from the frozen source files in `coursework/website/V0/`. Preserve all personal facts, project evidence, education records, media, music, course-note corpus, section content, and existing working visitor features. Do not use reference-site copy or personal information. Do not remove any V0 content. Produce a meaningful V1 structural transformation, not a palette-only or CSS-only restyle. Keep static HTML, CSS, and vanilla JavaScript; no backend, dependencies, generated personal claims, or autoplay changes. Mark new regions with `【V1迭代新增】` and keep the frozen V0 directory byte-identical.
>
> Apply these four few-shot demonstrations as reusable transformation patterns. They describe structure and behavior, not merely visual styling:
>
> **Example 1 — from page links to a chapter route**  
> Input: “A long portfolio has several sections. Visitors should understand the order and jump directly to the part they want.”  
> Output pattern: preserve global navigation and page content; add a three-stop chapter rail immediately beneath the Home hero, with numbered links to existing sections. Keep it outside the hero image and carousel controls so the two navigation systems never overlap. Make each link keyboard-operable and give it a visible hover/focus response. On a small screen, keep the rail in normal document flow.
>
> **Example 2 — from passive hero image to scene selector**  
> Input: “The Home image is a carousel, but visitors cannot preview or directly select a scene.”  
> Output pattern: keep the existing carousel data and previous/next actions; turn its selector controls into small image thumbnails with captions and one clear selected state. Selecting a thumbnail updates the main image, caption, counter, and pressed state together. Use a semantic figure and figcaption; retain alt text and gentle transitions.
>
> **Example 3 — from a flat project list to navigable project stories**  
> Input: “Visitors need a quick overview of a few projects, then a direct way to inspect a chosen one and understand my own contribution.”  
> Output pattern: retain every supplied project fact; add a compact story index linking to individual project sections; render the stories as a semantic ordered list. Use an asymmetric paper-atlas composition rather than identical horizontal rows. Each story separates purpose from “My contribution”, and provides explicit expandable notes, filters, and persistent save controls. Preserve keyboard access, accessible expanded/saved states, and filter behavior.
>
> **Example 4 — reflow after filtering without losing story identity**  
> Input: “When a category is selected, remaining project cards should settle into their new positions without an abrupt jump.”  
> Output pattern: preserve the original filtering rules and project data; animate only the cards’ opacity and positional reflow with a restrained FLIP-style transition. Do not reorder the source data or make cards move independently of the selected filter.
>
> Apply these demonstrations to the original V0 Home and Projects DOM and rendering logic. A successful result must change both structure and interaction: the Home includes the chapter rail and selectable image thumbnails; Projects uses the story index, an ordered list of individual stories, explicit contribution blocks, and an asymmetric paper layout. Keep all existing V0 sections, facts, project details, and features. Do not modify Task 2 rubric, evaluator prompt, AI-Judge output, or V0. Return complete changed source files and a concise implementation/change report. The supplied local E2E suite is for verification; do not weaken assertions to make a version pass.

## Technique record

This is an in-context few-shot prompt: four input-to-output demonstrations are placed directly in the generation context and establish component transformation patterns. The revision responds to an observed weakness in the first V1 output. The examples specify structure and synchronized interaction state, not just color treatment. E2E checks `E2E-02b`, `E2E-03b`, `E2E-04c`, and `E2E-04d` test the corresponding Home/project changes. This is a prompt and generated implementation record; it does not claim that the local course-note retriever itself is an LLM.
