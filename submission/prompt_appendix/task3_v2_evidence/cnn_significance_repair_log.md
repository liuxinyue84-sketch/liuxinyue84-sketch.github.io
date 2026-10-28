# V2-RAG CNN Significance Retrieval Repair — 2026-10-24

## Reported failure and preserved evidence

**User query:** `cnn的开创性意义`.  
**Before repair:** no reference passages and the exact no-material fallback, as shown in the user's screenshot at `iterations/2026-10-24-before-cnn-retrieval-fix/cnn-no-answer-user-screenshot.png`. The pre-repair retrieval ranked AlexNet first at score 5.2767 but gave it only 1/6 query-token coverage (0.1667), below the 0.24 reliability threshold, so it discarded all candidates. Query tokenization included `的开`, `开创`, `创性`, and `性意`, although the notes explain the concept using different wording.

The pre-repair V2 script, test runner, regression script, and query archive are preserved under `iterations/2026-10-24-before-cnn-retrieval-fix/`. Frozen V0 and V1 were not edited.

## Actual course-note evidence

The knowledge base already contained relevant material in `knowledge/5205-Introduction-to-AI.md`:

- **LeNet-5, “the first successful convolutional network”**: raw-pixel MLPs had too many parameters and ignored spatial structure; weight sharing and local connectivity drastically reduce parameters; LeNet-5 was applied to handwritten-digit recognition.
- **AlexNet milestone**: scaling CNNs to ImageNet-scale datasets with GPU training, ReLU, dropout, and data augmentation.
- **CNN Definition**: stacked transformations learn progressively more sophisticated representations of visual input.

These claims support an answer about CNNs' pioneering significance without outside facts.

## Changes

1. In `website/rag-v2.js`, recognize CNN “significance / importance / impact / 开创性意义” as one concept query. Remove the Chinese question phrase before tokenizing; expand with source-attested technical terms (`weight sharing`, `local connectivity`, `spatial`, `image recognition`). Apply a focused ranking boost only to the Introduction to AI sections whose original paragraphs actually contain those terms.
2. The resulting retrieved passages are LeNet-5 `[R1]`, AlexNet `[R2]`, and CNN Definition `[R3]`. The visible English answer summarizes the precise contribution: fewer parameters while preserving image structure, a handwriting-recognition demonstration, subsequent large-dataset scaling, and layered visual features.
3. Add Q19 exact user query and two paraphrases Q20/Q21 to the deterministic archive and regression suite. The browser E2E script now includes the exact typed query and a pending repaired-answer screenshot.

## Verification and limits

The deterministic suite passes **21/21** cases. Q19–Q21 each retrieve three relevant passages and return the same cited English explanation. The original no-answer screenshot is retained as failure evidence; no post-repair browser screenshot or browser E2E result has been claimed. The same lexical retrieval still has limits on unsupported paraphrases and concepts; these three checks demonstrate this specific repair, not universal semantic understanding.
