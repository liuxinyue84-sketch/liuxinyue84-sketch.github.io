# V1 Few-Shot Demonstrations and Reference Mapping

The four demonstrations are paired instruction/output examples used in the V1 generation prompt. They demonstrate component transformation rather than copying source code. Output snippets below are the target component contracts given to the model; the actual complete generated files are preserved under `llm_output/`.

| Example | Input → expected output | V1 manifestation | Structural reference pattern |
|---|---|---|---|
| 1. Education disclosure | Two study stages → two paper-like cards, chronological connector, accessible expand/collapse, all supplied facts retained. | Pegboard layout, bundled V0 photos, existing education facts and details, curved SVG thread; the original `aria-expanded` disclosure behavior is retained. | [al-folio](https://github.com/alshedivat/al-folio) and [academic-homepage](https://github.com/shaoyanliu/academic-homepage): compact academic information hierarchy, adapted to the V0 scrapbook aesthetic. |
| 2. Contribution-first project card | Project title/purpose/contribution → separate scannable contribution label, expandable paper card, keyboard control. | `v1.js` adds “MY CONTRIBUTION” presentation around the unchanged V0 contribution strings; existing paper cards and details remain. | [michaelkolesidis.com](https://github.com/michaelkolesidis/michaelkolesidis.com): section-led portfolio storytelling; [JiyaBatra ArtPortfolio](https://github.com/JiyaBatra/ArtPortfolio-jtc): gallery/card navigation structure. |
| 3. Evidence-grounded retrieval | “How does MapReduce work?” → retrieve the matching Hadoop/MapReduce note, quote it and show source. | `rag.js` adds example-derived topic profiles and a heading relevance boost while retaining BM25 and the original Markdown corpus. | Retrieval and interaction patterns adapted to this site's own notes; no reference copy or third-party text is used. |
| 4. Abstention | Out-of-corpus question → transparent no-evidence response, no unrelated excerpt. | `rag.js` rejects low-overlap results rather than presenting a weak match as an answer. | A grounded interface pattern, implemented against the local V0 evidence only. |

## Example outputs supplied to generation

```html
<article class="study-card">
  <button aria-expanded="false" aria-controls="study-details">Study stage</button>
  <div id="study-details" inert>Only the supplied education facts and details.</div>
</article>
```

```html
<p class="project-purpose">Purpose from the source record.</p>
<span class="contribution-label">MY CONTRIBUTION</span>
<span class="contribution-copy">Exact contribution from the source record.</span>
```

```text
CLOSEST NOTE EXCERPT
[verbatim retrieved passage]
— from [course] · “[heading]”
Topic matched
```

```text
No supporting passage was found in the supplied course notes.
Try a question about MapReduce, RAG, prompt engineering, or agent planning.
```

## Why these examples are few-shot learning

The prompt includes multiple task demonstrations with concrete inputs and desired output behavior before the target request. They show how to convert content needs into code-level component decisions, including accessibility and evidence boundaries. The generation is conditioned on these in-context examples; V1 does not train or fine-tune model parameters. The retrieval topic profiles are a resulting deterministic implementation of the MapReduce/RAG/agent-planning demonstrations, not a separate deployed LLM.
