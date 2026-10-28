# Report Figure Evidence Guide

Use these selected screenshots to support the version comparisons in the Chinese main report. Keep the report within the eight-page limit by replacing some descriptive prose with the figures; retain all original screenshots in the evaluation archive.

## Figure 1 — V0 and V1 desktop layout comparison

Place on the V1 section page, immediately after the description of the Few-shot structural change. Arrange the two screenshots side by side at the same displayed height.

- V0: `evidence/report_figures/V0-R7-E2E-01_home_full_desktop.png`
- V1: `evidence/report_figures/V1-PAGES-R7-E2E-01_home_full_desktop.png`
- Caption: **Figure 1. Desktop home-page comparison between frozen V0 and V1 Few-shot (Iteration 7).** The images document the two version layouts; describe only visible differences and do not infer behavior from screenshots alone.

## Figure 2 — V1 project detail interaction

Place beside or below the V1 project-content paragraph.

- V1: `evidence/report_figures/V1-PAGES-R7-E2E-17_single_project_open_desktop.png`
- Caption: **Figure 2. V1 project detail expanded in the desktop E2E run.** This supports the visible detail-disclosure state; the corresponding E2E record supports the interaction result.

## Figure 3 — V2 RAG answer and abstention

Place on the V2 evaluation page as a two-panel figure. Use equal image widths and label panels (a) and (b).

- (a) Answer with retrieved references: `evidence/report_figures/V2-RAG-01_retrieved-answer-desktop.png`
- (b) Insufficient-material fallback: `evidence/report_figures/V2-RAG-02_insufficient-materials-desktop.png`
- Caption: **Figure 3. V2-RAG public desktop examples.** (a) A supported query displays a cited answer and retrieved evidence. (b) A query without usable material displays the configured abstention message. The screenshots illustrate these cases; the E2E record supplies the broader nine-query result.

## Source and scope notes

The V0 and V1 files originate from `coursework/evaluation/evidence/`; the V2 files originate from `task3/v2/evaluation/evidence/`. Copies are included in `submission/evaluation/evidence/report_figures/` so the submission package is self-contained. These are desktop screenshots; they do not establish mobile or accessibility behavior.
