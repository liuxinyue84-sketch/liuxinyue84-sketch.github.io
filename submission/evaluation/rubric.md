# Evaluation Rubric — Aria’s Sky Journal

**Scope.** This rubric is version-agnostic and must be applied unchanged to V0, V1, and V2. Each criterion is scored from 0 to 5. Intermediate integer scores (1, 2, and 4) may be used where performance falls between the stated anchors. The weighted total is calculated as `Σ (criterion score ÷ 5 × criterion weight)` and reported on a 0–100 scale.

| Criterion | Weight |
|---|---:|
| Content Completeness & Clear Contribution | 30% |
| Navigation & Task Completion | 25% |
| Readability & Visual Consistency | 25% |
| Interaction Robustness | 20% |
| **Total** | **100%** |

## 1. Content Completeness & Clear Contribution — 30%

**Definition.** Measures whether the portfolio presents the expected personal, educational, skill, project, and contact content; whether project entries explain the owner’s role or contribution; and whether claims are specific enough for visitors to understand the work. Assess presence, internal consistency, and clarity, not whether the evaluator personally agrees with the claims.

**Why this criterion matters.** A portfolio is useful only when visitors can understand who the owner is, what they have done, and what their contribution was. Missing or ambiguous content weakens the site’s purpose even when its appearance is polished.

- **0 — Not met:** Most expected sections are absent or empty; project work is missing or gives no interpretable account of the owner’s role; major content is contradictory or unusable.
- **3 — Partially met:** Several expected sections and projects are present, but one or more important areas are missing, repetitive, vague, or do not clearly distinguish the owner’s contribution.
- **5 — Well met:** Relevant profile, education, skills, projects, and contact/personal content are present and coherent; project entries clearly state the owner’s contribution; no material content gaps prevent visitors from understanding the portfolio.

## 2. Navigation & Task Completion — 25%

**Definition.** Measures whether visitors can locate the main sections and complete representative tasks, including opening project details, filtering or saving projects, exploring the life gallery, using the course-note interface, and submitting a guestbook entry.

**Why this criterion matters.** Portfolio content must be findable and its promised actions must be discoverable. Navigation and task completion evaluate the site as a usable experience rather than as a static collection of sections.

- **0 — Not met:** Main navigation is broken or essential content cannot be reached; most representative tasks cannot be completed.
- **3 — Partially met:** Main sections are reachable, but one or more important tasks are confusing, incomplete, or fail under ordinary use; visitors need avoidable workarounds.
- **5 — Well met:** Main sections are easy to find and representative tasks can be completed through clear controls with understandable feedback.

## 3. Readability & Visual Consistency — 25%

**Definition.** Measures text legibility, hierarchy, spacing, responsive presentation, and consistency of the visual language across sections and interactive states. Evaluate whether visual styling supports comprehension and whether contrast and sizing remain usable.

**Why this criterion matters.** The site’s visual identity is central to the portfolio, but decoration should not obstruct reading or interaction. This criterion balances visual coherence with practical legibility.

- **0 — Not met:** Text or controls are largely unreadable; layout is broken or inconsistent enough to prevent comprehension; major overflow or contrast problems dominate.
- **3 — Partially met:** The overall design is recognizable and much content is readable, but notable inconsistencies, small/low-contrast text, clutter, or responsive/layout issues hinder some content.
- **5 — Well met:** Clear type hierarchy and comfortable reading; coherent styling across sections; responsive layouts and sufficient contrast keep text and controls accessible in tested viewports.

## 4. Interaction Robustness — 20%

**Definition.** Measures whether interactive controls respond correctly and consistently, preserve state where promised, handle invalid/empty/unavailable conditions gracefully, and avoid uncaught errors or misleading success states.

**Why this criterion matters.** A visually convincing interface can still fail users if controls break, saved state disappears unexpectedly, or browser restrictions produce opaque errors. Robustness is especially relevant to a static site with media, local storage, and client-side retrieval.

- **0 — Not met:** Core interactions fail or cause unrecoverable errors; state is corrupted or user actions provide no meaningful response.
- **3 — Partially met:** Basic interactions work in common cases, but meaningful edge cases or environment constraints produce failures, unclear feedback, or unreliable state.
- **5 — Well met:** Core interactions work repeatedly in supported environments; state changes are clear and appropriately persistent; errors, empty states, and browser restrictions are handled with useful feedback.

## Scoring procedure

1. Use the same task list, viewport sizes, browser settings, and evidence capture method for each version.
2. Separate observed behavior from source-code inference. Do not award a behavior as tested merely because code appears to implement it.
3. For each score, retain at least one evidence item and the exact task/prompt that elicited it.
4. Calculate the weighted score using the formula above. Preserve criterion-level scores; the aggregate must not replace qualitative evidence.
5. Apply the same protocol to all versions. Record browser, operating system, viewport, date, and whether the test used `file://` or HTTP.
