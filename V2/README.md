# Aria’s Sky Journal — V2-RAG

This independent coursework version is derived directly from the frozen `coursework/website/V0/` baseline. V1 was not used as a source. The only functional redesign is the course-note question-answer module; the rest of the site content and interactions are carried forward from V0.

## Run locally

From this directory, start a local static server:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000/` in a desktop browser. The bundled course corpus is loaded from `rag-knowledge.js`; a local HTTP server avoids browser restrictions around local files.

## V2-RAG behavior

- The knowledge corpus contains structured paragraphs from eight V0 course-note files plus the four V0 project records, including the published-paper profile and DOI.
- Queries are tokenized and ranked locally with BM25. Adjacent short paragraphs in one section are grouped for context, then up to four source passages are returned with their original text and citation. The source corpus itself remains unchanged.
- Question wording is removed from lexical matching so a query such as `agent是什么` searches for the subject rather than rewarding unrelated passages containing “是什么”. Definition headings, process sections, and domain qualifiers help rank passages; ambiguous `memory` queries request clarification.
- The page assembles a standard grounded RAG prompt internally for the coursework trace, but does not display the prompt to visitors. Complete prompts for every archived test query are in `../evaluation/query_runs_v2.json`.
- The visitor interface shows a concise English answer with `[R1]` citations. A native `details/summary` reference panel stays closed until the visitor opens it; its displayed snippets have Markdown and LaTeX artifacts removed, and internal `KB-` IDs are never shown.
- The answer stage links retrieval and rendering: a nonempty result produces a cited English answer or a cautious source summary; the exact no-material message is reserved for zero retrieved passages. Common course topics use source-checked summaries, while other retrieved topics use relevant English evidence sentences or a clearly scoped source description. The exact raw passages and assembled prompts remain in the coursework evaluation archive.
- The demo does not call an external LLM, use a backend, or contain an API key. It demonstrates retrieval, prompt construction, grounded summary formatting, and abstention; its response stage is not real LLM generation.
- Vague or out-of-scope queries with zero reliable retrieved passages display: `Insufficient reference materials to answer this question.`
- The visitor interface offers exactly three English question shortcuts: RAG, MapReduce, and agent tool use. The former Chinese agent test remains in the evaluation archive only.
- The page contains no visible internal prompt, development note, or implementation label. The wider portfolio layout and original V0 content remain intact.

## Source files

- `index.html`, `style.css`: original V0 site plus the V2-RAG question module and its styles.
- `rag-v2.js`: browser-side retrieval, prompt assembly, citations, and deterministic abstention/answer rendering.
- `rag-knowledge.js`: generated structured browser corpus.
- `knowledge/`: original Markdown course notes used to build the corpus.
- `projects.js`: frozen V0 project evidence included in the corpus.
- `app.js`, `assets/`: carried forward from V0 without V1 components.
