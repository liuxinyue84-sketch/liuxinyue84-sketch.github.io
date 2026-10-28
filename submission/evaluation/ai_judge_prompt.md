# AI Judge Prompt — Apply in a New, Clean Session

> You are an independent evaluator assessing a personal portfolio website against the rubric and evidence supplied below. Evaluate only the supplied materials. Do not assume that source code works merely because an implementation is present. Distinguish observed test results from source-code claims and note when evidence is insufficient.
>
> **Do not infer or invent missing behavior.** If a task was not tested, state that limitation. Do not use outside information about the owner. Do not use or request any prior human assessment. Produce an independent assessment from this prompt and its attached evidence only.
>
> ## Rubric
>
> Score each criterion from 0 to 5. Scores 0, 3, and 5 correspond to the anchors below; integer scores 1, 2, or 4 may be used for performance between anchors. Calculate the weighted total as `Σ (criterion score ÷ 5 × criterion weight)` on a 0–100 scale.
>
> ### 1. Content Completeness & Clear Contribution — 30%
> Measures whether relevant profile, education, skills, projects, and contact/personal content are present and coherent, and whether project entries clearly explain the owner's contribution.
> - **0:** Most expected sections are absent/empty; work or contribution is uninterpretable; major contradictions or unusable content.
> - **3:** Several sections/projects are present, but important content is missing, repetitive, vague, or does not distinguish the owner's contribution.
> - **5:** Relevant sections are complete and coherent; project contributions are clear; no material gap prevents understanding the portfolio.
>
> ### 2. Navigation & Task Completion — 25%
> Measures whether visitors can find the main sections and complete representative tasks such as opening project details, filtering/saving projects, exploring media, using the course-note interface, and submitting a guestbook entry.
> - **0:** Main navigation is broken or essential content/tasks are inaccessible; most tasks fail.
> - **3:** Main sections are reachable, but an important task is confusing, incomplete, or fails in ordinary use.
> - **5:** Main sections are easy to find and representative tasks complete through clear controls with understandable feedback.
>
> ### 3. Readability & Visual Consistency — 25%
> Measures text legibility, hierarchy, spacing, responsive presentation, and visual consistency across sections and interaction states.
> - **0:** Text/controls are largely unreadable or layout is broken/inconsistent enough to prevent comprehension.
> - **3:** Overall style is recognizable and much content is readable, but notable inconsistency, small/low-contrast text, clutter, or layout issues hinder use.
> - **5:** Clear hierarchy and comfortable reading; coherent styling; tested responsive layouts and sufficient contrast keep content and controls usable.
>
> ### 4. Interaction Robustness — 20%
> Measures whether controls respond correctly, state persists where promised, empty/unavailable/error cases are handled clearly, and no misleading success state is presented.
> - **0:** Core interactions fail or cause unrecoverable errors; state is corrupted or actions receive no meaningful response.
> - **3:** Basic interactions work in common cases, but meaningful edge cases or environment constraints cause failures, unclear feedback, or unreliable state.
> - **5:** Core interactions work repeatedly in supported environments; state is clear and appropriately persistent; errors and restrictions receive useful feedback.
>
> ## Required output
>
> Return valid JSON first, with this schema:
> ```json
> {
>   "version": "V0",
>   "criterion_scores": [
>     {"criterion": "Content Completeness & Clear Contribution", "weight_percent": 30, "score_0_to_5": 0, "evidence_ids": [], "rationale": "", "confidence": "low|medium|high"},
>     {"criterion": "Navigation & Task Completion", "weight_percent": 25, "score_0_to_5": 0, "evidence_ids": [], "rationale": "", "confidence": "low|medium|high"},
>     {"criterion": "Readability & Visual Consistency", "weight_percent": 25, "score_0_to_5": 0, "evidence_ids": [], "rationale": "", "confidence": "low|medium|high"},
>     {"criterion": "Interaction Robustness", "weight_percent": 20, "score_0_to_5": 0, "evidence_ids": [], "rationale": "", "confidence": "low|medium|high"}
>   ],
>   "weighted_total_0_to_100": 0,
>   "limitations": []
> }
> ```
> After the JSON, provide a short evidence-based explanation. Cite evidence IDs for every claim. Identify unsupported tasks explicitly. Do not modify, round away, or omit any criterion score. Do not include any human score or human opinion.
>
> ## Evidence supplied
>
> Attach the evidence package listed in `evaluation/ai_raw_output.md` under “Evidence supplied to the clean Judge session”. The evaluator should receive rubric, screenshots, relevant source excerpts, and dated test logs only. Do not include human score sheets or human commentary.
