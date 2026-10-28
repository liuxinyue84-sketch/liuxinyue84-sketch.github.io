# V1 Usability Correction Prompt — Click Guidance and Isolated Disclosures (Iteration 6)

**Record type:** this iteration is based on the user's exact screenshot feedback below. It is a usability correction within the existing V1 Few-Shot branch, not a claim of a new LLM technique.

## User feedback (verbatim)

> 这里没有文字提示，我怎么知道会跳转到哪里？不要这个图片下面的东西挡到图片了？这个以及研究生的经历为什么不能点开？这个又没有指引？我点开一个project为什么另一个也会跟着一起打开？

## Implementation instruction derived from the feedback

> Modify V1 only. Keep frozen V0 untouched and preserve all V0 personal and business copy. Make chapter-navigation destinations explicit using the existing section names, and label the project index with the existing V0 project titles so visitors can predict where each link goes. Move the image-carousel thumbnail controls fully below the main image without covering it. Make both education cards and their photos activate the corresponding existing disclosure; show a concise visible action hint, and change the hint when details are open. Keep the disclosure state local to each education card. Ensure that expanding one project changes only that project's state and does not make a neighboring card appear expanded because of grid stretching. Preserve the calm paper/watercolor styling, keyboard access, and gentle transitions. Add automated checks for each reported issue, capture clean screenshots of the controls, both education details, and a single opened project, and verify V0's manifest.

## Applied corrections

- Chapter rail names the existing destinations: Highlights, Projects, Life.
- Project index labels come from each existing project's exact V0 title.
- Hero thumbnails now sit below the image with a clear gap.
- Education title buttons display “Click to view details” / “Click to hide details”; clicking a school photo also opens that school's details.
- Education open state now targets `.education-leaf`, fixing the stale `.school-card.open` CSS selector.
- Project grid cards use intrinsic heights and top alignment so a neighboring card stays compact when one detail block expands.

## Verification

See `evaluation/scripts/test_portfolio_e2e.cjs` and the R7 evidence set. The copy contract ignores only the newly added action hint, while continuing to compare the original school content exactly.
