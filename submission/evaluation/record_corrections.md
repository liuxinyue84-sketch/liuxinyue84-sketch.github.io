# Evaluation Record Corrections and Provenance Notes

These notes clarify inconsistencies found while assembling the submission. Raw AI Judge outputs are preserved verbatim and are not silently rewritten.

## V0 evidence files

The dated log `evidence/V0/2026-10-23_live_e2e_test.md` and its homepage screenshot were recovered from the retained project evaluation archive and copied into this submission. The log is an actual contemporaneous record; it was not recreated. It describes the 2026-10-23 public V0 test and explicitly records the weak MapReduce result and untested valid Guestbook submission.

The V0 raw Judge file’s evidence manifest states that E7 full-page screenshots were unavailable, but the raw Judge JSON lists E7 among the evidence IDs for readability. The historical Judge output itself cannot establish that those screenshots were supplied. The current package does not retroactively claim they were. The raw output is retained unchanged for auditability.

## Score and output references

`comparison_and_limitations.md` uses the official Task 2 human totals (V0 76, V1 86, V2 86) and AI Judge raw totals (V0 81, V1 85, latest V2 rerun 91). The V1 human criterion scores 5/4/4/4 calculate to 86. The V1 Judge raw total remains 85, while recomputation from its listed criteria is 86; both values are displayed distinctly. The earlier V2 score is not used in the current table. The supplementary five-dimension totals (V0 79, V1 90, V2 91) remain separately labeled in `supplementary_human_assessment.md`.

The latest V2 AI raw output is `ai_raw_output_v2_rerun.md`. Previous comparison text that pointed to a missing generic `ai_raw_output.md` or an old V2 path has been corrected.

## Missing historical data

V0 and V1 supplementary five-dimension example-level notes were not separately recorded. The blank templates were removed; no historical tests or feedback have been invented. The official four-criterion human assessment files contain their own evidence narratives.
