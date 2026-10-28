# Aria’s Sky Journal — V2 RAG

V2 is derived independently from frozen V0. It changes the course-note question module and carries forward the rest of the V0 site; it is not based on V1.

## Preview locally

Run a static server in this directory:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000/`. Public site: https://liuxinyue84-sketch.github.io/V2/.

## RAG demonstration

The static front end uses a structured local knowledge corpus and BM25 retrieval. It displays citations and cleaned reference passages in a collapsed panel, filters evidence with shared title-led relevance rules, and shows the insufficient-materials message when no usable passage is found. It does not call an external LLM or require an API key; answer composition is deterministic and is presented as a coursework workflow demonstration.

The current 9-case public RAG E2E record and latest AI Judge output are in `../submission/evaluation/`. Query runs, prompts, regression assertions, iteration logs, and screenshots are archived in `../submission/prompt_appendix/task3_v2_evidence/`.
