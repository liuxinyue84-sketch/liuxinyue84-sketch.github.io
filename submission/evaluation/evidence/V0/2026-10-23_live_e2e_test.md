# V0 Live End-to-End Test Log

**Date:** 2026-10-23 (Asia/Hong_Kong)  
**Target:** [https://liuxinyue84-sketch.github.io/](https://liuxinyue84-sketch.github.io/)  
**Repository:** [liuxinyue84-sketch/liuxinyue84-sketch.github.io](https://github.com/liuxinyue84-sketch/liuxinyue84-sketch.github.io)  
**Deployed commit:** `fffbb35f956ed8d73f36853c0fd2a42a19ea9378`  
**Version integrity:** the 32 files in `coursework/website/V0/` and `outputs/Aria_Sky_Journal_V0/` have matching SHA-256 manifests; the published commit was prepared from that frozen V0 directory. No V0 source was edited for this test.

## Environment and initial state

- Browser: Google Chrome on macOS.
- Desktop viewport: 1512 px wide (browser screenshot viewport).
- Route: public GitHub Pages HTTPS root.
- Initial project favorites: `Saved 0`.
- Initial guestbook: empty (“No notes yet”).
- Test state cleanup: favorite toggled back off and verified after reload (`Saved 0`); no guestbook message submitted; browser viewport reset and returned to the homepage.

## Test results

| ID | Action | Observed result | Status |
|---|---|---|---|
| E2E-01 | Open the deployed root URL | Page title `Aria’s Sky Journal` loaded; the hand-drawn sky background and hero image rendered. GitHub Pages returned HTTP 200. The checked homepage images had non-zero natural dimensions. | Pass |
| E2E-02 | Click Home, Highlights, Projects, Life, and Guestbook navigation links | Each link updated the URL hash to its matching section. | Pass |
| E2E-03 | Advance the hero carousel and select a scene | Scene label, selected indicator, and slide counter updated among the three scenes. | Pass |
| E2E-04 | Expand education and a project detail | Education disclosures revealed course/award information; the project detail control expanded the selected project’s supporting content. | Pass |
| E2E-05 | Select Research, System Builds, and All project filters | Research showed 2 stories, System Builds showed 2 stories, and All showed 4 stories. | Pass |
| E2E-06 | Favorite a project, open Saved, reload, then undo the test favorite | Saved changed from 0 to 1; the Saved view showed the selected research project; the favorite remained after reload. It was then removed and a second reload confirmed `Saved 0`. | Pass |
| E2E-07a | Ask “What is retrieval-augmented generation?” in the RAG panel | The site searched its packaged lecture notes and returned a relevant RAG workflow explanation with a course/section source. The interface reported 1,359 passages from 8 notes when indexing the corpus. | Pass |
| E2E-07b | Ask “How does MapReduce work?” | The leading excerpt was about neutral framing/sycophancy, which was not a good answer to the question. A secondary source did mention MapReduce limitations. This exposes a retrieval-ranking/relevance weakness. | Partial / issue found |
| E2E-08 | Open and close a photo preview and a video preview | Photo preview opened in a dialog and closed. The video preview loaded the hosted MP4 (`readyState=1`) with controls and began playback when opened; it was closed after checking. | Pass |
| E2E-09 | Observe initial music state, then click play and pause | Chrome reported that autoplay was blocked on page load. A direct click started the Schumann audio (`paused=false`, `readyState=4`); clicking again paused it. | Pass with browser-policy limitation |
| E2E-10 | Click Sign the guestbook with both fields empty | No note was added; the empty state remained. A valid message was not submitted to avoid leaving a test entry in the browser’s local storage. | Pass for empty validation; valid submission not tested |
| E2E-11 | Inspect browser console | No JavaScript console errors were present at the final check. | Pass |

## Summary and limits

The published baseline is reachable, its main navigation and representative portfolio interactions work, and its favorite state persists locally as designed. The main observed product limitation is RAG retrieval relevance for the MapReduce query. Browser autoplay restrictions require a visitor gesture before background audio can play. Valid guestbook submission, length-limit handling, a RAG no-match query, and a full accessibility/contrast audit were not tested in this run.

## Screenshot evidence

- `E2E-01_desktop-home_2026-10-23.png` — desktop capture of the published homepage, showing the Home hero and carousel scene 03/03. PNG, 3024 × 1718 pixels; SHA-256 `a9ce31bf24878d9b3e5a6afaccb06b688164ca121ff3456577ca881df0c76e33`.

This image documents the homepage appearance only; it is not visual evidence for every interaction in the test table. The deployed frozen V0 source was not changed during the test.
