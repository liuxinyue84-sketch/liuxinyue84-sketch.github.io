# Exercise and Solution Relevance Rule

## Requirement

A recalled chunk must not be rejected merely because it comes from a classroom exercise, quiz, multiple-choice question, or worked solution. If the explanatory text contains a queried concept's definition, mechanism, formula, decision rule, role, or supported result, the chunk is valid evidence. A bare question or option list remains noise.

## Generic implementation

The shared `assessChunk()` function now detects exercise-source markers in the topic or section path and separately detects explanatory-solution evidence in the passage. The evidence vocabulary is general: answer/solution/explanation markers, causal or definitional language, estimation and approximation language, selection/maximization language, and formula notation. The query subject or acronym must still occur in the body or topic. This rule contains no model-specific query branch.

Exercise explanations receive the reason label `exercise solution contains direct explanatory evidence`. All recalled chunks remain visible in the folded reference panel; only chunks that pass the shared relevance rule can be cited.

The shared evidence generator also preserves short mathematical expressions from worked solutions. It renders formulas as complete explanatory sentences, such as a decision rule that maximizes a stated expression, instead of exposing raw Markdown/LaTeX.

## Manual generic probe

`manual_exercise_solution_probe.json` records a manual probe asking how a value-based deep-reinforcement-learning method chooses an action. The exercise solution is accepted as relevant evidence, its arg-max rule is cited, and supporting value-function material is combined into the answer. The probe is not appended as a new Q-number and does not add a topic-specific expected-answer test.

The existing 28-query corpus still passes all nine generic invariants. Browser E2E and independent AI-Judge verification remain pending.
