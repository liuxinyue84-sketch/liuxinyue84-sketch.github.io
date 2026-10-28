# Aria’s Sky Journal — V1 Few-shot

V1 is derived independently from the frozen V0 baseline using In-context Few-Shot Learning. It keeps the V0 personal content while changing the page shell and component layouts. It is not derived from V2.

## Preview locally

Open `index.html` or run a static server in this directory:

```sh
python3 -m http.server 8000
```

The site is served at `http://localhost:8000/` and deployed at https://liuxinyue84-sketch.github.io/V1/.

## Main changes

- Reorganized the page into a full-width editorial portfolio with section navigation.
- Added chapter navigation, education disclosures, expandable project stories, and a compact Life media wall.
- Kept the V0-derived personal text, project records, education information, media, and course-note corpus.

The generation prompts, few-shot examples, source snapshots, change log, screenshots, and E2E records are archived under `../submission/prompt_appendix/task3_v1/` and `../submission/evaluation/`. The final V1 AI Judge output is `../submission/evaluation/ai_raw_output_v1.md`.
