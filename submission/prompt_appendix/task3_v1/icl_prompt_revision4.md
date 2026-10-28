# V1 Few-Shot Prompt — Life Media Wall and Journal Marginalia (Iteration 4)

**Record type:** execution prompt prepared for this user-approved iteration. It records the operational instruction synthesized from the confirmed scope; it is not presented as a verbatim historical user message.

## Full instruction

> Continue the existing V1 branch, whose only source baseline is the frozen `coursework/website/V0/`. Do not read V2 as an implementation source, do not modify V0, and retain all of Aria's existing personal copy, projects, education details, images, videos, navigation, and interactions. The user has approved adding two visual refinements: (1) original, low-saturation hand-drawn SVG margin annotations with a quiet travel-journal character; (2) an asymmetrical scrapbook-style image wall for the existing Life photos and videos.
>
> Use the few-shot patterns below only for component structure and interaction conventions. Do not copy reference text, authors' identities, imagery, or personal facts. Do not add unrelated stock imagery. Keep the watercolor-sky background, calm palette, accessible text contrast, and dependency-free static HTML/CSS/JavaScript implementation.
>
> In Life, arrange the seven existing photos and two existing short videos as a loose but legible staggered composition with varied dimensions, soft paper edges, and restrained rotation. Preserve the existing captions and native media dialog. Make every media tile keyboard reachable, open the same preview with Enter/Space as with pointer activation, close with Escape, and retain visible focus feedback. Add small original inline SVG line drawings and short marginalia as decorative content hidden from assistive technology. Keep transitions gentle and honor reduced-motion preferences. Do not change the common evaluator rubric or AI-Judge prompt.
>
> After implementation, run the shared desktop E2E suite against V1. Capture a full Life-section screenshot and record the raw results. Verify V0 against its frozen checksum manifest. Save this iteration's prompt, few-shot examples, source output, change record, and evidence references in the coursework archive.

## Iteration lineage

- Base: frozen V0, copied earlier into the dedicated V1 folder.
- Input examples: `few_shot_examples_revision4.md`.
- Implemented source output: `llm_output/iteration_4/`.
- Shared evaluation protocol: `evaluation/scripts/test_portfolio_e2e.cjs`; Task 2 scoring rubric and AI-Judge prompt remain unchanged.
