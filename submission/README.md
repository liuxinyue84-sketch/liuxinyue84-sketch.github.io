# COMP5583 Final Experiment Submission

This package contains the final report, the three independent website versions, evaluation materials, and the prompt appendix.

## Public websites

- V0: https://liuxinyue84-sketch.github.io/
- V1 Few-shot: https://liuxinyue84-sketch.github.io/V1/
- V2 RAG: https://liuxinyue84-sketch.github.io/V2/

## Package contents

- `report.pdf` — final experiment report.
- `website/V0`, `website/V1`, `website/V2` — independent website source packages.
- `evaluation/` — rubric, human assessments, AI Judge prompts and outputs, test results, and evidence.
- `prompt_appendix/` — prompt and iteration records, source-output excerpts, and the consolidated appendix PDF.

## Evaluation summary

The official AI Judge results are V0 **81/100**, V1 **85/100** (raw output), and V2 **91/100** (latest rerun). The supplementary human assessments are V0 **79/100**, V1 **90/100**, and V2 **91/100**. See `evaluation/comparison_and_limitations.md` for score interpretation and limitations.

## Open a website locally

Each version is a static HTML/CSS/JavaScript site. If browser security prevents opening `index.html` directly, start a local server from the desired version directory:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser.
