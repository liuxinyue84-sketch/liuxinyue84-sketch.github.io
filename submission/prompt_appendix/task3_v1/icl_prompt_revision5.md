# V1 Few-Shot Prompt — Component Architecture Rebuild (Iteration 5)

**Record type:** faithful operational prompt reconstructed from the user's explicit V1 constraints and approved scope in this conversation. This is not represented as a verbatim system prompt from a separate model session.

## Full instruction

> Generate the next V1 iteration from the frozen `coursework/website/V0/` baseline only. Do not derive V1 from V2, do not edit V0, and do not change Task 2 rubric or AI-Judge prompt. The previous V1 is insufficient because its visible and structural differences from V0 were too small. This iteration must make a substantial, observable change to HTML component shells, page layouts, and interactions using the approved few-shot component patterns.
>
> **Content contract:** retain 100% of V0's business copy verbatim: profile, education, awards, courses, skills, project descriptions, guestbook labels/messages, and all relevant captions. Do not add, delete, paraphrase, or semantically rewrite personal copy. Preserve source facts and use the existing V0 content/data files. Move that copy into the new component templates rather than retaining V0's flat paragraph/div layout.
>
> **Few-shot method:** use the already reviewed GitHub examples only to abstract reusable component architecture, layout, and interaction conventions. Do not copy reference personal information, text, identity, or assets. Explain the mapping from each example to the new component pattern. The examples should affect page structure and component behavior, not merely colors.
>
> **Design language:** preserve the watercolor sky-and-mountain background and quiet diary/illustration-portfolio character. Use low-saturation cream, pale blue, and off-white; paper edges or light frosted glass; generous whitespace; readable dark blue-gray copy; and very restrained hover transitions. Keep the presentation calm and avoid dashboard grids, hard gradients, saturated accents, and heavy shadows.
>
> Rebuild the Home hero as an editorial journal cover with the existing hero illustration carousel and a chapter rail linking to the existing long-scroll sections. Rebuild Highlights as an academic folio with a visual education journey, skill ledger, and knowledge-workbench shell. Rebuild Projects as a numbered story index plus semantic, asymmetrical project articles while preserving filters, saved state, details, and all original project copy. Rebuild Life as a letter beside an image atlas/scrapbook wall, keeping the existing seven photos, two videos, captions, and accessible preview behavior. Rebuild Guestbook as an open postcard/writing desk with the original form and guestbook content. Decorative details must stay secondary to reading.
>
> Keep the site as dependency-free static HTML, CSS, and JavaScript. Maintain keyboard access, visible focus, reduced-motion support, and responsive layout. Do not add unrelated stock photos. Do not autoplay music; keep playback under user control.
>
> Before finalizing, compare the rendered V1 copy against V0, verify all project-story fields and carousel alt/caption text, and assert the V1-specific component shells. Run the shared desktop E2E protocol at 1512×982 against local V1 and unchanged local V0. Save raw results and screenshots. Record any failed attempt and correction. Verify the frozen V0 checksum. Preserve this prompt, few-shot patterns, and the complete V1 source output in the coursework archive.

## Few-shot inputs

See `few_shot_examples_revision5.md` for the component-pattern abstractions and their transfer to V1. The reviewed repositories supply structure/interaction patterns only; none of their personal copy or assets are used.

## Iteration lineage

- Base: frozen V0, independently copied into `coursework/website/V1/`.
- Generated implementation snapshot: `llm_output/iteration_5/`.
- Evaluation: shared script `coursework/evaluation/scripts/test_portfolio_e2e.cjs` plus the V0/V1 copy-and-structure contract script.
