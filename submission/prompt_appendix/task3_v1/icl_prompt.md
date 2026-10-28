# V1 Generation Prompt — In-context Few-Shot Learning

**Version:** Task 3 / V1  
**Technique:** In-context learning with four input/output demonstrations (few-shot examples)  
**Baseline:** `coursework/website/V0/` only  
**Use:** This is the generation prompt recorded for the V1 source in `coursework/website/V1/`.

## Prompt

> You are a careful front-end engineer editing a static personal portfolio. Generate V1 from the provided, frozen `coursework/website/V0/` files only. Do not use V2, earlier `outputs/aria-v1` drafts, or any other derivative as a source. Preserve all personal facts, project details, education records, scores, media, music, course notes, and visitor features that exist in V0. Do not invent facts, replace the owner’s writing with reference-site copy, or import any personal information or assets from references. Keep the existing hand-painted blue-sky visual identity, colors, navigation labels, long-scroll page structure, and static HTML/CSS/vanilla-JS deployment model.
>
> Use the four demonstrations below as few-shot examples of the *transformation pattern*: turn a visitor need into a concrete, accessible component while keeping the supplied evidence and content intact. The demonstrations are authored for this task from structural patterns observed in the reference sites; they are not copied source code or personal content. References are structural inspiration only: [alshedivat/al-folio](https://github.com/alshedivat/al-folio), [shaoyanliu academic homepage](https://github.com/shaoyanliu/academic-homepage), [JiyaBatra/ArtPortfolio-jtc](https://github.com/JiyaBatra/ArtPortfolio-jtc), and [michaelkolesidis/michaelkolesidis.com](https://github.com/michaelkolesidis/michaelkolesidis.com).
>
> **Few-shot example 1 — education disclosure**  
> Input need: “Visitors need to compare two study stages without seeing every award and course at once.”  
> Desired output pattern: preserve both institutions and their supplied facts; use two distinct paper-like cards with a clear education sequence, one keyboard-operable disclosure button per card, `aria-expanded`, and a smoothly expanding detail region. A quiet hand-drawn connector may imply chronology. Do not fabricate campus imagery; use only bundled V0 photos or no photo.
>
> **Few-shot example 2 — project contribution**  
> Input need: “A visitor skims a portfolio and needs to distinguish the owner’s role from the project purpose.”  
> Desired output pattern: keep the original title, purpose, contribution, tags, and evidence; show purpose and contribution as separate visual lines with a small ‘MY CONTRIBUTION’ label. The card can vary slightly in angle and size, but its expand control must remain explicit and keyboard accessible.
>
> **Few-shot example 3 — knowledge chat evidence**  
> Input: “How does MapReduce work?”  
> Grounded output pattern: rank a passage whose heading or text concerns MapReduce/Hadoop/map-shuffle-reduce above unrelated course-note passages, quote only the retrieved note text, and show the course and heading. Do not claim that a local lexical retriever is an LLM or that it generated a synthesized answer.
>
> **Few-shot example 4 — unsupported course-note question**  
> Input: “How do I bake a sourdough loaf?” (not in the supplied course-note corpus).  
> Grounded output pattern: say that no supporting passage was found and offer a relevant course-topic suggestion. Never guess an answer or cite an unrelated passage.
>
> **Target task:** Apply these patterns to the frozen V0 website. The V1 iteration should make Highlights feel like a softly scattered pegboard, clarify project-contribution scanning, improve evidence-aware local course-note retrieval, and synchronize visible navigation/filter state with accessibility state. Keep the Home, Highlights, Projects, Life, and Guestbook sections; do not remove or rewrite V0 facts. Reuse only V0’s existing files and media. Add reduced-motion handling, responsive layout, and gentle transitions of at least 0.35 seconds for new/modified interactions. No backend, no dependencies, no uploads, no autoplay changes, and no new user data collection.
>
> Output complete changed files, not isolated snippets: `index.html`, any V1-only CSS/JS, and changed V0-derived JavaScript. Include a concise change list. Mark V1 additions in code comments with `【V1迭代新增】`. Do not modify the frozen V0 directory or the Task 2 rubric/evaluator.

## Recorded implementation boundary

The runtime examples above informed a deterministic, browser-local retrieval refinement. V1 still retrieves and quotes stored Markdown excerpts; it has no runtime LLM, network request, or generated answer. The only source corpus is the V0 course-note corpus. V1 deployment has not yet been performed; no URL is claimed here.
