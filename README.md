# Aria’s Sky Journal — GitHub Pages Package

This repository serves three independent website versions:

- `/` — frozen V0 baseline.
- `/V1/` — V0 plus In-context Few-Shot Learning.
- `/V2/` — V0 plus the front-end RAG demonstration.

## Local preview

Open the corresponding `index.html`, or start a static server from the version directory:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000/`. Each version includes its own assets and knowledge files so it can be previewed independently.

## Submission package

`submission/` contains the assignment deliverables: the Chinese PDF and editable DOCX report, independent V0/V1/V2 website source copies, evaluation records, and prompt appendices. See `submission/README.md` for the package map and public URLs.

The root site files and `V1/` / `V2/` directories serve GitHub Pages. The copies under `submission/website/` are preserved for the coursework archive; do not remove either set.
