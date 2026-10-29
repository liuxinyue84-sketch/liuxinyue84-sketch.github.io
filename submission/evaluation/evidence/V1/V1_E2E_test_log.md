# V1 Desktop End-to-End Test Log

**Version:** V1, derived from frozen V0 using the recorded Few-Shot Learning prompt.  
**Date:** 2026-10-23 20:20 Asia/Hong_Kong (2026-10-23 12:20 UTC).  
**Browser:** Google Chrome headless via Playwright; same runner for V0 and V1.  
**OS:** macOS. **Viewport:** 1512 × 982 CSS px.  
**Route:** local HTTP, `http://127.0.0.1:5584/`; final V1 is also published at `https://liuxinyue84-sketch.github.io/V1/`.  
**Starting state:** isolated fresh browser context; no saved favorites and no guestbook entries.

All 25 assertions passed. Exact test inputs and observed outputs are preserved in `V1-e2e-results.json`.

| Test | Input/action | Result |
|---|---|---|
| E2E-01 | Open site | HTTP 200; title and homepage load. |
| E2E-02 | Navigate Home, Highlights, Projects, Life, Guestbook | All five anchors match their sections. |
| E2E-03 | Advance hero carousel | Counter and scene label advance to slide 2/3. |
| E2E-04 | Expand education and project details | Both disclosures expose their original details. |
| E2E-05 | Select Research, System Builds, All | Counts are 2, 2, and 4. |
| E2E-06 | Save a project, open Saved, reload, remove test favorite | Saved count persists across reload and returns to zero. |
| E2E-07a | Ask “How does MapReduce work?” | Leading excerpt is from “MapReduce steps” in Big Data Computing · Part 1; this corrects the irrelevant V0 leading excerpt. |
| E2E-07b | Ask “How do I bake a sourdough loaf?” | Returns a no-evidence message rather than a course-note passage. |
| E2E-07c | Ask the paraphrased unsupported query “How do I bake sourdough bread?” | Returns the no-evidence message after the V1 overlap threshold was tightened; this added case failed on unchanged V0. |
| E2E-08 | Open and close a photo | Dialog opens and closes. |
| E2E-09 | Open and close the first video | MP4 metadata loads and controls are present. |
| E2E-10a | Click music control to play, then pause | Both user-controlled states work in the isolated browser. |
| E2E-11 | Submit the guestbook form empty | No message is created; the empty state remains. A valid message was not submitted. |
| E2E-12 | Inspect page and console errors | No uncaught application errors. Chrome’s implicit `/favicon.ico` 404 is recorded separately. |

## Screenshots

- `V1-E2E-01_home_desktop.png` — desktop Home view.
- `V1-E2E-12_highlights_desktop.png` — Highlights viewport.
- `V1-E2E-12_highlights_full_desktop.png` — full Highlights section and tested MapReduce/no-evidence conversation.

## Limits

The suite was also run against the deployed HTTPS URL. The first live run recorded one carousel assertion failure because the runner waited a fixed 500 ms; it passed on the same page after the runner was changed to wait for the actual slide counter. The untouched first-run JSON/screenshots are retained with the `V1-PAGES-initial-` prefix. The final public run passed 25/25; its raw JSON and three screenshots use the `V1-PAGES-RETEST-` prefix. A deployed V1 tab was also inspected in Chrome. A valid guestbook message, length-limit behavior, contrast audit, and mobile layout are not tested. The script's favorite is stored only in its isolated browser context and cleared before exit.


## Published-site run

**Date:** 2026-10-23 20:20 Asia/Hong_Kong (2026-10-23 12:20 UTC). **Route:** `https://liuxinyue84-sketch.github.io/V1/`. **Result:** 25/25 assertions passed with the common runner. Raw evidence: `V1-PAGES-RETEST-e2e-results.json`; screenshots: `V1-PAGES-RETEST-E2E-01_home_desktop.png`, `V1-PAGES-RETEST-E2E-12_highlights_desktop.png`, and `V1-PAGES-RETEST-E2E-12_highlights_full_desktop.png`. The initial timing-sensitive 24/25 result is retained separately with its screenshots; no application errors occurred.
